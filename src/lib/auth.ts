// Authentication utilities
import type { User } from '@/types';

export const AUTH_TOKEN_KEY = 'authToken';
export const USER_EMAIL_KEY = 'userEmail';
export const USER_NAME_KEY = 'userName';
export const USER_TIER_KEY = 'userTier';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getCurrentUser(): Partial<User> | null {
  if (typeof window === 'undefined') return null;
  
  const email = localStorage.getItem(USER_EMAIL_KEY);
  const tier = localStorage.getItem(USER_TIER_KEY) as 'free' | 'pro' | 'enterprise';
  const apiKey = localStorage.getItem('apiKey');
  
  if (!email) return null;
  
  return {
    email,
    tier: tier || 'free',
    apiKey: apiKey || '',
  };
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(USER_TIER_KEY);
  
  window.location.href = '/signin';
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Call the actual API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || 'Invalid credentials' };
    }

    const data = await response.json();
    
    // Store auth data
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(USER_EMAIL_KEY, data.user.email);
    localStorage.setItem(USER_TIER_KEY, data.user.tier);
    if (data.user.name) {
      localStorage.setItem(USER_NAME_KEY, data.user.name);
    }
    
    // For existing users, we need to get their API key
    // In a real app, this would be returned from the login endpoint
    // For now, we'll generate a temporary one
    if (!localStorage.getItem('apiKey')) {
      localStorage.setItem('apiKey', `sk_${Math.random().toString(36).substring(2, 15)}`);
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

export async function register(
  name: string,
  email: string,
  password: string,
  tier: 'free' | 'pro' | 'enterprise'
): Promise<{ success: boolean; error?: string }> {
  try {
    // Call the actual API
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, tier }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || 'Registration failed' };
    }

    const data = await response.json();
    
    // Store auth data
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(USER_EMAIL_KEY, data.user.email);
    localStorage.setItem(USER_NAME_KEY, data.user.name);
    localStorage.setItem(USER_TIER_KEY, data.user.tier);
    
    // Store API key for making inference requests
    if (data.apiKey) {
      localStorage.setItem('apiKey', data.apiKey);
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}
