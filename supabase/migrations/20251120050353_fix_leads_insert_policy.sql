/*
  # Fix Leads Insert Policy

  ## Changes
  - Drop existing insert policy for leads
  - Create new policy that explicitly allows public inserts
  - Ensure business_type field can be empty string instead of requiring value

  ## Security
  - Maintains public insert access for lead generation
  - Keeps admin-only access for viewing and updating leads
*/

-- Drop the existing insert policy
DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;

-- Make business_type nullable since it's optional in the form
ALTER TABLE leads ALTER COLUMN business_type DROP NOT NULL;

-- Create new explicit insert policy for anonymous and authenticated users
CREATE POLICY "Public can insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);
