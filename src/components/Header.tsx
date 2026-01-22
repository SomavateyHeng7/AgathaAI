'use client';

import type { User } from '@/types';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const tierColors = {
    free: 'bg-gray-100 text-gray-800',
    pro: 'bg-blue-100 text-blue-800',
    enterprise: 'bg-purple-100 text-purple-800',
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-xl font-bold text-white">AI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GenAI Platform</h1>
              <p className="text-sm text-gray-500">LLM-as-a-Service</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${tierColors[user.tier]}`}>
              {user.tier}
            </span>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-500">API Key: {user.apiKey.slice(0, 12)}...</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
