# Subscription Feature Documentation

## Overview

AgathaAI offers a tiered subscription model with three plans: Free, Pro, and Enterprise. Users can upgrade their subscription through a Stripe-powered checkout flow.

## Subscription Tiers

### Free Tier
- **Price**: $0/forever
- **Rate Limit**: 10 requests/minute
- **Tokens**: 100K/month
- **Concurrent Requests**: 2
- **Models**: GPT-3.5 Turbo
- **History**: 7 days
- **Support**: Community

### Pro Tier
- **Price**: $29/month
- **Rate Limit**: 100 requests/minute
- **Tokens**: 1M/month
- **Concurrent Requests**: 10
- **Models**: GPT-4, GPT-4o, Gemini Pro
- **History**: 30 days
- **Support**: Priority
- **Features**: API access, Advanced analytics

### Enterprise Tier
- **Price**: $299/month
- **Rate Limit**: 10,000 requests/minute
- **Tokens**: Unlimited
- **Concurrent Requests**: 500
- **Models**: All (GPT-4, Claude, Gemini, DeepSeek)
- **History**: Unlimited
- **Support**: Dedicated
- **Features**: Custom integrations, SLA guarantee, Team collaboration, Advanced security

## User Flow

### Upgrade Flow

1. User navigates to `/subscribe`
2. Views pricing cards with current tier highlighted
3. Clicks "Upgrade to Pro" or "Upgrade to Enterprise"
4. Redirected to Stripe Checkout
5. Completes payment with credit card
6. Redirected to `/subscribe/success`
7. Account automatically upgraded
8. Can start using premium features immediately

### Manage Subscription Flow

1. User clicks "Manage Subscription" button on `/subscribe` page
2. Redirected to Stripe Customer Portal
3. Can:
   - Update payment method
   - View invoice history
   - Cancel subscription
   - Download receipts
4. Returns to `/subscribe` page

### Cancellation Flow

1. User opens Stripe Customer Portal
2. Clicks "Cancel subscription"
3. Chooses cancellation timing:
   - Cancel immediately (loses access now)
   - Cancel at period end (keeps access until renewal date)
4. Subscription cancelled
5. Webhook updates database
6. User downgraded to Free tier (at period end or immediately)

## Technical Implementation

### Frontend Components

**Subscribe Page** (`src/app/subscribe/page.tsx`)
- Displays pricing cards
- Shows current tier
- Handles upgrade button clicks
- Creates Stripe checkout session
- Manages loading states

**Success Page** (`src/app/subscribe/success/page.tsx`)
- Confirms successful subscription
- Lists included features
- Auto-redirects to chat after 5 seconds

### Backend API Routes

**Create Checkout** (`src/app/api/stripe/create-checkout/route.ts`)
- Validates user authentication
- Creates Stripe checkout session
- Returns checkout URL
- Includes metadata (userId, planId)

**Create Portal** (`src/app/api/stripe/create-portal/route.ts`)
- Validates user authentication
- Retrieves Stripe customer ID
- Creates customer portal session
- Returns portal URL

**Webhook Handler** (`src/app/api/stripe/webhook/route.ts`)
- Validates webhook signature
- Handles subscription events:
  - `checkout.session.completed` - Activates subscription
  - `customer.subscription.updated` - Updates subscription period
  - `customer.subscription.deleted` - Cancels subscription
  - `invoice.payment_succeeded` - Records payment
  - `invoice.payment_failed` - Marks as past due
- Updates database accordingly

### Database Tables

**users**
- `subscription_tier` - Current tier (free, pro, enterprise)
- `stripe_customer_id` - Stripe customer ID for billing

**user_subscriptions**
- Tracks active subscriptions
- Stores billing cycle and period dates
- Records cancellation status

**invoices**
- Payment history
- Invoice numbers and amounts
- Payment status

**subscription_plans**
- Plan definitions
- Pricing and limits
- Feature sets

## Configuration

### Environment Variables

```bash
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...
```

### Stripe Dashboard Setup

1. Create products and prices
2. Configure webhook endpoint
3. Enable customer portal
4. Set up payment methods

See `docs/STRIPE_SETUP_GUIDE.md` for detailed instructions.

