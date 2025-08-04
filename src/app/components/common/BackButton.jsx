"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BackButton({ label = "Back" }) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/" || pathname.includes("/blogs/")) {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className="z-50 fixed top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                 text-purple-300 hover:text-pink-400 transition-colors duration-200"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
