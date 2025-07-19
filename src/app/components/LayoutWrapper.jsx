// app/components/LayoutWrapper.jsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ResumeButton from "./ResumeButton";
import AssistantWrapper from "./AssistantWrapper";
import BackButton from "./common/BackButton";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Define routes where you want to hide certain components
  const hideNavbar = [
    "/test",
    "/projects/playground/project-dashboard",
  ].includes(pathname);
  const hideFooter = [
    "/test",
    "/projects/playground/project-dashboard",
  ].includes(pathname);
  const hideResumeButton = [
    "/test",
    "/projects/playground/project-dashboard",
  ].includes(pathname);
  const hideAssistant = [
    "/test",
    "/projects/playground/project-dashboard",
  ].includes(pathname);

  // Theme logic based on route
  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove("test-theme");

    // Apply based on pathname
    if (
      pathname.startsWith("/test") ||
      pathname === "/playground/project-dashboard"
    ) {
      root.classList.add("test-theme");
    }
  }, [pathname]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {<BackButton label="Back" />}
      {!hideAssistant && <AssistantWrapper />}
      {!hideResumeButton && <ResumeButton />}
      <main className="pt-20">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
