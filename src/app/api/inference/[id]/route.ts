import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticateApiKey } from '@/lib/auth-server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateApiKey(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }
    
    const result = await query(
      `SELECT id, model, prompt, response, status, tokens_prompt, tokens_completion,
              tokens_total, processing_time_ms, error_message, created_at, completed_at
       FROM inference_requests
       WHERE id = $1 AND user_id = $2`,
      [params.id, user.id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
    
  } catch (error) {
    console.error('Get inference error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve inference request' },
      { status: 500 }
    );
  }
}
