"use client";

import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FiLogOut, FiVideo, FiKey } from "react-icons/fi";
import { toast } from "sonner";

export default function RoomLobby({ user }) {
  const [roomId, setRoomId] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const requestMediaPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      toast.error("Camera & microphone permission is required");
      return false;
    }
  };

  const createRoom = async () => {
    const hasPermission = await requestMediaPermission();
    if (!hasPermission) return;

    setIsCreatingRoom(true);
    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        host: user.uid,
        hostName: user.displayName,
        createdAt: serverTimestamp(),
        participants: [user.uid],
      });

      const roomLink = `${window.location.origin}/apps/video-calling/${docRef.id}`;
      await navigator.clipboard.writeText(roomLink);

      toast.success("Meeting started & link copied");
      window.location.href = roomLink;
    } catch {
      toast.error("Failed to start meeting");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const joinRoom = () => {
    if (!roomId.trim()) {
      toast.error("Enter a valid meeting ID");
      return;
    }

    setIsJoiningRoom(true);
    window.location.href = `${
      window.location.origin
    }/apps/video-calling/${roomId.trim()}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-white/50 p-6">
        {/* Profile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-indigo-500 flex items-center justify-center bg-indigo-500 text-white font-semibold">
              {user.photoURL && !imageError ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-lg">
                  {user.displayName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {user.displayName}
              </h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition"
            title="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>

        {/* Create Meeting */}
        <button
          onClick={createRoom}
          disabled={isCreatingRoom}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium transition-all shadow-md hover:shadow-lg active:scale-[0.98]
            ${
              isCreatingRoom
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
            }`}
        >
          <FiVideo />
          {isCreatingRoom ? "Starting meeting..." : "Start new meeting"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Join Meeting */}
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Join with meeting ID
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. a9F3xP2"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && joinRoom()}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={joinRoom}
            disabled={isJoiningRoom || !roomId.trim()}
            className={`px-4 rounded-xl flex items-center gap-1 text-white font-medium transition
              ${
                isJoiningRoom || !roomId.trim()
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
          >
            <FiKey size={16} />
            {isJoiningRoom ? "Joining" : "Join"}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          🔒 End-to-end encrypted • Secure video meetings
        </p>
      </div>
    </div>
  );
}
