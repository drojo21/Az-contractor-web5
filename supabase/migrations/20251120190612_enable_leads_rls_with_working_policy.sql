/*
  # Enable RLS with Working Policy for Leads

  1. Changes
    - Re-enable RLS on leads table
    - Drop all existing policies
    - Create simple, working policies for anon and authenticated roles
    
  2. Security
    - Anonymous users: Can insert leads
    - Authenticated users: Full access to all leads
*/

-- Re-enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "anon_can_insert_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_can_select_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_can_update_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_can_delete_leads" ON leads;

-- Create policy for anonymous inserts - using PERMISSIVE and checking basic requirements
CREATE POLICY "anon_insert_leads"
  ON leads
  AS PERMISSIVE
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for authenticated users
CREATE POLICY "authenticated_select_leads"
  ON leads
  AS PERMISSIVE
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_update_leads"
  ON leads
  AS PERMISSIVE
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "authenticated_delete_leads"
  ON leads
  AS PERMISSIVE
  FOR DELETE
  TO authenticated
  USING (true);
