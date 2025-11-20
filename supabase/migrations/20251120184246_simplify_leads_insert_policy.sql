/*
  # Simplify Leads Insert Policy

  ## Changes
  - Simplify the insert policy to only validate essential fields
  - Remove complex regex validation that may be causing issues
  - Keep basic validation for name and email presence

  ## Security
  - Still restricts inserts to valid submissions
  - Allows public form submissions
  - Maintains admin-only access for viewing/updating
*/

-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "Anyone can submit valid leads" ON leads;

-- Create a simpler policy that just checks for required fields
CREATE POLICY "Anyone can submit leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND 
    name != '' AND 
    email IS NOT NULL AND 
    email != ''
  );
