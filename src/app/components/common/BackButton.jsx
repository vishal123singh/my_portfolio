"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/" || pathname.includes("/blogs/")) {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className="
        fixed z-50
        top-3 right-3
        md:left-6 md:right-auto
        flex items-center gap-2
        px-3 py-2
        rounded-md
        text-sm font-medium
        text-purple-300
        hover:text-pink-400
        transition-colors
      "
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
