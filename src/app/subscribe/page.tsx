'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  limits: {
    requestsPerMin: number;
    tokensPerMonth: string;
    concurrent: number;
  };
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'forever',
    features: [
      'GPT-3.5 Turbo access',
      'Basic support',
      '7-day history',
      'Community access',
    ],
    limits: {
      requestsPerMin: 10,
      tokensPerMonth: '100K',
      concurrent: 2,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month',
    popular: true,
    features: [
      'All Free features',
      'GPT-4 & GPT-4o access',
      'Gemini Pro access',
      'Priority support',
      '30-day history',
      'Advanced analytics',
      'API access',
    ],
    limits: {
      requestsPerMin: 100,
      tokensPerMonth: '1M',
      concurrent: 10,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'month',
    features: [
      'All Pro features',
      'All models (GPT-4, Claude, Gemini, DeepSeek)',
      'Unlimited history',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Team collaboration',
      'Advanced security',
    ],
    limits: {
      requestsPerMin: 10000,
      tokensPerMonth: 'Unlimited',
      concurrent: 500,
    },
  },
];

export default function SubscribePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [currentTier, setCurrentTier] = useState<string>('free');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin?callbackUrl=/subscribe');
    }
    
    if (session?.user) {
      setCurrentTier((session.user as any).tier || 'free');
    }
  }, [status, session, router]);

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') {
      return; // Already on free tier
    }

    setLoading(planId);

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          successUrl: `${window.location.origin}/subscribe/success`,
          cancelUrl: `${window.location.origin}/subscribe`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to start subscription. Please try again.');
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    setLoading('manage');

    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/subscribe`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Portal error:', error);
      alert('Failed to open billing portal. Please try again.');
      setLoading(null);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back to Chat
          </Link>
          {currentTier !== 'free' && (
            <button
              onClick={handleManageSubscription}
              disabled={loading === 'manage'}
              className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
            >
              {loading === 'manage' ? 'Loading...' : 'Manage Subscription'}
            </button>
          )}
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Upgrade to unlock more models and higher limits
          </p>
          {currentTier !== 'free' && (
            <div className="mt-4 inline-block rounded-lg bg-blue-900/20 px-4 py-2 text-sm text-blue-400">
              Current Plan: <span className="font-semibold capitalize">{currentTier}</span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentTier;
            const canUpgrade = 
              (currentTier === 'free' && plan.id !== 'free') ||
              (currentTier === 'pro' && plan.id === 'enterprise');

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 ${
                  plan.popular
                    ? 'border-blue-500 bg-gray-900'
                    : 'border-gray-800 bg-gray-900/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-sm font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4">
                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="ml-2 text-gray-400">/{plan.interval}</span>
                  </div>
                </div>

                {/* Limits */}
                <div className="mb-6 space-y-2 rounded-lg bg-gray-800/50 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Requests/min</span>
                    <span className="font-semibold text-white">
                      {plan.limits.requestsPerMin.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tokens/month</span>
                    <span className="font-semibold text-white">
                      {plan.limits.tokensPerMonth}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Concurrent</span>
                    <span className="font-semibold text-white">
                      {plan.limits.concurrent}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="mr-3 h-5 w-5 flex-shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={!canUpgrade || loading === plan.id}
                  className={`w-full rounded-lg px-6 py-3 font-semibold transition-colors ${
                    isCurrentPlan
                      ? 'cursor-not-allowed bg-gray-700 text-gray-400'
                      : canUpgrade
                      ? plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'cursor-not-allowed bg-gray-700 text-gray-400'
                  } disabled:opacity-50`}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="mr-2 h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : isCurrentPlan ? (
                    'Current Plan'
                  ) : canUpgrade ? (
                    `Upgrade to ${plan.name}`
                  ) : (
                    'Not Available'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-center text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-2 font-semibold text-white">
                Can I cancel anytime?
              </h3>
              <p className="text-sm text-gray-400">
                Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-2 font-semibold text-white">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-gray-400">
                We accept all major credit cards (Visa, Mastercard, American Express) through Stripe's secure payment processing.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-2 font-semibold text-white">
                Can I upgrade or downgrade later?
              </h3>
              <p className="text-sm text-gray-400">
                Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades at the end of your billing period.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-2 font-semibold text-white">
                Is there a free trial?
              </h3>
              <p className="text-sm text-gray-400">
                The Free tier is available forever with no credit card required. You can upgrade to paid plans anytime to unlock more features.
              </p>
            </div>
          </div>
        </div>

        {/* Contact for Enterprise */}
        <div className="mt-16 rounded-2xl border border-gray-800 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Need a Custom Enterprise Plan?
          </h2>
          <p className="mt-2 text-gray-400">
            Contact our sales team for custom pricing, dedicated support, and enterprise features.
          </p>
          <a
            href="mailto:sales@agathaai.com"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-gray-900 hover:bg-gray-100"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}
