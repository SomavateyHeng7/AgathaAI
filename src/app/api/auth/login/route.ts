import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { query } from '@/lib/database';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = loginSchema.parse(body);
    
    // Get user
    const result = await query(
      `SELECT id, email, password_hash, full_name, subscription_tier, status
       FROM users WHERE email = $1`,
      [data.email]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const user = result.rows[0];
    
    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'Account suspended or deleted' },
        { status: 403 }
      );
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.password_hash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Update last login
    await query(
      'UPDATE users SET last_login_at = NOW() WHERE id = $1',
      [user.id]
    );
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    // Get IP address from headers
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Create session
    const sessionToken = require('crypto').randomBytes(32).toString('hex');
    await query(
      `INSERT INTO user_sessions (user_id, token, ip_address, user_agent, expires_at)
       VALUES ($1, $2, $3, $4, NOW() + INTERVAL '7 days')`,
      [user.id, sessionToken, ipAddress, request.headers.get('user-agent')]
    );
    
    // Audit log
    await query(
      `INSERT INTO audit_logs (user_id, action, resource_type, ip_address)
       VALUES ($1, 'user.login', 'user', $2)`,
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
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
