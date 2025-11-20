/*
  # Clean Up Duplicate Leads Policies

  ## Changes
  - Remove old duplicate policies
  - Keep only the working policies
  
  ## Security
  - Anonymous users can INSERT leads
  - Authenticated users have full access
*/

-- Drop all old policies
DROP POLICY IF EXISTS "Admins can view leads" ON leads;
DROP POLICY IF EXISTS "Admins can update leads" ON leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON leads;
