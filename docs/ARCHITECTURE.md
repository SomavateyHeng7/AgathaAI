# GenAI Platform - Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │  Mobile App  │  │  API Client  │          │
│  │  (Next.js)   │  │   (Future)   │  │   (cURL)     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
│         └──────────────────┴──────────────────┘                  │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                             │ HTTPS
                             │
┌────────────────────────────┼──────────────────────────────────────┐
│                    PRESENTATION LAYER                             │
├────────────────────────────┼──────────────────────────────────────┤
│                            │                                       │
│  ┌────────────────────────▼────────────────────────┐             │
│  │         Next.js 15 Frontend (Port 3000)         │             │
│  ├─────────────────────────────────────────────────┤             │
│  │  • Landing Page      • Features Page            │             │
│  │  • Pricing Page      • Auth Pages               │             │
│  │  • Chat Interface    • Legal Pages              │             │
│  │  • Protected Routes  • Responsive Design        │             │
│  └────────────────────────┬────────────────────────┘             │
│                            │                                       │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                             │ REST API
                             │
┌────────────────────────────┼──────────────────────────────────────┐
│                      API GATEWAY LAYER                            │
├────────────────────────────┼──────────────────────────────────────┤
│                            │                                       │
│  ┌────────────────────────▼────────────────────────┐             │
│  │        Express.js Backend (Port 8000)           │             │
│  ├─────────────────────────────────────────────────┤             │
│  │                  Middleware                      │             │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │             │
│  │  │   CORS   │ │  Helmet  │ │   Auth   │        │             │
│  │  └──────────┘ └──────────┘ └──────────┘        │             │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │             │
│  │  │   Rate   │ │   Zod    │ │  Audit   │        │             │
│  │  │  Limit   │ │Validation│ │   Log    │        │             │
│  │  └──────────┘ └──────────┘ └──────────┘        │             │
│  ├─────────────────────────────────────────────────┤             │
│  │                   Routes                         │             │
│  │  • /auth/register    • /auth/login              │             │
│  │  • /inference        • /history                 │             │
│  │  • /rate-limit       • /health                  │             │
│  └────────────────────────┬────────────────────────┘             │
│                            │                                       │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
┌───────────────▼──────────┐  ┌──────────▼──────────────────────────┐
│     DATABASE LAYER       │  │      LLM PROVIDER LAYER             │
├──────────────────────────┤  ├─────────────────────────────────────┤
│                          │  │                                     │
│  ┌──────────────────┐   │  │  ┌──────────┐  ┌──────────┐        │
│  │   PostgreSQL 14  │   │  │  │  OpenAI  │  │Anthropic │        │
│  ├──────────────────┤   │  │  │   API    │  │   API    │        │
│  │ • users          │   │  │  └──────────┘  └──────────┘        │
│  │ • api_keys       │   │  │  ┌──────────┐                      │
│  │ • subscriptions  │   │  │  │ Together │                      │
│  │ • inference_req  │   │  │  │   AI     │                      │
│  │ • rate_limits    │   │  │  └──────────┘                      │
│  │ • audit_logs     │   │  │                                     │
│  │ • 15+ tables     │   │  │  • GPT-4, GPT-3.5                  │
│  └──────────────────┘   │  │  • Claude 3 (Opus, Sonnet, Haiku)  │
│                          │  │  • Llama 3 (70B, 8B)               │
└──────────────────────────┘  └─────────────────────────────────────┘
```

## Data Flow

### 1. User Registration Flow
```
User → Frontend → POST /auth/register → Backend
                                          ↓
                                    Validate Input (Zod)
                                          ↓
                                    Hash Password (bcrypt)
                                          ↓
                                    Insert User (PostgreSQL)
                                          ↓
                                    Generate API Key
                                          ↓
                                    Generate JWT Token
                                          ↓
                                    Audit Log
                                          ↓
Frontend ← Response (token, user, apiKey) ← Backend
```

### 2. Inference Request Flow
```
User → Frontend → POST /inference → Backend
                                      ↓
                                Authenticate API Key
                                      ↓
                                Check Rate Limit
                                      ↓
                                Create Request Record
                                      ↓
                                Return Request ID (202)
                                      ↓
                    ┌─────────────────┴─────────────────┐
                    │     Async Processing              │
                    │  ┌─────────────────────────────┐  │
                    │  │ Update Status: Processing   │  │
                    │  └──────────┬──────────────────┘  │
                    │             ↓                      │
                    │  ┌─────────────────────────────┐  │
                    │  │ Call LLM Provider API       │  │
                    │  │ (OpenAI/Anthropic/Together) │  │
                    │  └──────────┬──────────────────┘  │
                    │             ↓                      │
                    │  ┌─────────────────────────────┐  │
                    │  │ Store Response & Tokens     │  │
                    │  └──────────┬──────────────────┘  │
                    │             ↓                      │
                    │  ┌─────────────────────────────┐  │
                    │  │ Update Usage Statistics     │  │
                    │  └──────────┬──────────────────┘  │
                    │             ↓                      │
                    │  ┌─────────────────────────────┐  │
                    │  │ Update Status: Completed    │  │
                    │  └─────────────────────────────┘  │
                    └───────────────────────────────────┘
                                      ↓
