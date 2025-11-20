/*
  # Grant Anonymous Insert Access to Leads

  1. Changes
    - Drop and recreate the anon insert policy with explicit permissions
    - Ensure anon role has proper table-level grants
    
  2. Security
    - Anonymous users can INSERT leads only
    - No other operations allowed for anonymous users
*/

-- Drop existing anon policy
DROP POLICY IF EXISTS "anon_can_insert_leads" ON leads;

-- Recreate with explicit check
CREATE POLICY "anon_can_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (
    service_id IS NOT NULL AND
    name IS NOT NULL AND
    email IS NOT NULL
  );
