'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
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
        <h1 className="mb-4 text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="mb-8 text-gray-400">Last updated: January 19, 2026</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">1. Introduction</h2>
            <p className="mb-4">
              GenAI Platform ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
            <p>
              Please read this Privacy Policy carefully. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">2. Information We Collect</h2>
            
            <h3 className="mb-2 text-xl font-semibold text-white">2.1 Personal Information</h3>
            <p className="mb-4">We collect the following personal information:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li><strong className="text-white">Account Information:</strong> Name, email address, password (encrypted)</li>
              <li><strong className="text-white">Billing Information:</strong> Payment method details, billing address</li>
              <li><strong className="text-white">Profile Information:</strong> Subscription tier, preferences, settings</li>
            </ul>

            <h3 className="mb-2 text-xl font-semibold text-white">2.2 Usage Data</h3>
            <p className="mb-4">We automatically collect certain information when you use our Service:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li><strong className="text-white">API Usage:</strong> Prompts, responses, model selections, timestamps</li>
              <li><strong className="text-white">Technical Data:</strong> IP address, browser type, device information</li>
              <li><strong className="text-white">Performance Data:</strong> Response times, error rates, usage patterns</li>
              <li><strong className="text-white">Analytics:</strong> Feature usage, session duration, navigation paths</li>
            </ul>

            <h3 className="mb-2 text-xl font-semibold text-white">2.3 Cookies and Tracking</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">3. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information for various purposes:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>To provide and maintain our Service</li>
              <li>To process your API requests and deliver responses</li>
              <li>To manage your account and subscription</li>
              <li>To process payments and prevent fraud</li>
              <li>To send you technical notices and support messages</li>
              <li>To monitor usage and improve our Service</li>
              <li>To detect and prevent abuse or violations of our Terms</li>
              <li>To comply with legal obligations</li>
              <li>To send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">4. Data Storage and Retention</h2>
            
            <h3 className="mb-2 text-xl font-semibold text-white">4.1 Storage Location</h3>
            <p className="mb-4">
              Your data is stored on secure servers in data centers that comply with industry standards. We use encryption both in transit (TLS 1.3) and at rest (AES-256).
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">4.2 Retention Period</h3>
            <p className="mb-4">We retain your data as follows:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li><strong className="text-white">Account Data:</strong> Until account deletion</li>
              <li><strong className="text-white">Prompt History:</strong> Based on subscription tier (7-90 days, or unlimited for Enterprise)</li>
              <li><strong className="text-white">Billing Records:</strong> 7 years for tax compliance</li>
              <li><strong className="text-white">Usage Logs:</strong> 90 days for security and debugging</li>
            </ul>

            <h3 className="mb-2 text-xl font-semibold text-white">4.3 Data Deletion</h3>
            <p>
              You can request deletion of your data at any time. We will delete your data within 30 days, except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">5. Data Sharing and Disclosure</h2>
            
            <h3 className="mb-2 text-xl font-semibold text-white">5.1 Third-Party Service Providers</h3>
            <p className="mb-4">We share data with trusted third parties who assist us in operating our Service:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li><strong className="text-white">AI Model Providers:</strong> OpenAI, Anthropic, Meta (for processing your requests)</li>
              <li><strong className="text-white">Payment Processors:</strong> Stripe, PayPal (for billing)</li>
              <li><strong className="text-white">Cloud Infrastructure:</strong> AWS, Google Cloud (for hosting)</li>
              <li><strong className="text-white">Analytics:</strong> Google Analytics (for usage insights)</li>
            </ul>

            <h3 className="mb-2 text-xl font-semibold text-white">5.2 Legal Requirements</h3>
            <p className="mb-4">
              We may disclose your information if required by law, court order, or government request, or to protect our rights and safety.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">5.3 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before your data is transferred and becomes subject to a different Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">6. Data Security</h2>
            <p className="mb-4">We implement comprehensive security measures:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li><strong className="text-white">Encryption:</strong> TLS 1.3 for data in transit, AES-256 for data at rest</li>
              <li><strong className="text-white">Access Controls:</strong> Role-based access, multi-factor authentication</li>
              <li><strong className="text-white">Monitoring:</strong> 24/7 security monitoring and intrusion detection</li>
              <li><strong className="text-white">Audits:</strong> Regular security audits and penetration testing</li>
              <li><strong className="text-white">Compliance:</strong> SOC 2 Type II certified</li>
            </ul>
            <p>
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">7. Your Privacy Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights:</p>
            
            <h3 className="mb-2 text-xl font-semibold text-white">7.1 Access and Portability</h3>
            <p className="mb-4">
              You have the right to access your personal data and request a copy in a portable format.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">7.2 Correction</h3>
            <p className="mb-4">
              You can update your account information at any time through your account settings.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">7.3 Deletion</h3>
            <p className="mb-4">
              You can request deletion of your account and associated data. Some data may be retained for legal compliance.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">7.4 Opt-Out</h3>
            <p className="mb-4">
              You can opt out of marketing communications at any time by clicking the unsubscribe link in emails or updating your preferences.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-white">7.5 Do Not Track</h3>
            <p>
              We currently do not respond to Do Not Track signals, but you can disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">8. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Privacy Shield certification (where applicable)</li>
              <li>Adequacy decisions by relevant authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">9. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">10. California Privacy Rights (CCPA)</h2>
            <p className="mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to deletion of personal information</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">11. European Privacy Rights (GDPR)</h2>
            <p className="mb-4">
              If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">12. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending you an email notification for material changes</li>
            </ul>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">13. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <p className="mb-2">
                <strong className="text-white">Email:</strong> privacy@genai-platform.com
              </p>
              <p className="mb-2">
                <strong className="text-white">Data Protection Officer:</strong> dpo@genai-platform.com
              </p>
              <p className="mb-2">
                <strong className="text-white">Address:</strong> 123 AI Street, Tech City, TC 12345
              </p>
              <p>
                <strong className="text-white">Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">14. Complaints</h2>
            <p>
              If you believe we have not handled your personal information properly, you have the right to lodge a complaint with your local data protection authority.
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex items-center justify-center gap-6 border-t border-gray-800 pt-8">
          <Link href="/terms" className="text-sm text-blue-400 hover:text-blue-300">
            Terms of Service
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
