"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ResumeButton from "./ResumeButton";
import AssistantWrapper from "./AssistantWrapper";
import BackButton from "./common/BackButton";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Routes that should render full screen without layout elements
  const fullScreenRoutes = [
    "/trade-ai",
    "/test",
    "/projects/playground/project-dashboard",
    "/projects/playground/scroll-storytelling",
    "/projects/playground/product-demo",
    "/projects/playground/3d-viewer",
    "/ai-agents",
    "/ai-agent-builder",
    "/apps/live-chat",
  ];

  const isFullScreen = fullScreenRoutes.includes(pathname);

  // Theme logic based on route
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("test-theme");

    if (
      pathname.startsWith("/test") ||
      pathname === "/playground/project-dashboard" ||
      pathname === "/ai-agent-builder"
    ) {
      root.classList.add("test-theme");
    }
  }, [pathname]);

  return (
    <>
      {!isFullScreen && <Navbar />}
      {<BackButton label="Back" />}
      {!isFullScreen && <AssistantWrapper />}
      {!isFullScreen && <ResumeButton />}
      <main
        className={
          isFullScreen
            ? "h-screen w-screen overflow-y-auto bg-gray-50"
            : "pt-20"
        }
      >
        {children}
      </main>
      <Toaster />
      {!isFullScreen && <Footer />}
    </>
  );
}
