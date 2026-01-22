'use client';

import { useState } from 'react';
import type { PromptHistory } from '@/types';

interface HistoryPanelProps {
  history: PromptHistory[];
  onDelete?: (id: string) => void;
}

export default function HistoryPanel({ history, onDelete }: HistoryPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.model.includes(filter));

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Request History</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Models</option>
          <option value="gpt">GPT Models</option>
          <option value="claude">Claude Models</option>
          <option value="llama">Llama Models</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">No history yet</p>
        ) : (
          filteredHistory.map((item) => (
            <div key={item.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">
                      {item.model}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900 line-clamp-2">
                    {item.prompt}
                  </p>
                  
                  {expandedId === item.id && (
                    <div className="mt-3 rounded-lg bg-white p-3">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.response}</p>
                      <div className="mt-3 flex gap-4 text-xs text-gray-500">
                        <span>Tokens: {item.tokensUsed}</span>
                        <span>Time: {item.processingTime}s</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-3 flex gap-2">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {expandedId === item.id ? 'Hide' : 'View'}
                  </button>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
