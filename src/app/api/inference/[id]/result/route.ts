import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { authenticateApiKey } from '@/lib/auth-server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateApiKey(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    const result = await query(
      `SELECT id, response, status, tokens_total, processing_time_ms, completed_at
       FROM inference_requests
       WHERE id = $1 AND user_id = $2`,
      [id, user.id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }
    
    const request_data = result.rows[0];
    
    if (request_data.status === 'pending' || request_data.status === 'processing') {
      return NextResponse.json(
        { status: request_data.status, message: 'Processing' },
        { status: 202 }
      );
    }
    
    if (request_data.status === 'failed') {
      return NextResponse.json(
        { error: 'Inference failed' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      id: request_data.id,
      response: request_data.response,
      tokensUsed: request_data.tokens_total,
      processingTime: request_data.processing_time_ms,
      completedAt: request_data.completed_at,
    });
    
  } catch (error) {
    console.error('Get inference result error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve inference result' },
      { status: 500 }
    );
  }
}
