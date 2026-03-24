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
      className="fixed inset-0 z-50 flex items-center justify-center"
      //style={{ background: "var(--overlay-bg)" }}
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
          background: "var(--gradient-metal)",
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-inset-light), var(--shadow-xl)",
        }}
      >
        <div
          className="flex justify-between items-center p-4"
          style={{ borderBottom: "1px solid var(--border-light)" }}
        >
          <h2
            className="font-light tracking-wide"
            style={{ color: "var(--text-secondary)" }}
          >
            Chat with ViVA
          </h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
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
              className="flex items-center gap-2 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: "var(--text-muted)" }}
            >
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ background: "var(--text-muted)" }}
                />
                <div
                  className="w-2 h-2 rounded-full animate-bounce delay-75"
                  style={{ background: "var(--text-muted)" }}
                />
                <div
                  className="w-2 h-2 rounded-full animate-bounce delay-150"
                  style={{ background: "var(--text-muted)" }}
                />
              </div>
              <span>ViVA is typing...</span>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div
          className="p-4"
          style={{ borderTop: "1px solid var(--border-light)" }}
        >
          <div
            className="flex items-center rounded-xl px-4 py-2 transition-all focus-within:ring-2"
            style={{
              background: "var(--accent-muted)",
              border: "1px solid var(--border-medium)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 2px var(--accent-muted)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              placeholder="Ask something..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-30"
              style={{ color: "var(--text-primary)" }}
              disabled={loading}
            />
            <button
              onClick={handleAsk}
              disabled={loading || !input.trim()}
              className={`p-2 rounded-md transition-all ${
                loading || !input.trim()
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:opacity-80 transition-opacity"
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
        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
          isUser ? "rounded-br-none" : "rounded-bl-none"
        }`}
        style={{
          background: isUser ? "var(--gradient-metal)" : "var(--accent-muted)",
          border: "1px solid var(--border-light)",
          color: isUser ? "var(--accent)" : "var(--text-primary)",
        }}
      >
        {isUser ? (
          <p className="text-sm">{msg.text}</p>
        ) : (
          <div
            className="prose prose-sm max-w-none overflow-auto"
            style={{
              color: "var(--text-primary)",
              "--tw-prose-body": "var(--text-primary)",
              "--tw-prose-headings": "var(--text-primary)",
              "--tw-prose-lead": "var(--text-secondary)",
              "--tw-prose-links": "var(--accent)",
              "--tw-prose-bold": "var(--text-primary)",
              "--tw-prose-counters": "var(--text-secondary)",
              "--tw-prose-bullets": "var(--text-secondary)",
              "--tw-prose-hr": "var(--border-light)",
              "--tw-prose-quotes": "var(--text-secondary)",
              "--tw-prose-quote-borders": "var(--border-light)",
              "--tw-prose-captions": "var(--text-secondary)",
              "--tw-prose-code": "var(--accent)",
              "--tw-prose-pre-code": "var(--text-primary)",
              "--tw-prose-pre-bg": "var(--bg-darker)",
              "--tw-prose-th-borders": "var(--border-light)",
              "--tw-prose-td-borders": "var(--border-light)",
            }}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
