## 🚦 Model Rate Limiting

For chat models, users are limited per model as follows:

- **GPT-4**: 10 questions per 2 hours. After reaching the limit, users are automatically switched to **GPT-3.5 Turbo**.
- **GPT-3.5 Turbo**: 30 questions per 2 hours. After reaching the limit, users must wait for the 2-hour window to reset.

If both limits are exceeded, the user must wait for the respective reset window. Limits are tracked per user and per model.
# AgathaAI - LLM-as-a-Service

Enterprise-grade platform for accessing multiple Large Language Models through a unified API gateway with subscription-based rate limiting and comprehensive management features.

## 🚀 Features

### Core Capabilities
- ✅ **Multi-Model Support** - OpenAI (GPT-4, GPT-4o, GPT-3.5), Google Gemini (Pro, 1.5 Pro, 1.5 Flash), DeepSeek (Chat, Coder)
- ✅ **Rate Limiting** - Tier-based requests per minute and concurrent request limits
- **Authentication** - Google OAuth and credentials provider
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
- ✅ **Google OAuth** - Sign in with Google authentication

## 📋 Quick Start

**Get running in 5 minutes!**

```bash
# 1. Install dependencies
pnpm install

# 2. Setup database
createdb agatha_ai
pnpm run db:migrate
pnpm run db:seed

# 3. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL, NEXTAUTH_SECRET, OPENAI_API_KEY, and GEMINI_API_KEY

# 4. Start server
pnpm run dev

# 5. Open http://localhost:3000
# Login with: demo.free@genai.com / Demo123!
```

See [docs/NEXTJS_SETUP.md](docs/NEXTJS_SETUP.md) for detailed setup instructions.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Full-Stack Application                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Frontend (React)              Backend (API Routes)              │
│  ├── src/app/                  ├── src/app/api/                 │
│  │   ├── landing/              │   ├── auth/                    │
│  │   ├── features/             │   ├── inference/               │
│  │   ├── pricing/              │   ├── history/                 │
│  │   └── ...                   │   └── rate-limit/              │
│  │                              │                                │
│  └── src/components/           └── src/lib/                     │
│      ├── ChatInterface         │   ├── database.ts              │
│      ├── Sidebar               │   ├── auth-server.ts           │
│      └── ...                   │   ├── rateLimit.ts             │
│                                 │   └── llm.ts                   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                         │
                         ▼
                ┌────────────────────┐
                │  PostgreSQL 14     │
                │  15+ Tables        │
                └────────────────────┘
                         │
                         ▼
                ┌────────────────────┐
                │  LLM Providers     │
                │  OpenAI            │
                │  Google Gemini     │
                └────────────────────┘
```

## � Subscription Tiers
<img width="950" height="313" alt="Screenshot 2569-02-11 at 20 16 56" src="https://github.com/user-attachments/assets/e9756627-caca-4cff-aaf2-0c1ccca751ae" />

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.3 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4
- **UI Library**: React 19.2.3
- **State Management**: Zustand 5.0
- **Icons**: Lucide React
- **Theme**: Next-themes (dark/light mode)

### Backend
- **Framework**: Next.js 16.1.3 API Routes
- **Language**: TypeScript 5.9.3
- **Database**: PostgreSQL 14+ with pg driver
- **Authentication**: NextAuth 4.24 + bcrypt
- **Validation**: Zod 3.22
- **Session Management**: JWT tokens

### LLM Integration
- **OpenAI SDK 4.24** - GPT-4, GPT-4o, GPT-3.5 Turbo
- **Google Generative AI 0.21** - Gemini 2.5 Flash, Gemini 2.0 Flash

## 📁 Project Structure

```
agatha-ai/
├── src/                      # Next.js full-stack application
│   ├── app/                  # App Router pages & API routes
│   │   ├── api/             # API endpoints (auth, chat, inference, history)
│   │   ├── chat/            # Chat interface page
│   │   ├── features/        # Features page
│   │   ├── pricing/         # Pricing page
│   │   ├── landing/         # Landing page
│   │   └── ...              # Other pages
│   ├── components/          # React components
│   │   ├── ChatInterface.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ui/              # UI components
│   ├── lib/                 # Utilities & server logic
│   │   ├── auth-config.ts   # NextAuth configuration
│   │   ├── database.ts      # PostgreSQL client
│   │   ├── llm.ts           # LLM integration
│   │   └── rateLimit.ts     # Rate limiting logic
│   ├── store/               # Zustand state management
│   └── types/               # TypeScript types
├── database/                # PostgreSQL
│   ├── migrations/          # Schema migrations
│   ├── seeds/               # Seed data
│   └── schema.sql           # Complete schema
├── docs/                    # Documentation
└── public/                  # Static assets
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (credentials)
- `GET /api/auth/me` - Get current user info
- NextAuth endpoints at `/api/auth/*` - Google OAuth & session management

