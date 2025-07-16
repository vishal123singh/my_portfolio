"use client";

import { useState } from "react";
import Assistant from "./assitant";
import { AnimatePresence, motion } from "framer-motion";
import { SiChatbot } from "react-icons/si";

export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed top-4 left-4 z-[999] group flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <SiChatbot
          onClick={() => setOpen(true)}
          size={40}
          color="#00f7ff"
          className="cursor-pointer hover:drop-shadow-[0_0_12px_#0ea5e9]"
        />
        <span className="mt-2 text-xs bg-gray-800 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Ask Assistant
        </span>
      </motion.div>

      <AnimatePresence>
        {open && <Assistant onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
