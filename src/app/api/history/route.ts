import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticateToken } from '@/lib/auth-server';

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const result = await query(
      `SELECT id, prompt, response, model, status, tokens_total as "tokensUsed",
              processing_time_ms as "processingTime", created_at as "createdAt"
       FROM inference_requests
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [user.id, limit, offset]
    );
    
    return NextResponse.json(result.rows);
    
  } catch (error) {
    console.error('Get history error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve history' },
      { status: 500 }
    );
  }
}
