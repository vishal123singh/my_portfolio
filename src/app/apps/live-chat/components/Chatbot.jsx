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
    if (!input.trim() || !user) return;

    await addDoc(collection(db, "messages"), {
      text: input,
      sender: user.displayName,
      avatar: user.photoURL,
      uid: user.uid,
      createdAt: Timestamp.now(),
    });

    setInput("");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center bg-white shadow-2xl rounded-2xl p-8 sm:p-10 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to FireChat 💬
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Connect and chat in real-time. No signup required.
          </p>

          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:shadow-md px-4 py-2 rounded-lg text-sm font-medium text-gray-700 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="mt-6 text-xs text-gray-400">
            Built with Next.js + Firebase
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-2 bg-white rounded-xl shadow-lg border space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex items-center gap-2">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm text-gray-700 font-medium">
            {user.displayName}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      <div className="h-80 overflow-y-auto px-1 space-y-2">
        {messages.map((msg) => {
          const isOwn = msg.uid === user.uid;
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg text-sm shadow ${
                  isOwn
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!isOwn && msg.avatar && (
                    <img
                      src={msg.avatar}
                      alt="avatar"
                      className="w-4 h-4 rounded-full"
                    />
                  )}
                  {!isOwn && (
                    <span className="text-xs font-semibold">{msg.sender}</span>
                  )}
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={chatRef} />
      </div>

      <div className="flex gap-2 border-t pt-2">
        <input
          className="border border-gray-300 p-2 flex-1 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 text-sm rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
