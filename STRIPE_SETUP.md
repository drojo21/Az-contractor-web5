# Stripe Integration Setup Guide

## Overview
This document explains how to integrate Stripe payment processing into Az Contractor Pro.

## Current Implementation
The quote form currently collects lead information and stores it in the database with `payment_status: 'pending'`. The system shows a message that a payment link will be sent via email.

## To Enable Stripe Payments

### Step 1: Get Stripe Account
1. Create a Stripe account at https://dashboard.stripe.com/register
2. Navigate to Developers section: https://dashboard.stripe.com/apikeys
3. Copy your Secret Key (starts with `sk_`)

### Step 2: Set Up Stripe Configuration
Once you have your Stripe secret key, let me know and I'll help you implement:

1. **Stripe Edge Function** - A Supabase Edge Function that:
   - Creates Stripe Payment Intents
   - Handles webhook events for payment confirmation
   - Updates lead payment status automatically

2. **Payment Flow Integration** - Update the quote form to:
   - Create a payment intent when user reaches final step
   - Display Stripe's payment element for secure card collection
   - Process payment before submitting the lead
   - Update lead with `stripe_payment_id` and `payment_status: 'paid'`

3. **Webhook Handler** - Secure endpoint to:
   - Receive payment confirmations from Stripe
   - Update database when payments succeed or fail
   - Send confirmation emails

### Step 3: What You'll Need
- Stripe Publishable Key (for frontend)
- Stripe Secret Key (for backend/edge functions)
- Webhook signing secret (for security)

## Current Workflow
1. User fills out multi-step quote form
2. Lead is saved to database with pending payment status
3. Admin can view leads in admin dashboard
4. Manual follow-up with payment link via email

## With Stripe Integration
1. User fills out multi-step quote form
2. User enters payment information directly in form
3. Payment is processed securely through Stripe
4. Lead is saved with paid status and Stripe payment ID
5. Admin sees converted lead immediately
6. Automated confirmation email sent to customer

## Ready to Integrate?
When you have your Stripe keys, I can help you implement the complete payment flow.

For more information: https://bolt.new/setup/stripe
