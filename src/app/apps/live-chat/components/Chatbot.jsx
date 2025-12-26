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
import {
  Send,
  Sparkles,
  Bot,
  MessageCircle,
  Check,
  Loader2,
  LogOut,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

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

  useEffect(() => {
    if (aiMode) {
      inputRef.current?.focus();
    }
  }, [aiMode]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error", err);
    } finally {
      setIsLoading(false);
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

    try {
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
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setAiStreaming(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl mb-6 border border-white/30">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              FireChat<span className="text-yellow-300">AI</span>
            </h1>
            <p className="text-white/80 text-lg">
              Real conversations, smarter replies.
            </p>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-4 w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl px-6 py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <FaGoogle className="w-5 h-5" />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-sm">Real-time messaging</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-sm">
                AI-powered suggestions
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-sm">Secure & encrypted</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[90vh] max-h-[800px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-transparent border-2 border-white/30 overflow-hidden">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                  <div className="hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 text-white font-bold text-lg">
                    {user.displayName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.displayName}</h2>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online • FireChat AI Active</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAiMode(!aiMode)}
                className={`p-2 rounded-full transition-all ${
                  aiMode ? "bg-white/20" : "hover:bg-white/10"
                }`}
                title="Toggle AI Mode"
              >
                <Sparkles
                  className={`w-5 h-5 ${aiMode ? "text-yellow-300" : ""}`}
                />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {aiMode && (
            <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
              <Bot className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">
                AI Assistant Mode: Type for smart reply suggestions
              </span>
            </div>
          )}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/50 to-gray-100/50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-indigo-400" />
              </div>
              <p className="text-lg font-medium text-gray-600">
                Start a conversation
              </p>
              <p className="text-sm text-gray-500 text-center max-w-md">
                Be the first to say hello! Your messages will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => {
                const isOwn = msg.uid === user.uid;
                const isAI = msg.sender === "AI Assistant";

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isOwn ? "justify-end" : "justify-start"
                    } items-end gap-3`}
                  >
                    {!isOwn && !isAI && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={msg.avatar}
                          alt={msg.sender}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    {isAI && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
                        isOwn
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-md shadow-lg"
                          : isAI
                          ? "bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 border border-purple-200 rounded-bl-md"
                          : "bg-white text-gray-800 shadow-md rounded-bl-md border border-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-semibold ${
                            isOwn
                              ? "text-white/90"
                              : isAI
                              ? "text-purple-600"
                              : "text-gray-500"
                          }`}
                        >
                          {isAI ? "🤖 AI Assistant" : msg.sender}
                        </span>
                        {isOwn && <Check className="w-3 h-3 text-white/70" />}
                      </div>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div
                        className={`text-xs mt-2 ${
                          isOwn ? "text-white/70" : "text-gray-400"
                        }`}
                      >
                        {msg.createdAt?.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatRef} />
            </div>
          )}
        </div>

        {/* AI Suggestions Panel */}
        {(aiStreaming || aiSuggestions.length > 0) && (
          <div className="border-t border-gray-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50 px-4 py-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                AI Suggestions
              </span>
              <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full">
                {aiSuggestions.length} options
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {aiStreaming && (
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    AI is thinking...
                  </span>
                </div>
              )}

              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(suggestion);
                    setAiMode(false);
                    setAiSuggestions([]);
                    inputRef.current?.focus();
                  }}
                  className="w-full text-left p-3 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-purple-600">
                      Suggestion {index + 1}
                    </span>
                    <Sparkles className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {suggestion}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={
                  aiMode
                    ? "Ask AI for reply suggestions (e.g., 'how to respond to that?')"
                    : "Type your message here..."
                }
                className="w-full px-5 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    aiMode
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>
            </div>

            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-3 px-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAiMode(!aiMode)}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  aiMode
                    ? "text-purple-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    aiMode
                      ? "bg-gradient-to-r from-purple-100 to-pink-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Sparkles
                    className={`w-3 h-3 ${
                      aiMode ? "text-purple-600" : "text-gray-400"
                    }`}
                  />
                </div>
                <span>AI Mode</span>
              </button>
            </div>

            <div className="text-xs text-gray-400">
              {messages.length} messages • Press Enter to send
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        FireChat AI • Secure real-time messaging • {new Date().getFullYear()}
      </div>
    </div>
  );
}
