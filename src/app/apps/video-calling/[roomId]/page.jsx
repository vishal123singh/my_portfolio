// app/video-calling/[roomId]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Login from "@/app/apps/video-calling/components/Login.jsx";
import VideoRoom from "@/app/apps/video-calling/components/VideoRoom.jsx";

export default function RoomPage() {
  const { roomId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <VideoRoom roomId={roomId} user={user} />
    </main>
  );
}
