/*
  # Fix Leads RLS Policies - Final Solution

  1. Changes
    - Drop ALL existing policies on leads table
    - Create single INSERT policy for anonymous users
    - Create separate SELECT, UPDATE, DELETE policies for authenticated users only
    - This ensures anonymous users can ONLY insert, nothing else

  2. Security
    - Anonymous users: INSERT only
    - Authenticated users: Full access to all leads
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "allow_anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "allow_authenticated_all_leads" ON leads;

-- Allow anonymous users to insert leads
CREATE POLICY "anon_can_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all leads
CREATE POLICY "authenticated_can_select_leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update all leads
CREATE POLICY "authenticated_can_update_leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete all leads
CREATE POLICY "authenticated_can_delete_leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);
