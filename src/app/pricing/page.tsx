'use client';

import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      description: 'Intelligence for everyday tasks',
      price: '$0',
      period: '/ month',
      cta: 'Get Free',
      ctaLink: '/signup',
      popular: false,
      features: [
        'Limited access to flagship model GPT-4',
        'Limited messages and uploads',
        'Limited and slower image generation',
        'Limited deep research',
        'Standard response time',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      description: 'Keep chatting with expanded access',
      price: '$49',
      period: '/ month',
      cta: 'Get Pro',
      ctaLink: '/signup',
      popular: false,
      features: [
        'Everything in Free and:',
        'More access to our flagship model GPT-4',
        'More messages',
        'Advanced reasoning models',
        'Expanded messages and uploads',
        'Expanded and faster image creation',
        'Priority support',
      ],
    },
    {
      name: 'Plus',
      description: 'Do more with advanced intelligence',
      price: '$99',
      period: '/ month',
      cta: 'Get Plus',
      ctaLink: '/signup',
      popular: true,
      features: [
        'Everything in Pro and:',
        'Advanced reasoning models',
        'Expanded messages and uploads',
        'Expanded and faster image creation',
        'Extended deep research',
        'API access',
        'Custom model fine-tuning',
        'Priority support',
      ],
    },
    {
      name: 'Enterprise',
      description: 'Full access to the best of GenAI',
      price: 'Custom',
      period: '',
      cta: 'Get Enterprise',
      ctaLink: '/signup',
      popular: false,
      features: [
        'Everything in Plus and:',
        'Pro reasoning with GPT-5.2 Pro',
        'Unlimited messages and uploads',
        'Unlimited and faster image creation',
        'Unlimited deep research',
        'Dedicated account manager',
        'SLA guarantee (99.9% uptime)',
        'Custom integrations',
        'Advanced security features',
        'Team collaboration tools',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-xl font-bold text-white">AI</span>
              </div>
              <span className="text-xl font-bold text-white">GenAI Platform</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/landing" className="text-sm text-gray-300 hover:text-white">
                Home
              </Link>
              <Link href="/features" className="text-sm text-gray-300 hover:text-white">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-white">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-medium text-gray-400">GenAI Platform</p>
          <h1 className="mb-4 text-5xl font-bold text-white">Pricing</h1>
          <p className="text-lg text-gray-400">
            See pricing for our individual, business, and enterprise plans.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border bg-gray-900 p-6 ${
                  plan.popular
                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm text-gray-400">{plan.period}</span>
                    )}
                  </div>
                </div>

                <Link
                  href={plan.ctaLink}
                  className={`mb-6 block w-full rounded-lg py-3 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'border border-gray-700 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta} →
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
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
                      <span
                        className={
                          feature.includes('Everything in')
                            ? 'font-semibold text-white'
                            : 'text-gray-300'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Compare plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="pb-4 text-left text-sm font-semibold text-gray-400">
                    Feature
                  </th>
                  <th className="pb-4 text-center text-sm font-semibold text-white">
                    Free
                  </th>
                  <th className="pb-4 text-center text-sm font-semibold text-white">
                    Pro
                  </th>
                  <th className="pb-4 text-center text-sm font-semibold text-white">
                    Plus
                  </th>
                  <th className="pb-4 text-center text-sm font-semibold text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="py-4 text-sm text-gray-300">Requests per minute</td>
                  <td className="py-4 text-center text-sm text-gray-400">10</td>
                  <td className="py-4 text-center text-sm text-gray-400">100</td>
                  <td className="py-4 text-center text-sm text-gray-400">500</td>
                  <td className="py-4 text-center text-sm text-gray-400">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-300">Concurrent requests</td>
                  <td className="py-4 text-center text-sm text-gray-400">2</td>
                  <td className="py-4 text-center text-sm text-gray-400">10</td>
                  <td className="py-4 text-center text-sm text-gray-400">25</td>
                  <td className="py-4 text-center text-sm text-gray-400">50</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-300">History retention</td>
                  <td className="py-4 text-center text-sm text-gray-400">7 days</td>
                  <td className="py-4 text-center text-sm text-gray-400">30 days</td>
                  <td className="py-4 text-center text-sm text-gray-400">90 days</td>
                  <td className="py-4 text-center text-sm text-gray-400">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-300">GPT-4 access</td>
                  <td className="py-4 text-center">
                    <span className="text-yellow-500">Limited</span>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-300">Claude 3 access</td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-300">API access</td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-300">Priority support</td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-300">SLA guarantee</td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <svg className="mx-auto h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-sm text-green-500">99.9%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            <details className="group rounded-lg border border-gray-800 bg-gray-900 p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                Can I switch plans later?
              </summary>
              <p className="mt-4 text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.
              </p>
            </details>

            <details className="group rounded-lg border border-gray-800 bg-gray-900 p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                What payment methods do you accept?
              </summary>
              <p className="mt-4 text-gray-400">
                We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Enterprise customers can also pay via invoice.
              </p>
            </details>

            <details className="group rounded-lg border border-gray-800 bg-gray-900 p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                Is there a free trial?
              </summary>
              <p className="mt-4 text-gray-400">
                Yes! The Free plan is available forever with no credit card required. You can also try Pro or Plus with a 14-day free trial.
              </p>
            </details>

            <details className="group rounded-lg border border-gray-800 bg-gray-900 p-6">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                What happens if I exceed my rate limits?
              </summary>
              <p className="mt-4 text-gray-400">
                Requests will be queued and processed when your rate limit resets. For consistent high-volume usage, we recommend upgrading to a higher tier.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-gray-400">
            Join thousands of developers building with AI
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-100"
          >
            Sign up for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-400">
          <p>&copy; 2026 GenAI Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
