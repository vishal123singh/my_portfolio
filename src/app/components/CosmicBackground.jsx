"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Smartphone } from "lucide-react";

const techIcons = [Code, Cpu, Smartphone];

export default function CosmicBackground() {
  return (
    <>
      {/* 🔴 Top-left animated blob */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#e94560] rounded-full opacity-[0.15] blur-3xl z-0"
        animate={{ x: 80, y: 80, scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🟣 Bottom-right animated blob */}
      <motion.div
        className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#533483] rounded-full opacity-[0.15] blur-3xl z-0"
        animate={{ x: -60, y: -60, scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* ✨ Floating tech icons */}
      {Array.from({ length: 5 }).map((_, i) => {
        const Icon = techIcons[i % techIcons.length];
        return (
          <motion.div
            key={i}
            className="absolute text-[#3a506b] opacity-20 text-4xl z-0"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 40],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Icon />
          </motion.div>
        );
      })}
    </>
  );
}
