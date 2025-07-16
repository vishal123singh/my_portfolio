"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

export default function Assistant({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

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
    } catch (err) {
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
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 border border-slate-600 rounded-xl p-6 w-full max-w-2xl max-h-[75vh] flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-cyan-400 text-lg font-semibold">
            Chat with Vishal’s Assistant
          </h3>
          <button onClick={onClose} className="text-slate-100 text-lg">
            ✖
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-slate-700 text-white"
                    : "bg-slate-900 text-slate-200"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <motion.p
              className="text-slate-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              Vishal’s Assistant is typing...
            </motion.p>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center bg-slate-900 rounded-full px-3 py-2 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ask something..."
            className="flex-1 bg-transparent text-white text-sm outline-none"
          />
          <button
            onClick={handleAsk}
            className="bg-cyan-400 text-slate-900 px-3 py-1 rounded-full shadow"
          >
            <FaPaperPlane />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
