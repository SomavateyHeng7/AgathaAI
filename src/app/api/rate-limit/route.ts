import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticateToken } from '@/lib/auth-server';

const TIER_LIMITS: Record<string, { requestsPerMinute: number; concurrent: number }> = {
  free: { requestsPerMinute: 10, concurrent: 2 },
  pro: { requestsPerMinute: 100, concurrent: 10 },
  plus: { requestsPerMinute: 500, concurrent: 25 },
  enterprise: { requestsPerMinute: 10000, concurrent: 50 },
};

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const limits = TIER_LIMITS[user.tier] || TIER_LIMITS.free;
    
    const now = new Date();
    const bucketKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const result = await query(
      `SELECT request_count, expires_at
       FROM rate_limit_buckets
       WHERE user_id = $1 AND bucket_type = 'per_minute' AND bucket_key = $2`,
      [user.id, bucketKey]
    );
    
    const requestCount = result.rows.length > 0 ? result.rows[0].request_count : 0;
    const resetTime = result.rows.length > 0 ? result.rows[0].expires_at : new Date(now.getTime() + 60000);
    
    const concurrentResult = await query(
      `SELECT COUNT(*) as count
       FROM inference_requests
       WHERE user_id = $1 AND status IN ('pending', 'processing')`,
      [user.id]
    );
    
    const concurrentCount = parseInt(concurrentResult.rows[0].count);
    
    return NextResponse.json({
      tier: user.tier,
      requestsPerMinute: limits.requestsPerMinute,
      requestsRemaining: Math.max(0, limits.requestsPerMinute - requestCount),
      resetTime: resetTime,
      concurrentRequests: concurrentCount,
      maxConcurrentRequests: limits.concurrent,
    });
    
  } catch (error) {
    console.error('Get rate limit error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve rate limit info' },
      { status: 500 }
    );
  }
}
