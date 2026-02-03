'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-xl font-bold text-white">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">GenAI Platform</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/landing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Home
              </Link>
              <Link href="/features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/signin"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-white dark:bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-200"
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
          <h1 className="mb-6 text-6xl font-bold text-gray-900 dark:text-white">
            Enterprise LLM Platform
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Built for Scale
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
            Access GPT-4, Claude, Llama, and more through a single, secure API gateway.
            <br />
            Built for developers, trusted by enterprises.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-block rounded-lg bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
            >
              Start free trial
            </Link>
            <Link
              href="/signin"
              className="inline-block rounded-lg border border-gray-300 dark:border-gray-700 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              View demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Everything you need to build with AI
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sub-second response times with optimized routing and caching
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
                <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                SOC 2 compliant with end-to-end encryption and audit logs
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/20">
                <svg className="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Auto-Scaling</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Handle millions of requests with automatic infrastructure scaling
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="mb-12 text-center text-gray-600 dark:text-gray-400">
            <Link href="/pricing" className="text-blue-400 hover:text-blue-300">
              View detailed pricing comparison →
            </Link>
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Free</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">$0</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="mb-8 space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  10 requests/min
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  2 concurrent requests
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  7 days history
                </li>
              </ul>
              <Link
                href="/signup"
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 py-3 text-center font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Get started
              </Link>
            </div>

            <div className="rounded-2xl border-2 border-blue-500 bg-white dark:bg-gray-900 p-8">
              <div className="mb-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                POPULAR
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Pro</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">$49</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="mb-8 space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100 requests/min
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  10 concurrent requests
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  30 days history
                </li>
              </ul>
              <Link
                href="/signup"
                className="block w-full rounded-lg bg-gray-900 dark:bg-white py-3 text-center font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
              >
                Get started
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Enterprise</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">Custom</span>
              </div>
              <ul className="mb-8 space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited requests
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  50 concurrent requests
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <Link
                href="/signup"
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 py-3 text-center font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 GenAI Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
