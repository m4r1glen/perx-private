
-- 1) Holds table
CREATE TABLE public.selection_holds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  selection_id uuid NOT NULL UNIQUE REFERENCES public.selections(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL,
  amount_l integer NOT NULL CHECK (amount_l > 0),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','settled','released')),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);
CREATE INDEX selection_holds_employee_active_idx ON public.selection_holds(employee_id) WHERE status = 'active';

GRANT SELECT ON public.selection_holds TO authenticated;
GRANT ALL ON public.selection_holds TO service_role;

ALTER TABLE public.selection_holds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employee reads own holds"
  ON public.selection_holds FOR SELECT
  TO authenticated
  USING (auth.uid() = employee_id OR public.is_employer_of(employee_id));

-- 2) Available balance helper
CREATE OR REPLACE FUNCTION public.available_balance(_uid uuid)
RETURNS bigint
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT COALESCE((SELECT SUM(delta) FROM public.points_ledger WHERE employee_id = _uid), 0)::bigint
       - COALESCE((SELECT SUM(amount_l) FROM public.selection_holds WHERE employee_id = _uid AND status = 'active'), 0)::bigint;
$$;

-- 3) submit_selection (atomic: affordability check + create selection + hold)
CREATE OR REPLACE FUNCTION public.submit_selection(_offer_ids uuid[], _total integer)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _settled bigint;
  _held bigint;
  _available bigint;
  _sum_price bigint;
  _selection_id uuid;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF _offer_ids IS NULL OR array_length(_offer_ids, 1) IS NULL THEN
    RAISE EXCEPTION 'No offers';
  END IF;
  IF _total IS NULL OR _total <= 0 THEN
    RAISE EXCEPTION 'Invalid total';
  END IF;

  -- Validate total matches sum of offer prices.
  SELECT COALESCE(SUM(price_l), 0)::bigint INTO _sum_price
    FROM public.offers WHERE id = ANY(_offer_ids);
  IF _sum_price <> _total THEN
    RAISE EXCEPTION 'Total does not match offer prices (expected %, got %)', _sum_price, _total;
  END IF;

  -- Lock the employee's ledger + holds via advisory lock to serialize concurrent submits.
  PERFORM pg_advisory_xact_lock(hashtext('selection_submit:' || _uid::text));

  SELECT COALESCE(SUM(delta), 0)::bigint INTO _settled
    FROM public.points_ledger WHERE employee_id = _uid;
  SELECT COALESCE(SUM(amount_l), 0)::bigint INTO _held
    FROM public.selection_holds WHERE employee_id = _uid AND status = 'active';
  _available := _settled - _held;

  IF _available < _total THEN
    RETURN jsonb_build_object(
      'status', 'insufficient_balance',
      'available', _available,
      'required', _total
    );
  END IF;

  INSERT INTO public.selections(employee_id, offer_ids, total_l, status)
  VALUES (_uid, _offer_ids, _total, 'pending')
  RETURNING id INTO _selection_id;

  INSERT INTO public.selection_holds(selection_id, employee_id, amount_l, status)
  VALUES (_selection_id, _uid, _total, 'active');

  RETURN jsonb_build_object(
    'status', 'pending',
    'selection_id', _selection_id,
    'available', _available - _total
  );
END;
$$;

-- 4) approve_selection — replace with hold-aware version
CREATE OR REPLACE FUNCTION public.approve_selection(_selection_id uuid)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _sel record;
  _company_id uuid;
  _owner uuid;
  _hold record;
  _settled bigint;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT s.id, s.employee_id, s.total_l, s.status
    INTO _sel
    FROM public.selections s
   WHERE s.id = _selection_id
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Selection not found';
  END IF;

  IF _sel.status = 'paid' THEN
    RETURN jsonb_build_object('status', 'already_paid');
  END IF;
  IF _sel.status NOT IN ('pending', 'approved') THEN
    RAISE EXCEPTION 'Selection is not approvable (status: %)', _sel.status;
  END IF;

  SELECT p.company_id INTO _company_id FROM public.profiles p WHERE p.id = _sel.employee_id;
  IF _company_id IS NULL THEN
    RAISE EXCEPTION 'Employee has no company';
  END IF;
  SELECT c.owner_id INTO _owner FROM public.companies c WHERE c.id = _company_id;
  IF _owner IS DISTINCT FROM _uid THEN
    RAISE EXCEPTION 'Only the employer admin can approve this selection';
  END IF;

  -- Find the active hold; if missing (e.g. legacy data), recompute from settled balance.
  SELECT * INTO _hold
    FROM public.selection_holds
   WHERE selection_id = _selection_id AND status = 'active'
   FOR UPDATE;

  IF NOT FOUND THEN
    -- Legacy path: no hold exists. Verify settled balance covers the total.
    SELECT COALESCE(SUM(delta), 0)::bigint INTO _settled
      FROM public.points_ledger WHERE employee_id = _sel.employee_id;
    IF _settled < _sel.total_l THEN
      RETURN jsonb_build_object('status', 'insufficient_balance',
        'balance', _settled, 'required', _sel.total_l);
    END IF;
  END IF;

  -- Settle: deduct from ledger, mark hold settled (if any), mark selection paid.
  INSERT INTO public.points_ledger(employee_id, delta, reason, company_id)
  VALUES (_sel.employee_id, -_sel.total_l, 'purchase', _company_id);

  IF FOUND OR _hold.id IS NOT NULL THEN
    UPDATE public.selection_holds
       SET status = 'settled', resolved_at = now()
     WHERE selection_id = _selection_id AND status = 'active';
  END IF;

  UPDATE public.selections SET status = 'paid' WHERE id = _selection_id;

  RETURN jsonb_build_object('status', 'paid', 'deducted', _sel.total_l);
END;
$$;

-- 5) reject_selection — release the hold
CREATE OR REPLACE FUNCTION public.reject_selection(_selection_id uuid)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _sel record;
  _company_id uuid;
  _owner uuid;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT s.id, s.employee_id, s.status INTO _sel
    FROM public.selections s WHERE s.id = _selection_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Selection not found';
  END IF;
  IF _sel.status = 'rejected' THEN
    RETURN jsonb_build_object('status', 'already_rejected');
  END IF;
  IF _sel.status NOT IN ('pending', 'approved') THEN
    RAISE EXCEPTION 'Selection is not rejectable (status: %)', _sel.status;
  END IF;

  SELECT p.company_id INTO _company_id FROM public.profiles p WHERE p.id = _sel.employee_id;
  SELECT c.owner_id INTO _owner FROM public.companies c WHERE c.id = _company_id;
  IF _owner IS DISTINCT FROM _uid THEN
    RAISE EXCEPTION 'Only the employer admin can reject this selection';
  END IF;

  UPDATE public.selection_holds
     SET status = 'released', resolved_at = now()
   WHERE selection_id = _selection_id AND status = 'active';

  UPDATE public.selections SET status = 'rejected' WHERE id = _selection_id;

  RETURN jsonb_build_object('status', 'rejected');
END;
$$;

-- 6) Tighten selections RLS — force RPC paths
DROP POLICY IF EXISTS "Employee writes own selections" ON public.selections;
DROP POLICY IF EXISTS "Employee updates own selections" ON public.selections;

-- (Reads stay as-is. send_gift / triggers run as SECURITY DEFINER and bypass RLS.)
