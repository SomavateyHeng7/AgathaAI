'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SubscribeSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <svg
            className="h-10 w-10 text-green-500"
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
        </div>

        {/* Success Message */}
        <h1 className="mb-4 text-3xl font-bold text-white">
          Subscription Successful!
        </h1>
        <p className="mb-8 text-gray-400">
          Thank you for subscribing to AgathaAI. Your account has been upgraded
          and you now have access to all premium features.
        </p>

        {/* Features List */}
        <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-left">
          <h2 className="mb-4 text-lg font-semibold text-white">
            What's included:
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
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
              <span className="text-sm text-gray-300">
                Access to advanced AI models (GPT-4, Claude, Gemini)
              </span>
            </li>
            <li className="flex items-start">
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
              <span className="text-sm text-gray-300">
                Higher rate limits and concurrent requests
              </span>
            </li>
            <li className="flex items-start">
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
              <span className="text-sm text-gray-300">
                Extended chat history retention
              </span>
            </li>
            <li className="flex items-start">
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
              <span className="text-sm text-gray-300">
                Priority support and advanced analytics
              </span>
            </li>
          </ul>
        </div>

        {/* Redirect Info */}
        <p className="mb-6 text-sm text-gray-500">
          Redirecting to chat in {countdown} seconds...
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white hover:from-blue-700 hover:to-purple-700"
          >
            Start Chatting
          </Link>
          <Link
            href="/subscribe"
            className="rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            View Subscription
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-sm text-gray-500">
          Need help?{' '}
          <a
            href="mailto:support@agathaai.com"
            className="text-blue-400 hover:text-blue-300"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
