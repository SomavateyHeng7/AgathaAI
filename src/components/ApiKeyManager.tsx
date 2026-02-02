'use client';

import { useState } from 'react';

interface ApiKeyManagerProps {
  apiKey: string;
  onRotate?: () => void;
}

export default function ApiKeyManager({ apiKey, onRotate }: ApiKeyManagerProps) {
  const [showFullKey, setShowFullKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayKey = showFullKey ? apiKey : `${apiKey.slice(0, 12)}...${apiKey.slice(-4)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">API Key Management</h2>
      
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your API Key
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={displayKey}
              readOnly
              className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-mono"
            />
            <button
              onClick={() => setShowFullKey(!showFullKey)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {showFullKey ? 'Hide' : 'Show'}
            </button>
            <button
              onClick={handleCopy}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-4">
          <div className="flex gap-3">
            <span className="text-yellow-600">⚠️</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">Keep your API key secure</p>
              <p className="mt-1 text-xs text-yellow-700">
                Never share your API key or commit it to version control. Rotate immediately if compromised.
              </p>
            </div>
          </div>
        </div>

        {onRotate && (
          <button
            onClick={onRotate}
            className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Rotate API Key
          </button>
        )}
      </div>
    </div>
  );
}
