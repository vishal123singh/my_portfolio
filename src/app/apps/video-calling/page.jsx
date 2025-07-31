"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Login from "./components/Login";
import RoomLobby from "./components/RoomLobby";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return <RoomLobby user={user} />;
}
