'use client';

import { useState } from 'react';
import type { InferenceRequest } from '@/types';

interface InferencePanelProps {
  onSubmit: (prompt: string, model: string, params: any) => Promise<void>;
  activeRequests: InferenceRequest[];
}

export default function InferencePanel({ onSubmit, activeRequests }: InferencePanelProps) {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(prompt, model, { temperature, maxTokens });
      setPrompt('');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">New Inference Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="mb-2 block text-sm font-medium text-gray-700">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your prompt here..."
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="model" className="mb-2 block text-sm font-medium text-gray-700">
              Model
            </label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-3-opus">Claude 3 Opus</option>
              <option value="claude-3-sonnet">Claude 3 Sonnet</option>
              <option value="llama-3-70b">Llama 3 70B</option>
            </select>
          </div>

          <div>
            <label htmlFor="maxTokens" className="mb-2 block text-sm font-medium text-gray-700">
              Max Tokens: {maxTokens}
            </label>
            <input
              id="maxTokens"
              type="range"
              min="100"
              max="4000"
              step="100"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="temperature" className="mb-2 block text-sm font-medium text-gray-700">
            Temperature: {temperature}
          </label>
          <input
            id="temperature"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={!prompt.trim() || isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      {activeRequests.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Active Requests</h3>
          <div className="space-y-2">
            {activeRequests.map((req) => (
              <div key={req.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 line-clamp-1">{req.prompt}</p>
                    <p className="mt-1 text-xs text-gray-500">{req.model}</p>
                  </div>
                  <span className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${statusColors[req.status]}`}>
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
