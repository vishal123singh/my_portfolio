"use client";
import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db, auth, provider } from "@/lib/firebase.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const chatRef = useRef(null);

  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiStreaming, setAiStreaming] = useState(false);
  const [aiBuffer, setAiBuffer] = useState("");
  const [aiMode, setAiMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
    });

    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubMessages = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
      unsubMessages();
    };
  }, []);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (aiMode) {
      await runAICommand();
      return;
    }

    if (!user) return;

    await addDoc(collection(db, "messages"), {
      text: input,
      sender: user.displayName,
      avatar: user.photoURL,
      uid: user.uid,
      createdAt: Timestamp.now(),
    });

    setInput("");
  };

  const runAICommand = async () => {
    const command = input.trim();

    const lastOtherMessage = messages
      .slice()
      .reverse()
      .find((m) => m.uid !== user.uid);

    if (!lastOtherMessage) return;

    setAiSuggestions([]);
    setAiBuffer("");
    setAiStreaming(true);

    const res = await fetch("/api/co-pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        command,
        lastMessage: lastOtherMessage.text,
        userName: user.displayName,
        conversation: messages.slice(-10).map((m) => ({
          sender: m.sender,
          text: m.text,
        })),
      }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      fullText += chunk;
      setAiBuffer(fullText);
    }

    const suggestions = fullText
      .split("---")
      .map((s) => s.trim())
      .filter(Boolean);

    setAiSuggestions(suggestions);
    setAiStreaming(false);
  };

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">FireChat 🔥</h1>
          <p className="text-gray-500 text-sm mb-6">
            Real-time conversations, instantly.
          </p>

          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 w-full border rounded-xl px-4 py-3 hover:shadow-md transition bg-white"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <p className="mt-6 text-xs text-gray-400">
            Built with Next.js & Firebase
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- CHAT UI ---------------- */
  return (
    <div className="min-h-[100dvh] flex justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div
        className="
  w-full
  max-w-md
  bg-white
  rounded-2xl
  shadow-xl
  flex
  flex-col
  overflow-hidden
  h-[100dvh]
  sm:h-[90dvh]
"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              {/* Avatar image */}
              <img
                src={user.photoURL}
                alt={user.displayName}
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="w-9 h-9 rounded-full ring-2 ring-blue-500 object-cover"
              />

              {/* Initials fallback */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold ring-2 ring-blue-500">
                {user.displayName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {user.displayName}
              </p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-center text-sm text-gray-400 mt-10">
              Start the conversation 👋
            </p>
          )}

          {messages.map((msg) => {
            const isOwn = msg.uid === user.uid;
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm transition-all ${
                    isOwn
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  {!isOwn && (
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      {msg.sender}
                    </p>
                  )}
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={chatRef} />
        </div>

        {(aiStreaming || aiSuggestions.length > 0) && (
          <div className="mb-2 mx-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 pt-3 pb-2">
              <span className="text-xs font-semibold text-blue-700">
                FireChat AI
              </span>
              <span className="text-[10px] text-blue-500 bg-blue-100 rounded-full px-2 py-0.5">
                suggestions
              </span>
            </div>

            {/* Content */}
            <div className="px-2 pb-2 max-h-48 overflow-y-auto space-y-1">
              {/* Streaming indicator */}
              {aiStreaming && (
                <div className="px-3 py-2 text-sm text-gray-500 italic animate-pulse">
                  Thinking…
                </div>
              )}

              {/* Suggestions */}
              {aiSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(s);
                    setAiSuggestions([]);
                  }}
                  className="
            w-full
            text-left
            text-sm
            text-gray-700
            bg-white
            rounded-xl
            px-3
            py-2
            hover:bg-blue-50
            transition
            border
            border-transparent
            hover:border-blue-200
          "
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t px-3 py-3 bg-white relative">
          <div className="flex items-center gap-2">
            {/* AI Button */}
            <button
              onClick={() => {
                setAiMode(true);
                setAiSuggestions([]);
              }}
              className={`
        w-9 h-9 rounded-full flex items-center justify-center
        border transition
        ${
          aiMode
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
        }
      `}
              title="Ask AI for help"
            >
              🤖
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                aiMode ? "Ask AI how to reply…" : "Type your message…"
              }
              className={`
        flex-1 px-4 py-2 text-sm rounded-full border
        focus:outline-none focus:ring-2
        ${
          aiMode
            ? "border-blue-400 focus:ring-blue-500 bg-blue-50"
            : "focus:ring-blue-500"
        }
        text-gray-700
      `}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-full w-10 h-10 flex items-center justify-center shadow"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
