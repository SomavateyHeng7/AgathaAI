# ⚡ AgathaAI - Quick Start Guide

## 🎯 3-Minute Setup

### 1️⃣ Add Your API Keys (1 min)

```bash
# Open the file
code .env.local

# Add your 3 keys (no quotes, no spaces):
OPENAI_API_KEY=sk-proj-your-key-here
ANTHROPIC_API_KEY=sk-ant-your-key-here
TOGETHER_API_KEY=your-key-here

# Save and close
```

### 2️⃣ Test Your Keys (30 sec)

```bash
npm run test:keys
```

Should show: ✅ All API keys configured!

### 3️⃣ Setup & Start (1.5 min)

```bash
# Install dependencies
npm install

# Setup database
createdb genai_platform
npm run db:migrate
npm run db:seed

# Start the app
npm run dev
```

### 4️⃣ Test It! (30 sec)

1. Open: http://localhost:3000
2. Register: `test@example.com` / `Test123!`
3. Select: **GPT-3.5 Turbo**
4. Send: "Hello!"
5. Get real AI response! 🎉

---

## 📚 Full Documentation

- **ADD-YOUR-API-KEYS-HERE.md** - Simple key setup guide
- **setup-api-keys.md** - Detailed setup with troubleshooting
- **CHAT_INTEGRATION_GUIDE.md** - Complete technical documentation
- **test-api-keys.js** - API key verification script

---

## 🎮 Available Commands

```bash
npm run dev          # Start development server
npm run test:keys    # Test API keys
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed demo data
npm run db:reset     # Reset database
npm run build        # Build for production
npm run start        # Start production server
```

---

## 🤖 Available Models

| Model | Provider | Best For | Cost |
|-------|----------|----------|------|
| GPT-3.5 Turbo | OpenAI | Fast, cheap, general | $ |
| GPT-4 | OpenAI | Complex tasks, coding | $$$ |
| Claude 3 Sonnet | Anthropic | Balanced, creative | $$ |
| Claude 3 Opus | Anthropic | Advanced reasoning | $$$ |
| Llama 3 70B | Together AI | Open source, fast | $ |

---

## 🆘 Quick Troubleshooting

**Keys not working?**
```bash
npm run test:keys
```

**Database error?**
```bash
pg_isready
createdb genai_platform
npm run db:reset
```

**Port 3000 in use?**
```bash
lsof -ti:3000 | xargs kill
npm run dev
```

**Still stuck?**
- Check browser console (F12)
- Check terminal logs
- Read setup-api-keys.md

---

## ✅ Success Checklist

- [ ] API keys added to `.env.local`
- [ ] `npm run test:keys` shows all green ✅
- [ ] Database created and migrated
- [ ] Server running on http://localhost:3000
- [ ] Can register and login
- [ ] Can send message and get AI response

**All checked? You're done! 🚀**

---

## 🎯 What's Next?

- Try all 5 models
- Check API usage dashboards
- Monitor costs
- Read ENTERPRISE_PROPOSAL.md for production deployment
- Customize the UI
- Add more features

**Happy building with AgathaAI! 🤖✨**
