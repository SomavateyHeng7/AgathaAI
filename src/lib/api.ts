// API client for LLM Gateway
import type { InferenceRequest, InferenceResponse, RateLimitInfo, PromptHistory } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export class APIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async submitInference(prompt: string, model: string, parameters?: any): Promise<InferenceRequest> {
    return this.fetch('/inference', {
      method: 'POST',
      body: JSON.stringify({ prompt, model, parameters }),
    });
  }

  async getInferenceStatus(requestId: string): Promise<InferenceRequest> {
    return this.fetch(`/inference/${requestId}`);
  }

  async getInferenceResult(requestId: string): Promise<InferenceResponse> {
    return this.fetch(`/inference/${requestId}/result`);
  }

  async getRateLimitInfo(): Promise<RateLimitInfo> {
    return this.fetch('/rate-limit');
  }

  async getHistory(limit: number = 50, offset: number = 0): Promise<PromptHistory[]> {
    return this.fetch(`/history?limit=${limit}&offset=${offset}`);
  }

  async deleteHistoryItem(id: string): Promise<void> {
    return this.fetch(`/history/${id}`, { method: 'DELETE' });
  }
}
