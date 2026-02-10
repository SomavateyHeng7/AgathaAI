// Core types for LLM-as-a-Service Platform

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  email: string;
  tier: SubscriptionTier;
  apiKey: string;
}

export interface RateLimitInfo {
  tier: SubscriptionTier;
  requestsPerMinute: number;
  requestsRemaining: number;
  resetTime: Date;
  concurrentRequests: number;
  maxConcurrentRequests: number;
}

export interface InferenceRequest {
  id: string;
  prompt: string;
  model: string;
  parameters?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

export interface InferenceResponse {
  id: string;
  requestId: string;
  response: string;
  tokensUsed: number;
  processingTime: number;
  model: string;
  createdAt: Date;
}

export interface PromptHistory {
  id: string;
  prompt: string;
  response: string;
  model: string;
  status: string;
  tokensUsed: number;
  processingTime: number;
  createdAt: Date;
}