User ← Frontend ← GET /inference/:id/result ← Backend
```

### 3. Rate Limiting Flow
```
Request → Authenticate → Extract User ID & Tier
                              ↓
                    Get Tier Limits from Config
                              ↓
                    Check Current Minute Bucket
                              ↓
                    ┌─────────┴─────────┐
                    │                   │
            Limit Exceeded?        Within Limit?
                    │                   │
                    ↓                   ↓
            Return 429 Error    Check Concurrent Requests
                                        ↓
                                ┌───────┴───────┐
                                │               │
                        Limit Exceeded?   Within Limit?
                                │               │
                                ↓               ↓
                        Return 429 Error   Allow Request
                                                ↓
                                        Increment Counter
                                                ↓
                                        Process Request
```

## Component Architecture

### Frontend Components

```
src/
├── app/
│   ├── page.tsx                    # Main chat page (protected)
│   ├── layout.tsx                  # Root layout
│   ├── landing/page.tsx            # Landing page
│   ├── features/page.tsx           # Features showcase
│   ├── pricing/page.tsx            # Pricing tiers
│   ├── signin/page.tsx             # Sign in
│   ├── signup/page.tsx             # Sign up
│   ├── forgot-password/page.tsx    # Password reset
│   ├── terms/page.tsx              # Terms of Service
│   └── privacy/page.tsx            # Privacy Policy
│
├── components/
│   ├── ChatInterface.tsx           # Main chat UI
│   │   ├── Model selector
│   │   ├── Message list
│   │   ├── Input field
│   │   └── Send button
│   │
│   ├── Sidebar.tsx                 # Navigation sidebar
│   │   ├── Logo
│   │   ├── New chat button
│   │   ├── History list
│   │   └── User menu
│   │
│   ├── Header.tsx                  # Page header
│   │   ├── Logo
│   │   ├── Navigation links
│   │   └── Auth buttons
│   │
│   ├── HistoryPanel.tsx            # Request history
│   │   ├── Filter controls
│   │   ├── History items
│   │   └── Delete actions
│   │
│   ├── InferencePanel.tsx          # Inference status
│   │   ├── Active requests
│   │   ├── Status indicators
│   │   └── Progress bars
│   │
│   ├── RateLimitCard.tsx           # Rate limit display
│   │   ├── Current usage
│   │   ├── Limits
│   │   └── Reset timer
│   │
│   ├── StatsCard.tsx               # Usage statistics
│   │   ├── Total requests
│   │   ├── Success rate
│   │   ├── Avg response time
│   │   └── Token usage
│   │
│   ├── ApiKeyManager.tsx           # API key management
│   │   ├── Key display (masked)
│   │   ├── Copy button
│   │   └── Regenerate option
│   │
│   └── ProtectedRoute.tsx          # Auth wrapper
│       ├── Check authentication
│       ├── Redirect if needed
│       └── Render children
│
└── lib/
    ├── auth.ts                     # Auth utilities
    │   ├── isAuthenticated()
    │   ├── login()
    │   ├── register()
    │   └── logout()
    │
    ├── api.ts                      # API client
    │   ├── submitInference()
    │   ├── getInferenceStatus()
    │   ├── getHistory()
    │   └── getRateLimitInfo()
    │
    └── mockData.ts                 # Mock data for dev
```

### Backend Architecture

```
backend/src/
├── config/
│   ├── index.ts                    # Configuration
│   │   ├── Environment variables
│   │   ├── API keys
│   │   └── Settings
│   │
│   └── database.ts                 # Database connection
│       ├── Connection pool
│       ├── Query helper
│       └── Health check
│
├── middleware/
│   ├── auth.ts                     # Authentication
│   │   ├── authenticateToken()    # JWT validation
│   │   └── authenticateApiKey()   # API key validation
│   │
│   └── rateLimit.ts                # Rate limiting
│       ├── Check tier limits
│       ├── Update buckets
│       └── Enforce limits
│
├── routes/
│   ├── auth.ts                     # Auth endpoints
│   │   ├── POST /register
│   │   └── POST /login
│   │
│   ├── inference.ts                # Inference endpoints
│   │   ├── POST /inference
│   │   ├── GET /inference/:id
│   │   └── GET /inference/:id/result
│   │
│   ├── history.ts                  # History endpoints
│   │   ├── GET /history
│   │   └── DELETE /history/:id
│   │
│   └── rateLimit.ts                # Rate limit endpoint
│       └── GET /rate-limit
│
├── services/
│   └── llm.ts                      # LLM integration
│       ├── processInference()
│       ├── callOpenAI()
│       ├── callAnthropic()
│       ├── callTogether()
│       └── updateUsageStatistics()
│
└── index.ts                        # Main server
    ├── Express setup
    ├── Middleware registration
    ├── Route registration
    └── Error handling
