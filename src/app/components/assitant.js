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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-2xl w-full max-w-xl mx-4 h-[70vh] flex flex-col overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="flex justify-between items-center p-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h2 className="text-white/80 font-light tracking-wide">
            Chat with ViVA
          </h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/60 transition-colors"
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
              className="flex items-center gap-2 text-white/40 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce delay-150"></div>
              </div>
              <span>ViVA is typing...</span>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div
          className="p-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="flex items-center rounded-xl px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-white/20"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              placeholder="Ask something..."
              className="flex-1 bg-transparent text-white/80 text-sm outline-none placeholder:text-white/30"
              disabled={loading}
            />
            <button
              onClick={handleAsk}
              disabled={loading || !input.trim()}
              className={`p-2 rounded-md transition-all ${
                loading || !input.trim()
                  ? "text-white/30"
                  : "hover:text-white/80 transition-colors"
              }`}
              style={{ color: "var(--accent)" }}
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
          isUser ? "rounded-br-none" : "rounded-bl-none"
        }`}
        style={{
          background: isUser
            ? "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)"
            : "rgba(255,255,255,0.05)",
          border: isUser
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.08)",
          color: isUser ? "var(--accent)" : "rgba(255,255,255,0.8)",
        }}
      >
        {isUser ? (
          <p className="text-sm">{msg.text}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none overflow-auto">
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
