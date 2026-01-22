# GenAI Platform - Deployment Guide

Complete guide for deploying the GenAI Platform to production.

## Architecture Overview

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Next.js   │─────▶│  Express API │─────▶│ PostgreSQL  │
│  Frontend   │      │   Backend    │      │  Database   │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  LLM APIs    │
                     │ OpenAI/etc   │
                     └──────────────┘
```

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Domain name
- SSL certificate
- LLM API keys (OpenAI, Anthropic, Together AI)

## Step 1: Database Setup

### Option A: Managed PostgreSQL (Recommended)
Use managed services like:
- AWS RDS
- Google Cloud SQL
- Azure Database
- Supabase
- Neon

### Option B: Self-hosted PostgreSQL

```bash
# Install PostgreSQL
sudo apt-get install postgresql-14

# Create database
sudo -u postgres createdb genai_platform

# Create user
sudo -u postgres psql
CREATE USER genai_admin WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE genai_platform TO genai_admin;
```

### Run Migrations

```bash
psql -d genai_platform -f database/migrations/001_initial_schema.sql
psql -d genai_platform -f database/seeds/001_subscription_plans.sql
```

## Step 2: Backend Deployment

### Option A: Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel --prod
```

### Option B: AWS EC2

```bash
# SSH to EC2 instance
ssh -i key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd genai-platform/backend

# Install dependencies
npm ci --only=production

# Build
npm run build

# Setup PM2 for process management
npm install -g pm2
pm2 start dist/index.js --name genai-api
pm2 startup
pm2 save
```

### Option C: Docker

```bash
# Build image
docker build -t genai-backend ./backend

# Run container
docker run -d \
  -p 8000:8000 \
  --env-file backend/.env \
  --name genai-api \
  genai-backend
```

### Environment Variables

Create `backend/.env`:

```env
NODE_ENV=production
PORT=8000
DATABASE_URL=postgresql://user:pass@host:5432/genai_platform
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
TOGETHER_API_KEY=your-together-key
FRONTEND_URL=https://your-domain.com
```

## Step 3: Frontend Deployment

### Option A: Vercel (Recommended)

```bash
cd genai-platform
vercel --prod
```

Configure environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1`

### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option C: Self-hosted with Nginx

```bash
# Build Next.js
npm run build

# Start production server
npm start

# Or use PM2
pm2 start npm --name genai-frontend -- start
```

Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Step 4: SSL/TLS Setup

### Using Let's Encrypt (Free)

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d api.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Step 5: DNS Configuration

Point your domain to your servers:

```
A     your-domain.com        → Frontend IP
A     api.your-domain.com    → Backend IP
CNAME www.your-domain.com    → your-domain.com
```

## Step 6: API Keys Setup

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Add to backend `.env`

### Anthropic
1. Go to https://console.anthropic.com/
2. Create API key
3. Add to backend `.env`

### Together AI
1. Go to https://api.together.xyz/
2. Create API key
3. Add to backend `.env`

## Step 7: Payment Integration (Optional)

### Stripe Setup

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:8000/api/v1/webhooks/stripe
```

Add to backend:
```env
STRIPE_SECRET_KEY=sk_live_your-key
STRIPE_WEBHOOK_SECRET=whsec_your-secret
```

## Step 8: Monitoring & Logging

### Option A: Cloud Services
- AWS CloudWatch
- Google Cloud Logging
- Datadog
- New Relic

### Option B: Self-hosted

```bash
# Install PM2 for logs
pm2 install pm2-logrotate

# View logs
pm2 logs genai-api
pm2 logs genai-frontend
```

## Step 9: Backup Strategy

### Database Backups

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump genai_platform > /backups/genai_$DATE.sql
aws s3 cp /backups/genai_$DATE.sql s3://your-backup-bucket/

# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

## Step 10: Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set strong JWT_SECRET (min 32 chars)
- [ ] Use environment variables (never commit secrets)
- [ ] Enable database SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable audit logging
- [ ] Regular security updates
- [ ] Database backups
- [ ] Monitor error logs

## Performance Optimization

### Database
- Enable connection pooling
- Add indexes for frequent queries
- Regular VACUUM and ANALYZE
- Monitor slow queries

### Backend
- Enable compression
- Use Redis for caching
- Load balancing with multiple instances
- CDN for static assets

### Frontend
- Enable Next.js image optimization
- Use CDN for assets
- Enable caching headers
- Minimize bundle size

## Scaling Strategy

### Horizontal Scaling

```
┌─────────────┐
│ Load        │
│ Balancer    │
└──────┬──────┘
       │
   ┌───┴───┬───────┬───────┐
   │       │       │       │
┌──▼──┐ ┌──▼──┐ ┌──▼──┐ ┌──▼──┐
│API 1│ │API 2│ │API 3│ │API 4│
└─────┘ └─────┘ └─────┘ └─────┘
```

### Database Scaling
- Read replicas for queries
- Connection pooling (PgBouncer)
- Partitioning for large tables
- Caching layer (Redis)

## Cost Estimation

### Small Scale (< 1000 users)
- Database: $25/month (managed)
- Backend: $20/month (1 instance)
- Frontend: $0 (Vercel free tier)
- LLM APIs: Pay per use
- **Total: ~$45/month + API costs**

### Medium Scale (1000-10000 users)
- Database: $100/month
- Backend: $100/month (3 instances)
- Frontend: $20/month
- LLM APIs: Pay per use
- **Total: ~$220/month + API costs**

### Large Scale (10000+ users)
- Database: $500/month (HA setup)
- Backend: $500/month (auto-scaling)
- Frontend: $100/month
- LLM APIs: Pay per use
- CDN: $50/month
- **Total: ~$1150/month + API costs**

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL

# Check pool status
SELECT * FROM pg_stat_activity;
```

### API Not Responding
```bash
# Check logs
pm2 logs genai-api

# Restart service
pm2 restart genai-api
```

### High Memory Usage
```bash
# Monitor
pm2 monit

# Increase memory limit
pm2 start dist/index.js --max-memory-restart 1G
```

## Support

For issues:
1. Check logs: `pm2 logs`
2. Review error messages
3. Check database connectivity
4. Verify environment variables
5. Review API key quotas

## Next Steps

1. ✅ Deploy database
2. ✅ Deploy backend
3. ✅ Deploy frontend
4. ✅ Configure DNS
5. ✅ Setup SSL
6. ✅ Add monitoring
7. ✅ Configure backups
8. ✅ Load testing
9. ✅ Security audit
10. ✅ Go live!
