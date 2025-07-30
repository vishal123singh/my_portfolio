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
        className="fixed bottom-4 right-4 z-[999] group flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <motion.div
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <ChatBotIcon />
        </motion.div>

        <span className="mt-2 text-xs bg-gray-800 text-white rounded-xl px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Ask ViVA
        </span>
      </motion.div>

      <AnimatePresence>
        <Assistant open={open} onOpenChange={setOpen} />
      </AnimatePresence>
    </>
  );
}