```

## Database Schema

### Core Tables

```
users
├── id (UUID, PK)
├── email (VARCHAR, UNIQUE)
├── password_hash (VARCHAR)
├── subscription_tier (VARCHAR)
├── status (VARCHAR)
└── timestamps

api_keys
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── key_hash (VARCHAR)
├── key_prefix (VARCHAR)
├── key_suffix (VARCHAR)
├── status (VARCHAR)
└── timestamps

subscription_plans
├── id (UUID, PK)
├── name (VARCHAR, UNIQUE)
├── price_monthly (DECIMAL)
├── requests_per_minute (INTEGER)
├── concurrent_requests (INTEGER)
├── features (JSONB)
└── timestamps

inference_requests
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── model (VARCHAR)
├── prompt (TEXT)
├── response (TEXT)
├── status (VARCHAR)
├── tokens_* (INTEGER)
├── processing_time_ms (INTEGER)
└── timestamps

rate_limit_buckets
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── bucket_type (VARCHAR)
├── bucket_key (VARCHAR)
├── request_count (INTEGER)
└── expires_at (TIMESTAMP)

audit_logs
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── action (VARCHAR)
├── resource_type (VARCHAR)
├── details (JSONB)
└── created_at (TIMESTAMP)
```

## Security Architecture

### Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                   Authentication                         │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Web App (JWT)              API Client (API Key)         │
│       │                            │                      │
│       ├─ POST /auth/login          ├─ Use API Key        │
│       │                            │                      │
│       ├─ Receive JWT Token         ├─ X-API-Key header   │
│       │                            │                      │
│       ├─ Store in localStorage     ├─ Hash & compare     │
│       │                            │                      │
│       ├─ Send in Authorization     ├─ Validate status    │
│       │   header                   │                      │
│       │                            │                      │
│       └─ Verify & decode           └─ Load user context  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Security Layers

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Network Security                              │
│  • HTTPS/TLS encryption                                 │
│  • CORS configuration                                   │
│  • Rate limiting                                        │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Application Security                          │
│  • Helmet.js headers                                    │
│  • Input validation (Zod)                               │
│  • SQL injection prevention                             │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Authentication & Authorization                │
│  • JWT token validation                                 │
│  • API key hashing                                      │
│  • Session management                                   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 4: Data Security                                 │
│  • Password hashing (bcrypt)                            │
│  • Encrypted connections                                │
│  • Audit logging                                        │
└─────────────────────────────────────────────────────────┘
```

## Scalability Architecture

### Horizontal Scaling

```
                    ┌──────────────┐
                    │ Load Balancer│
                    │   (Nginx)    │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
   │ API     │       │ API     │       │ API     │
   │ Server 1│       │ Server 2│       │ Server 3│
   └────┬────┘       └────┬────┘       └────┬────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼───────┐
                    │  PostgreSQL  │
                    │  (Primary)   │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
   │ Read    │       │ Read    │       │ Read    │
   │ Replica │       │ Replica │       │ Replica │
   └─────────┘       └─────────┘       └─────────┘
```

### Caching Strategy

```
Request → Check Redis Cache
              │
              ├─ Cache Hit → Return Cached Data
              │
              └─ Cache Miss → Query Database
                                  │
                                  ├─ Store in Cache
                                  │
                                  └─ Return Data
```

## Monitoring & Observability

```
┌─────────────────────────────────────────────────────────┐
│                    Monitoring Stack                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Application Logs          Database Metrics              │
│  ├─ Winston logger         ├─ Connection pool            │
│  ├─ Error tracking         ├─ Query performance          │
│  └─ Audit logs             └─ Slow queries               │
│                                                           │
│  API Metrics               Infrastructure                │
│  ├─ Request rate           ├─ CPU usage                  │
│  ├─ Response time          ├─ Memory usage               │
│  ├─ Error rate             └─ Disk I/O                   │
│  └─ Success rate                                         │
│                                                           │
│  Business Metrics          Security                      │
│  ├─ User signups           ├─ Failed logins              │
│  ├─ Inference requests     ├─ Rate limit hits            │
│  ├─ Token usage            └─ Suspicious activity        │
│  └─ Revenue                                              │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────────┐
│                      CDN (CloudFlare)                    │
│                    Static Assets                         │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                   Frontend (Vercel)                      │
│                   Next.js Application                    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                Backend API (AWS/Docker)                  │
│                Express.js Servers                        │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼──────┐  ┌─────▼─────┐  ┌──────▼──────┐
│ PostgreSQL   │  │   Redis   │  │ LLM APIs    │
│   (RDS)      │  │  (Cache)  │  │ (External)  │
└──────────────┘  └───────────┘  └─────────────┘
```

---

**Last Updated**: January 21, 2026  
**Version**: 1.0.0
