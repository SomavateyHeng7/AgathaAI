'use client';

import { useState } from 'react';
import { logout } from '@/lib/auth';
import type { User, PromptHistory } from '@/types';

interface SidebarProps {
  user: User;
  history: PromptHistory[];
  onSelectHistory: (item: PromptHistory) => void;
  onNewChat: () => void;
}

export default function Sidebar({ user, history, onSelectHistory, onNewChat }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tierColors = {
    free: 'text-gray-400',
    pro: 'text-blue-400',
    enterprise: 'text-purple-400',
  };

  return (
    <div className={`flex h-screen flex-col bg-gray-900 transition-all ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-gray-800 p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-sm font-bold text-white">AI</span>
            </div>
            <span className="text-sm font-semibold text-white">GenAI Platform</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-3 rounded-lg border border-gray-700 px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {!isCollapsed && <span>New chat</span>}
        </button>
      </div>

      {/* Navigation */}
      {!isCollapsed && (
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Models
          </div>
          
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>GPT-4</span>
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Claude 3</span>
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>Llama 3</span>
          </button>

          <div className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Recent Chats
          </div>

          {history.slice(0, 10).map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectHistory(item)}
              className="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800"
            >
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="line-clamp-2 flex-1">{item.prompt}</span>
            </button>
          ))}
        </nav>
      )}

      {/* User Profile */}
      {!isCollapsed && (
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">{user.email}</p>
              <p className={`text-xs font-medium uppercase ${tierColors[user.tier]}`}>{user.tier} Plan</p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
              title="Logout"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
