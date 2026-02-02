# Migration to Next.js Full-Stack

## ✅ What Changed

The GenAI Platform has been **converted from Express.js backend to Next.js API Routes** for a unified full-stack application.

### Before (Express Backend)
```
Project Structure:
├── src/              # Next.js frontend
└── backend/          # Separate Express server
    ├── src/
    │   ├── routes/
    │   ├── middleware/
    │   └── services/
    └── package.json  # Separate dependencies
```

### After (Next.js Full-Stack)
```
Project Structure:
├── src/
│   ├── app/          # Frontend pages
│   │   └── api/      # Backend API routes ✨
│   ├── components/   # React components
│   └── lib/          # Server utilities ✨
└── package.json      # Single dependency file
```

## 🔄 Migration Summary

### API Routes Created
All Express routes have been converted to Next.js API routes:

| Express Route | Next.js API Route | Status |
|---------------|-------------------|--------|
| `POST /api/v1/auth/register` | `POST /api/auth/register` | ✅ |
| `POST /api/v1/auth/login` | `POST /api/auth/login` | ✅ |
| `POST /api/v1/inference` | `POST /api/inference` | ✅ |
| `GET /api/v1/inference/:id` | `GET /api/inference/[id]` | ✅ |
| `GET /api/v1/inference/:id/result` | `GET /api/inference/[id]/result` | ✅ |
| `GET /api/v1/history` | `GET /api/history` | ✅ |
| `DELETE /api/v1/history/:id` | `DELETE /api/history/[id]` | ✅ |
| `GET /api/v1/rate-limit` | `GET /api/rate-limit` | ✅ |

### Server Utilities Created
Express middleware and services converted to Next.js utilities:

| Express File | Next.js File | Purpose |
|--------------|--------------|---------|
| `backend/src/config/database.ts` | `src/lib/database.ts` | PostgreSQL connection |
| `backend/src/middleware/auth.ts` | `src/lib/auth-server.ts` | Authentication |
| `backend/src/middleware/rateLimit.ts` | `src/lib/rateLimit.ts` | Rate limiting |
| `backend/src/services/llm.ts` | `src/lib/llm.ts` | LLM integration |

## 📦 Dependencies Added

```json
{
  "dependencies": {
    "pg": "^8.11.3",              // PostgreSQL client
    "bcrypt": "^5.1.1",           // Password hashing
    "jsonwebtoken": "^9.0.2",     // JWT authentication
    "zod": "^3.22.4",             // Schema validation
    "openai": "^4.24.1",          // OpenAI SDK
    "@anthropic-ai/sdk": "^0.12.0" // Anthropic SDK
  },
  "devDependencies": {
    "@types/pg": "^8.10.9",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5"
  }
}
```

## 🚀 Setup Instructions

### 1. Install New Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/genai_platform
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
OPENAI_API_KEY=sk-your-key  # Optional
ANTHROPIC_API_KEY=sk-ant-your-key  # Optional
TOGETHER_API_KEY=your-key  # Optional
```

### 3. Setup Database
```bash
# Create database
createdb genai_platform

# Run migrations
npm run db:migrate

# Seed data
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## 🔧 Code Changes Required

### Update API Client
The frontend API client needs to be updated to use the new endpoints:

**Before:**
```typescript
const API_BASE_URL = 'http://localhost:8000/api/v1';
```

**After:**
```typescript
const API_BASE_URL = '/api';  // Relative URL
```

### Update Environment Variables
**Before:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

**After:**
```env
# No longer needed - API routes are on same domain
```

## 📝 Key Differences

### 1. No Separate Server
- **Before**: Run two servers (frontend on 3000, backend on 8000)
- **After**: Single server on port 3000

### 2. Simplified Deployment
- **Before**: Deploy frontend and backend separately
- **After**: Single deployment to Vercel or any Next.js host

### 3. Shared Types
- **Before**: Duplicate types between frontend and backend
- **After**: Share types across the entire application

### 4. API URL
- **Before**: `http://localhost:8000/api/v1/auth/login`
- **After**: `http://localhost:3000/api/auth/login` or `/api/auth/login`

## ✅ Benefits

1. **Simpler Architecture** - One codebase, one server
2. **Easier Deployment** - Deploy to Vercel with one command
3. **Better DX** - Shared types, no CORS issues
4. **Lower Costs** - One server instead of two
5. **Faster Development** - No need to run multiple servers

## 🗑️ What to Remove

The `backend/` folder is no longer needed and can be removed:

```bash
rm -rf backend/
```

All functionality has been moved to:
- `src/app/api/` - API routes
- `src/lib/` - Server utilities

## 🧪 Testing

### Test API Endpoints
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Test123!","tier":"free"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo.free@genai.com","password":"Demo123!"}'
```

### Test Frontend
1. Open http://localhost:3000
2. Sign in with demo user
3. Test chat interface
4. Verify API calls work

## 📚 Documentation

- [NEXTJS_SETUP.md](NEXTJS_SETUP.md) - Complete Next.js setup guide
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## 🎉 Migration Complete!

The platform now runs entirely on Next.js with:
- ✅ All API routes converted
- ✅ All server utilities migrated
- ✅ Database integration working
- ✅ Authentication working
- ✅ Rate limiting working
- ✅ LLM integration working

**Ready to use!** 🚀
