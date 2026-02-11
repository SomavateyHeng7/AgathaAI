# Stripe Integration Setup Guide

This guide will help you set up Stripe payment processing for AgathaAI subscription management.

## Prerequisites

- Stripe account (sign up at https://stripe.com)
- Database migration applied (003_add_stripe_customer_id.sql)
- Stripe npm package installed (`npm install stripe`)

## Step 1: Get Stripe API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Secret key** (starts with `sk_test_` for test mode)
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

## Step 2: Create Products and Prices

### Create Pro Plan ($29/month)

1. Go to https://dashboard.stripe.com/products
2. Click **+ Add product**
3. Fill in:
   - **Name**: AgathaAI Pro
   - **Description**: Keep chatting with expanded access
   - **Pricing model**: Standard pricing
   - **Price**: $29.00
   - **Billing period**: Monthly
   - **Currency**: USD
4. Click **Save product**
5. Copy the **Price ID** (starts with `price_`)
6. Add to `.env`:
   ```
   STRIPE_PRICE_ID_PRO=price_your_pro_price_id_here
   ```

### Create Enterprise Plan ($299/month)

1. Repeat the above steps with:
   - **Name**: AgathaAI Enterprise
   - **Description**: Full access to the best of GenAI
   - **Price**: $299.00
2. Copy the **Price ID**
3. Add to `.env`:
   ```
   STRIPE_PRICE_ID_ENTERPRISE=price_your_enterprise_price_id_here
   ```

## Step 3: Set Up Webhook

Webhooks allow Stripe to notify your application about payment events.

### Local Development (using Stripe CLI)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe:
   ```bash
   stripe login
   ```
3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copy the webhook signing secret (starts with `whsec_`)
5. Add to `.env`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

### Production Deployment

1. Go to https://dashboard.stripe.com/webhooks
2. Click **+ Add endpoint**
3. Enter your webhook URL:
   ```
   https://yourdomain.com/api/stripe/webhook
   ```
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret**
7. Add to your production `.env`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret
   ```

## Step 4: Configure Customer Portal

The customer portal allows users to manage their subscriptions.

1. Go to https://dashboard.stripe.com/settings/billing/portal
2. Enable the customer portal
3. Configure settings:
   - **Allow customers to**: Update payment methods, Cancel subscriptions
   - **Cancellation behavior**: Cancel immediately or at period end
   - **Invoice history**: Show all invoices
4. Click **Save**

## Step 5: Apply Database Migration

Run the migration to add Stripe customer ID field:

```bash
psql $DATABASE_URL -f database/migrations/003_add_stripe_customer_id.sql
```

## Step 6: Test the Integration

### Test Cards

Use these test card numbers in test mode:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

Use any future expiry date, any 3-digit CVC, and any postal code.

### Test Flow

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Start Stripe webhook forwarding (in another terminal):
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Sign in to your application
4. Go to `/subscribe`
5. Click **Upgrade to Pro**
6. Complete checkout with test card `4242 4242 4242 4242`
7. Verify:
   - Redirected to success page
   - User tier updated in database
   - Subscription record created
   - Webhook events received

## Step 7: Go Live

### Switch to Production Mode

1. Go to https://dashboard.stripe.com
2. Toggle from **Test mode** to **Live mode** (top right)
3. Get your **live** API keys from https://dashboard.stripe.com/apikeys
4. Create **live** products and prices (same as test mode)
5. Set up **live** webhook endpoint
6. Update production `.env` with live keys:
   ```
   STRIPE_SECRET_KEY=sk_live_your_live_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
   STRIPE_PRICE_ID_PRO=price_your_live_pro_price_id
   STRIPE_PRICE_ID_ENTERPRISE=price_your_live_enterprise_price_id
   ```

### Production Checklist

- [ ] Live API keys configured
- [ ] Live products and prices created
- [ ] Live webhook endpoint configured
- [ ] Customer portal configured
- [ ] Test live checkout flow
- [ ] Test subscription cancellation
- [ ] Test payment failure handling
- [ ] Monitor webhook events in Stripe Dashboard

## API Routes Overview

### `/api/stripe/create-checkout` (POST)

Creates a Stripe Checkout session for subscription purchase.

**Request:**
```json
{
  "planId": "pro",
  "successUrl": "https://yourdomain.com/subscribe/success",
  "cancelUrl": "https://yourdomain.com/subscribe"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### `/api/stripe/create-portal` (POST)

Creates a Stripe Customer Portal session for subscription management.

**Request:**
```json
{
  "returnUrl": "https://yourdomain.com/subscribe"
}
```

**Response:**
```json
{
  "url": "https://billing.stripe.com/p/session/..."
}
```

### `/api/stripe/webhook` (POST)

Handles Stripe webhook events.

**Events Handled:**
- `checkout.session.completed` - Activates subscription after successful payment
- `customer.subscription.updated` - Updates subscription period
- `customer.subscription.deleted` - Downgrades user to free tier
- `invoice.payment_succeeded` - Records successful payment
- `invoice.payment_failed` - Marks subscription as past due

## Database Schema

### Users Table (Updated)

```sql
ALTER TABLE users 
ADD COLUMN stripe_customer_id VARCHAR(255) UNIQUE;
```

### User Subscriptions Table

Tracks active subscriptions:

```sql
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    plan_id UUID REFERENCES subscription_plans(id),
    status VARCHAR(20), -- 'active', 'cancelled', 'expired', 'past_due'
    billing_cycle VARCHAR(20), -- 'monthly', 'yearly'
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    cancel_at_period_end BOOLEAN,
    cancelled_at TIMESTAMP
);
```

### Invoices Table

Records payment history:

```sql
CREATE TABLE invoices (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    subscription_id UUID REFERENCES user_subscriptions(id),
    invoice_number VARCHAR(50) UNIQUE,
    amount DECIMAL(10, 2),
    currency VARCHAR(3),
    status VARCHAR(20), -- 'pending', 'paid', 'failed', 'refunded'
    stripe_invoice_id VARCHAR(255),
    paid_at TIMESTAMP
);
```

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is correct
2. Verify webhook secret matches
3. Check Stripe CLI is running (local dev)
4. View webhook logs in Stripe Dashboard

### Checkout Session Not Creating

1. Verify API key is correct
2. Check price IDs exist in Stripe
3. Ensure user is authenticated
4. Check server logs for errors

### Subscription Not Activating

1. Check webhook is receiving `checkout.session.completed` event
2. Verify metadata (userId, planId) is present
3. Check database for subscription record
4. View webhook event details in Stripe Dashboard

### Customer Portal Not Working

1. Verify customer portal is enabled in Stripe settings
2. Check user has `stripe_customer_id` in database
3. Ensure user has active subscription

## Security Best Practices

1. **Never expose secret keys** - Keep `STRIPE_SECRET_KEY` server-side only
2. **Verify webhook signatures** - Always validate webhook events
3. **Use HTTPS in production** - Required for Stripe webhooks
4. **Validate user authentication** - Check session before creating checkout
5. **Handle errors gracefully** - Don't expose internal errors to users
6. **Log webhook events** - Monitor for suspicious activity
7. **Test thoroughly** - Use test mode before going live

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Stripe Status: https://status.stripe.com

## Next Steps

1. Complete Stripe setup following this guide
2. Test subscription flow end-to-end
3. Configure email notifications (optional)
4. Set up usage-based billing (optional)
5. Implement proration for plan changes (optional)
6. Add subscription analytics dashboard (optional)
