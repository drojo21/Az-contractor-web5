/*
  # Optimize RLS Performance and Fix Security Issues

  1. Performance Optimizations
    - Update RLS policies to use (SELECT auth.uid()) instead of auth.uid()
    - This prevents re-evaluation of auth functions for each row
    - Significantly improves query performance at scale
  
  2. Index Optimization
    - Keep the leads.service_id index as it will be used when data grows
    - The "unused" warning is expected for new databases with no query history
  
  3. Anonymous Access
    - Policies are intentionally designed to allow public read access
    - Only the leads table allows anonymous inserts (for contact form)
    - This is a valid use case for a public-facing website
*/

-- Optimize portfolio SELECT policy
DROP POLICY IF EXISTS "portfolio_select_policy" ON portfolio;

CREATE POLICY "portfolio_select_policy"
  ON portfolio
  FOR SELECT
  TO public
  USING (is_featured = true OR (SELECT auth.uid()) IS NOT NULL);

-- Optimize services SELECT policy
DROP POLICY IF EXISTS "services_select_policy" ON services;

CREATE POLICY "services_select_policy"
  ON services
  FOR SELECT
  TO public
  USING (is_active = true OR (SELECT auth.uid()) IS NOT NULL);

-- Optimize testimonials SELECT policy
DROP POLICY IF EXISTS "testimonials_select_policy" ON testimonials;

CREATE POLICY "testimonials_select_policy"
  ON testimonials
  FOR SELECT
  TO public
  USING (is_featured = true OR (SELECT auth.uid()) IS NOT NULL);
