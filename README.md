# AgathaAI - LLM-as-a-Service Platform

Enterprise-grade platform for accessing multiple Large Language Models through a unified chat interface with intelligent rate limiting and subscription management.

## 🚀 Features

### Core Capabilities
- ✅ **Multi-Model Support** - OpenAI (GPT-4, GPT-4o, GPT-3.5 Turbo), Google Gemini (2.5 Flash, 2.0 Flash)
- ✅ **Intelligent Model Rate Limiting** - Per-model question limits with automatic fallback
- ✅ **Subscription Management** - Stripe-powered upgrades from Free to Pro ($29/mo) or Enterprise ($299/mo)
- ✅ **Payment Processing** - Secure checkout, customer portal, webhook handling
- ✅ **Conversation History** - Full chat history with persistence across sessions
- ✅ **Authentication** - NextAuth with Google OAuth and credentials provider
- ✅ **Usage Tracking** - Token counting and usage statistics per conversation
- ✅ **Real-time Chat** - Instant responses with loading states

### User Interface
- ✅ **ChatGPT-style UI** - Modern chat interface with dark/light mode support
- ✅ **Collapsible Sidebar** - Recent conversations with delete functionality
- ✅ **Model Selector** - Easy switching between available AI models
- ✅ **Rate Limit Notifications** - Visual alerts when limits are reached
- ✅ **Subscription Page** - Beautiful pricing cards with upgrade flow
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Theme Toggle** - Dark/Light mode with system preference detection

## 🚦 Model Rate Limiting

For chat models, users are limited per model as follows:

- **GPT-4**: 10 questions per 2 hours. After reaching the limit, users are automatically switched to **GPT-3.5 Turbo**.
- **GPT-3.5 Turbo**: 30 questions per 2 hours. After reaching the limit, users must wait for the 2-hour window to reset.

If both limits are exceeded, the user must wait for the respective reset window. Limits are tracked per user and per model in the `model_rate_limits` table.

## 📋 Quick Start

**Get running in 5 minutes!**

```bash
# 1. Install dependencies
npm install

# 2. Setup database
createdb agatha_ai
psql $DATABASE_URL -f database/schema.sql
psql $DATABASE_URL -f database/migrations/002_chat_tables.sql
psql $DATABASE_URL -f database/migrations/003_add_stripe_customer_id.sql

# 3. Configure environment
cp .env.example .env
# Edit .env with your:
# - DATABASE_URL
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL
# - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET
# - OPENAI_API_KEY (optional)
# - GEMINI_API_KEY (optional)
# - STRIPE_SECRET_KEY (optional)

# 4. Start server
npm run dev

# 5. Open http://localhost:3000
```

## 🏗️ Architecture

<img width="602" height="460" alt="Screenshot 2569-02-12 at 12 15 41" src="https://github.com/user-attachments/assets/8bdd9ea3-f04c-45a8-af9f-e6fd9baf3007" />


## 💳 Business Model

<img width="945" height="307" alt="Screenshot 2569-02-12 at 12 15 03" src="https://github.com/user-attachments/assets/cadf4992-2db4-4433-a29f-6deea5681fb1" />


##Cost Estimation
<img width="622" height="487" alt="Screenshot 2569-02-12 at 12 17 44" src="https://github.com/user-attachments/assets/25f2317f-a695-4567-ab7c-e0487bcf62d5" />



## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.3 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4
- **UI Library**: React 19.2.3
- **State Management**: Zustand 5.0
- **Theme**: next-themes (dark/light mode)

### Backend
- **Framework**: Next.js 16.1.3 API Routes
- **Language**: TypeScript 5.9.3
- **Database**: PostgreSQL 14+ with pg driver
- **Authentication**: NextAuth 4.24 (Google OAuth + Credentials)
- **Payments**: Stripe 20.3.0
- **Password Hashing**: bcrypt 5.1.1

### LLM Integration
- **OpenAI SDK 4.24** - GPT-4, GPT-4o, GPT-3.5 Turbo
- **Google Generative AI 0.21** - Gemini 2.5 Flash, Gemini 2.0 Flash

## 📁 Project Structure

```
agatha-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── auth/          # Authentication (NextAuth)
│   │   │   ├── chat/          # Chat endpoints
│   │   │   └── stripe/        # Payment webhooks
│   │   ├── chat/              # Main chat page
│   │   ├── subscribe/         # Subscription management
│   │   ├── signin/            # Sign in page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ChatInterface.tsx  # Main chat UI
│   │   ├── Sidebar.tsx        # Conversation sidebar
│   │   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   │   └── ui/                # UI components
│   ├── lib/                   # Server utilities
│   │   ├── auth-config.ts     # NextAuth configuration
│   │   ├── database.ts        # PostgreSQL client
│   │   ├── llm.ts             # LLM integration
│   │   └── rateLimit.ts       # Rate limiting logic
│   ├── store/                 # Zustand stores
│   └── types/                 # TypeScript types
├── database/
│   ├── schema.sql             # Main database schema
│   ├── migrations/            # Schema migrations
│   │   ├── 002_chat_tables.sql
│   │   └── 003_add_stripe_customer_id.sql
│   └── seeds/                 # Seed data
├── docs/                      # Documentation
└── public/                    # Static assets
```

