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

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `msg_${Date.now()}_response`,
        role: 'assistant',
        content: `This is a simulated response from ${model}. In production, this would be the actual model output based on your prompt.\n\nThe response would include detailed information, code examples, explanations, or whatever you requested. The LLM would process your request through the API gateway, handle rate limiting, and return the result securely.`,
        model,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);

      // Add to history
      const historyItem: PromptHistory = {
        id: userMessage.id,
        prompt,
        response: assistantMessage.content,
        model: model.toLowerCase().replace(/\s+/g, '-'),
        status: 'completed',
        tokensUsed: Math.floor(Math.random() * 500) + 100,
        processingTime: Math.random() * 3 + 0.5,
        createdAt: new Date(),
      };
      
      setHistory(prev => [historyItem, ...prev]);
    }, 2000);
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
