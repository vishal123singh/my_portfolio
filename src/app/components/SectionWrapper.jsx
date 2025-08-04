"use client";

import CosmicBackground from "./CosmicBackground";
import { motion } from "framer-motion";

export default function SectionWrapper({ children, id }) {
  return (
    <section
      id={id}
      className="w-screen relative min-h-screen overflow-hidden flex items-center justify-center px-0 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e]"
    >
      {/* Glowing radial lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-500 opacity-20 blur-3xl rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[5%] w-[500px] h-[500px] bg-pink-500 opacity-20 blur-3xl rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-purple-500 opacity-10 blur-2xl rounded-full"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      {/* Animated radial-gradient background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(29, 78, 216, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 30%, rgba(219, 39, 119, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 50%, rgba(29, 78, 216, 0.1) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <CosmicBackground />

      {/* Full-width content */}
      <div className="w-full z-10 py-20 px-4 md:px-8">{children}</div>
    </section>
  );
}
