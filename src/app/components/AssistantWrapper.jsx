// app/components/AssistantWrapper.jsx
"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Dynamically import with SSR disabled
const AssistantLauncher = dynamic(() => import("./AssistantLauncher"), {
  ssr: false,
});

export default function AssistantWrapper() {
  const pathname = usePathname();

  if (
    pathname.includes("/apps") ||
    pathname.startsWith("/test") ||
    pathname.includes("/projects/playground/") ||
    pathname === "/ai-agent-builder"
  ) {
    return null;
  }

  useEffect(() => console.log("pathname", pathname), []);
  return <AssistantLauncher />;
}
