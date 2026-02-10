-- Seed: Demo Users
-- Version: 002
-- Description: Insert demo users for development/testing
-- Date: 2026-01-21
-- Password for all demo users: Demo123!

-- Demo Free User
INSERT INTO users (email, email_verified, password_hash, full_name, subscription_tier, status)
VALUES (
    'demo.free@genai.com',
    true,
    crypt('Demo123!', gen_salt('bf')),
    'Demo Free User',
    'free',
    'active'
) ON CONFLICT (email) DO NOTHING;

-- Demo Pro User
INSERT INTO users (email, email_verified, password_hash, full_name, subscription_tier, status)
VALUES (
    'demo.pro@genai.com',
    true,
    crypt('Demo123!', gen_salt('bf')),
    'Demo Pro User',
    'pro',
    'active'
) ON CONFLICT (email) DO NOTHING;

-- Demo Plus User
INSERT INTO users (email, email_verified, password_hash, full_name, subscription_tier, status)
VALUES (
    'demo.plus@genai.com',
    true,
    crypt('Demo123!', gen_salt('bf')),
    'Demo Plus User',
    'plus',
    'active'
) ON CONFLICT (email) DO NOTHING;

-- Demo Enterprise User
INSERT INTO users (email, email_verified, password_hash, full_name, subscription_tier, status)
VALUES (
    'demo.enterprise@genai.com',
    true,
    crypt('Demo123!', gen_salt('bf')),
    'Demo Enterprise User',
    'enterprise',
    'active'
) ON CONFLICT (email) DO NOTHING;
