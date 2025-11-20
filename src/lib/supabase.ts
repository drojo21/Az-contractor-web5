import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  service_id: string;
  business_type: string;
  current_website: string;
  message: string;
  status: string;
  payment_status: string;
  stripe_payment_id: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string;
  client_role: string;
  testimonial_text: string;
  rating: number;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  client_name: string;
  project_title: string;
  description: string;
  industry: string;
  service_type: string;
  image_url: string;
  website_url: string;
  results: Record<string, string>;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}
