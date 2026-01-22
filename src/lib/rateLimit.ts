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
