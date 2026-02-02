import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  history: any[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setHistory: (history: any[]) => void;
}

function reviveMessages(messages: any[]): Message[] {
  return messages.map((msg) => ({
    ...msg,
    timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
  }));
}

export const useChatStore = create<ChatState>(
  persist(
    (set, get) => ({
      messages: [],
      history: [],
      setMessages: (messages) => set({ messages }),
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: [] }),
      setHistory: (history) => set({ history }),
    }),
    {
      name: "chat-storage",
      merge: (persistedState, currentState) => {
        if (!persistedState) return currentState;
        return {
          ...currentState,
          ...persistedState,
          messages: reviveMessages((persistedState as any).messages || []),
        };
      },
    },
  ),
);