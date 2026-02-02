'use client';

import { useState } from 'react';
import { logout } from '@/lib/auth';
import type { User, PromptHistory } from '@/types';
import Dialog, { ConfirmDialog } from './Dialog';

interface SidebarProps {
  user: User;
  history: PromptHistory[];
  onSelectHistory: (item: PromptHistory) => void;
  onNewChat: () => void;
}

export default function Sidebar({ user, history, onSelectHistory, onNewChat }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showModelDialog, setShowModelDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const tierColors = {
    free: 'text-gray-400',
    pro: 'text-blue-400',
    enterprise: 'text-purple-400',
  };

  const models = [
    { 
      id: 'gpt-4', 
      name: 'GPT-4', 
      description: 'Most capable model, best for complex tasks',
      icon: '🧠',
      tier: 'free'
    },
    { 
      id: 'claude-3', 
      name: 'Claude 3', 
      description: 'Excellent for analysis and creative writing',
      icon: '⚡',
      tier: 'pro'
    },
    { 
      id: 'llama-3', 
      name: 'Llama 3', 
      description: 'Fast and efficient open-source model',
      icon: '🦙',
      tier: 'free'
    },
    { 
      id: 'gpt-4o', 
      name: 'GPT-4o', 
      description: 'Optimized for speed and efficiency',
      icon: '🚀',
      tier: 'pro'
    },
    { 
      id: 'gemini-pro', 
      name: 'Gemini Pro', 
      description: 'Google\'s advanced multimodal model',
      icon: '💎',
      tier: 'pro'
    },
  ];

  const handleModelClick = (modelId: string) => {
    setSelectedModel(modelId);
    setShowModelDialog(true);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
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
          
          {models.slice(0, 3).map((model) => (
            <button 
              key={model.id}
              onClick={() => handleModelClick(model.id)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
            >
              <span className="text-lg">{model.icon}</span>
              <span>{model.name}</span>
            </button>
          ))}

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
              onClick={() => setShowLogoutDialog(true)}
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

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out? Any unsaved changes will be lost."
        confirmText="Log out"
        cancelText="Stay logged in"
        variant="warning"
      />

      {/* Model Info Dialog */}
      <Dialog
        isOpen={showModelDialog}
        onClose={() => setShowModelDialog(false)}
        title="Model Information"
        size="md"
        actions={
          <button
            onClick={() => setShowModelDialog(false)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Got it
          </button>
        }
      >
        {selectedModel && (
          <div className="space-y-4">
            {models.map((model) => {
              if (model.id === selectedModel) {
                return (
                  <div key={model.id}>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-4xl">{model.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                        <p className="text-sm text-gray-400">{model.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 rounded-lg bg-gray-800 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Availability</span>
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-400">
                          Available
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Required Tier</span>
                        <span className={`text-sm font-semibold uppercase ${
                          model.tier === 'free' ? 'text-gray-400' : 
                          model.tier === 'pro' ? 'text-blue-400' : 
                          'text-purple-400'
                        }`}>
                          {model.tier}+
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Response Time</span>
                        <span className="text-sm text-white">~2-5 seconds</span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                      <p className="text-sm text-blue-300">
                        💡 <strong>Tip:</strong> Select this model from the dropdown in the chat interface to start using it.
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </Dialog>
    </div>
  );
}
