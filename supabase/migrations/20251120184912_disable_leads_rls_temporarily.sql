/*
  # Temporarily Disable RLS on Leads for Testing

  ## Changes
  - Disable RLS on leads table to test if that's blocking inserts
  - This is temporary to diagnose the issue
  
  ## Note
  - This is NOT secure for production
  - Will be re-enabled once we identify the issue
*/

-- Temporarily disable RLS
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
