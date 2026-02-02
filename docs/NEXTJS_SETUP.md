# Next.js Full-Stack Setup Guide

The GenAI Platform now uses **Next.js API Routes** for the backend instead of a separate Express server.

## 🏗️ Architecture

```
Next.js Application
├── Frontend (React Components)
│   ├── src/app/              # Pages
│   └── src/components/       # Components
│
└── Backend (API Routes)
    ├── src/app/api/auth/     # Authentication endpoints
    ├── src/app/api/inference/# Inference endpoints
    ├── src/app/api/history/  # History endpoints
    ├── src/app/api/rate-limit/# Rate limit endpoint
    └── src/lib/              # Server utilities
        ├── database.ts       # PostgreSQL connection
        ├── auth-server.ts    # Server-side auth
        ├── rateLimit.ts      # Rate limiting
        └── llm.ts            # LLM integration
```

## 📁 API Routes Structure

```
src/app/api/
├── auth/
│   ├── register/route.ts     # POST /api/auth/register
│   └── login/route.ts        # POST /api/auth/login
│
├── inference/
│   ├── route.ts              # POST /api/inference
│   ├── [id]/route.ts         # GET /api/inference/:id
│   └── [id]/result/route.ts  # GET /api/inference/:id/result
│
├── history/
│   ├── route.ts              # GET /api/history
│   └── [id]/route.ts         # DELETE /api/history/:id
│
└── rate-limit/
    └── route.ts              # GET /api/rate-limit
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

New dependencies added:
- `pg` - PostgreSQL client
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `zod` - Schema validation
- `openai` - OpenAI SDK
- `@anthropic-ai/sdk` - Anthropic SDK

### 2. Setup Database
```bash
# Create database
createdb genai_platform

# Run migrations
npm run db:migrate

# Seed data
npm run db:seed
```

### 3. Configure Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/genai_platform
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Optional (for real LLM responses)
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key
TOGETHER_API_KEY=your-key
```

### 4. Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## 🔌 API Endpoints

All endpoints are now at `/api/*`:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Inference (API Key required)
- `POST /api/inference` - Submit inference request
- `GET /api/inference/:id` - Get request status
- `GET /api/inference/:id/result` - Get inference result

### History (JWT required)
- `GET /api/history` - Get request history
- `DELETE /api/history/:id` - Delete history item

### Rate Limiting (JWT required)
- `GET /api/rate-limit` - Get current rate limit status

## 🧪 Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!",
    "tier": "free"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo.free@genai.com",
    "password": "Demo123!"
  }'

# Submit Inference (use API key from registration)
curl -X POST http://localhost:3000/api/inference \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "prompt": "What is machine learning?",
    "model": "gpt-4",
    "parameters": {
      "temperature": 0.7,
      "maxTokens": 1000
    }
  }'

# Get History (use JWT token from login)
curl http://localhost:3000/api/history \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📝 Key Differences from Express

### 1. Route Handlers
**Express:**
```typescript
app.post('/api/auth/login', async (req, res) => {
  // handler
});
```

**Next.js:**
```typescript
export async function POST(request: NextRequest) {
  // handler
  return NextResponse.json(data);
}
```

### 2. Request/Response
**Express:**
```typescript
const body = req.body;
res.json({ data });
```

**Next.js:**
```typescript
const body = await request.json();
return NextResponse.json({ data });
```

### 3. Middleware
**Express:**
```typescript
app.use(middleware);
```

**Next.js:**
```typescript
// Call directly in route handler
const user = await authenticateToken(request);
```

### 4. Dynamic Routes
**Express:**
```typescript
app.get('/api/inference/:id', handler);
```

**Next.js:**
```typescript
// File: src/app/api/inference/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
}
```

## 🔧 Server-Side Utilities

### Database (`src/lib/database.ts`)
```typescript
import { query } from '@/lib/database';

const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
```

### Authentication (`src/lib/auth-server.ts`)
```typescript
import { authenticateToken, authenticateApiKey } from '@/lib/auth-server';

// JWT authentication
const user = await authenticateToken(request);

// API key authentication
const user = await authenticateApiKey(request);
```

### Rate Limiting (`src/lib/rateLimit.ts`)
```typescript
import { checkRateLimit } from '@/lib/rateLimit';

const result = await checkRateLimit(userId, tier);
if (!result.allowed) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

### LLM Integration (`src/lib/llm.ts`)
```typescript
import { processInference } from '@/lib/llm';

// Process asynchronously
processInference(requestId, userId, model, prompt, parameters)
  .catch(error => console.error(error));
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

Environment variables in Vercel dashboard:
- `DATABASE_URL`
- `JWT_SECRET`
- `OPENAI_API_KEY` (optional)
- `ANTHROPIC_API_KEY` (optional)
- `TOGETHER_API_KEY` (optional)

### Docker
```bash
docker build -t genai-platform .
docker run -p 3000:3000 --env-file .env.local genai-platform
```

### Self-hosted
```bash
npm run build
npm start
```

## 📊 Benefits of Next.js Full-Stack

✅ **Single Codebase** - Frontend and backend in one project
✅ **Simplified Deployment** - Deploy to Vercel with one command
✅ **Better DX** - Shared types between frontend and backend
✅ **Automatic API Routes** - File-based routing
✅ **Edge Runtime** - Optional edge deployment for low latency
✅ **Built-in Optimization** - Automatic code splitting and optimization

## 🔄 Migration from Express

The separate Express backend (`backend/` folder) is no longer needed. All functionality has been moved to Next.js API routes:

| Express | Next.js |
|---------|---------|
| `backend/src/routes/auth.ts` | `src/app/api/auth/*/route.ts` |
| `backend/src/routes/inference.ts` | `src/app/api/inference/*/route.ts` |
| `backend/src/routes/history.ts` | `src/app/api/history/*/route.ts` |
| `backend/src/middleware/auth.ts` | `src/lib/auth-server.ts` |
| `backend/src/services/llm.ts` | `src/lib/llm.ts` |
| `backend/src/config/database.ts` | `src/lib/database.ts` |

## 📚 Documentation

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

---

**Ready to use!** The platform now runs entirely on Next.js with API routes for the backend. 🚀
