-- Allow an employee to record their own purchase debit on points_ledger.
-- Must be negative (debit), authored by themselves; positive grants still
-- only flow through the SECURITY DEFINER grant_points() RPC.
DROP POLICY IF EXISTS "Employee purchase debit" ON public.points_ledger;
CREATE POLICY "Employee purchase debit" ON public.points_ledger
  FOR INSERT TO authenticated
  WITH CHECK (
    employee_id = auth.uid()
    AND delta < 0
  );