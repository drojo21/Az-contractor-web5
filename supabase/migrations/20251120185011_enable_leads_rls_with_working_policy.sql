/*
  # Re-enable RLS on Leads with Proper Policy

  ## Changes
  - Re-enable RLS on leads table
  - Create working policies for all operations
  - Allow anonymous inserts for form submissions
  - Restrict viewing/editing to authenticated users only
  
  ## Security
  - Anonymous users can only INSERT leads (form submissions)
  - Only authenticated users can view, update, or delete leads
  - Proper separation between public form access and admin access
*/

-- Re-enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "anon_can_insert_leads" ON leads;
DROP POLICY IF EXISTS "authenticated_can_insert_leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can manage leads" ON leads;

-- Allow anonymous users to insert leads (form submissions)
CREATE POLICY "allow_anon_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users full access to leads
CREATE POLICY "allow_authenticated_all_leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
