"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
// ^^^ adjust this import to where your shadcn dialog component is placed

import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { ChatBotIcon } from "./ChatIcon"; // adjust import as needed
import { X } from "lucide-react";

// Props: open (bool), onOpenChange (fn)
export default function Assistant({ open, onOpenChange }) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-slate-800 border border-slate-600 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col"
        // Focus input when dialog opens (shadcn-specific workaround)
        onOpenAutoFocus={e => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <DialogHeader>
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-cyan-400 text-lg font-semibold">
              Chat with ViVA
            </DialogTitle>
            {/* <DialogClose asChild>
              <X
                onClick={() => onOpenChange(false)}
                className="text-slate-100 text-lg hover:text-cyan-400 cursor-pointer"
              />
            </DialogClose> */}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4 model-content">
          {messages.map((msg, i) => (
            <ChatMessage key={i} msg={msg} i={i} />
          ))}
          {loading && (
            <p className="text-slate-400 italic animate-pulse">
              ViVA is typing...
            </p>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center bg-slate-900 rounded-full px-3 py-2 gap-2">
          <input
            type="text"
            value={input}
            autoFocus
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
      </DialogContent>
    </Dialog>
  );
}

function ChatMessage({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex items-start space-x-2 ${
        isUser ? "justify-end space-x-reverse" : "justify-start"
      }`}
    >
      <div className="flex-shrink-0">
        {isUser ? null : <ChatBotIcon size={32} />}
      </div>
      <div
        className={`
          relative
          max-w-[75%]
          px-4 py-3
          text-sm leading-snug
          rounded-2xl
          ${isUser ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-100"}
        `}
      >
        {isUser ? (
          <span>{msg.text}</span>
        ) : (
          <div className="flex items-start space-x-2">
            <div className="prose prose-sm prose-invert">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
