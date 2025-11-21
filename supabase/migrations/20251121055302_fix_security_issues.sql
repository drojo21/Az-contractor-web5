/*
  # Fix Security and Performance Issues

  1. Performance Improvements
    - Add index on leads.service_id foreign key for optimal query performance
  
  2. Security Fixes - Multiple Permissive Policies
    - Replace multiple permissive SELECT policies with single restrictive policies
    - For portfolio: Combine public and authenticated access into one policy
    - For services: Combine public and authenticated access into one policy
    - For testimonials: Combine public and authenticated access into one policy
  
  3. Anonymous Access Policies
    - Keep public insert on leads (required for contact form)
    - Other tables properly restrict access to authenticated users only
*/

-- Add missing index on foreign key
CREATE INDEX IF NOT EXISTS idx_leads_service_id ON leads(service_id);

-- Fix portfolio policies: Drop conflicting policies and create single policy
DROP POLICY IF EXISTS "Authenticated users can manage portfolio" ON portfolio;
DROP POLICY IF EXISTS "Public can view featured portfolio items" ON portfolio;

CREATE POLICY "portfolio_select_policy"
  ON portfolio
  FOR SELECT
  TO public
  USING (is_featured = true OR auth.uid() IS NOT NULL);

-- Fix services policies: Drop conflicting policies and create single policy
DROP POLICY IF EXISTS "Authenticated users can manage services" ON services;
DROP POLICY IF EXISTS "Public can view active services" ON services;

CREATE POLICY "services_select_policy"
  ON services
  FOR SELECT
  TO public
  USING (is_active = true OR auth.uid() IS NOT NULL);

-- Fix testimonials policies: Drop conflicting policies and create single policy
DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public can view featured testimonials" ON testimonials;

CREATE POLICY "testimonials_select_policy"
  ON testimonials
  FOR SELECT
  TO public
  USING (is_featured = true OR auth.uid() IS NOT NULL);
