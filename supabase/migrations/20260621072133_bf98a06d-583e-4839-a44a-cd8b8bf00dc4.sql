
-- Drop the employee self-debit policy so balance changes only happen via RPCs.
DROP POLICY IF EXISTS "Employee purchase debit" ON public.points_ledger;

CREATE OR REPLACE FUNCTION public.approve_selection(_selection_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _sel record;
  _company_id uuid;
  _owner uuid;
  _balance bigint;
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

  -- Verify caller owns the employee's company.
  SELECT p.company_id INTO _company_id
    FROM public.profiles p
   WHERE p.id = _sel.employee_id;

  IF _company_id IS NULL THEN
    RAISE EXCEPTION 'Employee has no company';
  END IF;

  SELECT c.owner_id INTO _owner
    FROM public.companies c
   WHERE c.id = _company_id;

  IF _owner IS DISTINCT FROM _uid THEN
    RAISE EXCEPTION 'Only the employer admin can approve this selection';
  END IF;

  IF _sel.total_l IS NULL OR _sel.total_l <= 0 THEN
    RAISE EXCEPTION 'Selection total is invalid';
  END IF;

  -- Recompute live balance.
  SELECT COALESCE(SUM(delta), 0)::bigint INTO _balance
    FROM public.points_ledger
   WHERE employee_id = _sel.employee_id;

  IF _balance < _sel.total_l THEN
    RETURN jsonb_build_object(
      'status', 'insufficient_balance',
      'balance', _balance,
      'required', _sel.total_l
    );
  END IF;

  -- Atomic: deduct then mark paid.
  INSERT INTO public.points_ledger(employee_id, delta, reason, company_id)
  VALUES (_sel.employee_id, -_sel.total_l, 'purchase', _company_id);

  UPDATE public.selections
     SET status = 'paid'
   WHERE id = _selection_id;

  RETURN jsonb_build_object(
    'status', 'paid',
    'deducted', _sel.total_l,
    'new_balance', _balance - _sel.total_l
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.approve_selection(uuid) TO authenticated;
