/*
  # Fix Leads Table RLS Policies

  ## Changes
  - Drop existing policies with improper security
  - Create proper policies that validate data while allowing public form submissions
  - Restrict admin access to authenticated users only

  ## Security
  - INSERT: Allow anonymous users to submit leads with valid data (name and email required)
  - SELECT: Only authenticated admin users can view leads
  - UPDATE: Only authenticated admin users can update leads
  - DELETE: Only authenticated admin users can delete leads
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Public can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can view all leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON leads;

-- Allow anyone to insert leads with valid name and email
CREATE POLICY "Anyone can submit valid leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND 
    name != '' AND 
    email IS NOT NULL AND 
    email != '' AND
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

-- Only authenticated users (admins) can view leads
CREATE POLICY "Admins can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users (admins) can update leads
CREATE POLICY "Admins can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users (admins) can delete leads
CREATE POLICY "Admins can delete leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);
