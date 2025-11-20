/*
  # Fix Leads Insert Policy - Include All Required Fields

  ## Changes
  - Update insert policy to check all NOT NULL fields
  - Ensure phone and company_name are validated
  - Keep policy simple but complete

  ## Security
  - Validates all required fields are present
  - Allows anonymous form submissions
  - Restricts admin operations to authenticated users
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;

-- Create policy that checks ALL required fields
CREATE POLICY "Anyone can submit leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND 
    name != '' AND 
    email IS NOT NULL AND 
    email != '' AND
    phone IS NOT NULL AND
    phone != '' AND
    company_name IS NOT NULL AND
    company_name != ''
  );
