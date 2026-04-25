"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    return () => (document.body.style.overflow = "auto");
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

        result += decoder.decode(value);

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [...prev.slice(0, -1), { role: "assistant", text: result }];
          }
          return [...prev, { role: "assistant", text: result }];
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl h-[75vh] mx-4 flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h2 className="text-sm tracking-wide text-white/70">
              Chat with ViVA
            </h2>

            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}

            {loading && <TypingIndicator />}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-white/20 transition">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                disabled={loading}
              />

              <button
                onClick={handleAsk}
                disabled={loading || !input.trim()}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 transition"
              >
                <FaPaperPlane className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ChatMessage({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3`}>
      {!isUser && (
        <div className="pt-1 opacity-80">
          <ChatBotIcon size={22} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed rounded-2xl ${
          isUser
            ? "bg-white text-black rounded-br-none"
            : "bg-white/10 text-white rounded-bl-none"
        }`}
      >
        {isUser ? (
          msg.text
        ) : (
          <div className="prose prose-invert text-sm max-w-none">
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-white/40 text-sm">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-100" />
        <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-200" />
      </div>
      ViVA is thinking...
    </div>
  );
}
