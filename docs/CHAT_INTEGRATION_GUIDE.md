# Chat Integration Guide - Making AgathaAI Work with Real LLM APIs

## 🎯 Overview

This guide explains how to integrate real LLM API keys to make the chat interface work with actual AI responses.

---

## ✅ What Was Updated

### 1. Created API Client (`src/lib/api-client.ts`)
- Handles communication with backend API routes
- Submits inference requests
- Polls for results
- Manages authentication headers

### 2. Updated Main Chat Page (`src/app/page.tsx`)
- Integrated real API calls instead of mock responses
- Added error handling
- Implemented polling for async results
- Maps UI model names to API model names

### 3. Updated Auth Library (`src/lib/auth.ts`)
- Stores API key from registration
- Retrieves API key for requests
- Updated login/register functions

---

## 🔑 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Database

```bash
# Create database
createdb genai_platform

# Run migrations
npm run db:migrate

# Seed data (includes demo users)
npm run db:seed
```

### Step 3: Configure Environment Variables

Create `.env.local` in the root directory:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/genai_platform

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# LLM API Keys (add the ones you have)
OPENAI_API_KEY=sk-your-openai-api-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
TOGETHER_API_KEY=your-together-ai-api-key-here
```

### Step 4: Get Your LLM API Keys

#### OpenAI (for GPT-4, GPT-3.5)
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)
4. Add to `.env.local` as `OPENAI_API_KEY`

#### Anthropic (for Claude 3)
1. Go to https://console.anthropic.com/
2. Navigate to API Keys
3. Create a new key
4. Copy the key (starts with `sk-ant-`)
5. Add to `.env.local` as `ANTHROPIC_API_KEY`

#### Together AI (for Llama 3)
1. Go to https://api.together.xyz/
2. Sign up and get API key
3. Copy the key
4. Add to `.env.local` as `TOGETHER_API_KEY`

### Step 5: Start the Application

```bash
npm run dev
```

Open http://localhost:3000

---

## 🧪 Testing the Integration

### Test 1: Register a New User

1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
   - Tier: Free
3. Click "Create Account"
4. You should be redirected to the chat

### Test 2: Send a Message

1. In the chat interface, select a model (e.g., GPT-4)
2. Type a message: "Hello, how are you?"
3. Press Enter or click Send
4. Wait 2-10 seconds for the response
5. You should see a real AI response!

### Test 3: Try Different Models

Test each model to see which API keys are working:

- **GPT-4** - Requires `OPENAI_API_KEY`
- **GPT-3.5 Turbo** - Requires `OPENAI_API_KEY`
- **Claude 3 Opus** - Requires `ANTHROPIC_API_KEY`
- **Claude 3 Sonnet** - Requires `ANTHROPIC_API_KEY`
- **Llama 3 70B** - Requires `TOGETHER_API_KEY`

---

## 🔍 How It Works

### Request Flow

```
1. User types message in chat
   ↓
2. Frontend calls handleSubmit()
   ↓
3. APIClient.submitInference() sends POST to /api/inference
   ↓
4. Backend validates request and creates database record
   ↓
5. Backend enqueues job and returns request ID (202 Accepted)
   ↓
6. Lambda worker processes request asynchronously
   ↓
7. Worker calls LLM provider API (OpenAI/Anthropic/Together)
   ↓
8. Worker stores response in database
   ↓
9. Frontend polls GET /api/inference/:id/result every 2 seconds
   ↓
