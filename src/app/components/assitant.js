"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { ChatBotIcon } from "./ChatIcon";
import { X } from "lucide-react";

export default function AssistantModal({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setMessages([
      { role: "assistant", text: "Hi, I am ViVA. How can I help you today?" },
    ]);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAsk = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.text }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        result += chunk;

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [...prev.slice(0, -1), { role: "assistant", text: result }];
          } else {
            return [...prev, { role: "assistant", text: result }];
          }
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[transparent] bg-opacity-50 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700 shadow-xl rounded-2xl w-full max-w-xl mx-4 h-[70vh] flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-slate-200 font-semibold">Chat with ViVA</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 custom-scroll">
          {messages.map((msg, i) => (
            <ChatMessage key={i} msg={msg} />
          ))}
          {loading && (
            <motion.div
              className="flex items-center gap-2 text-slate-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce delay-150"></div>
              </div>
              <span>ViVA is typing...</span>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center rounded-xl bg-slate-800/60 px-4 py-2 ring-1 ring-slate-700 focus-within:ring-2 focus-within:ring-purple-500 transition">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              placeholder="Ask something..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500"
              disabled={loading}
            />
            <button
              onClick={handleAsk}
              disabled={loading || !input.trim()}
              className={`p-2 rounded-md transition-all ${
                loading || !input.trim()
                  ? "text-slate-500"
                  : "text-purple-300 hover:text-white"
              }`}
            >
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ChatMessage({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="pt-1">
          <ChatBotIcon size={24} />
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-md ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-slate-700 text-white rounded-bl-none"
        }`}
      >
        {isUser ? (
          <p>{msg.text}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
