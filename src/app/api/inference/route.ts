import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/database';
import { authenticateApiKey } from '@/lib/auth-server';
import { checkRateLimit } from '@/lib/rateLimit';
import { processInference } from '@/lib/llm';

const inferenceSchema = z.object({
  prompt: z.string().min(1).max(10000),
  model: z.string(),
  parameters: z.object({
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().min(1).max(32768).optional(),
    topP: z.number().min(0).max(1).optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const user = await authenticateApiKey(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }
    
    // Check rate limit
    const rateLimitResult = await checkRateLimit(user.id, user.tier);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          limit: rateLimitResult.limit,
          remaining: 0,
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 }
      );
    }
    
    // Validate input
    const body = await request.json();
    const data = inferenceSchema.parse(body);
    
    // Create inference request
    const result = await query(
      `INSERT INTO inference_requests (user_id, model, prompt, status, parameters)
       VALUES ($1, $2, $3, 'pending', $4)
       RETURNING id, created_at`,
      [user.id, data.model, data.prompt, JSON.stringify(data.parameters || {})]
    );
    
    const requestId = result.rows[0].id;
    
    // Process inference asynchronously
    processInference(requestId, user.id, data.model, data.prompt, data.parameters || {})
      .catch(error => console.error('Inference processing error:', error));
    
    return NextResponse.json({
      id: requestId,
      status: 'pending',
      createdAt: result.rows[0].created_at,
    }, { status: 202 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Inference submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inference request' },
      { status: 500 }
    );
  }
}
