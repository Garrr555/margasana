"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  text: string;
  role: "user" | "bot";
  timestamp: Date;
}

export default function AiView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const API_KEY:any = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleSendMessages = async () => {
    if (!userInput.trim()) return;
    try {
      const userMessage: Message = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setUserInput("");

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userInput }] }],
      });

      const botMessage: Message = {
        text: result.response.text(),
        role: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Send message error:", error);
      setError("Failed to send message. Check API request format.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessages();
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 rounded-xl bg-secondary">
      <h1 className="text-2xl font-bold text-accent">MargaAI Chat</h1>
      <div className="flex-1 overflow-y-auto bg-primary rounded-md p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`p-2 rounded-lg my-2 ${
                msg.role === "user"
                  ? "bg-accent text-primary"
                  : "bg-secondary text-white/80"
              }`}
            >
              {msg.text}
            </span>
            <p className="text-xs text-accent-hover mt-1">
              {msg.role === "bot" ? "Bot" : "You"} -{" "}
              {msg.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type Message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 text-white/80 bg-primary p-2 rounded-l-md border border-accent focus:outline-none"
        />
        <button
          onClick={handleSendMessages}
          className="p-2 border border-accent bg-accent text-primary rounded-r-md hover:bg-opacity-80 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}
