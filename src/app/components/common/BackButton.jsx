"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="z-52 fixed top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-cyan-400 hover:text-blue-500 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
