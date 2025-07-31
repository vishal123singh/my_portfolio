"use client";

import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FiLogOut, FiCopy, FiVideo, FiKey } from "react-icons/fi";
import { toast } from "sonner";

export default function RoomLobby({ user }) {
  const [roomId, setRoomId] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const createRoom = async () => {
    setIsCreatingRoom(true);
    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        host: user.uid,
        hostName: user.displayName,
        createdAt: serverTimestamp(),
        participants: [user.uid],
      });
      toast.success("Meeting started successfully");
      const roomLink = `${window.location.origin}/apps/video-calling/${docRef.id}`;
      await navigator.clipboard.writeText(roomLink);
      toast.success("Meeting link copied to clipboard!");
      window.location.href = roomLink;
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Failed to start meeting. Please try again.");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const joinRoom = () => {
    if (!roomId.trim()) {
      toast.error("Please enter a valid meeting ID");
      return;
    }

    setIsJoiningRoom(true);
    try {
      const roomLink = `${
        window.location.origin
      }/apps/video-calling/${roomId.trim()}`;
      window.location.href = roomLink;
      toast.success("Joining meeting...");
    } catch (error) {
      console.error("Error joining meeting:", error);
      toast.error("Failed to join meeting. Please check the ID and try again.");
    } finally {
      setIsJoiningRoom(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* User Profile Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <h2 className="font-semibold text-gray-800">
                {user.displayName}
              </h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100"
            title="Logout"
          >
            <FiLogOut />
          </button>
        </div>

        {/* Create Room Button */}
        <button
          onClick={createRoom}
          disabled={isCreatingRoom}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg mb-4 transition-all ${
            isCreatingRoom
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white font-medium shadow-sm`}
        >
          <FiVideo />
          {isCreatingRoom ? "Starting Meeting..." : "Start New Meeting"}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Join Room Section */}
        <div className="space-y-2">
          <label
            htmlFor="roomId"
            className="block text-sm font-medium text-gray-700"
          >
            Join with a meeting ID
          </label>
          <div className="flex gap-2">
            <input
              id="roomId"
              type="text"
              placeholder="Enter Meeting ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && joinRoom()}
            />
            <button
              onClick={joinRoom}
              disabled={isJoiningRoom || !roomId.trim()}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isJoiningRoom || !roomId.trim()
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-medium`}
            >
              <FiKey size={16} />
              {isJoiningRoom ? "Joining..." : "Join"}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          Your meetings are end-to-end encrypted for security.
        </p>
      </div>
    </div>
  );
}
