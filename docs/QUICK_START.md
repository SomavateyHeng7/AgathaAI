# Quick Start Guide

Get the GenAI Platform running locally in 5 minutes.

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## Step 1: Clone & Install (1 min)

```bash
# Clone repository
git clone your-repo-url
cd genai-platform

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

## Step 2: Setup Database (2 min)

```bash
# Create database
createdb genai_platform

# Run migrations
psql -d genai_platform -f database/migrations/001_initial_schema.sql

# Seed data (includes demo users)
psql -d genai_platform -f database/seeds/001_subscription_plans.sql
psql -d genai_platform -f database/seeds/002_demo_users.sql
```

## Step 3: Configure Environment (1 min)

```bash
# Backend environment
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/genai_platform
JWT_SECRET=your-secret-key-min-32-characters-long
```

Optional (for real LLM responses):
```env
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key
TOGETHER_API_KEY=your-key
```

## Step 4: Start Servers (1 min)

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd ..
npm run dev
```

## Step 5: Test It Out! 🎉

1. Open http://localhost:3000
2. Click "Sign In"
3. Use demo credentials:
   - Email: `demo.free@genai.com`
   - Password: `Demo123!`
4. Start chatting!

## Demo Users

All demo users have password: `Demo123!`

| Email | Tier | Requests/Min | Concurrent |
|-------|------|--------------|------------|
| demo.free@genai.com | Free | 10 | 2 |
| demo.pro@genai.com | Pro | 100 | 10 |
| demo.plus@genai.com | Plus | 500 | 25 |
| demo.enterprise@genai.com | Enterprise | 10,000 | 50 |

## What's Working?

✅ **Without LLM API Keys** (Mock Mode):
- User registration & login
- Chat interface
- Rate limiting
- History tracking
- All UI features
- Mock LLM responses

✅ **With LLM API Keys** (Production Mode):
- Everything above +
- Real OpenAI responses (GPT-4, GPT-3.5)
- Real Anthropic responses (Claude 3)
- Real Together AI responses (Llama 3)

## API Testing

### Register New User
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!",
    "tier": "free"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo.free@genai.com",
    "password": "Demo123!"
  }'
```

### Submit Inference (use API key from registration)
```bash
curl -X POST http://localhost:8000/api/v1/inference \
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
```

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Check database exists
psql -l | grep genai_platform
```

### Port Already in Use
```bash
# Frontend (3000)
lsof -ti:3000 | xargs kill -9

# Backend (8000)
lsof -ti:8000 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Same for backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Explore the UI
2. ✅ Test different subscription tiers
3. ✅ Try the API endpoints
4. ✅ Add LLM API keys for real responses
5. ✅ Read the full documentation
6. ✅ Deploy to production

## Documentation

- [Project Status](PROJECT_STATUS.md) - Complete feature list
- [Backend API](backend/README.md) - API documentation
- [Database](database/README.md) - Database schema
- [Deployment](DEPLOYMENT_GUIDE.md) - Production deployment

## Support

Having issues? Check:
1. PostgreSQL is running
2. Database is created and migrated
3. Environment variables are set
4. Ports 3000 and 8000 are available
5. Node.js version is 18+

## What's Next?

- Add your LLM API keys for real responses
- Customize the UI
- Add payment integration (Stripe)
- Setup email service
- Deploy to production
- Add monitoring

**Happy coding! 🚀**
