import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { query } from '@/lib/database';

const registerSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  tier: z.enum(['free', 'pro', 'plus', 'enterprise']).default('free'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);
    
    // Check if user exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [data.email]
    );
    
    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);
    
    // Create user
    const result = await query(
      `INSERT INTO users (email, password_hash, full_name, subscription_tier)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, full_name, subscription_tier`,
      [data.email, passwordHash, data.name, data.tier]
    );
    
    const user = result.rows[0];
    
    // Generate API key
    const apiKeyValue = generateApiKey();
    const apiKeyHash = await bcrypt.hash(apiKeyValue, 10);
    const keyPrefix = apiKeyValue.substring(0, 8);
    const keySuffix = apiKeyValue.substring(apiKeyValue.length - 4);
    
    await query(
      `INSERT INTO api_keys (user_id, key_hash, key_prefix, key_suffix, name)
       VALUES ($1, $2, $3, $4, 'Default API Key')`,
      [user.id, apiKeyHash, keyPrefix, keySuffix]
    );
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    // Audit log
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    await query(
      `INSERT INTO audit_logs (user_id, action, resource_type, ip_address)
       VALUES ($1, 'user.registered', 'user', $2)`,
      [user.id, ipAddress]
    );
    
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        tier: user.subscription_tier,
      },
      apiKey: apiKeyValue,
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'sk_';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}
