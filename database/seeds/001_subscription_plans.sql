-- Seed: Subscription Plans
-- Version: 001
-- Description: Insert default subscription plans
-- Date: 2026-01-21

INSERT INTO subscription_plans (name, display_name, description, price_monthly, price_yearly, requests_per_minute, concurrent_requests, history_retention_days, features) VALUES
('free', 'Free', 'Intelligence for everyday tasks', 0.00, 0.00, 10, 2, 7, 
 '{"models": ["gpt-3.5-turbo"], "support": "community", "max_tokens": 4096}'::jsonb),

('pro', 'Pro', 'Keep chatting with expanded access', 49.00, 470.00, 100, 10, 30, 
 '{"models": ["gpt-4", "claude-3-sonnet"], "support": "priority", "max_tokens": 8192}'::jsonb),

('plus', 'Plus', 'Do more with advanced intelligence', 99.00, 950.00, 500, 25, 90, 
 '{"models": ["gpt-4", "claude-3-opus", "llama-3-70b"], "support": "priority", "api_access": true, "max_tokens": 16384}'::jsonb),

('enterprise', 'Enterprise', 'Full access to the best of GenAI', 0.00, 0.00, 10000, 50, NULL, 
 '{"models": ["all"], "support": "dedicated", "api_access": true, "custom_models": true, "sla": "99.9%", "max_tokens": 32768}'::jsonb)
ON CONFLICT (name) DO NOTHING;
