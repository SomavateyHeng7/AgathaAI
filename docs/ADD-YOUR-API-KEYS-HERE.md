# 🔑 Add Your 3 API Keys Here

## Quick Start (3 Steps)

### Step 1: Open the `.env.local` file

```bash
code .env.local
```

Or use any text editor you prefer.

---

### Step 2: Paste Your API Keys

Find these lines in `.env.local` and add your keys:

```env
# OpenAI API Key (for GPT-4, GPT-3.5 Turbo)
OPENAI_API_KEY=paste-your-openai-key-here

# Anthropic API Key (for Claude 3 Opus, Claude 3 Sonnet)
ANTHROPIC_API_KEY=paste-your-anthropic-key-here

# Together AI API Key (for Llama 3 70B)
TOGETHER_API_KEY=paste-your-together-key-here
```

**Important:**
- ✅ No spaces before or after the key
- ✅ No quotes around the key
- ✅ Just paste the key directly after the `=`

**Example:**
```env
OPENAI_API_KEY=sk-proj-abc123xyz789...
ANTHROPIC_API_KEY=sk-ant-api03-xyz789...
TOGETHER_API_KEY=abc123xyz789...
```

---

### Step 3: Test Your Keys

```bash
# Test if keys are configured correctly
node test-api-keys.js
```

You should see:
```
✅ OPENAI_API_KEY - SET (sk-proj-...xyz)
✅ ANTHROPIC_API_KEY - SET (sk-ant-...xyz)
✅ TOGETHER_API_KEY - SET (abc123...xyz)

✓ OpenAI API key is valid!
✓ Anthropic API key is valid!
✓ Together AI API key is valid!

✅ All API keys configured!
```

---

## 🚀 Start the App

Once your keys are added and tested:

```bash
# Install dependencies (first time only)
npm install

# Setup database (first time only)
createdb genai_platform
npm run db:migrate
npm run db:seed

# Start the server
npm run dev
```

Open http://localhost:3000 and start chatting! 🎉

---

## 📝 Which Key Does What?

| API Key | Models Available | Use Case |
|---------|-----------------|----------|
| **OpenAI** | GPT-4, GPT-3.5 Turbo | General purpose, coding, analysis |
| **Anthropic** | Claude 3 Opus, Claude 3 Sonnet | Long context, creative writing |
| **Together AI** | Llama 3 70B | Open source, cost-effective |

---

## 💡 Tips

**Don't have all 3 keys?**
- You can add just 1 or 2 keys
- The app will work with whatever you have
- Models without keys will show an error

**Testing on a budget?**
- Start with OpenAI's GPT-3.5 Turbo (cheapest)
- It costs ~$0.50 per 1M tokens
- Perfect for testing

**Keep your keys safe:**
- Never commit `.env.local` to git (it's already in .gitignore)
- Don't share your keys publicly
- Rotate keys regularly

---

## 🆘 Need Help?

**Keys not working?**
```bash
# Run the test script
node test-api-keys.js
```

**Database issues?**
```bash
# Check if PostgreSQL is running
pg_isready

# Recreate database
dropdb genai_platform
createdb genai_platform
npm run db:migrate
npm run db:seed
```

**Still stuck?**
- Check `setup-api-keys.md` for detailed troubleshooting
- Check `CHAT_INTEGRATION_GUIDE.md` for full documentation
- Look at browser console (F12) for errors

---

## ✅ Checklist

- [ ] Opened `.env.local` file
- [ ] Pasted all 3 API keys
- [ ] Saved the file
- [ ] Ran `node test-api-keys.js` - all green ✅
- [ ] Ran `npm install`
- [ ] Setup database: `npm run db:migrate && npm run db:seed`
- [ ] Started server: `npm run dev`
- [ ] Tested chat at http://localhost:3000

**All done? You're ready to use AgathaAI! 🚀**
