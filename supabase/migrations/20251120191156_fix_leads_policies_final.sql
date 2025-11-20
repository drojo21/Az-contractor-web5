/*
  # Fix Leads Policies - Grant Permissions to Anon Role

  1. Changes
    - Ensure anon role has INSERT grant
    - Drop all policies and recreate specifically for anon role (not public)
    - Verify RLS is enabled
    
  2. Security
    - Anonymous users: Can insert leads only
    - Authenticated users: Full access to all leads
*/

-- Ensure RLS is enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Ensure anon has INSERT permission
GRANT INSERT ON leads TO anon;

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can select leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can delete leads" ON leads;

-- Create policy for anon to insert
CREATE POLICY "Enable insert for anon"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for authenticated users
CREATE POLICY "Enable select for authenticated"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update for authenticated"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);
