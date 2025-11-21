/*
  # Grant Anonymous Insert Access to Leads Table

  1. Changes
    - Revoke all existing grants from anon
    - Grant only INSERT to anon role
    - Drop all existing RLS policies on leads
    - Create single INSERT policy for anon role with explicit true check
    
  2. Security
    - Anonymous users: Can insert leads only
    - Authenticated users: Full access to all leads
*/

-- First, revoke all from anon to start clean
REVOKE ALL ON leads FROM anon;

-- Grant only INSERT to anon
GRANT INSERT ON leads TO anon;

-- Drop all existing policies
DROP POLICY IF EXISTS "Enable insert for anon" ON leads;
DROP POLICY IF EXISTS "Enable select for authenticated" ON leads;
DROP POLICY IF EXISTS "Enable update for authenticated" ON leads;
DROP POLICY IF EXISTS "Enable delete for authenticated" ON leads;
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON leads;

-- Ensure RLS is enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create simple INSERT policy for anon
CREATE POLICY "anon_insert_policy"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for authenticated users
CREATE POLICY "auth_select_policy"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_policy"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "auth_delete_policy"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);