10. When complete, frontend displays response
```

### Model Mapping

The UI uses friendly names that get mapped to API model names:

```typescript
'GPT-4' → 'gpt-4'
'GPT-3.5 Turbo' → 'gpt-3.5-turbo'
'Claude 3 Opus' → 'claude-3-opus-20240229'
'Claude 3 Sonnet' → 'claude-3-sonnet-20240229'
'Llama 3 70B' → 'meta-llama/Llama-3-70b-chat-hf'
```

---

## 🐛 Troubleshooting

### Error: "No API key found"

**Problem**: User doesn't have an API key stored

**Solution**:
1. Logout and login again
2. Or register a new account
3. The API key is generated during registration

### Error: "OpenAI API key not configured"

**Problem**: Missing `OPENAI_API_KEY` in `.env.local`

**Solution**:
1. Get API key from https://platform.openai.com/api-keys
2. Add to `.env.local`: `OPENAI_API_KEY=sk-your-key`
3. Restart the dev server: `npm run dev`

### Error: "Anthropic API key not configured"

**Problem**: Missing `ANTHROPIC_API_KEY` in `.env.local`

**Solution**:
1. Get API key from https://console.anthropic.com/
2. Add to `.env.local`: `ANTHROPIC_API_KEY=sk-ant-your-key`
3. Restart the dev server

### Error: "Database connection failed"

**Problem**: PostgreSQL not running or wrong connection string

**Solution**:
1. Check PostgreSQL is running: `pg_isready`
2. Verify `DATABASE_URL` in `.env.local`
3. Test connection: `psql $DATABASE_URL`

### Error: "Inference timeout"

**Problem**: LLM API taking too long or not responding

**Solution**:
1. Check your API key is valid
2. Check you have credits/quota remaining
3. Try a different model
4. Check LLM provider status page

### Response is still mock/fake

**Problem**: Using old code or API keys not configured

**Solution**:
1. Make sure you pulled the latest code
2. Verify `.env.local` has API keys
3. Restart dev server: `npm run dev`
4. Clear browser cache and reload

---

## 💰 API Costs

### OpenAI Pricing (as of 2024)
- **GPT-4**: $30/1M input tokens, $60/1M output tokens
- **GPT-3.5 Turbo**: $0.50/1M input tokens, $1.50/1M output tokens

### Anthropic Pricing
- **Claude 3 Opus**: $15/1M input tokens, $75/1M output tokens
- **Claude 3 Sonnet**: $3/1M input tokens, $15/1M output tokens

### Together AI Pricing
- **Llama 3 70B**: ~$0.90/1M tokens

### Cost Estimates
- **Casual use** (100 messages/day): $5-10/month
- **Moderate use** (500 messages/day): $25-50/month
- **Heavy use** (2000 messages/day): $100-200/month

**Tip**: Start with GPT-3.5 Turbo for testing (cheapest option)

---

## 🔒 Security Best Practices

### Never Commit API Keys
```bash
# Make sure .env.local is in .gitignore
echo ".env.local" >> .gitignore
```

### Rotate Keys Regularly
- Rotate API keys every 90 days
- Use different keys for dev/staging/production

### Monitor Usage
- Set up billing alerts in OpenAI/Anthropic dashboards
- Monitor API usage daily
- Set spending limits

### Rate Limiting
- The app has built-in rate limiting per tier
- Free: 10 requests/minute
- Pro: 100 requests/minute
- Plus: 500 requests/minute

---

## 📊 Monitoring

### Check API Usage

**OpenAI**:
- Dashboard: https://platform.openai.com/usage
- View daily usage and costs

**Anthropic**:
- Dashboard: https://console.anthropic.com/
- View API usage

### Check Database

```bash
# Connect to database
psql $DATABASE_URL

# View recent requests
SELECT id, model, status, created_at 
FROM inference_requests 
ORDER BY created_at DESC 
LIMIT 10;

# View user usage
SELECT user_id, COUNT(*) as total_requests 
FROM inference_requests 
GROUP BY user_id;
```

---

## ✅ Success Checklist

- [ ] Database created and migrated
- [ ] `.env.local` configured with API keys
- [ ] Dev server running (`npm run dev`)
- [ ] Can register new user
- [ ] Can login
- [ ] Can send message in chat
- [ ] Receives real AI response (not mock)
- [ ] Can try different models
- [ ] Error messages are helpful

---

## 🎉 You're Done!

Your AgathaAI chat is now integrated with real LLM APIs!

### What's Working:
✅ Real-time chat with AI
✅ Multiple LLM providers
✅ Async processing
✅ Rate limiting
✅ Request history
✅ Error handling

### Next Steps:
- Add more models
- Implement streaming responses
- Add conversation history
- Implement webhooks
- Deploy to production

---

**Need Help?**
- Check the error messages in the browser console
- Check the terminal where `npm run dev` is running
- Review the API documentation in `docs/`
- Test with demo users first

**Happy chatting with AI!** 🤖
