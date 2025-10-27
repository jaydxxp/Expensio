import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

interface Expense {
  title: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

interface Props {
  isOpen: boolean;
}

interface Message {
  type: "user" | "ai";
  text: string;
}

export default function AIExpenseAssistant({ isOpen }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [fetchingExpenses, setFetchingExpenses] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && expenses.length === 0) {
      fetchExpenses();
    }
  }, [isOpen]);
  
  const Backendurl = import.meta.env.VITE_BACKEND_URL;
  
  const fetchExpenses = async () => {
    try {
      setFetchingExpenses(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${Backendurl}/api/v1/expense/allexpense`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.allExpense) {
        setExpenses(response.data.allExpense);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      const errorMessage: Message = {
        type: "ai",
        text: "Sorry, I couldn't load your expenses. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setFetchingExpenses(false);
    }
  };
  
  const callAI = async (userQuery: string, expenseData: Expense[]) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${Backendurl}/api/v1/expense/ai/query`,
        {
          query: userQuery,
          expenses: expenseData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return response.data.response;
      } else {
        throw new Error(response.data.message || "AI request failed");
      }
    } catch (error) {
      console.error("AI Error:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage: Message = { type: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const aiResponse = await callAI(query, expenses);
      const aiMessage: Message = { type: "ai", text: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const aiMessage: Message = {
        type: "ai",
        text: "Sorry, I couldn't process your request. Please try again.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-20 right-3 sm:right-5 flex flex-col items-end z-50">
      <div className="w-[280px] sm:w-80 h-[350px] sm:h-[450px] rounded-lg bg-[#171717] border border-[#282828] shadow-xl transition-all duration-300 flex flex-col">
        <div className="px-3 py-2 border-b border-[#282828]">
          <h2 className="text-sm sm:text-base font-semibold text-white">
            Expense Assistant
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-400">
            {fetchingExpenses
              ? "Loading expenses..."
              : expenses.length > 0
              ? `Analyzing ${expenses.length} expenses`
              : "No expenses found"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2">
          {messages.length === 0 && !fetchingExpenses && (
            <div className="text-center text-gray-500 text-xs sm:text-sm mt-6">
              <p>👋 Hi! I'm your expense assistant.</p>
              <p className="mt-1.5">Ask me about your expenses!</p>
            </div>
          )}

          {fetchingExpenses && (
            <div className="flex justify-center items-center h-full">
              <div className="text-gray-400 text-xs">Loading expenses...</div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-2 py-1.5 max-w-[85%] break-words text-xs sm:text-sm ${
                  msg.type === "user"
                    ? "bg-[#26e07f] text-black"
                    : "bg-[#1e1e1e] text-white border border-[#282828]"
                }`}
              >
                {msg.type === "ai" ? (
                  <div className="prose prose-invert prose-sm max-w-none [&>*]:break-words [&>*]:text-[11px] sm:[&>*]:text-xs [&>h1]:text-xs [&>h2]:text-[11px] [&>h3]:text-[10px] [&>p]:text-[11px] sm:[&>p]:text-xs [&>ul]:text-[11px] sm:[&>ul]:text-xs [&>ol]:text-[11px] sm:[&>ol]:text-xs [&>ul]:pl-3 [&>ol]:pl-3">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#1e1e1e] border border-[#282828] rounded-lg px-2 py-1.5 text-gray-400 text-xs">
                <div className="flex space-x-1">
                  <span className="animate-bounce text-[10px]">●</span>
                  <span
                    className="animate-bounce text-[10px]"
                    style={{ animationDelay: "0.1s" }}
                  >
                    ●
                  </span>
                  <span
                    className="animate-bounce text-[10px]"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ●
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2 sm:p-2.5 border-t border-[#282828]">
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="Ask about expenses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={fetchingExpenses || expenses.length === 0}
              className="flex-1 bg-[#1e1e1e] border border-[#282828] rounded-lg px-2 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#26e07f] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={
                loading ||
                !query.trim() ||
                fetchingExpenses ||
                expenses.length === 0
              }
              className="bg-[#26e07f] text-black px-2 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#2df08c] transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}