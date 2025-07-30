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
        className="fixed bottom-8 right-4 z-[999] group flex items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <span className="mr-2 text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-r- font-medium rounded-xl px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Ask anything from ViVA
        </span>

        <motion.div
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <ChatBotIcon />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        <Assistant open={open} onOpenChange={setOpen} />
      </AnimatePresence>
    </>
  );
}
