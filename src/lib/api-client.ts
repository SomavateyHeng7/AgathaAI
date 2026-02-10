// API client for making requests to the backend
import { getCurrentUser } from './auth';

const API_BASE_URL = '/api';

interface InferenceRequest {
  prompt: string;
  model: string;
  parameters?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  };
}

interface InferenceResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  response?: string;
  tokensUsed?: number;
  processingTime?: number;
  createdAt: string;
}

export class APIClient {
  private getAuthHeaders(): HeadersInit {
    const user = getCurrentUser();
    if (!user?.apiKey) {
      throw new Error('No API key found. Please login again.');
    }

    return {
      'Content-Type': 'application/json',
      'X-API-Key': user.apiKey,
    };
  }

  async submitInference(request: InferenceRequest): Promise<InferenceResponse> {
    const response = await fetch(`${API_BASE_URL}/inference`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getInferenceResult(requestId: string): Promise<InferenceResponse> {
    const response = await fetch(`${API_BASE_URL}/inference/${requestId}/result`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 202) {
        // Still processing
        return response.json();
      }
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async pollForResult(requestId: string, maxAttempts = 30): Promise<string> {
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

      const result = await this.getInferenceResult(requestId);

      if (result.status === 'completed') {
        return result.response || 'No response received';
      }

      if (result.status === 'failed') {
        throw new Error('Inference failed');
      }

      // Continue polling if pending or processing
    }

    throw new Error('Inference timeout - please try again');
  }
}

export const apiClient = new APIClient();
