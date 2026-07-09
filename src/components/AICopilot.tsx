import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, AlertCircle, RefreshCw, KeyRound } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your Senior Data Science Mentor & ML Co-pilot. I am here to help you defend your Internship Project on **Customer Segmentation using K-Means Clustering**. Ask me anything about Python code, Elbow metrics, silhouette validation, or targeted marketing strategies!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Explain how Silhouette score is calculated.",
    "Recommend strategies for Conservative Savers.",
    "Why is standard scaling necessary for K-Means?",
    "Explain the K-Means WCSS formula.",
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to fetch response.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error: any) {
      console.error("Co-pilot error:", error);
      // Custom formatting for common missing secret key error
      if (error.message && error.message.includes("GEMINI_API_KEY")) {
        setErrorMessage("The GEMINI_API_KEY is not configured in this workspace. Please click 'Settings > Secrets' in the top bar of AI Studio to add your Gemini API Key.");
      } else {
        setErrorMessage(error.message || "Something went wrong. Please check your network connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div id="ai-copilot" className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[550px]">
      {/* Suggestions Column */}
      <div className="lg:col-span-4 bg-[#111113] p-5 rounded-3xl border border-[#27272a] flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#27272a] pb-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h4 className="font-bold text-[#fafafa] text-sm">Suggested Prompts</h4>
          </div>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Click any core concept below to consult the AI Lead Data Scientist on model mathematics or retail strategies:
          </p>
          <div className="flex flex-col gap-2 pt-1">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                id={`btn-suggested-prompt-${idx}`}
                onClick={() => handleSend(q)}
                className="w-full text-left p-3 bg-[#1c1c1f] hover:bg-[#27272a] border border-[#27272a] rounded-xl text-xs font-semibold text-[#a1a1aa] hover:text-[#fafafa] transition-all text-ellipsis overflow-hidden cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* API Key Guide Widget */}
        <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 text-[11px] text-indigo-400 space-y-2">
          <div className="flex items-center gap-1.5 font-bold">
            <KeyRound className="h-4 w-4" />
            <span>Developer AI Secrets Policy</span>
          </div>
          <p className="leading-relaxed">
            All AI interactions run server-side in a secure sandbox container. Your personal Gemini API key is never exposed to client browsers or network logs.
          </p>
        </div>
      </div>

      {/* Chat terminal column */}
      <div className="lg:col-span-8 bg-[#111113] border border-[#27272a] rounded-3xl flex flex-col justify-between overflow-hidden h-full">
        {/* Terminal Header */}
        <div className="bg-[#161618] px-5 py-4 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-bold text-[#fafafa]">Senior Data Science Advisor</span>
          </div>
          <span className="text-[10px] font-mono text-[#71717a]">Gemini 2.5 Flash Model</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 h-8 w-8 ${
                  msg.role === "user" ? "bg-indigo-500/20 text-indigo-400" : "bg-[#1c1c1f] text-[#a1a1aa]"
                }`}
              >
                {msg.role === "user" ? "U" : <Bot className="h-4 w-4 text-[#fafafa]" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-justify leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-[#1c1c1f] text-[#fafafa]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="p-2.5 rounded-xl bg-[#1c1c1f] flex items-center justify-center h-8 w-8">
                <Bot className="h-4 w-4 text-[#71717a]" />
              </div>
              <div className="bg-[#1c1c1f] p-4 rounded-2xl flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 bg-[#71717a] rounded-full animate-bounce"></div>
                  <div className="h-1.5 w-1.5 bg-[#71717a] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-1.5 w-1.5 bg-[#71717a] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="text-xs text-[#71717a] italic">Advisor is calculating centroids...</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 text-xs text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form Bar */}
        <div className="p-4 border-t border-[#27272a] bg-[#161618]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-3"
          >
            <input
              id="chat-input"
              type="text"
              placeholder="Ask about silhouette scores, elbow plots, target campaigns..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black/20 border border-[#27272a] rounded-xl px-4 py-2.5 text-xs text-[#fafafa] placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              id="btn-chat-send"
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-40 rounded-xl cursor-pointer transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
