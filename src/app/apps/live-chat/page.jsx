"use client";
import dynamic from "next/dynamic";

const ChatBox = dynamic(() => import("./components/Chatbot"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a]">
      <ChatBox />
    </main>
  );
}
