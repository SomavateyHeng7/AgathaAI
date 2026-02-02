# AgathaAI Platform - Official API Reference

**Document Type**: API Documentation  
**Version**: 1.0  
**API Version**: v1  
**Date**: February 2, 2026  
**Status**: Official Release

---

## Base URL

```
Production: https://api.agathaai.com/api/v1
Staging: https://staging-api.agathaai.com/api/v1
```

## Authentication

All API requests require authentication using either JWT tokens or API keys.

### JWT Authentication

```http
Authorization: Bearer <jwt_token>
```

### API Key Authentication

```http
X-API-Key: <api_key>
```

---

## Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "tier": "free"
}
```

**Response** (201 Created):
```json
{
  "user": {
    "id": "user_abc123",
    "email": "john@example.com",
    "tier": "free"
  },
  "token": "eyJhbGciOiJSUzI1NiIs...",
  "apiKey": "ak_live_abc123xyz789"
}
```

#### Login

```http
POST /auth/login
```

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "user": {
    "id": "user_abc123",
    "email": "john@example.com",
    "tier": "free"
  },
  "token": "eyJhbGciOiJSUzI1NiIs...",
  "apiKey": "ak_live_abc123xyz789"
}
```



---

### Inference

#### Submit Inference Request

```http
POST /inference
```

**Request Body**:
```json
{
  "prompt": "Explain quantum computing in simple terms",
  "model": "gpt-3.5-turbo",
  "parameters": {
    "temperature": 0.7,
    "maxTokens": 1000,
    "topP": 1.0
  }
}
```

**Response** (202 Accepted):
```json
{
  "id": "req_abc123",
  "status": "pending",
  "createdAt": "2026-02-02T10:00:00Z"
}
```

**Supported Models**:
- `gpt-4` - OpenAI GPT-4
- `gpt-3.5-turbo` - OpenAI GPT-3.5 Turbo
- `gpt-4o` - OpenAI GPT-4o
- `gemini-pro` - Google Gemini Pro
- `gemini-1.5-pro` - Google Gemini 1.5 Pro
- `deepseek-chat` - DeepSeek Chat
- `deepseek-coder` - DeepSeek Coder

#### Get Inference Result

```http
GET /inference/:id/result
```

**Response** (200 OK - Completed):
```json
{
  "id": "req_abc123",
  "status": "completed",
  "response": "Quantum computing uses quantum mechanics...",
  "tokensUsed": 245,
  "processingTime": 3500,
  "model": "gpt-3.5-turbo",
  "createdAt": "2026-02-02T10:00:00Z",
  "completedAt": "2026-02-02T10:00:03Z"
}
```

**Response** (202 Accepted - Processing):
```json
{
  "id": "req_abc123",
  "status": "processing",
  "createdAt": "2026-02-02T10:00:00Z"
}
```

**Response** (200 OK - Failed):
```json
{
  "id": "req_abc123",
  "status": "failed",
  "error": "Rate limit exceeded",
  "createdAt": "2026-02-02T10:00:00Z",
  "completedAt": "2026-02-02T10:00:01Z"
}
```



---

### History

#### Get Request History

```http
GET /history?limit=20&offset=0
```

