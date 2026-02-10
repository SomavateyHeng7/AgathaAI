import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { query } from './database';

export interface AuthUser {
  id: string;
  email: string;
  tier: string;
}

export async function authenticateToken(request: NextRequest): Promise<AuthUser | null> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    const result = await query(
      'SELECT id, email, subscription_tier, status FROM users WHERE id = $1',
      [decoded.userId]
    );
    
    if (result.rows.length === 0 || result.rows[0].status !== 'active') {
      return null;
    }
    
    const user = result.rows[0];
    
    return {
      id: user.id,
      email: user.email,
      tier: user.subscription_tier,
    };
  } catch (error) {
    return null;
  }
}

export async function authenticateApiKey(request: NextRequest): Promise<AuthUser | null> {
  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey) {
    return null;
  }
  
  try {
    // Get all active API keys
    const result = await query(
      `SELECT ak.id, ak.key_hash, ak.user_id, u.email, u.subscription_tier, u.status
       FROM api_keys ak
       JOIN users u ON ak.user_id = u.id
       WHERE ak.status = 'active'
       AND (ak.expires_at IS NULL OR ak.expires_at > NOW())`
    );
    
    // Find matching key
    for (const row of result.rows) {
      const isMatch = await bcrypt.compare(apiKey, row.key_hash);
      if (isMatch && row.status === 'active') {
        // Update last used
        await query(
          'UPDATE api_keys SET last_used_at = NOW() WHERE id = $1',
          [row.id]
        );
        
        return {
          id: row.user_id,
          email: row.email,
          tier: row.subscription_tier,
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('API key authentication error:', error);
    return null;
  }
}
