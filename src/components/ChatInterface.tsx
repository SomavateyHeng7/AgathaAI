"use client";

import { useState, useRef, useEffect } from "react";
import type { PromptHistory } from "@/types";
import Dialog from "./Dialog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSubmit: (prompt: string, model: string) => Promise<void>;
  messages: Message[];
  isProcessing: boolean;
}

export default function ChatInterface({
  onSubmit,
  messages,
  isProcessing,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-4");
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const prompt = input;
    setInput("");
    await onSubmit(prompt, selectedModel);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>GPT-4</option>
            <option>GPT-3.5 Turbo</option>
            <option>GPT-4o</option>
            <option>Gemini Pro</option>
            <option>Gemini 1.5 Pro</option>
            <option>DeepSeek Chat</option>
            <option>DeepSeek Coder</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSettingsDialog(true)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
            title="Settings"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <button 
            onClick={() => setShowProfileDialog(true)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
            title="Profile"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog
        isOpen={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
        title="Chat Settings"
        size="md"
        actions={
          <button
            onClick={() => setShowSettingsDialog(false)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Default Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>GPT-4</option>
              <option>GPT-3.5 Turbo</option>
              <option>GPT-4o</option>
              <option>Gemini Pro</option>
              <option>Gemini 1.5 Pro</option>
              <option>DeepSeek Chat</option>
              <option>DeepSeek Coder</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Temperature
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              defaultValue="0.7"
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>Precise</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Max Response Length
            </label>
            <select className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Short (256 tokens)</option>
              <option>Medium (512 tokens)</option>
              <option>Long (1024 tokens)</option>
              <option>Very Long (2048 tokens)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Stream Responses</p>
              <p className="text-xs text-gray-500">Show responses as they generate</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Save Chat History</p>
              <p className="text-xs text-gray-500">Store conversations for later</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
            </label>
          </div>
        </div>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog
        isOpen={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
        title="User Profile"
        size="md"
        actions={
          <button
            onClick={() => setShowProfileDialog(false)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white">
              U
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">User Account</h3>
              <p className="text-sm text-gray-400">user@example.com</p>
            </div>
          </div>

          <div className="space-y-3 rounded-lg bg-gray-800 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Account Type</span>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                PRO
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Member Since</span>
              <span className="text-sm text-white">January 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total Requests</span>
              <span className="text-sm text-white">1,234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">API Key</span>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View & Manage
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Edit Profile
            </button>
            <button className="w-full rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Change Password
            </button>
            <button className="w-full rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Billing & Subscription
            </button>
          </div>
        </div>
      </Dialog>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4">
            <h1 className="mb-8 text-4xl font-semibold text-white">
              What's on your mind today?
            </h1>

            <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              <button className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-left hover:bg-gray-800">
                <p className="text-sm font-medium text-white">
                  Explain quantum computing
                </p>
                <p className="mt-1 text-xs text-gray-400">in simple terms</p>
              </button>
              <button className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-left hover:bg-gray-800">
                <p className="text-sm font-medium text-white">
                  Write a Python function
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  to calculate fibonacci
                </p>
              </button>
              <button className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-left hover:bg-gray-800">
                <p className="text-sm font-medium text-white">
                  Design a REST API
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  for user authentication
                </p>
              </button>
              <button className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-left hover:bg-gray-800">
                <p className="text-sm font-medium text-white">
                  Optimize database queries
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  for better performance
                </p>
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-8">
            {messages.map((message) => (
              <div key={message.id} className="mb-8">
                <div className="mb-2 flex items-center gap-3">
                  {message.role === "user" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                      U
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                      AI
                    </div>
                  )}
                  <span className="text-sm font-semibold text-white">
                    {message.role === "user"
                      ? "You"
                      : message.model || "Assistant"}
                  </span>
                </div>
                <div className="ml-11 text-gray-300 whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="mb-8">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                    AI
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {selectedModel}
                  </span>
                </div>
                <div className="ml-11 flex items-center gap-2 text-gray-400">
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className=" p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="relative flex items-center gap-3 rounded-2xl border border-gray-700 bg-gray-900 px-4 py-3 focus-within:border-gray-600">
            <button type="button" className="text-gray-400 hover:text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              disabled={isProcessing}
            />

            <button type="button" className="text-gray-400 hover:text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>

            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="rounded-lg bg-white p-2 text-gray-900 hover:bg-gray-200 disabled:opacity-50"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-gray-500">
            AgathaAI Platform can make mistakes. Check important info.
          </p>
        </form>
      </div>
    </div>
  );
}
