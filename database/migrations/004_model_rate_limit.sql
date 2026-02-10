CREATE TABLE IF NOT EXISTS model_rate_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    model VARCHAR(100) NOT NULL,
    question_count INTEGER NOT NULL DEFAULT 0,
    reset_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, model)
);

CREATE INDEX IF NOT EXISTS idx_model_rate_limits_user_id ON model_rate_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_model_rate_limits_model ON model_rate_limits(model);
