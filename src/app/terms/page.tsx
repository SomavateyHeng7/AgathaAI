'use client';

import Link from 'next/link';

export default function TermsOfService() {
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

            <Link
              href="/landing"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-4 text-4xl font-bold text-white">Terms of Service</h1>
        <p className="mb-8 text-gray-400">Last updated: January 19, 2026</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using GenAI Platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our Service.
            </p>
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">2. Description of Service</h2>
            <p className="mb-4">
              GenAI Platform provides access to multiple Large Language Models (LLMs) including GPT-4, Claude, and Llama through a unified API gateway. Our Service includes:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>API access to multiple AI models</li>
              <li>Rate-limited inference requests based on subscription tier</li>
              <li>Secure storage of prompt and response history</li>
              <li>Real-time chat interface</li>
              <li>Usage analytics and monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">3. User Accounts</h2>
            <h3 className="mb-2 text-xl font-semibold text-white">3.1 Account Creation</h3>
            <p className="mb-4">
              To use our Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
            </p>
            
            <h3 className="mb-2 text-xl font-semibold text-white">3.2 Account Security</h3>
            <p className="mb-4">
              You are responsible for safeguarding your password and API keys. You agree not to disclose your password or API keys to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent, abusive, or illegal activity.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">4. Subscription Plans and Billing</h2>
            <h3 className="mb-2 text-xl font-semibold text-white">4.1 Subscription Tiers</h3>
            <p className="mb-4">
              We offer multiple subscription tiers (Free, Pro, Plus, Enterprise) with different rate limits and features. Details are available on our pricing page.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">4.2 Payment</h3>
            <p className="mb-4">
              Paid subscriptions are billed in advance on a monthly or annual basis. You agree to pay all fees associated with your subscription tier.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">4.3 Refunds</h3>
            <p className="mb-4">
              Refunds are provided on a case-by-case basis. Please contact our support team for refund requests.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">4.4 Changes to Pricing</h3>
            <p>
              We reserve the right to modify our pricing with 30 days' notice. Continued use of the Service after price changes constitutes acceptance of the new pricing.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">5. Acceptable Use Policy</h2>
            <p className="mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Generate harmful, abusive, or illegal content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use the Service for competitive analysis or benchmarking</li>
              <li>Resell or redistribute API access without authorization</li>
              <li>Exceed rate limits through automated means</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">6. Rate Limits and Usage</h2>
            <p className="mb-4">
              Your usage is subject to rate limits based on your subscription tier. Rate limits include:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Requests per minute</li>
              <li>Concurrent requests</li>
              <li>Total monthly requests</li>
            </ul>
            <p className="mt-4">
              Exceeding rate limits may result in temporary throttling or suspension of service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">7. Intellectual Property</h2>
            <h3 className="mb-2 text-xl font-semibold text-white">7.1 Our IP</h3>
            <p className="mb-4">
              The Service and its original content, features, and functionality are owned by GenAI Platform and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">7.2 Your Content</h3>
            <p className="mb-4">
              You retain all rights to the prompts you submit and responses you receive. By using the Service, you grant us a limited license to process your prompts to provide the Service.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">7.3 Model Outputs</h3>
            <p>
              AI-generated content may not be unique. We do not claim ownership of model outputs, but you are responsible for ensuring your use complies with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">8. Data and Privacy</h2>
            <p className="mb-4">
              Your use of the Service is also governed by our Privacy Policy. We collect and process data as described in our Privacy Policy.
            </p>
            <p>
              We implement industry-standard security measures to protect your data, but no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">9. Disclaimers and Limitations</h2>
            <h3 className="mb-2 text-xl font-semibold text-white">9.1 Service Availability</h3>
            <p className="mb-4">
              We strive for high availability but do not guarantee uninterrupted access. The Service is provided "as is" without warranties of any kind.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">9.2 AI Model Limitations</h3>
            <p className="mb-4">
              AI models may produce inaccurate, biased, or inappropriate content. You are responsible for reviewing and validating all outputs before use.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">9.3 Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, GenAI Platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless GenAI Platform from any claims, damages, losses, liabilities, and expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">11. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service. Continued use after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">12. Termination</h2>
            <p className="mb-4">
              Either party may terminate this agreement at any time. Upon termination:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Your access to the Service will be revoked</li>
              <li>You remain responsible for any outstanding fees</li>
              <li>We may delete your data according to our retention policy</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which GenAI Platform operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">14. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <p className="mb-2">
                <strong className="text-white">Email:</strong> legal@genai-platform.com
              </p>
              <p className="mb-2">
                <strong className="text-white">Address:</strong> 123 AI Street, Tech City, TC 12345
              </p>
              <p>
                <strong className="text-white">Support:</strong> support@genai-platform.com
              </p>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex items-center justify-center gap-6 border-t border-gray-800 pt-8">
          <Link href="/privacy" className="text-sm text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
          <Link href="/landing" className="text-sm text-blue-400 hover:text-blue-300">
            Home
          </Link>
          <Link href="/pricing" className="text-sm text-blue-400 hover:text-blue-300">
            Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
