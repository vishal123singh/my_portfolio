"use client";

import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ResumeButton() {
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-center group">
      <motion.a
        href="/vishal-resume.pdf"
        download
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        className="text-pink-400 hover:text-pink-300 transition-all duration-300"
      >
        <FiDownload size={28} />
      </motion.a>

      <span className="mt-2 px-2 py-1 text-xs bg-slate-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Download Resume
      </span>
    </div>
  );
}
