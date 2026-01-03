/*
  # Clean Up Duplicate Policies and Optimize Database

  ## Changes
  This migration addresses security warnings and optimizes the database:

  1. **Remove Duplicate Policies**
     - Consolidates overlapping SELECT policies on services table
     - Removes old policy remnants that create conflicts

  2. **Add Performance Index**
     - Adds index on leads.service_id for foreign key lookups
     - Improves query performance when filtering/joining by service

  3. **Standardize Policy Naming**
     - Uses consistent naming convention across all tables
     - Separates anon and authenticated access clearly

  ## Security Notes
  - Anonymous access to certain tables is intentional (public website)
  - Leads table allows public INSERT for contact form submissions
  - Services, testimonials, portfolio allow public SELECT for website display
  - All management operations require authentication
*/

-- Drop all existing services policies to start clean
DROP POLICY IF EXISTS "Anonymous users can view active services" ON services;
DROP POLICY IF EXISTS "Authenticated users can view all services" ON services;
DROP POLICY IF EXISTS "Authenticated users can insert services" ON services;
DROP POLICY IF EXISTS "Authenticated users can update services" ON services;
DROP POLICY IF EXISTS "Authenticated users can delete services" ON services;
DROP POLICY IF EXISTS "services_select_policy" ON services;

-- Create clean, non-overlapping policies for services
-- Anonymous users: only active services
CREATE POLICY "services_anon_select"
  ON services FOR SELECT
  TO anon
  USING (is_active = true);

-- Authenticated users: all services with full CRUD
CREATE POLICY "services_auth_select"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "services_auth_insert"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "services_auth_update"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "services_auth_delete"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- Add index for leads.service_id foreign key lookups
CREATE INDEX IF NOT EXISTS idx_leads_service_id ON leads(service_id);

-- Add helpful indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, sort_order) WHERE is_active = true;