### Chat (NextAuth session required)
- `POST /api/chat` - Send chat message and get response
- `GET /api/chat/conversations` - Get user's conversations
- `GET /api/chat/conversations/[id]` - Get conversation details
- `DELETE /api/chat/conversations/[id]` - Delete conversation

### Subscriptions (NextAuth session required)
- `POST /api/stripe/create-checkout` - Create Stripe checkout session
- `POST /api/stripe/create-portal` - Create customer portal session
- `POST /api/stripe/webhook` - Handle Stripe webhook events

### Inference (API Key required)
- `POST /api/inference` - Submit inference request
- `GET /api/inference/[id]` - Get request status
- `GET /api/inference/[id]/result` - Get inference result

### History (JWT required)
- `GET /api/history` - Get request history
- `DELETE /api/history/[id]` - Delete history item

### Rate Limiting (JWT required)
- `GET /api/rate-limit` - Get current rate limit status

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ NextAuth authentication (credentials + Google OAuth)
- ✅ JWT token authentication for API routes
- ✅ API key hashing and validation
- ✅ SQL injection prevention (parameterized queries)
- ✅ Session management with secure cookies
- ✅ Rate limiting per subscription tier
- ✅ Audit logging for all actions
- ✅ Input validation with Zod
- ✅ Password hashing with bcrypt (10 rounds)

## 📚 Documentation

All documentation is in the `docs/` folder:

### 🎯 Enterprise Proposal (NEW!)
- **[PROPOSAL_SUMMARY.md](PROPOSAL_SUMMARY.md)** - Proposal overview ⭐
- **[docs/ENTERPRISE_PROPOSAL.md](docs/ENTERPRISE_PROPOSAL.md)** - Complete architecture proposal
- **[docs/ARCHITECTURE_DIAGRAMS.md](docs/ARCHITECTURE_DIAGRAMS.md)** - Visual architecture diagrams

### Essential Guides
- **[docs/NEXTJS_SETUP.md](docs/NEXTJS_SETUP.md)** - Complete Next.js setup guide
- **[docs/STRIPE_SETUP_GUIDE.md](docs/STRIPE_SETUP_GUIDE.md)** - Stripe integration setup ⭐
- **[docs/SUBSCRIPTION_FEATURE.md](docs/SUBSCRIPTION_FEATURE.md)** - Subscription feature docs ⭐
- **[docs/NEXTJS_MIGRATION.md](docs/NEXTJS_MIGRATION.md)** - Express to Next.js migration
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design and data flow
- **[docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** - Production deployment
- **[docs/GO_LIVE_CHECKLIST.md](docs/GO_LIVE_CHECKLIST.md)** - Launch checklist

### Reference
- **[docs/INDEX.md](docs/INDEX.md)** - Complete documentation index
- **[docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md)** - Feature status
- **[docs/FEATURE_CHECKLIST.md](docs/FEATURE_CHECKLIST.md)** - Feature verification
- **[docs/IMPLEMENTATION_SUMMARY.md](docs/IMPLEMENTATION_SUMMARY.md)** - Complete summary
- **[database/README.md](database/README.md)** - Database setup


## 📈 Monitoring & Analytics

- Health check endpoint: `GET /health`
- Real-time usage statistics
- Request/response logging
- Error tracking
- Audit logs for security
- Database connection pooling

## 💰 Cost Estimation
<img width="614" height="485" alt="Screenshot 2569-02-11 at 20 15 34" src="https://github.com/user-attachments/assets/23a42faa-56fd-4409-8c67-5737eff2413e" />


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
1. Check the [Quick Start Guide](docs/QUICK_START.md)
2. Review [Documentation](docs/PROJECT_STATUS.md)
3. Check existing issues
4. Create a new issue with details

## 🎯 Roadmap

### ✅ Completed
- Full frontend UI with dark/light theme
- Complete Next.js API routes
- PostgreSQL database schema (15+ tables)
- NextAuth authentication with Google OAuth
- Stripe subscription management (Pro $29/mo, Enterprise $299/mo)
- Payment processing with checkout and customer portal
- Webhook handling for subscription events
- Multi-LLM integration (OpenAI, Gemini, DeepSeek)
- Conversation history with persistence
- Rate limiting per tier
- Usage tracking and analytics
- Responsive design

### 🔄 In Progress
- Email verification service
- Admin dashboard

### 📋 Planned
- Team collaboration
- Custom model fine-tuning
- Prompt templates
- SDK libraries (Python, Node.js)
- Mobile app

---

**Built with ❤️ for Enterprise GenAI**
