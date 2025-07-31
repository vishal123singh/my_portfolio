"use client";

import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">VideoCall App</h1>
        <p className="text-gray-600 mb-6">Secure video conferencing</p>

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-200 shadow-sm transition-all ${
            isLoading
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 hover:shadow-md"
          }`}
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium text-gray-700">
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </span>
        </button>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-8 text-xs text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}
