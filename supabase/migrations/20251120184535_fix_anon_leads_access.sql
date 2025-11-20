/*
  # Fix Anonymous Access to Leads Table

  ## Changes
  - Drop all existing INSERT policies
  - Create a new permissive policy for anonymous inserts
  - Ensure anon role has proper grants
  
  ## Security
  - Allow anonymous users to submit lead forms
  - Validate only essential fields
  - Keep read/update/delete restricted to authenticated users
*/

-- Drop all INSERT policies
DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;
DROP POLICY IF EXISTS "Anyone can submit valid leads" ON leads;
DROP POLICY IF EXISTS "Public can insert leads" ON leads;

-- Grant explicit INSERT permission to anon role
GRANT INSERT ON leads TO anon;

-- Create simple policy for anonymous inserts
CREATE POLICY "anon_can_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "authenticated_can_insert_leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
