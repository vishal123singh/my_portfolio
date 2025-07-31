"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect, useRef } from "react";

export default function ChatDrawer({
  showChat,
  setShowChat,
  chatMessages,
  handleSendMessage,
  message,
  setMessage,
  user,
  soundEnabled,
  toggleSound,
}) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <AnimatePresence>
      {showChat && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed right-0 bottom-0 w-80 max-w-full h-full bg-gray-800 border border-gray-700 shadow-xl rounded-lg flex flex-col z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-900">
            <h3 className="text-white font-semibold">Live Chat</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Sound: {soundEnabled ? "On" : "Off"}
              </button>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No messages yet
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  <img
                    src={msg.photoURL || "/default-avatar.png"}
                    alt={msg.user}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">
                      {msg.user}
                    </div>
                    <div className="text-sm text-gray-300">{msg.text}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-700 bg-gray-800"
          >
            <div className="flex">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 rounded-l bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
