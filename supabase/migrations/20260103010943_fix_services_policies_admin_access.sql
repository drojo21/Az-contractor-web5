/*
  # Fix Services Table Policies for Admin Access

  ## Changes
  This migration updates the Row Level Security policies for the `services` table
  to ensure authenticated users (admins) have full access to all services.

  ## Policy Updates
  1. Drop existing restrictive policies
  2. Create new policies that allow:
     - Anonymous users: SELECT only active services
     - Authenticated users: Full access (SELECT, INSERT, UPDATE, DELETE) to all services

  ## Security
  - Anonymous users can only view active services (public-facing)
  - Authenticated admins can view and edit all services including inactive ones
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view active services" ON services;
DROP POLICY IF EXISTS "Authenticated users can manage services" ON services;

-- Create new policies with proper separation
CREATE POLICY "Anonymous users can view active services"
  ON services FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (true);
