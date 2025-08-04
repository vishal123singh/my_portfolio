"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields.");
    } else if (!email.includes("@")) {
      setError("Invalid email format.");
    } else if (email === "bs08081996@gmail.com" && password === "locknkey") {
      localStorage.setItem("isLoggedIn", "true");
      onSuccess();
    } else {
      setError("Incorrect credentials.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center px-4">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl px-6 py-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white/70 hover:text-white text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-pink-400 tracking-tight">
          Sign In to Write
        </h2>

        {error && (
          <div className="mb-4 text-center text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-white/80 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-semibold transition duration-200 shadow-lg"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