**Query Parameters**:
- `limit` (optional): Number of results (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `model` (optional): Filter by model
- `status` (optional): Filter by status (pending, completed, failed)

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "req_abc123",
      "prompt": "Explain quantum computing...",
      "response": "Quantum computing uses...",
      "model": "gpt-3.5-turbo",
      "status": "completed",
      "tokensUsed": 245,
      "processingTime": 3500,
      "createdAt": "2026-02-02T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

#### Delete History Item

```http
DELETE /history/:id
```

**Response** (204 No Content)

---

### Rate Limiting

#### Check Rate Limit Status

```http
GET /rate-limit
```

**Response** (200 OK):
```json
{
  "tier": "free",
  "limit": 10,
  "remaining": 7,
  "resetAt": "2026-02-02T10:01:00Z",
  "current": 3
}
```

**Rate Limit Headers** (included in all responses):
```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1738497660
```



---

### Usage Statistics

#### Get Usage Statistics

```http
GET /usage?period=month
```

**Query Parameters**:
- `period` (optional): day, week, month, year (default: month)

**Response** (200 OK):
```json
{
  "period": "month",
  "totalRequests": 1250,
  "successfulRequests": 1230,
  "failedRequests": 20,
  "totalTokens": 125000,
  "averageResponseTime": 3200,
  "modelBreakdown": {
    "gpt-3.5-turbo": 800,
    "gpt-4": 300,
    "gemini-pro": 150
  },
  "costEstimate": {
    "amount": 45.50,
    "currency": "USD"
  }
}
```

---

## Error Responses

### Error Format

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again in 60 seconds.",
    "details": {
      "limit": 10,
      "resetAt": "2026-02-02T10:01:00Z"
    }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded |
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |
| `LLM_PROVIDER_ERROR` | 502 | LLM provider error |

---

## Rate Limits

| Tier | Requests/Minute | Tokens/Month | Concurrent Requests |
|------|-----------------|--------------|---------------------|
| Free | 10 | 100,000 | 2 |
| Pro | 100 | 1,000,000 | 10 |
| Plus | 500 | 10,000,000 | 50 |
| Enterprise | 10,000 | Unlimited | 500 |



---

## Code Examples

### cURL

```bash
# Submit inference request
curl -X POST https://api.agathaai.com/api/v1/inference \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain quantum computing",
    "model": "gpt-3.5-turbo",
    "parameters": {
      "temperature": 0.7,
      "maxTokens": 1000
    }
  }'

# Get result
curl https://api.agathaai.com/api/v1/inference/req_abc123/result \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### JavaScript/TypeScript

```typescript
// Using fetch
const response = await fetch('https://api.agathaai.com/api/v1/inference', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Explain quantum computing',
    model: 'gpt-3.5-turbo',
    parameters: {
      temperature: 0.7,
      maxTokens: 1000,
    },
  }),
});

const data = await response.json();
console.log('Request ID:', data.id);

// Poll for result
const pollResult = async (requestId: string) => {
  while (true) {
    const result = await fetch(
      `https://api.agathaai.com/api/v1/inference/${requestId}/result`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );
    
    const data = await result.json();
    
    if (data.status === 'completed') {
      return data.response;
    }
    
    if (data.status === 'failed') {
      throw new Error(data.error);
    }
    
    // Wait 2 seconds before polling again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
};
```

### Python

```python
import requests
import time

# Submit inference request
response = requests.post(
    'https://api.agathaai.com/api/v1/inference',
    headers={'Authorization': f'Bearer {token}'},
    json={
        'prompt': 'Explain quantum computing',
        'model': 'gpt-3.5-turbo',
        'parameters': {
            'temperature': 0.7,
            'maxTokens': 1000
        }
    }
)

request_id = response.json()['id']

# Poll for result
while True:
    result = requests.get(
        f'https://api.agathaai.com/api/v1/inference/{request_id}/result',
        headers={'Authorization': f'Bearer {token}'}
    )
    
    data = result.json()
    
    if data['status'] == 'completed':
        print(data['response'])
        break
    
    if data['status'] == 'failed':
        raise Exception(data['error'])
    
    time.sleep(2)
```

---

## Webhooks (Coming Soon)

Subscribe to events for real-time notifications:

- `inference.completed` - Inference request completed
- `inference.failed` - Inference request failed
- `rate_limit.exceeded` - Rate limit exceeded
- `subscription.updated` - Subscription tier changed

---

## SDKs

Official SDKs available:

- **JavaScript/TypeScript**: `npm install @agathaai/sdk`
- **Python**: `pip install agathaai`
- **Go**: `go get github.com/agathaai/go-sdk`

---

**Document Classification**: Public - API Documentation  
**Maintained by**: API Team  
**Last Updated**: February 2, 2026  
**Version**: 1.0

