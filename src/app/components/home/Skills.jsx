"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "../../../../data";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Handle mobile
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const handleMobileChange = () => setIsMobile(mobileQuery.matches);
    handleMobileChange();
    mobileQuery.addEventListener("change", handleMobileChange);

    // Handle reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => setIsReducedMotion(motionQuery.matches);
    handleMotionChange();
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile || isReducedMotion) {
      // Apply static styles for mobile or reduced motion
      if (headerRef.current) gsap.set(headerRef.current, { y: 0, opacity: 1 });
      gsap.set(sectionRef.current.querySelectorAll(".tech-category"), {
        y: 0,
        opacity: 1,
        rotateX: 0,
      });
      gsap.set(sectionRef.current.querySelectorAll(".skill-item"), {
        scale: 1,
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      // Category animations
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".tech-category"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        },
      );

      // Skill items animation
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".skill-item"),
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-24 px-4 md:px-12 lg:px-24 overflow-hidden"
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
              radial-gradient(circle at top, var(--accent-muted), transparent 60%),
              linear-gradient(var(--bg-dark), var(--bg-darker))
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-10 hidden md:block"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-light) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-light) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <span className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-muted">
            <span
              className="inline-block w-8 md:w-12 h-px mr-3 md:mr-4 align-middle"
              style={{ background: "var(--accent)" }}
            />
            EXPERTISE
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mt-4 md:mt-6">
            <span className="font-medium text-primary">Tech</span>
            <span className="ml-2 md:ml-4 text-secondary">Stack</span>
          </h2>
          <p className="max-w-2xl mt-4 md:mt-6 text-sm md:text-base leading-relaxed text-secondary">
            My curated collection of technologies and tools I use to build
            exceptional digital experiences.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {categories.map((category, idx) => (
            <div
              key={`${category.title}-${idx}`}
              className="tech-category group relative rounded-xl md:rounded-2xl p-4 md:p-6"
              style={{
                background: "var(--gradient-metal)",
                border: "1px solid var(--border-light)",
                // boxShadow: `
                //   inset 0 1px 0 var(--border-light),
                //   0 8px 20px rgba(0,0,0,0.6)
                // `,
                transform: isMobile ? "none" : undefined,
              }}
              role="listitem"
              aria-label={category.title}
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div
                  className="p-1.5 md:p-2 rounded-lg md:rounded-xl"
                  style={{
                    background: "var(--gradient-metal)",
                    border: "1px solid var(--border-light)",
                    boxShadow: `
                      inset 0 1px 0 var(--border-light),
                      0 4px 12px rgba(0,0,0,0.6)
                    `,
                  }}
                >
                  <category.icon
                    className="w-4 h-4 md:w-5 md:h-5"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <h3 className="text-sm md:text-base font-medium tracking-wide text-primary">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="grid gap-2 md:gap-3 grid-cols-3">
                {category.skills.map((skill, sidx) => (
                  <div key={sidx} className="skill-item group/skill relative">
                    <div
                      className="relative flex flex-col items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg md:rounded-xl transition-all duration-200"
                      style={{
                        background: "var(--gradient-metal)",
                        border: "1px solid var(--border-light)",
                        boxShadow: `
                          inset 0 1px 0 var(--border-light),
                          0 4px 8px rgba(0,0,0,0.6)
                        `,
                      }}
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 rounded-lg md:rounded-xl ${
                          isMobile
                            ? "hidden"
                            : "opacity-0 group-hover/skill:opacity-100 transition duration-200"
                        }`}
                        style={{
                          background: `
                            linear-gradient(
                              to bottom,
                              var(--accent-muted),
                              transparent 50%
                            )
                          `,
                        }}
                      />
                      <div
                        className="text-xl md:text-2xl transition-all duration-200"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {skill.icon}
                      </div>
                      <span
                        className="text-[10px] md:text-xs text-center transition-colors duration-200"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px transition-all duration-200 ${
                          isMobile
                            ? "hidden"
                            : "group-hover/skill:w-6 md:group-hover/skill:w-8"
                        }`}
                        style={{ background: "var(--accent)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative */}
              {!isMobile && (
                <div
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition"
                  style={{
                    border: "1px solid var(--border-light)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-xs md:text-sm max-w-2xl mx-auto text-muted">
            Continuously expanding my toolkit with modern technologies and best
            practices.
          </p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .tech-category {
          transition: all 0.3s ease;
          will-change: transform;
        }
        @media (hover: hover) and (pointer: fine) {
          .tech-category:hover {
            transform: translateY(-4px) scale(1.01);
          }
        }
        .group\\/skill:hover > div {
          border-color: var(--border-medium);
        }
        .group\\/skill:hover .text-xl,
        .group\\/skill:hover .text-2xl,
        .group\\/skill:hover span {
          color: var(--accent);
        }
        @media (max-width: 768px) {
          .skill-item {
            min-height: 70px;
          }
        }
      `}</style>
    </section>
  );
}