## Security Considerations

1. **Authentication Required**: All subscription endpoints require valid session
2. **Webhook Verification**: All webhook events verified with signature
3. **Server-Side Only**: Stripe secret key never exposed to client
4. **HTTPS Required**: Production webhooks require HTTPS
5. **Metadata Validation**: User ID and plan ID validated in webhooks

## Error Handling

### Checkout Errors
- Invalid plan ID → 400 Bad Request
- Missing authentication → 401 Unauthorized
- Stripe API error → 500 Internal Server Error

### Portal Errors
- No customer ID → 404 Not Found
- Invalid session → 401 Unauthorized
- Stripe API error → 500 Internal Server Error

### Webhook Errors
- Invalid signature → 400 Bad Request
- Missing metadata → Logged, event skipped
- Database error → Logged, webhook retried by Stripe

## Testing

### Test Cards

Use in Stripe test mode:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

### Test Scenarios

1. **Successful Upgrade**
   - Sign in as free user
   - Upgrade to Pro
   - Complete checkout
   - Verify tier updated

2. **Failed Payment**
   - Use decline test card
   - Verify error message
   - Verify tier unchanged

3. **Subscription Cancellation**
   - Open customer portal
   - Cancel subscription
   - Verify downgrade to free

4. **Webhook Processing**
   - Monitor Stripe CLI output
   - Check database updates
   - Verify event handling

## Monitoring

### Key Metrics

- Conversion rate (free → paid)
- Churn rate (cancellations)
- Monthly recurring revenue (MRR)
- Average revenue per user (ARPU)
- Payment success rate

### Stripe Dashboard

Monitor in real-time:
- Active subscriptions
- Failed payments
- Webhook delivery status
- Revenue trends

### Database Queries

```sql
-- Active subscriptions by tier
SELECT subscription_tier, COUNT(*) 
FROM users 
WHERE status = 'active' 
GROUP BY subscription_tier;

-- Monthly revenue
SELECT SUM(amount) 
FROM invoices 
WHERE status = 'paid' 
AND paid_at >= DATE_TRUNC('month', CURRENT_DATE);

-- Churn rate (last 30 days)
SELECT COUNT(*) 
FROM user_subscriptions 
WHERE cancelled_at >= CURRENT_DATE - INTERVAL '30 days';
```

## Future Enhancements

### Planned Features

1. **Annual Billing** - Discounted yearly subscriptions
2. **Usage-Based Billing** - Pay per token/request
3. **Team Plans** - Multi-user subscriptions
4. **Add-ons** - Extra tokens, priority support
5. **Proration** - Automatic credit for plan changes
6. **Trial Period** - 14-day free trial for Pro
7. **Referral Program** - Credits for referrals
8. **Enterprise Quotes** - Custom pricing for large teams

### Technical Improvements

1. **Email Notifications** - Payment receipts, renewal reminders
2. **Analytics Dashboard** - Usage tracking and insights
3. **Subscription Pausing** - Temporary subscription pause
4. **Payment Retry Logic** - Automatic retry for failed payments
5. **Multi-Currency Support** - International pricing
6. **Tax Calculation** - Automatic tax handling
7. **Dunning Management** - Failed payment recovery

## Support

### Common Issues

**Q: Payment failed, what should I do?**
A: Check your card details and try again. Contact support if issue persists.

**Q: How do I cancel my subscription?**
A: Click "Manage Subscription" on the subscribe page and follow the cancellation flow.

**Q: Will I lose my data if I cancel?**
A: No, your data is retained. You'll be downgraded to the free tier.

**Q: Can I upgrade/downgrade anytime?**
A: Yes, upgrades take effect immediately. Downgrades at period end.

**Q: Do you offer refunds?**
A: Contact support@agathaai.com for refund requests.

### Contact

- Email: support@agathaai.com
- Sales: sales@agathaai.com
- Documentation: https://docs.agathaai.com

## Changelog

### v1.0.0 (February 3, 2026)
- Initial subscription feature release
- Stripe integration
- Three-tier pricing model
- Customer portal integration
- Webhook event handling
- Success page with auto-redirect
