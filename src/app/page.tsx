'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import ProtectedRoute from '@/components/ProtectedRoute';
import { mockUser, mockHistory } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import type { PromptHistory, User } from '@/types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: Date;
}

export default function Home() {
  const [user, setUser] = useState<User>(mockUser);
  const [history, setHistory] = useState<PromptHistory[]>(mockHistory);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load user from localStorage if authenticated
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email) {
      setUser({
        id: 'user_' + Date.now(),
        email: currentUser.email,
        tier: currentUser.tier || 'free',
        apiKey: currentUser.apiKey || mockUser.apiKey,
      });
    }

    // Prevent body scroll on chat page
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scroll when leaving chat page
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async (prompt: string, model: string) => {
    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Map UI model names to API model names
      const modelMap: Record<string, string> = {
        'GPT-4': 'gpt-4',
        'GPT-3.5 Turbo': 'gpt-3.5-turbo',
        'GPT-4o': 'gpt-4o',
        'Gemini Pro': 'gemini-1.5-flash',
        'Gemini 1.5 Pro': 'gemini-1.5-pro',
        'DeepSeek Chat': 'deepseek-chat',
        'DeepSeek Coder': 'deepseek-coder',
      };

      const apiModel = modelMap[model] || 'gpt-3.5-turbo';

      // Import API client
      const { apiClient } = await import('@/lib/api-client');

      // Submit inference request
      const inferenceRequest = await apiClient.submitInference({
        prompt,
        model: apiModel,
        parameters: {
          temperature: 0.7,
          maxTokens: 2000,
        },
      });

      // Poll for result
      const response = await apiClient.pollForResult(inferenceRequest.id);

      // Add assistant message
      const assistantMessage: Message = {
        id: inferenceRequest.id,
        role: 'assistant',
        content: response,
        model,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);

      // Add to history
      const historyItem: PromptHistory = {
        id: userMessage.id,
        prompt,
        response: response,
        model: model.toLowerCase().replace(/\s+/g, '-'),
        status: 'completed',
        tokensUsed: Math.floor(Math.random() * 500) + 100,
        processingTime: Math.random() * 3 + 0.5,
        createdAt: new Date(),
      };
      
      setHistory(prev => [historyItem, ...prev]);
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}.\n\nPlease make sure:\n1. Your API keys are configured in .env.local\n2. The database is running\n3. The backend server is running\n\nFor setup instructions, see CHAT_INTEGRATION_GUIDE.md`,
        model,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsProcessing(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleSelectHistory = (item: PromptHistory) => {
    setMessages([
      {
        id: `${item.id}_user`,
        role: 'user',
        content: item.prompt,
        timestamp: item.createdAt,
      },
      {
        id: `${item.id}_assistant`,
        role: 'assistant',
        content: item.response,
        model: item.model,
        timestamp: item.createdAt,
      },
    ]);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-gray-950">
        <Sidebar
          user={user}
          history={history}
          onSelectHistory={handleSelectHistory}
          onNewChat={handleNewChat}
        />
        <div className="flex-1">
          <ChatInterface
            onSubmit={handleSubmit}
            messages={messages}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
