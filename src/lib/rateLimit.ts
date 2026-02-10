// Per-model rate limit config
const MODEL_LIMITS: Record<string, { limit: number; windowMs: number; fallback?: string }> = {
  'gpt-4': { limit: 10, windowMs: 2 * 60 * 60 * 1000, fallback: 'gpt-3.5-turbo' }, // 2h window
  'gpt-3.5-turbo': { limit: 30, windowMs: 2 * 60 * 60 * 1000 },
};

/**
 * Checks and updates per-user per-model rate limit for chat models.
 * Returns { allowed, remaining, resetAt, fallbackModel }
 */
export async function checkModelRateLimit(userId: string, model: string) {
  const config = MODEL_LIMITS[model];
  if (!config) return { allowed: true, remaining: Infinity, resetAt: null, fallbackModel: undefined };

  // Try to fetch existing row
  const now = new Date();
  const result = await query(
    `SELECT id, question_count, reset_at FROM model_rate_limits WHERE user_id = $1 AND model = $2`,
    [userId, model]
  );
  let questionCount = 0;
  let resetAt = new Date(now.getTime() + config.windowMs);
  if (result.rows.length > 0) {
    questionCount = result.rows[0].question_count;
    resetAt = new Date(result.rows[0].reset_at);
    // If window expired, reset
    if (now > resetAt) {
      questionCount = 0;
      resetAt = new Date(now.getTime() + config.windowMs);
    }
  }

  if (questionCount >= config.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt,
      fallbackModel: config.fallback,
    };
  }

  // Upsert row
  await query(
    `INSERT INTO model_rate_limits (user_id, model, question_count, reset_at, updated_at)
     VALUES ($1, $2, 1, $3, NOW())
     ON CONFLICT (user_id, model)
     DO UPDATE SET question_count = CASE WHEN model_rate_limits.reset_at < $3 THEN 1 ELSE model_rate_limits.question_count + 1 END,
                   reset_at = CASE WHEN model_rate_limits.reset_at < $3 THEN $3 ELSE model_rate_limits.reset_at END,
                   updated_at = NOW()`,
    [userId, model, resetAt]
  );

  return {
    allowed: true,
    remaining: config.limit - questionCount - 1,
    resetAt,
    fallbackModel: config.fallback,
  };
}
import { query } from './database';

const TIER_LIMITS: Record<string, { requestsPerMinute: number; concurrent: number }> = {
  free: { requestsPerMinute: 10, concurrent: 2 },
  pro: { requestsPerMinute: 100, concurrent: 10 },
  plus: { requestsPerMinute: 500, concurrent: 25 },
  enterprise: { requestsPerMinute: 10000, concurrent: 50 },
};

export async function checkRateLimit(userId: string, tier: string) {
  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;
  
  try {
    const now = new Date();
    const bucketKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const expiresAt = new Date(now.getTime() + 60000);
    
    // Check per-minute rate limit
    const result = await query(
      `INSERT INTO rate_limit_buckets (user_id, bucket_type, bucket_key, request_count, expires_at)
       VALUES ($1, 'per_minute', $2, 1, $3)
       ON CONFLICT (user_id, bucket_type, bucket_key)
       DO UPDATE SET request_count = rate_limit_buckets.request_count + 1
       RETURNING request_count`,
      [userId, bucketKey, expiresAt]
    );
    
    const requestCount = result.rows[0].request_count;
    
    if (requestCount > limits.requestsPerMinute) {
      return {
        allowed: false,
        limit: limits.requestsPerMinute,
        remaining: 0,
        resetTime: expiresAt.toISOString(),
      };
    }
    
    // Check concurrent requests
    const concurrentResult = await query(
      `SELECT COUNT(*) as count
       FROM inference_requests
       WHERE user_id = $1
       AND status IN ('pending', 'processing')`,
      [userId]
    );
    
    const concurrentCount = parseInt(concurrentResult.rows[0].count);
    
    if (concurrentCount >= limits.concurrent) {
      return {
        allowed: false,
        limit: limits.concurrent,
        remaining: 0,
        resetTime: expiresAt.toISOString(),
      };
    }
    
    return {
      allowed: true,
      limit: limits.requestsPerMinute,
      remaining: limits.requestsPerMinute - requestCount,
      resetTime: expiresAt.toISOString(),
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    return {
      allowed: false,
      limit: 0,
      remaining: 0,
      resetTime: new Date().toISOString(),
    };
  }
}
