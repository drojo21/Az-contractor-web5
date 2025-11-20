/*
  # Az Contractor Pro - Initial Database Schema

  ## Overview
  This migration creates the complete database structure for Az Contractor Pro,
  a website building and social media marketing platform for contractors.

  ## New Tables

  ### 1. `services`
  Stores the three service tiers (Basic, Pro, Enterprise)
  - `id` (uuid, primary key)
  - `name` (text) - Service tier name
  - `price` (numeric) - Monthly price
  - `description` (text) - Service description
  - `features` (jsonb) - Array of features included
  - `is_active` (boolean) - Whether service is currently offered
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `leads`
  Stores customer inquiries and quote requests
  - `id` (uuid, primary key)
  - `name` (text) - Customer name
  - `email` (text) - Customer email
  - `phone` (text) - Customer phone
  - `company_name` (text) - Contractor company name
  - `service_id` (uuid) - Selected service tier
  - `business_type` (text) - Type of contracting business
  - `current_website` (text) - Existing website URL if any
  - `message` (text) - Additional details
  - `status` (text) - lead status: new, contacted, qualified, converted, lost
  - `payment_status` (text) - Payment status: pending, paid, failed
  - `stripe_payment_id` (text) - Stripe payment intent ID
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `testimonials`
  Stores client reviews and success stories
  - `id` (uuid, primary key)
  - `client_name` (text) - Client name
  - `client_company` (text) - Client's company name
  - `client_role` (text) - Client's role/title
  - `testimonial_text` (text) - Review content
  - `rating` (integer) - 1-5 star rating
  - `image_url` (text) - Optional client photo
  - `is_featured` (boolean) - Show on homepage
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `portfolio`
  Stores completed project showcases
  - `id` (uuid, primary key)
  - `client_name` (text) - Client/project name
  - `project_title` (text) - Project headline
  - `description` (text) - Project details
  - `industry` (text) - Type of contractor (plumbing, electrical, etc)
  - `service_type` (text) - Which service tier was used
  - `image_url` (text) - Project screenshot/image
  - `website_url` (text) - Live website URL
  - `results` (jsonb) - Key metrics and achievements
  - `is_featured` (boolean) - Show on homepage
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for services, testimonials (featured), portfolio (featured)
  - Authenticated admin write access for all tables
  - Public insert access for leads table only
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_name text NOT NULL,
  service_id uuid REFERENCES services(id),
  business_type text NOT NULL,
  current_website text DEFAULT '',
  message text DEFAULT '',
  status text DEFAULT 'new',
  payment_status text DEFAULT 'pending',
  stripe_payment_id text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_company text NOT NULL,
  client_role text NOT NULL,
  testimonial_text text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  project_title text NOT NULL,
  description text NOT NULL,
  industry text NOT NULL,
  service_type text NOT NULL,
  image_url text NOT NULL,
  website_url text DEFAULT '',
  results jsonb DEFAULT '{}'::jsonb,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Services policies (public read, admin write)
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Leads policies (public insert, admin read/update)
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Testimonials policies (public read featured, admin full access)
CREATE POLICY "Public can view featured testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_featured = true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Portfolio policies (public read featured, admin full access)
CREATE POLICY "Public can view featured portfolio items"
  ON portfolio FOR SELECT
  TO anon, authenticated
  USING (is_featured = true);

CREATE POLICY "Authenticated users can manage portfolio"
  ON portfolio FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default service tiers
INSERT INTO services (name, price, description, features, sort_order) VALUES
(
  'Basic',
  250,
  'Perfect for contractors just starting their online presence',
  '["Professional Landing Page", "Mobile Responsive Design", "Contact Form Integration", "Fast Loading Speed", "Basic SEO Setup", "1 Month Support"]'::jsonb,
  1
),
(
  'Pro',
  350,
  'Expand your reach with a website plus social media presence',
  '["Everything in Basic", "Facebook Business Page Setup", "Google Business Profile", "Instagram Business Account", "Social Media Integration", "Brand Consistency Across Platforms", "2 Months Support"]'::jsonb,
  2
),
(
  'Enterprise',
  500,
  'Complete digital marketing solution with ongoing ad management',
  '["Everything in Pro", "2 Custom Ads Per Month", "AI-Powered Image Posting", "Monthly Performance Reports", "Ad Campaign Management", "Content Calendar", "Priority Support", "Ongoing Optimization"]'::jsonb,
  3
);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_company, client_role, testimonial_text, rating, is_featured) VALUES
(
  'Mike Johnson',
  'Johnson Plumbing Services',
  'Owner',
  'Az Contractor Pro built us an amazing website that brought in 15 new customers in the first month. Their social media setup has been a game-changer for our business!',
  5,
  true
),
(
  'Sarah Martinez',
  'Elite Electrical Solutions',
  'CEO',
  'The Enterprise package is worth every penny. The monthly ads they create consistently bring in qualified leads, and the AI posting keeps our social media active without any effort from us.',
  5,
  true
),
(
  'Robert Chen',
  'Chen HVAC & Cooling',
  'Founder',
  'Professional, responsive, and they truly understand contractor businesses. Our website looks better than our competitors who spent thousands more.',
  5,
  true
);

-- Insert sample portfolio items
INSERT INTO portfolio (client_name, project_title, description, industry, service_type, image_url, website_url, results, is_featured) VALUES
(
  'Johnson Plumbing',
  'Modern Plumbing Website Launch',
  'Complete website redesign with focus on emergency services and customer testimonials. Integrated online booking and before/after project galleries.',
  'Plumbing',
  'Pro',
  'https://images.pexels.com/photos/8005395/pexels-photo-8005395.jpeg',
  'https://example.com',
  '{"new_leads": "23 in first month", "conversion_rate": "12%", "time_to_launch": "2 weeks"}'::jsonb,
  true
),
(
  'Elite Electrical',
  'Full Digital Marketing Campaign',
  'Enterprise package including website, social media setup, and ongoing ad campaigns. Focus on commercial and residential electrical services.',
  'Electrical',
  'Enterprise',
  'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
  'https://example.com',
  '{"monthly_leads": "45+", "roi": "380%", "social_followers": "1,200+"}'::jsonb,
  true
),
(
  'Chen HVAC',
  'Landing Page for HVAC Services',
  'Clean, professional landing page highlighting seasonal maintenance packages and emergency repair services. Mobile-optimized for on-the-go customers.',
  'HVAC',
  'Basic',
  'https://images.pexels.com/photos/5691580/pexels-photo-5691580.jpeg',
  'https://example.com',
  '{"page_speed": "98/100", "mobile_traffic": "67%", "form_submissions": "15/month"}'::jsonb,
  true
);