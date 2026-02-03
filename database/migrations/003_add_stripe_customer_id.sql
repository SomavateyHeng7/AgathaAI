-- Add Stripe customer ID to users table
-- Migration: 003_add_stripe_customer_id
-- Created: February 3, 2026

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255) UNIQUE;

CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);

COMMENT ON COLUMN users.stripe_customer_id IS 'Stripe customer ID for billing';
