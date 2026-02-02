# Database Setup Guide

## Overview
PostgreSQL database schema for GenAI Platform LLM-as-a-Service.

## Prerequisites
- PostgreSQL 14 or higher
- `uuid-ossp` extension
- `pgcrypto` extension

## Quick Start

### 1. Create Database
```bash
createdb genai_platform
```

### 2. Run Migrations
```bash
psql -d genai_platform -f database/migrations/001_initial_schema.sql
```

### 3. Seed Data
```bash
psql -d genai_platform -f database/seeds/001_subscription_plans.sql
psql -d genai_platform -f database/seeds/002_demo_users.sql
```

## Demo Users
All demo users have password: `Demo123!`

- `demo.free@genai.com` - Free tier
- `demo.pro@genai.com` - Pro tier
- `demo.plus@genai.com` - Plus tier
- `demo.enterprise@genai.com` - Enterprise tier

## Database Structure

### Core Tables
- `users` - User accounts and authentication
- `user_sessions` - Active user sessions
- `api_keys` - API keys for programmatic access
- `subscription_plans` - Available subscription tiers
- `user_subscriptions` - User subscription records
- `inference_requests` - LLM request/response history
- `rate_limit_buckets` - Rate limiting tracking
- `audit_logs` - Security and action audit trail
- `usage_statistics` - Aggregated daily usage metrics

### Authentication Tables
- `email_verification_tokens` - Email verification
- `password_reset_tokens` - Password reset flow

### Billing Tables
- `payment_methods` - Stored payment methods
- `invoices` - Billing history

## Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/genai_platform
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
```

## Maintenance

### Cleanup Expired Tokens
```sql
SELECT cleanup_expired_tokens();
```

### View User Subscription Info
```sql
SELECT * FROM user_subscription_info WHERE email = 'user@example.com';
```

### View Usage Summary
```sql
SELECT * FROM user_usage_summary WHERE user_id = 'uuid-here';
```

## Backup
```bash
pg_dump genai_platform > backup_$(date +%Y%m%d).sql
```

## Restore
```bash
psql genai_platform < backup_20260121.sql
```
