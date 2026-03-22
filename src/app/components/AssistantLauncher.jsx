"use client";

import { useState } from "react";
import Assistant from "./assitant";
import { AnimatePresence, motion } from "framer-motion";
import { ChatBotIcon } from "./ChatIcon";

export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-2 z-[9999] group flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <motion.div
          onPointerDown={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <ChatBotIcon size={100} />
        </motion.div>

        <span
          className="mt-2 text-xs font-medium rounded-full px-3 py-1 shadow-md group-hover:opacity-100 opacity-0 group-hover:translate-y-[-4px] transition-all duration-300"
          style={{
            background:
              "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--accent)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
          }}
        >
          Ask ViVA
        </span>
      </motion.div>

      <AnimatePresence>
        {open && <Assistant onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
