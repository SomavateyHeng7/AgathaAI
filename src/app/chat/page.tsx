"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "@/components/ui/theme-provider";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  created_at?: string;
}

interface Conversation {
  id: string;
  title: string;
  model: string;
  message_count: number;
  updated_at: string;
}

const modelOptions = [
  { value: "gpt-4", label: "GPT-4", provider: "OpenAI" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI" },
  { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash", provider: "Google" },
  { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash", provider: "Google" },
];

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<
    string | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      loadConversations();

      // Restore last conversation from localStorage
      const lastConversationId = localStorage.getItem("lastConversationId");
      if (lastConversationId) {
        loadConversation(lastConversationId);
      }
    }
  }, [status, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const res = await fetch("/api/chat/conversations");
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const loadConversation = async (conversationId: string) => {
    try {
      const res = await fetch(`/api/chat/conversations/${conversationId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setCurrentConversationId(conversationId);
        setSelectedModel(data.conversation.model);

        // Save to localStorage for persistence on refresh
        localStorage.setItem("lastConversationId", conversationId);
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: currentConversationId,
          message: input,
          model: selectedModel,
        }),
      });

      if (res.ok) {
        const data = await res.json();

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
          model: data.model,
          created_at: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        if (!currentConversationId) {
          setCurrentConversationId(data.conversationId);
          localStorage.setItem("lastConversationId", data.conversationId);
          loadConversations();
        }
      } else {
        const error = await res.json();
        alert(error.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Chat error:", error);
      alert("Failed to send message");
    } finally {
      setIsProcessing(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    localStorage.removeItem("lastConversationId");
  };

  const deleteConversation = async (id: string) => {
    setConversationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!conversationToDelete) return;

    try {
      const res = await fetch(
        `/api/chat/conversations/${conversationToDelete}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        if (currentConversationId === conversationToDelete) {
          startNewChat();
        } else {
          // If deleting a different conversation, just reload the list
          loadConversations();
        }
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    } finally {
      setDeleteDialogOpen(false);
      setConversationToDelete(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-gray-200 dark:border-gray-800">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 hover:bg-blue-700 dark:hover:bg-gray-200"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <h3 className="mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Recent Chats
          </h3>
          {conversations.map((conv) => (
            <div key={conv.id} className="group relative mb-1">
              <button
                onClick={() => loadConversation(conv.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  currentConversationId === conv.id
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span className="flex-1 truncate">{conv.title}</span>
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  {conv.message_count} messages · {conv.model}
                </div>
              </button>
              <button
                onClick={() => deleteConversation(conv.id)}
                className="absolute right-2 top-2 hidden rounded p-1 hover:bg-gray-300 dark:hover:bg-gray-700 group-hover:block"
              >
                <svg
                  className="h-4 w-4 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-3">
          <div className="flex items-center gap-2 rounded-lg px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {session?.user?.name || "User"}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {(session?.user as any)?.tier || "free"}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              title="Sign out"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {modelOptions.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label} ({model.provider})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="text-sm text-gray-600 dark:text-gray-400">GenAI Platform</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
              AI
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-4">
              <h1 className="mb-8 text-4xl font-semibold text-gray-900 dark:text-white">
                What's on your mind today?
              </h1>

              <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Explain quantum computing",
                    subtitle: "in simple terms",
                  },
                  {
                    title: "Write a Python function",
                    subtitle: "to calculate fibonacci",
                  },
                  {
                    title: "Design a REST API",
                    subtitle: "for user authentication",
                  },
                  {
                    title: "Optimize database queries",
                    subtitle: "for better performance",
                  },
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(suggestion.title)}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {suggestion.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {suggestion.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl px-4 py-8">
              {messages.map((message, idx) => (
                <div key={idx} className="mb-8">
                  <div className="mb-2 flex items-center gap-3">
                    {message.role === "user" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        {session?.user?.name?.[0] || "U"}
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                        AI
                      </div>
                    )}
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {message.role === "user"
                        ? "You"
                        : message.model || "Assistant"}
                    </span>
                  </div>
                  <div className="ml-11 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
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
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedModel}
                    </span>
                  </div>
                  <div className="ml-11 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400"
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
        <div className=" border-gray-200 dark:border-gray-800 p-4">
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
            <div className="relative flex items-center gap-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 focus-within:border-blue-500 dark:focus-within:border-gray-600">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything"
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                disabled={isProcessing}
              />

              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="rounded-lg bg-blue-600 dark:bg-white p-2 text-white dark:text-gray-900 hover:bg-blue-700 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-500">
              AgathaAI Platform can make mistakes. Check important info.
            </p>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => {
            setDeleteDialogOpen(false);
            setConversationToDelete(null);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white dark:bg-[#2f2f2f] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              Delete chat?
            </h3>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
              This will delete{" "}
              <strong>
                {conversations.find((c) => c.id === conversationToDelete)
                  ?.title || "this conversation"}
              </strong>
              .
            </p>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Visit settings to delete any memories saved during this chat.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setConversationToDelete(null);
                }}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#3f3f3f] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-[#d92d20] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#c02717] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
