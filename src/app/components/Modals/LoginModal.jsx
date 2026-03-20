"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const modalRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
    } else if (!email.includes("@")) {
      setError("Invalid email");
    } else if (email === "bs08081996@gmail.com" && password === "locknkey") {
      localStorage.setItem("isLoggedIn", "true");
      onSuccess();
    } else {
      setError("Incorrect credentials");
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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        background: "rgba(10,10,10,0.75)",
        backdropFilter: "blur(16px)",
      }}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-sm rounded-3xl p-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, var(--bg-light), var(--bg-darker))",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 40px 100px -20px rgba(0,0,0,0.8)
          `,
        }}
      >
        {/* Subtle glow layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.08), transparent 40%)",
          }}
        />

        {/* Inner border */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-xl transition hover:opacity-80"
          style={{ color: "var(--text-muted)" }}
        >
          ×
        </button>

        {/* Title */}
        <h2
          className="text-2xl text-center mb-8 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Sign In
        </h2>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5 text-sm text-center rounded-lg px-4 py-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "var(--text-secondary)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* EMAIL */}
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 pt-5 pb-2 rounded-xl outline-none transition"
              style={{
                background: "var(--bg-darker)",
                color: "var(--text-primary)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />

            <label
              className="absolute left-4 transition-all pointer-events-none"
              style={{
                color: "var(--text-muted)",
                top: email ? "6px" : "50%",
                transform: email ? "none" : "translateY(-50%)",
                fontSize: email ? "11px" : "14px",
              }}
            >
              Email
            </label>

            {/* Focus glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition pointer-events-none"
              style={{
                boxShadow: "0 0 0 1px var(--accent)",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative group">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 pt-5 pb-2 rounded-xl outline-none transition pr-10"
              style={{
                background: "var(--bg-darker)",
                color: "var(--text-primary)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />

            <label
              className="absolute left-4 transition-all pointer-events-none"
              style={{
                color: "var(--text-muted)",
                top: password ? "6px" : "50%",
                transform: password ? "none" : "translateY(-50%)",
                fontSize: password ? "11px" : "14px",
              }}
            >
              Password
            </label>

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>

            {/* Focus glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition pointer-events-none"
              style={{
                boxShadow: "0 0 0 1px var(--accent)",
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-full transition active:scale-[0.97]"
            style={{
              background: "var(--accent)",
              color: "#000",
              boxShadow: "0 10px 30px rgba(255,255,255,0.15)",
            }}
          >
            Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
}
