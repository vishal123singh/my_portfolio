"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "../../../../data";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
      );

      gsap.fromTo(
        ".tech-category",
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".skill-item",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
        style={{
          background: "var(--gradient-matte)",
          color: "var(--text-primary)",
        }}
      >
        {/* Background */}
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
            className="absolute inset-0 opacity-10"
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
          <div ref={headerRef} className="mb-16">
            <span className="text-sm tracking-[0.3em] text-white/60">
              <span
                className="inline-block w-12 h-px mr-4 align-middle"
                style={{ background: "var(--accent)" }}
              />
              EXPERTISE
            </span>

            <h2 className="text-5xl md:text-6xl mt-6">
              <span className="font-medium">Tech</span>
              <span className="ml-4 text-white/40">Stack</span>
            </h2>

            <p className="max-w-2xl mt-6 leading-relaxed text-white/70">
              My curated collection of technologies and tools I use to build
              exceptional digital experiences.
            </p>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((category) => (
              <div
                key={category.title}
                className="tech-category group relative rounded-2xl p-6 opacity-0"
                style={{
                  background:
                    "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.06),
                    0 12px 30px rgba(0,0,0,0.8)
                  `,
                }}
              >
                {/* Top light */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background: `
                      linear-gradient(
                        to bottom,
                        rgba(255,255,255,0.06),
                        transparent 40%
                      )
                    `,
                  }}
                />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: `
                          inset 0 1px 0 rgba(255,255,255,0.08),
                          0 4px 12px rgba(0,0,0,0.6)
                        `,
                      }}
                    >
                      <category.icon
                        className="w-5 h-5"
                        style={{ color: "var(--accent)" }}
                      />
                    </div>

                    <h3 className="font-medium tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-3 gap-3">
                    {category.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="skill-item group/skill relative"
                      >
                        <div
                          className="relative flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-[2px]"
                          style={{
                            background:
                              "linear-gradient(145deg, #232323, #151515)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: `
                              inset 0 1px 0 rgba(255,255,255,0.06),
                              0 4px 10px rgba(0,0,0,0.6)
                            `,
                          }}
                        >
                          {/* Light reflection */}
                          <div
                            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover/skill:opacity-100 transition duration-300"
                            style={{
                              background: `
                                linear-gradient(
                                  to bottom,
                                  rgba(255,255,255,0.08),
                                  transparent 50%
                                )
                              `,
                            }}
                          />

                          {/* Icon */}
                          <div
                            className="text-2xl transition-all duration-300 group-hover/skill:scale-110"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {skill.icon}
                          </div>

                          {/* Name */}
                          <span
                            className="text-xs text-center transition-colors duration-300"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                          >
                            {skill.name}
                          </span>

                          {/* Accent underline */}
                          <span
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px transition-all duration-300 group-hover/skill:w-8"
                            style={{ background: "var(--accent)" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative */}
                <div
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-sm max-w-2xl mx-auto text-white/60">
              Continuously expanding my toolkit with modern technologies and
              best practices.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tech-category {
          transform-style: preserve-3d;
          transition: all 0.4s ease;
        }

        .tech-category:hover {
          transform: translateY(-6px) scale(1.01);
        }

        .group\\/skill:hover > div {
          border-color: rgba(255, 255, 255, 0.15);
        }

        .group\\/skill:hover .text-2xl,
        .group\\/skill:hover span {
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
