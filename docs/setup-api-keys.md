# 🔑 API Keys Setup Guide for AgathaAI

## Step 1: Add Your API Keys

I've created `.env.local` file for you. Now you need to add your 3 API keys:

### Option A: Edit the file directly

```bash
# Open the file in your editor
code .env.local
# or
nano .env.local
# or
vim .env.local
```

Then paste your API keys after the `=` sign:

```env
OPENAI_API_KEY=sk-proj-your-actual-key-here
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
TOGETHER_API_KEY=your-actual-key-here
```

### Option B: Use command line (macOS/Linux)

```bash
# Replace YOUR_KEY_HERE with your actual keys

# Add OpenAI key
echo "OPENAI_API_KEY=YOUR_KEY_HERE" >> .env.local

# Add Anthropic key
echo "ANTHROPIC_API_KEY=YOUR_KEY_HERE" >> .env.local

# Add Together AI key
echo "TOGETHER_API_KEY=YOUR_KEY_HERE" >> .env.local
```

---

## Step 2: Verify Your Keys Format

Make sure your keys look like this:

✅ **OpenAI**: `sk-proj-...` or `sk-...` (starts with sk-)
✅ **Anthropic**: `sk-ant-...` (starts with sk-ant-)
✅ **Together AI**: Usually alphanumeric string

❌ **Don't include**:
- Quotes around the key
- Spaces before or after
- Line breaks in the middle

---

## Step 3: Setup Database

```bash
# Install PostgreSQL if you haven't
# macOS:
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb genai_platform

# Run migrations
npm run db:migrate

# Seed demo data
npm run db:seed
```

---

## Step 4: Install Dependencies

```bash
npm install
```

---

## Step 5: Start the Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 16.1.3
- Local:        http://localhost:3000
```

---

## Step 6: Test Each API

### Test 1: OpenAI (GPT-3.5 Turbo)
1. Go to http://localhost:3000/signup
2. Register: `test@example.com` / `Test123!`
3. Select model: **GPT-3.5 Turbo**
4. Send: "Hello, tell me a joke"
5. Wait 2-5 seconds
6. ✅ Should get a real joke from GPT-3.5!

### Test 2: OpenAI (GPT-4)
1. Select model: **GPT-4**
2. Send: "What is 2+2?"
3. Wait 3-8 seconds
4. ✅ Should get response from GPT-4!

### Test 3: Anthropic (Claude 3 Sonnet)
1. Select model: **Claude 3 Sonnet**
2. Send: "Write a haiku about AI"
3. Wait 2-5 seconds
4. ✅ Should get a haiku from Claude!

### Test 4: Anthropic (Claude 3 Opus)
1. Select model: **Claude 3 Opus**
2. Send: "Explain quantum computing in one sentence"
3. Wait 3-8 seconds
4. ✅ Should get response from Claude Opus!

### Test 5: Together AI (Llama 3)
1. Select model: **Llama 3 70B**
2. Send: "What's the capital of France?"
3. Wait 2-5 seconds
4. ✅ Should get response from Llama!

---

## 🐛 Troubleshooting

### Error: "OpenAI API key not configured"

**Check:**
```bash
# View your .env.local file
cat .env.local | grep OPENAI_API_KEY
```

**Should show:**
```
OPENAI_API_KEY=sk-proj-abc123...
```

**If empty:**
- Edit `.env.local` and add your key
- Restart server: `npm run dev`

### Error: "Invalid API key"

**Possible causes:**
1. Key has extra spaces: `OPENAI_API_KEY= sk-...` ❌
2. Key has quotes: `OPENAI_API_KEY="sk-..."` ❌
3. Key is expired or revoked
4. Key doesn't have credits

**Fix:**
- Remove spaces and quotes
- Verify key in provider dashboard
- Check billing/credits

### Error: "Database connection failed"

**Check PostgreSQL:**
```bash
# Is it running?
pg_isready

# Can you connect?
psql -d genai_platform
```

**Fix:**
```bash
# Start PostgreSQL
brew services start postgresql@14

# Create database if missing
createdb genai_platform
```

### Error: "Rate limit exceeded"

**Cause:** Too many requests to LLM provider

**Fix:**
- Wait 60 seconds
- Check your API usage dashboard
- Upgrade your API plan if needed

---

## 💰 Monitor Your Usage

### OpenAI Dashboard
- URL: https://platform.openai.com/usage
- Check daily usage and costs
- Set spending limits

### Anthropic Dashboard
- URL: https://console.anthropic.com/
- View API usage
- Monitor credits

### Together AI Dashboard
- URL: https://api.together.xyz/settings/billing
- Check usage
- Add credits if needed

---

## 🎯 Quick Commands Reference

```bash
# Start development server
npm run dev

# Reset database (careful!)
npm run db:reset

# Check database
psql genai_platform -c "SELECT COUNT(*) FROM users;"

# View logs
tail -f .next/trace

# Test API endpoint
curl http://localhost:3000/api/rate-limit
```

---

## ✅ Success Checklist

- [ ] `.env.local` file created
- [ ] All 3 API keys added (no spaces, no quotes)
- [ ] PostgreSQL installed and running
- [ ] Database created: `genai_platform`
- [ ] Migrations run: `npm run db:migrate`
- [ ] Seeds loaded: `npm run db:seed`
- [ ] Dependencies installed: `npm install`
- [ ] Server running: `npm run dev`
- [ ] Can register new user
- [ ] Can send message
- [ ] Receives real AI response (not mock)
- [ ] All 5 models working

---

## 🚀 You're Ready!

Once all checkboxes are ✅, your AgathaAI platform is fully operational with real LLM APIs!

**Next Steps:**
- Test all 5 models
- Monitor API costs
- Invite team members
- Deploy to production

**Need help?** Check the browser console (F12) and terminal logs for error messages.
