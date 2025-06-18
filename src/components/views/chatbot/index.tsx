"use client";

import { useEffect, useRef, useState } from "react";
import { FaRegUser, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { usePopulationStats } from "@/hook/demografi";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const stats = usePopulationStats();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || stats.loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.slice(-3), userMessage], // kirim 3 terakhir
          stats: {
            totalPopulation: stats.totalPopulation,
            menCount: stats.menCount,
            womenCount: stats.womenCount,
            averageAge: stats.averageAge,
            populationDensity: stats.populationDensity,
            growthRate: stats.growthRate,
          },
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Response bukan JSON: " + text);
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: error.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary text-third">
      <header className=" bg-primary border-b-2 border-third py-4 px-6 ">
        <h1 className="text-2xl font-semibold">
          MARG<span className="text-accent">AI</span> Chat
        </h1>
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <div className="flex-1 overflow-y-auto space-y-6">
          {messages.map((message, index) => {
            const isUser = message.role === "user";
            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                    <FaRobot />
                  </div>
                )}

                <div
                  className={`whitespace-pre-wrap px-4 py-3 rounded-2xl max-w-[75%] text-sm ${
                    isUser
                      ? "bg-accent text-primary rounded-br-none"
                      : "bg-secondary rounded-bl-none"
                  }`}
                >
                  {isUser ? (
                    message.content
                  ) : (
                    <div className="prose prose-invert text-sm">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                    <FaRegUser />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2 text-zinc-400 px-2">
              <div className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce delay-300"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-third bg-primary pt-4 mt-4 sticky bottom-0 "
        >
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-full bg-secondary px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent-hover text-primary px-4 py-2 rounded-full"
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
