"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import ParticlesBackground from "@/app/components/ParticlesBackground";

export default function ScrollStoryDemo() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [activeSection, setActiveSection] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setActiveSection(0);
    else if (latest < 0.45) setActiveSection(1);
    else if (latest < 0.75) setActiveSection(2);
    else setActiveSection(3);
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-black/70 text-white">
      <ParticlesBackground />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 h-1 bg-emerald-400 origin-left z-50"
      />
      <motion.div
        style={{ left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        className="fixed top-2 text-white/60 text-xs z-50 px-2"
      >
        {percentage.get().toFixed(0)}%
      </motion.div>

      {/* Scroll section indicator */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 space-y-4">
        {["Hero", "Carousel", "Motion", "Final"].map((_, index) => (
          <motion.div
            key={index}
            animate={{ scale: activeSection === index ? 1.2 : 1 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index ? "bg-emerald-400" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm z-30"
      >
        ↓ Scroll to explore
      </motion.div>

      {/* Decorative Glows */}
      {/* <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-pink-400/20 rounded-full blur-[100px] opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-60 h-60 bg-cyan-400/20 rounded-full blur-[80px] opacity-20 animate-pulse pointer-events-none" /> */}

      <ScrollContent />
    </div>
  );
}

function ScrollContent() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const inView1 = useInView(ref1, { once: true });
  const inView2 = useInView(ref2, { once: true });
  const inView3 = useInView(ref3, { once: true });

  return (
    <div className="space-y-60 pt-20 px-6 max-w-full mx-auto">
      {/* Section 1: Hero */}
      <section
        ref={ref1}
        className="h-[80vh] flex flex-col justify-center items-center text-center space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500"
        >
          Scroll Story Demo
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={inView1 ? { width: "100%" } : {}}
          transition={{ delay: 0.4, duration: 1 }}
          className="h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={inView1 ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg sm:text-xl max-w-2xl text-gray-300"
        >
          A showcase of smooth animations, interactive components, and clean UI
          — built using React + Framer Motion.
        </motion.p>
      </section>

      {/* Section 2: Carousel */}
      <section className="relative h-[100vh] overflow-hidden">
        <motion.div
          className="flex space-x-6 w-[300%] px-10"
          style={{
            x: useTransform(useScroll().scrollYProgress, [0, 1], [0, -800]),
          }}
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: item * 0.1 }}
              key={item}
              className="w-[80vw] sm:w-[400px] shrink-0 bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md backdrop-blur-md"
            >
              <h3 className="text-xl font-bold mb-2">Card {item}</h3>
              <p className="text-white/70">
                This is a carousel item. It scrolls horizontally based on
                vertical scroll.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Section 3: Motion Card */}
      <section ref={ref2} className="h-[80vh] flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md border border-white/20 text-center max-w-md w-full"
        >
          <h2 className="text-3xl font-semibold mb-2">Smooth Motion</h2>
          <p className="text-base text-white/80">
            Every section animates gracefully into view, offering an engaging
            user experience.
          </p>
        </motion.div>
      </section>

      {/* Section 4: Final CTA */}
      <section ref={ref3} className="h-[80vh] flex justify-center items-center">
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={inView3 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl max-w-md w-full backdrop-blur-lg text-center"
        >
          <h3 className="text-2xl font-bold mb-2 text-white">Final Slide</h3>
          <p className="text-white/80 text-base">
            Built using{" "}
            <span className="text-cyan-400 font-semibold">Framer Motion</span> &{" "}
            <span className="text-indigo-400 font-semibold">Tailwind CSS</span>.
            Fully responsive and production ready.
          </p>
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 10px rgba(34,211,238,0.7)",
            }}
            className="inline-block mt-6 px-5 py-3 bg-cyan-500 rounded-xl font-semibold text-white shadow-md transition"
            href="/playground/project-dashboard"
          >
            Explore the Code →
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
