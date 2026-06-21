-- Replace overly permissive recipient UPDATE policy with a SECURITY DEFINER RPC
-- that only flips status from 'sent' to 'claimed' for the authenticated recipient.

CREATE OR REPLACE FUNCTION public.claim_transfer(_transfer_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _t record;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT id, recipient_id, status INTO _t
    FROM public.transfers
   WHERE id = _transfer_id
   FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Transfer not found';
  END IF;
  IF _t.recipient_id <> _uid THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  IF _t.status = 'claimed' THEN
    RETURN jsonb_build_object('status', 'already_claimed');
  END IF;

  UPDATE public.transfers
     SET status = 'claimed'
   WHERE id = _transfer_id;

  RETURN jsonb_build_object('status', 'claimed');
END;
$$;

REVOKE ALL ON FUNCTION public.claim_transfer(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.claim_transfer(uuid) TO authenticated;

-- Drop the overly permissive recipient UPDATE policy.
DROP POLICY IF EXISTS "Recipient can mark claimed" ON public.transfers;