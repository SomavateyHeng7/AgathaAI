// Mock data for development/demo purposes
import type { User, RateLimitInfo, PromptHistory } from '@/types';

export const mockUser: User = {
  id: 'user_123',
  email: 'architect@enterprise.com',
  tier: 'pro',
  apiKey: 'sk_test_abc123xyz789',
};

export const mockRateLimits: Record<string, RateLimitInfo> = {
  free: {
    tier: 'free',
    requestsPerMinute: 10,
    requestsRemaining: 7,
    resetTime: new Date(Date.now() + 45000),
    concurrentRequests: 1,
    maxConcurrentRequests: 2,
  },
  pro: {
    tier: 'pro',
    requestsPerMinute: 100,
    requestsRemaining: 87,
    resetTime: new Date(Date.now() + 45000),
    concurrentRequests: 3,
    maxConcurrentRequests: 10,
  },
  enterprise: {
    tier: 'enterprise',
    requestsPerMinute: 1000,
    requestsRemaining: 956,
    resetTime: new Date(Date.now() + 45000),
    concurrentRequests: 8,
    maxConcurrentRequests: 50,
  },
};

export const mockHistory: PromptHistory[] = [
  {
    id: '1',
    prompt: 'Explain quantum computing in simple terms',
    response: 'Quantum computing uses quantum mechanics principles...',
    model: 'gpt-4',
    status: 'completed',
    tokensUsed: 156,
    processingTime: 2.3,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    prompt: 'Write a Python function to calculate fibonacci',
    response: 'Here\'s an efficient implementation using memoization...',
    model: 'claude-3-opus',
    status: 'completed',
    tokensUsed: 234,
    processingTime: 1.8,
    createdAt: new Date(Date.now() - 7200000),
  },
];
