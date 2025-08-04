"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  Terminal,
  Code2,
  Cpu,
  Network,
  Binary,
  ArrowRight,
} from "lucide-react";
import CosmicBackground from "../CosmicBackground";

const InteractiveCodeLine = ({ children, delay = 0 }) => {
  const baseText = children;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay,
      duration: 0.5 + Math.random() * 0.5,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <div className="font-mono text-white/80">
      <motion.span>{displayText}</motion.span>
      <motion.span
        className="inline-block w-2 h-6 bg-white ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </div>
  );
};

function HomeHero() {
  const router = useRouter();
  const containerRef = useRef(null);
  const [activeTech, setActiveTech] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleTechHover = (tech) => {
    setActiveTech(tech);
  };

  const handleLaunch = () => {
    router.push("/projects");
  };

  return (
    <section
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 md:px-8 py-12"
      ref={containerRef}
    >
      <CosmicBackground />

      <div className="max-w-7xl w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Heading */}
              <div className="mb-8">
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 inline-block">
                    Digital Craftsmanship
                  </span>
                  <br />
                  <motion.span
                    className="text-3xl sm:text-4xl text-white/90 font-medium"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Through{" "}
                    <span className="text-blue-300 font-mono">Code</span>
                  </motion.span>
                </motion.h1>
              </div>

              {/* Subheading */}
              <motion.p
                className="text-xl text-white/80 mb-10 max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Building performant, scalable systems with obsessive attention
                to detail and user experience.
              </motion.p>

              {/* Interactive Terminal */}
              <motion.div
                className="space-y-3 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <InteractiveCodeLine delay={0.2}>
                  $ whoami --developer
                </InteractiveCodeLine>
                <InteractiveCodeLine delay={0.4}>
                  =&gt; Vishal Singh: Full-Stack Engineer
                </InteractiveCodeLine>
                <InteractiveCodeLine delay={0.6}>
                  $ cat ./expertise.txt
                </InteractiveCodeLine>
                <InteractiveCodeLine delay={0.8}>
                  =&gt; System Architecture | Performance Optimization |
                  Developer Experience
                </InteractiveCodeLine>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button
                  onClick={handleLaunch}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="relative px-8 py-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-lg rounded-xl border border-white/20 hover:border-white/40 transition-all group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3 text-white font-medium text-lg">
                    <Terminal className="w-5 h-5" />
                    Explore My Work
                    <motion.span
                      animate={{ x: isHovering ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Code Panel */}
          <div className="relative h-[400px] lg:h-[500px]">
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="font-mono text-sm space-y-4">
                <div className="text-white/70">
                  <span className="text-purple-400">const</span> developer ={" "}
                  {"{"}
                </div>
                <div className="ml-6 text-white/80">
                  <span className="text-blue-400">name</span>:{" "}
                  <span className="text-green-400">'Vishal Singh'</span>,
                </div>
                <div className="ml-6 text-white/80">
                  <span className="text-blue-400">focus</span>: [
                  <span className="text-green-400">'Systems'</span>,{" "}
                  <span className="text-green-400">'Performance'</span>,{" "}
                  <span className="text-green-400">'DX'</span>],
                </div>
                <div className="ml-6 text-white/80">
                  <span className="text-blue-400">approach</span>:{" "}
                  <span className="text-green-400">'First principles'</span>,
                </div>
                <div className="text-white/70">{"};"}</div>
                <div className="pt-6 text-white/60">
                  <span className="text-purple-400">
                    // Crafting elegant solutions since ...
                  </span>
                </div>
              </div>

              <motion.div
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            {
              name: "System Architecture",
              icon: Network,
              color: "from-cyan-400 to-blue-500",
            },
            {
              name: "Frontend Engineering",
              icon: Code2,
              color: "from-purple-400 to-pink-500",
            },
            {
              name: "Backend Development",
              icon: Terminal,
              color: "from-orange-400 to-red-500",
            },
            {
              name: "Cloud Infrastructure",
              icon: Cpu,
              color: "from-green-400 to-teal-500",
            },
            {
              name: "Algorithms",
              icon: Binary,
              color: "from-yellow-400 to-amber-500",
            },
          ].map((tech) => (
            <motion.div
              key={tech.name}
              className={`px-5 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                activeTech === tech.name
                  ? "bg-white/10 border border-white/20 shadow-lg"
                  : "bg-white/5 border border-white/10"
              }`}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => handleTechHover(tech.name)}
              onHoverEnd={() => handleTechHover(null)}
            >
              <div className={`bg-gradient-to-r ${tech.color} p-2 rounded-lg`}>
                <tech.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/90 font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HomeHero;
