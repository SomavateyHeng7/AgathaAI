'use client';

import Link from 'next/link';

export default function Features() {
  const features = [
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Multi-Model Access',
      description: 'Access GPT-4, Claude 3, Llama 3, and more through a single unified API',
      details: [
        'GPT-4 and GPT-3.5 Turbo',
        'Claude 3 Opus and Sonnet',
        'Llama 3 70B',
        'Automatic model routing',
        'Fallback mechanisms',
      ],
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and compliance',
      details: [
        'SOC 2 Type II certified',
        'TLS 1.3 encryption in transit',
        'AES-256 encryption at rest',
        'GDPR and CCPA compliant',
        'Regular security audits',
      ],
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Smart Rate Limiting',
      description: 'Intelligent rate limiting based on your subscription tier',
      details: [
        'Per-minute request limits',
        'Concurrent request management',
        'Automatic throttling',
        'Real-time usage monitoring',
        'Upgrade notifications',
      ],
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: 'Auto-Scaling Infrastructure',
      description: 'Handle millions of requests with automatic scaling',
      details: [
        'Horizontal auto-scaling',
        'Load balancing',
        'Global CDN',
        '99.9% uptime SLA',
        'Zero-downtime deployments',
      ],
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Real-Time Analytics',
      description: 'Monitor usage, performance, and costs in real-time',
      details: [
        'Request tracking',
        'Response time metrics',
        'Token usage analytics',
        'Cost breakdown',
        'Custom dashboards',
      ],
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      ),
      title: 'Secure History Storage',
      description: 'Encrypted storage of all prompts and responses',
      details: [
        'Encrypted at rest',
        'Tier-based retention',
        'Easy export options',
        'Search and filter',
        'Automatic cleanup',
      ],
    },
  ];

  const integrations = [
    {
      name: 'REST API',
      description: 'Simple HTTP API with comprehensive documentation',
      icon: '🔌',
    },
    {
      name: 'Python SDK',
      description: 'Official Python library with async support',
      icon: '🐍',
    },
    {
      name: 'Node.js SDK',
      description: 'TypeScript-first SDK for Node.js applications',
      icon: '📦',
    },
    {
      name: 'Webhooks',
      description: 'Real-time notifications for async operations',
      icon: '🔔',
    },
  ];

  const useCases = [
    {
      title: 'Customer Support',
      description: 'Automate responses and provide 24/7 support',
      icon: '💬',
      examples: ['Chatbots', 'Email automation', 'Ticket classification'],
    },
    {
      title: 'Content Generation',
      description: 'Create high-quality content at scale',
      icon: '✍️',
      examples: ['Blog posts', 'Product descriptions', 'Social media'],
    },
    {
      title: 'Code Assistance',
      description: 'Help developers write better code faster',
      icon: '💻',
      examples: ['Code completion', 'Bug detection', 'Documentation'],
    },
    {
      title: 'Data Analysis',
      description: 'Extract insights from unstructured data',
      icon: '📊',
      examples: ['Sentiment analysis', 'Entity extraction', 'Summarization'],
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
              <Link href="/features" className="text-sm text-white">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-gray-300 hover:text-white">
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

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold text-white">
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Modern AI Applications
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-400">
            Everything you need to build, deploy, and scale AI-powered applications
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-100"
          >
            Get started for free
          </Link>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Core Features</h2>
            <p className="text-gray-400">Built for developers, trusted by enterprises</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition-all hover:border-blue-500"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mb-4 text-gray-400">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Easy Integration</h2>
            <p className="text-gray-400">Multiple ways to connect to our platform</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center"
              >
                <div className="mb-4 text-4xl">{integration.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white">{integration.name}</h3>
                <p className="text-sm text-gray-400">{integration.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gray-800 bg-gray-900 p-8">
            <h3 className="mb-4 text-xl font-semibold text-white">Quick Start Example</h3>
            <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-300">
              <code>{`import { GenAI } from '@genai/sdk';

const client = new GenAI({
  apiKey: process.env.GENAI_API_KEY
});

const response = await client.chat.create({
  model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Hello, world!' }
  ]
});

console.log(response.content);`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Use Cases</h2>
            <p className="text-gray-400">See how teams are using GenAI Platform</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-8"
              >
                <div className="mb-4 text-4xl">{useCase.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-white">{useCase.title}</h3>
                <p className="mb-4 text-gray-400">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Built for Performance</h2>
            <p className="text-gray-400">Industry-leading speed and reliability</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-400">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">&lt;200ms</div>
              <div className="text-sm text-gray-400">API Response Time</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">10M+</div>
              <div className="text-sm text-gray-400">Requests per Day</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">150+</div>
              <div className="text-sm text-gray-400">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Security & Compliance</h2>
            <p className="text-gray-400">Enterprise-grade security you can trust</p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {['SOC 2 Type II', 'GDPR', 'CCPA', 'ISO 27001', 'HIPAA Ready', 'PCI DSS', 'Privacy Shield', 'TLS 1.3'].map((cert, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center"
              >
                <div className="text-lg font-semibold text-white">{cert}</div>
              </div>
            ))}
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
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-100"
            >
              Start free trial
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-gray-700 px-8 py-4 text-lg font-semibold text-white hover:bg-gray-800"
            >
              View pricing
            </Link>
          </div>
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