## 🔑 API Endpoints

### Authentication (NextAuth)
- `POST /api/auth/signin` - Sign in with credentials or Google
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/callback/google` - Google OAuth callback

### Chat (Session Required)
- `POST /api/chat` - Send message and get AI response
  - Checks model rate limits
  - Auto-fallback from GPT-4 to GPT-3.5 if limit exceeded
  - Creates or updates conversation
  - Tracks token usage
- `GET /api/chat/conversations` - Get user's conversations
- `GET /api/chat/conversations/[id]` - Get conversation with messages
- `DELETE /api/chat/conversations/[id]` - Delete conversation

## 🔒 Security Features
- ✅ **Google OAuth** - Social authentication
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **Rate Limiting** - Per-user, per-model limits
- ✅ **Stripe Webhook Verification** - Signature validation
- ✅ **Environment Variables** - Sensitive data protection

## 🎯 Key Features Explained

### 1. Intelligent Rate Limiting

The platform implements two types of rate limiting:

**Tier-Based Limits** (for API/inference endpoints):
- Free: 10 requests/minute, 2 concurrent
- Pro: 100 requests/minute, 10 concurrent
- Enterprise: 10,000 requests/minute, 500 concurrent

**Model-Specific Limits** (for chat):
- GPT-4: 10 questions per 2 hours → auto-fallback to GPT-3.5
- GPT-3.5 Turbo: 30 questions per 2 hours → must wait

### 2. Conversation Management

- Conversations are automatically created on first message
- Title is generated from first message (first 100 chars)
- Messages are stored with role (user/assistant)
- Token usage is tracked per message
- Conversations can be loaded and continued
- Delete functionality with confirmation dialog

### 3. Stripe Integration

- Checkout flow for Pro ($29/mo) and Enterprise ($299/mo)
- Customer portal for subscription management
- Webhook handling for subscription events
- Automatic tier updates in database
- Invoice tracking

### 4. Theme Support

- Dark mode (default)
- Light mode
- System preference detection
- Smooth transitions
- Persisted preference

## 🧪 Testing

### Test LLM Integration
```bash
# Test API keys
npm run test:keys

# Test LLM and history
npm run test:llm
```

### Manual Testing Checklist
- [ ] Sign in with Google OAuth
- [ ] Sign in with email/password
- [ ] Send message with GPT-3.5
- [ ] Send message with GPT-4
- [ ] Hit GPT-4 rate limit (10 messages)
- [ ] Verify auto-fallback to GPT-3.5
- [ ] Hit GPT-3.5 rate limit (30 messages)
- [ ] Verify rate limit notification appears
- [ ] Create new conversation
- [ ] Load existing conversation
- [ ] Delete conversation
- [ ] Toggle dark/light mode
- [ ] Upgrade to Pro plan
- [ ] Manage subscription in portal

## 🚀 Deployment

### Environment Variables Required

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://yourdomain.com

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# LLM Providers (at least one required)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...

# Stripe (optional, for subscriptions)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...
```

### Deployment Steps

1. **Database Setup**
   ```bash
   psql $DATABASE_URL -f database/schema.sql
   psql $DATABASE_URL -f database/migrations/002_chat_tables.sql
   psql $DATABASE_URL -f database/migrations/003_add_stripe_customer_id.sql
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Start Production Server**
   ```bash
   npm start
   ```

### Recommended Platforms
- **Vercel** - Optimized for Next.js (recommended)
- **Railway** - Easy PostgreSQL + Next.js deployment
- **DigitalOcean App Platform** - Full control
- **AWS/GCP/Azure** - Enterprise deployments

## 💰 Cost Estimation

### Development
- ✅ All code complete and ready

### Production (Monthly)
- **Database**: $25-100 (managed PostgreSQL)
- **Hosting**: $0-50 (Vercel free tier or paid)
- **LLM API Costs**: Variable (pay per use)
  - OpenAI GPT-4: ~$0.03 per 1K tokens
  - OpenAI GPT-3.5: ~$0.002 per 1K tokens
  - Google Gemini: Free tier available
- **Stripe Fees**: 2.9% + $0.30 per transaction

**Total**: ~$25-150/month + LLM usage

## 🤝 Contributing

This is an enterprise project. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues or questions:
1. Check the [Documentation](docs/)
2. Review [Complete Function List](docs/COMPLETE_FUNCTION_LIST.md)
3. Check existing issues
4. Create a new issue with details

## 🎯 Roadmap

### ✅ Completed
- Full chat interface with dark/light theme
- Google OAuth Authentication
- Multi-model LLM integration (OpenAI, Gemini)
- Intelligent model rate limiting with auto-fallback
- Conversation history with persistence
- Stripe subscription management
- Payment processing with webhooks
- Rate limit notifications
- Responsive design
- Theme toggle

---

**Built with ❤️ for Enterprise GenAI**

**Version**: 1.0.0  
**Last Updated**: February 5, 2026  
