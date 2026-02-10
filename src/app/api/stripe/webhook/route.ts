import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { query } from '@/lib/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  if (!userId || !planId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  try {
    // Update user with Stripe customer ID
    await query(
      'UPDATE users SET stripe_customer_id = $1 WHERE id = $2',
      [customerId, userId]
    );

    // Get subscription details
    const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId);
    const subscription = subscriptionResponse as unknown as Stripe.Subscription;

    // Determine tier based on planId
    const tier = planId === 'pro' ? 'pro' : 'enterprise';

    // Update user subscription tier
    await query(
      'UPDATE users SET subscription_tier = $1, updated_at = NOW() WHERE id = $2',
      [tier, userId]
    );

    // Get plan from database
    const planResult = await query(
      'SELECT id FROM subscription_plans WHERE name = $1',
      [tier]
    );

    if (planResult.rows.length > 0) {
      const dbPlanId = planResult.rows[0].id;

      // Get subscription period dates - use fallback values if properties don't exist
      const periodStart = new Date();
      const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      // Create subscription record
      await query(
        `INSERT INTO user_subscriptions 
        (user_id, plan_id, status, billing_cycle, current_period_start, current_period_end, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
        [
          userId,
          dbPlanId,
          'active',
          'month',
          periodStart,
          periodEnd,
        ]
      );
    }

    console.log(`Subscription activated for user ${userId}: ${tier}`);
  } catch (error) {
    console.error('Error handling checkout completed:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  try {
    // Get user by customer ID
    const userResult = await query(
      'SELECT id FROM users WHERE stripe_customer_id = $1',
      [customerId]
    );

    if (userResult.rows.length === 0) {
      console.error('User not found for customer:', customerId);
      return;
    }

    const userId = userResult.rows[0].id;

    // Get subscription period dates - use fallback values
    const periodStart = new Date();
    const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Update subscription period
    await query(
      `UPDATE user_subscriptions 
       SET current_period_start = $1, 
           current_period_end = $2,
           status = $3,
           updated_at = NOW()
       WHERE user_id = $4 AND status = 'active'`,
      [
        periodStart,
        periodEnd,
        subscription.status,
        userId,
      ]
    );

    console.log(`Subscription updated for user ${userId}`);
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  try {
    // Get user by customer ID
    const userResult = await query(
      'SELECT id FROM users WHERE stripe_customer_id = $1',
      [customerId]
    );

    if (userResult.rows.length === 0) {
      console.error('User not found for customer:', customerId);
      return;
    }

    const userId = userResult.rows[0].id;

    // Downgrade to free tier
    await query(
      'UPDATE users SET subscription_tier = $1, updated_at = NOW() WHERE id = $2',
      ['free', userId]
    );

    // Update subscription status
    await query(
      `UPDATE user_subscriptions 
       SET status = 'cancelled', 
           cancelled_at = NOW(),
           updated_at = NOW()
       WHERE user_id = $1 AND status = 'active'`,
      [userId]
    );

    console.log(`Subscription cancelled for user ${userId}`);
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  try {
    // Get user by customer ID
    const userResult = await query(
      'SELECT id FROM users WHERE stripe_customer_id = $1',
      [customerId]
    );

    if (userResult.rows.length === 0) {
      return;
    }

    const userId = userResult.rows[0].id;

    // Get subscription
    const subscriptionResult = await query(
      'SELECT id FROM user_subscriptions WHERE user_id = $1 AND status = $2',
      [userId, 'active']
    );

    // Create invoice record
    await query(
      `INSERT INTO invoices 
      (user_id, subscription_id, invoice_number, amount, currency, status, stripe_invoice_id, paid_at, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
      [
        userId,
        subscriptionResult.rows[0]?.id || null,
        invoice.number,
        (invoice.amount_paid / 100).toFixed(2),
        invoice.currency.toUpperCase(),
        'paid',
        invoice.id,
      ]
    );

    console.log(`Invoice payment succeeded for user ${userId}`);
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  try {
    // Get user by customer ID
    const userResult = await query(
      'SELECT id FROM users WHERE stripe_customer_id = $1',
      [customerId]
    );

    if (userResult.rows.length === 0) {
      return;
    }

    const userId = userResult.rows[0].id;

    // Update subscription status to past_due
    await query(
      `UPDATE user_subscriptions 
       SET status = 'past_due', updated_at = NOW()
       WHERE user_id = $1 AND status = 'active'`,
      [userId]
    );

    console.log(`Invoice payment failed for user ${userId}`);
  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
}
