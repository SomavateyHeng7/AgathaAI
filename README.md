# GenAI Platform - LLM-as-a-Service

Enterprise-grade platform for accessing multiple Large Language Models through a unified API gateway with subscription-based rate limiting and comprehensive management features.

## 🚀 Features

### Core Capabilities
- ✅ **Multi-Model Support** - OpenAI (GPT-4), Anthropic (Claude 3), Meta (Llama 3)
- ✅ **Subscription Tiers** - Free, Pro, Plus, Enterprise with different rate limits
- ✅ **Rate Limiting** - Tier-based requests per minute and concurrent request limits
- ✅ **Authentication** - JWT tokens and API keys for secure access
- ✅ **Request History** - Full prompt/response history with retention policies
- ✅ **Usage Analytics** - Real-time statistics and usage tracking
- ✅ **Async Processing** - Non-blocking inference request handling

### User Interface
- ✅ **ChatGPT-style UI** - Modern dark theme chat interface
- ✅ **Real-time Updates** - Live message streaming and status updates
- ✅ **History Management** - Browse, search, and delete past conversations
- ✅ **Model Selection** - Easy switching between different LLM providers
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

## 📋 Quick Start

**Get running in 5 minutes!**

```bash
# 1. Install dependencies
npm install

# 2. Setup database
createdb genai_platform
npm run db:migrate
npm run db:seed

# 3. Configure environment
cp .env.local.example .env.local
# Edit .env.local with your DATABASE_URL and JWT_SECRET

# 4. Start server
npm run dev

# 5. Open http://localhost:3000
# Login with: demo.free@genai.com / Demo123!
```

See [NEXTJS_SETUP.md](NEXTJS_SETUP.md) for detailed setup instructions.

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
                │  OpenAI/Anthropic  │
                │  Together AI       │
                └────────────────────┘
```

## 📊 Subscription Tiers

| Tier | Price | Requests/Min | Concurrent | History | Models |
|------|-------|--------------|------------|---------|--------|
| **Free** | $0 | 10 | 2 | 7 days | GPT-3.5 |
| **Pro** | $49/mo | 100 | 10 | 30 days | GPT-4, Claude Sonnet |
| **Plus** | $99/mo | 500 | 25 | 90 days | All models + API access |
| **Enterprise** | Custom | 10,000 | 50 | Unlimited | All + custom models |

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Library**: React 19

### Backend
- **Framework**: Next.js 16 API Routes
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **Authentication**: JWT + bcrypt
- **Validation**: Zod

### LLM Integration
- **OpenAI SDK** - GPT-4, GPT-3.5
- **Anthropic SDK** - Claude 3 (Opus, Sonnet, Haiku)
- **Together AI API** - Llama 3 (70B, 8B)

## 📁 Project Structure

```
genai-platform/
├── src/                      # Next.js frontend
│   ├── app/                  # Pages (landing, chat, auth, etc.)
│   ├── components/           # React components
│   ├── lib/                  # Utilities (auth, api client)
│   └── types/                # TypeScript types
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── config/          # Configuration & database
│   │   ├── middleware/      # Auth & rate limiting
│   │   ├── routes/          # API endpoints
│   │   └── services/        # LLM integration
│   └── package.json
├── database/                 # PostgreSQL
│   ├── migrations/          # Schema migrations
│   ├── seeds/               # Seed data
│   └── schema.sql           # Complete schema
└── docs/                     # Documentation
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

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
- ✅ JWT token authentication
- ✅ API key hashing and validation
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Rate limiting per tier
- ✅ Audit logging for all actions
- ✅ Input validation with Zod

## 📚 Documentation

All documentation is in the `docs/` folder:

### 🎯 Enterprise Proposal (NEW!)
- **[PROPOSAL_SUMMARY.md](PROPOSAL_SUMMARY.md)** - Proposal overview ⭐
- **[docs/ENTERPRISE_PROPOSAL.md](docs/ENTERPRISE_PROPOSAL.md)** - Complete architecture proposal
- **[docs/ARCHITECTURE_DIAGRAMS.md](docs/ARCHITECTURE_DIAGRAMS.md)** - Visual architecture diagrams

### Essential Guides
- **[docs/NEXTJS_SETUP.md](docs/NEXTJS_SETUP.md)** - Complete Next.js setup guide
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

## 🧪 Demo Users

All demo users have password: `Demo123!`

- `demo.free@genai.com` - Free tier (10 req/min)
- `demo.pro@genai.com` - Pro tier (100 req/min)
- `demo.plus@genai.com` - Plus tier (500 req/min)
- `demo.enterprise@genai.com` - Enterprise tier (10,000 req/min)

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete production deployment instructions.

### Quick Deploy Options

**Vercel (Recommended)**
```bash
vercel --prod
```

**Docker**
```bash
docker-compose up -d
```

**AWS/GCP/Azure**
See deployment guide for detailed instructions.

## 📈 Monitoring & Analytics

- Health check endpoint: `GET /health`
- Real-time usage statistics
- Request/response logging
- Error tracking
- Audit logs for security
- Database connection pooling

## 💰 Cost Estimation

### Development
- ✅ All code complete and ready

### Production (Monthly)
- Database: $25-500 (based on scale)
- Backend hosting: $20-500 (based on scale)
- Frontend hosting: $0-100 (Vercel free tier available)
- LLM APIs: Pay per use (variable)

**Total: ~$45-1150/month + LLM API costs**

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
1. Check the [Quick Start Guide](QUICK_START.md)
2. Review [Documentation](PROJECT_STATUS.md)
3. Check existing issues
4. Create a new issue with details

## 🎯 Roadmap

### ✅ Completed
- Full frontend UI
- Complete backend API
- Database schema
- Authentication system
- Multi-LLM integration
- Rate limiting
- Usage tracking

### 🔄 In Progress
- Payment integration (Stripe)
- Email service
- Admin dashboard

### 📋 Planned
- Team collaboration
- Custom model fine-tuning
- Prompt templates
- SDK libraries (Python, Node.js)
- Mobile app

---

**Built with ❤️ for Enterprise GenAI**

Ready to deploy? Start with the [Quick Start Guide](QUICK_START.md)!
