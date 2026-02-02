# AgathaAI Platform - Official Deployment Guide

**Document Type**: Operational Procedures  
**Version**: 1.0  
**Date**: February 2, 2026  
**Status**: Official Release  
**Classification**: Internal - Operations

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Environment Setup](#2-environment-setup)
3. [Database Configuration](#3-database-configuration)
4. [Application Deployment](#4-application-deployment)
5. [Verification & Testing](#5-verification--testing)
6. [Production Checklist](#6-production-checklist)

---

## 1. Prerequisites

### 1.1 Required Tools

- Node.js 20 LTS or higher
- PostgreSQL 14 or higher
- Docker 24.0 or higher
- AWS CLI v2
- Terraform 1.6 or higher
- Git

### 1.2 Required Access

- AWS Account with admin access
- GitHub repository access
- LLM Provider API keys (OpenAI, Gemini, DeepSeek)
- Domain name and DNS management

### 1.3 Required Knowledge

- AWS services (ECS, RDS, Lambda, S3)
- Docker containerization
- PostgreSQL database administration
- Next.js application deployment

---

## 2. Environment Setup

### 2.1 Development Environment

```bash
# Clone repository
git clone https://github.com/your-org/agatha-ai.git
cd agatha-ai

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

### 2.2 Environment Variables

**Required Variables**:
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/genai_platform

# JWT Secret (min 32 characters)
JWT_SECRET=your-secure-random-string-min-32-chars

# LLM API Keys
OPENAI_API_KEY=sk-proj-...
GEMINI_API_KEY=AIzaSy...
DEEPSEEK_API_KEY=sk-...

# Environment
NODE_ENV=production
```

**Optional Variables**:
```env
# Redis Cache
REDIS_URL=redis://localhost:6379

# AWS Services
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

# Monitoring
DATADOG_API_KEY=...
SENTRY_DSN=...
```



---

## 3. Database Configuration

### 3.1 Local Development

```bash
# Create database
createdb genai_platform

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed

# Verify setup
psql genai_platform -c "SELECT COUNT(*) FROM users;"
```

### 3.2 Production (AWS RDS)

```bash
# Create RDS instance via Terraform
cd terraform/environments/production
terraform init
terraform plan
terraform apply

# Get database endpoint
export DB_ENDPOINT=$(terraform output -raw db_endpoint)

# Run migrations
DATABASE_URL="postgresql://admin:${DB_PASSWORD}@${DB_ENDPOINT}:5432/genai_platform" \
  npm run db:migrate

# Seed production data
DATABASE_URL="postgresql://admin:${DB_PASSWORD}@${DB_ENDPOINT}:5432/genai_platform" \
  npm run db:seed
```

### 3.3 Database Backup

```bash
# Manual backup
pg_dump genai_platform > backup_$(date +%Y%m%d).sql

# Restore from backup
psql genai_platform < backup_20260202.sql

# AWS RDS automated backups
# Configured via Terraform (35-day retention)
```

---

## 4. Application Deployment

### 4.1 Local Development

```bash
# Start development server
npm run dev

# Access application
open http://localhost:3000

# Run tests
npm test

# Check for issues
npm run lint
```

### 4.2 Docker Build

```bash
# Build Docker image
docker build -t agatha-ai:latest .

# Run container locally
docker run -p 3000:3000 \
  --env-file .env.local \
  agatha-ai:latest

# Push to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin ${ECR_REGISTRY}

docker tag agatha-ai:latest ${ECR_REGISTRY}/agatha-ai:latest
docker push ${ECR_REGISTRY}/agatha-ai:latest
```



### 4.3 AWS ECS Deployment

```bash
# Deploy via Terraform
cd terraform/environments/production
terraform apply -target=module.ecs

# Or use AWS CLI
aws ecs update-service \
  --cluster agatha-ai-prod \
  --service api-gateway \
  --force-new-deployment

# Monitor deployment
aws ecs describe-services \
  --cluster agatha-ai-prod \
  --services api-gateway
```

### 4.4 Lambda Functions

```bash
# Package Lambda function
cd lambda/inference-worker
npm install --production
zip -r function.zip .

# Deploy via AWS CLI
aws lambda update-function-code \
  --function-name agatha-ai-inference-worker \
  --zip-file fileb://function.zip

# Or use Terraform
terraform apply -target=module.lambda
```

### 4.5 CI/CD Pipeline

**GitHub Actions Workflow**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
      - name: Build Docker image
        run: docker build -t agatha-ai .
      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login ...
          docker push ${ECR_REGISTRY}/agatha-ai:latest
      - name: Deploy to ECS
        run: |
          aws ecs update-service --force-new-deployment
```

---

## 5. Verification & Testing

### 5.1 Health Checks

```bash
# API health check
curl https://api.agathaai.com/health

# Expected response:
# {"status":"healthy","version":"1.0.0","timestamp":"2026-02-02T10:00:00Z"}

# Database connectivity
curl https://api.agathaai.com/health/db

# Redis connectivity
curl https://api.agathaai.com/health/redis
```

### 5.2 Smoke Tests

```bash
# Test authentication
curl -X POST https://api.agathaai.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Test inference
curl -X POST https://api.agathaai.com/api/v1/inference \
  -H "Authorization: Bearer ${JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello","model":"gpt-3.5-turbo"}'

# Check rate limits
curl https://api.agathaai.com/api/v1/rate-limit \
  -H "Authorization: Bearer ${JWT_TOKEN}"
```



### 5.3 Load Testing

```bash
# Install k6
brew install k6

# Run load test
k6 run tests/load/inference.js

# Expected results:
# - 95th percentile < 200ms
# - Error rate < 0.1%
# - Throughput > 1000 req/sec
```

### 5.4 Security Scanning

```bash
# Dependency vulnerabilities
npm audit

# Container scanning
docker scan agatha-ai:latest

# Infrastructure scanning
terraform plan -out=tfplan
terraform show -json tfplan | tfsec

# OWASP ZAP scanning
zap-cli quick-scan https://api.agathaai.com
```

---

## 6. Production Checklist

### 6.1 Pre-Deployment

- [ ] All tests passing (unit, integration, e2e)
- [ ] Security scan completed (no critical issues)
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Secrets stored in AWS Secrets Manager
- [ ] Monitoring dashboards created
- [ ] Alerts configured
- [ ] Runbooks updated
- [ ] Rollback plan documented
- [ ] Stakeholders notified

### 6.2 Deployment

- [ ] Deploy to staging environment
- [ ] Run smoke tests on staging
- [ ] Get approval from QA team
- [ ] Schedule deployment window
- [ ] Enable maintenance mode (if needed)
- [ ] Deploy to production (canary)
- [ ] Monitor metrics for 15 minutes
- [ ] Increase traffic to 50%
- [ ] Monitor metrics for 15 minutes
- [ ] Increase traffic to 100%
- [ ] Disable maintenance mode

### 6.3 Post-Deployment

- [ ] Verify all health checks passing
- [ ] Run smoke tests on production
- [ ] Check error rates in monitoring
- [ ] Verify database performance
- [ ] Check LLM provider connectivity
- [ ] Review application logs
- [ ] Update status page
- [ ] Notify stakeholders of completion
- [ ] Document any issues encountered
- [ ] Schedule post-mortem (if needed)



### 6.4 Rollback Procedures

**Automated Rollback** (triggered by health checks):
```bash
# ECS will automatically rollback if:
# - Health checks fail for 3 consecutive times
# - Error rate exceeds 5%
# - Response time exceeds 1000ms
```

**Manual Rollback**:
```bash
# Rollback ECS service
aws ecs update-service \
  --cluster agatha-ai-prod \
  --service api-gateway \
  --task-definition agatha-ai:PREVIOUS_VERSION

# Rollback database migration
npm run db:rollback

# Rollback Lambda function
aws lambda update-function-code \
  --function-name agatha-ai-inference-worker \
  --s3-bucket lambda-deployments \
  --s3-key previous-version.zip
```

---

## Troubleshooting

### Common Issues

**Issue**: Database connection timeout
```bash
# Check security group rules
aws ec2 describe-security-groups --group-ids sg-xxx

# Verify database is running
aws rds describe-db-instances --db-instance-identifier agatha-ai-prod

# Test connectivity
psql -h ${DB_ENDPOINT} -U admin -d genai_platform
```

**Issue**: High memory usage
```bash
# Check ECS task metrics
aws ecs describe-tasks --cluster agatha-ai-prod --tasks ${TASK_ARN}

# Increase task memory
# Edit terraform/modules/ecs/main.tf
# Update memory from 4096 to 8192
terraform apply
```

**Issue**: LLM API errors
```bash
# Check API key validity
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer ${OPENAI_API_KEY}"

# Check rate limits
# Review CloudWatch logs for rate limit errors

# Rotate API keys if needed
aws secretsmanager update-secret \
  --secret-id openai-api-key \
  --secret-string "${NEW_API_KEY}"
```

---

## Support & Escalation

**Level 1 - On-Call Engineer**:
- PagerDuty: Primary on-call
- Response time: 15 minutes
- Handles: Service degradation, minor incidents

**Level 2 - Senior Engineer**:
- PagerDuty: Secondary escalation
- Response time: 30 minutes
- Handles: Major incidents, complex issues

**Level 3 - Engineering Manager**:
- Phone: Emergency only
- Response time: 1 hour
- Handles: Critical incidents, executive escalation

---

**Document Classification**: Internal - Operations  
**Maintained by**: DevOps Team  
**Last Updated**: February 2, 2026  
**Version**: 1.0

