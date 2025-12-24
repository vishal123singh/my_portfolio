"use client";
import dynamic from "next/dynamic";

const ChatBox = dynamic(() => import("./components/Chatbot"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-[#0f172a]">
      <ChatBox />
    </main>
  );
}
