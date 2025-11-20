/*
  # Clean Up Leads Policies - Use PUBLIC Role

  1. Changes
    - Drop all existing policies on leads table
    - Create policy using PUBLIC role instead of anon
    - This follows Supabase's recommended pattern
    
  2. Security
    - Public users: Can insert leads only
    - Authenticated users: Full access to all leads
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_select_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_update_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_delete_leads" ON leads;

-- Allow anyone (including anonymous) to insert leads
CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users full access
CREATE POLICY "Authenticated users can select leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);
