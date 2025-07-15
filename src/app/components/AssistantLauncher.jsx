'use client';

import { useState } from "react";
import Assistant from "./assitant";
import { AnimatePresence } from "framer-motion";
import { SiChatbot } from "react-icons/si";


export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SiChatbot onClick={() => setOpen(true)} size={40} color="pink"/>
      <AnimatePresence>
        {open && <Assistant onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}