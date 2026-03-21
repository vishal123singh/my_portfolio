"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { categories } from "../../../../data";

export default function TechStack() {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Variants for Framer Motion
  const headerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const categoryVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.08, duration: 0.8, ease: "easeOut" },
    }),
  };

  const skillVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.02, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section
      className="relative min-h-screen py-16 md:py-24 px-4 md:px-12 lg:px-24 overflow-hidden"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background simplified for performance */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top, rgba(255,255,255,0.03), transparent 60%),
              linear-gradient(var(--bg-dark), var(--bg-darker))
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-10 hidden md:block"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView={shouldReduceMotion ? {} : "visible"}
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <span className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-white/60">
            <span
              className="inline-block w-8 md:w-12 h-px mr-3 md:mr-4 align-middle"
              style={{ background: "var(--accent)" }}
            />
            EXPERTISE
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl mt-4 md:mt-6">
            <span className="font-medium">Tech</span>
            <span className="ml-2 md:ml-4 text-white/40">Stack</span>
          </h2>

          <p className="max-w-2xl mt-4 md:mt-6 text-sm md:text-base leading-relaxed text-white/70">
            My curated collection of technologies and tools I use to build
            exceptional digital experiences.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              className="tech-category group relative rounded-xl md:rounded-2xl p-4 md:p-6"
              style={{
                background:
                  "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 20px rgba(0,0,0,0.6)",
              }}
              initial={shouldReduceMotion ? {} : "hidden"}
              whileInView={shouldReduceMotion ? {} : "visible"}
              viewport={{ once: true }}
              custom={i}
              variants={categoryVariants}
            >
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div
                    className="p-1.5 md:p-2 rounded-lg md:rounded-xl"
                    style={{
                      background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.6)",
                    }}
                  >
                    <category.icon
                      className="w-4 h-4 md:w-5 md:h-5"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>

                  <h3 className="text-sm md:text-base font-medium tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div
                  className={`grid gap-2 md:gap-3 ${isMobile ? "grid-cols-3" : "grid-cols-3"}`}
                >
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="skill-item group/skill relative"
                      initial={shouldReduceMotion ? {} : "hidden"}
                      whileInView={shouldReduceMotion ? {} : "visible"}
                      viewport={{ once: true }}
                      custom={idx}
                      variants={skillVariants}
                    >
                      <div
                        className="relative flex flex-col items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg md:rounded-xl transition-all duration-200"
                        style={{
                          background:
                            "linear-gradient(145deg, #232323, #151515)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 8px rgba(0,0,0,0.6)",
                        }}
                      >
                        <div
                          className={`pointer-events-none absolute inset-0 rounded-lg md:rounded-xl ${isMobile ? "hidden" : "opacity-0 group-hover/skill:opacity-100 transition duration-200"}`}
                          style={{
                            background: `linear-gradient(to bottom, rgba(255,255,255,0.08), transparent 50%)`,
                          }}
                        />

                        <div
                          className="text-xl md:text-2xl transition-all duration-200"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          {skill.icon}
                        </div>

                        <span
                          className="text-[10px] md:text-xs text-center transition-colors duration-200"
                          style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                          {skill.name}
                        </span>

                        <span
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px transition-all duration-200 ${isMobile ? "hidden" : "group-hover/skill:w-6 md:group-hover/skill:w-8"}`}
                          style={{ background: "var(--accent)" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-xs md:text-sm max-w-2xl mx-auto text-white/60">
            Continuously expanding my toolkit with modern technologies and best
            practices.
          </p>
        </div>
      </div>
    </section>
  );
}
