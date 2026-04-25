"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ArrowRight, ArrowDown } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiAmazon,
  SiDocker,
  SiGraphql,
  SiGooglecloud,
  SiExpress,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Tech stack definition
const techStack = [
  { name: "REACT", category: "Frontend", icon: SiReact, color: "#61DAFB" },
  {
    name: "NEXT.JS",
    category: "Framework",
    icon: SiNextdotjs,
    color: "#ffffff",
  },
  { name: "NODE.JS", category: "Backend", icon: SiNodedotjs, color: "#339933" },
  {
    name: "EXPRESS.JS",
    category: "Backend",
    icon: SiExpress,
    color: "#ffffff",
  },
  {
    name: "TYPESCRIPT",
    category: "Language",
    icon: SiTypescript,
    color: "#3178C6",
  },
  { name: "PYTHON", category: "Language", icon: SiPython, color: "#3776AB" },
  { name: "AWS", category: "Cloud", icon: SiAmazon, color: "#FF9900" },
  { name: "GCP", category: "Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "DOCKER", category: "DevOps", icon: SiDocker, color: "#2496ED" },
  { name: "GRAPHQL", category: "API", icon: SiGraphql, color: "#E10098" },
];

// Constants for animations
const CTA_MAGNETIC_MULTIPLIER = 0.3;
const HERO_LINE_DURATION = 0.8;
const HERO_CTA_EASE = "elastic.out(1, 0.5)";

// ------------------- Enhanced Loader with Fade-Out -------------------
function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current.querySelectorAll(".loader-char");

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              onComplete();
              loaderRef.current.style.display = "none";
            },
          });
        },
      });

      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: 60,
          rotateX: -90,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: {
            amount: 0.6,
            from: "random",
          },
          ease: "back.out(1.7)",
        },
      )
        .fromTo(
          lineRef.current,
          {
            scaleX: 0,
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to({}, { duration: 1.2 });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  const text = "VISHAL SINGH";

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-light z-[200] flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="text-center">
        <div
          ref={textRef}
          className="flex items-center justify-center gap-1 sm:gap-3"
        >
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="loader-char inline-block text-6xl sm:text-7xl md:text-8xl font-light tracking-tight"
              style={{
                color:
                  char === " "
                    ? "transparent"
                    : i < 6
                      ? "var(--primary)"
                      : "var(--secondary)",
                width: char === " " ? "0.5em" : "auto",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-border-medium to-transparent mt-8 mx-auto w-48"
          style={{ transform: "scaleX(0)" }}
        />
        <p className="text-xs tracking-[0.3em] text-muted mt-6 font-light">
          ENGINEERING SCALABLE SYSTEMS
        </p>
      </div>
    </div>
  );
}

// ------------------- TechStack -------------------
function TechStack({ activeIndex, setActiveIndex }) {
  return (
    <div className="tech-stack absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-0 right-0 px-3 sm:px-4 md:px-6 lg:px-12 xl:px-24">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-10 max-w-7xl mx-auto">
        {techStack.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <div
              key={tech.name}
              className="tech-item group relative opacity-0 cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              aria-label={`${tech.name} - ${tech.category}`}
            >
              <div className="flex flex-col items-center">
                <IconComponent
                  className="text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 transition-all duration-300 group-hover:scale-110"
                  style={{
                    color: tech.color,
                  }}
                  size={20}
                />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-muted group-hover:text-secondary transition-colors duration-500 tracking-wider whitespace-nowrap">
                  {tech.name}
                </span>
                <span
                  className={`absolute -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] text-muted/50 whitespace-nowrap transition-opacity duration-300 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                >
                  {tech.category}
                </span>
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-border-medium to-transparent group-hover:w-full transition-all duration-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------- HomeHero - Premium Edition -------------------
export default function HomeHero() {
  const router = useRouter();
  const containerRef = useRef(null);
  const ctaRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [activeTech, setActiveTech] = useState(null);

  const handleLaunch = useCallback(() => router.push("/projects"), [router]);

  // ------------------- CTA Magnetic Effect -------------------
  useEffect(() => {
    if (!isReady || !ctaRef.current) return;

    const ctaEl = ctaRef.current;

    const mouseMoveHandler = (e) => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = ctaEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(ctaEl, {
          x: x * CTA_MAGNETIC_MULTIPLIER,
          y: y * CTA_MAGNETIC_MULTIPLIER,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    };

    const mouseLeaveHandler = () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      gsap.to(ctaEl, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    };

    ctaEl.addEventListener("mousemove", mouseMoveHandler);
    ctaEl.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      ctaEl.removeEventListener("mousemove", mouseMoveHandler);
      ctaEl.removeEventListener("mouseleave", mouseLeaveHandler);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isReady]);

  // ------------------- Hero Entrance & Parallax Animations -------------------
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      heroTl
        .fromTo(
          ".hero-line",
          {
            y: 200,
            opacity: 0,
            rotateX: -45,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: HERO_LINE_DURATION,
            stagger: 0.15,
          },
        )
        .fromTo(
          ".hero-pre-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=1.4",
        )
        .fromTo(
          ".hero-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8",
        )
        .fromTo(
          ".hero-cta-wrapper",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: HERO_CTA_EASE },
          "-=0.5",
        );

      // Tech stack entrance on scroll
      ScrollTrigger.create({
        trigger: ".tech-stack",
        start: "top bottom-=50",
        onEnter: () => {
          gsap.fromTo(
            ".tech-item",
            { y: 30, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.03,
              ease: "back.out(1.7)",
            },
          );
        },
        onLeaveBack: () =>
          gsap.set(".tech-item", { y: 30, opacity: 0, scale: 0.8 }),
      });

      // Parallax layers with quickSetter
      const parallaxLayers = [
        { selector: ".parallax-layer-1", yPercent: 30 },
        { selector: ".parallax-layer-2", yPercent: 50, scale: 1.1 },
        {
          selector: ".parallax-layer-3",
          yPercent: 70,
          opacity: 0.3,
          scale: 1.2,
        },
      ];

      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
        parallaxLayers.forEach((layer) => {
          const setY = gsap.quickSetter(layer.selector, "yPercent");
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => setY(layer.yPercent * self.progress),
          });

          if (layer.scale) {
            const setScale = gsap.quickSetter(layer.selector, "scale");
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              onUpdate: (self) =>
                setScale(1 + (layer.scale - 1) * self.progress),
            });
          }

          if (layer.opacity !== undefined) {
            const setOpacity = gsap.quickSetter(layer.selector, "opacity");
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              onUpdate: (self) => setOpacity(layer.opacity * self.progress),
            });
          }
        });
      }

      // Floating ambient orbs
      const floatingOrbs = [
        { selector: ".floating-orb-1", x: 100, y: 60, duration: 20 },
        { selector: ".floating-orb-2", x: -80, y: -40, duration: 15 },
        { selector: ".floating-orb-3", x: 60, y: -80, duration: 18 },
      ];

      floatingOrbs.forEach(({ selector, x, y, duration }) => {
        const setX = gsap.quickSetter(selector, "x", "px");
        const setY = gsap.quickSetter(selector, "y", "px");

        gsap.to(
          { progress: 0 },
          {
            progress: 1,
            repeat: -1,
            yoyo: true,
            duration,
            ease: "sine.inOut",
            onUpdate: function () {
              setX(this.progress * x);
              setY(this.progress * y);
            },
          },
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isReady]);

  // ScrollTrigger refresh on resize
  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="overflow-hidden relative min-h-screen bg-light">
      {!isReady && <Loader onComplete={() => setIsReady(true)} />}

      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
        aria-label="Hero section"
      >
        {/* Ambient background layers */}
        <div className="absolute inset-0 bg-gradient-matte">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

          {/* Floating ambient orbs */}
          <div className="floating-orb-1 parallax-layer-1 absolute -top-32 -right-32 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl will-change-transform" />
          <div className="floating-orb-2 parallax-layer-2 absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-accent-muted/5 rounded-full blur-3xl will-change-transform" />
          <div className="floating-orb-3 parallax-layer-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-border-light/5 rounded-full blur-3xl will-change-transform" />
        </div>

        {/* Main content */}
        <div className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-6 lg:px-6 py-12 sm:py-12 z-10">
          <div className="max-w-7xl mx-auto w-full">
            {/* Pre-title */}
            <div className="hero-pre-title inline-flex items-center gap-3 mb-6 sm:mb-8 opacity-0">
              <div
                className="w-8 sm:w-12 h-px"
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-muted font-light uppercase">
                VISHAL SINGH — BUILDING PRODUCTION-GRADE SYSTEMS
              </span>
            </div>

            {/* Hero headline */}
            <h1 className="mb-6 sm:mb-8">
              <div className="sr-only">Digital Craftsmanship</div>
              <div aria-hidden="true">
                <div className="flex flex-col">
                  <span className="hero-line block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-primary leading-[1.02] opacity-0">
                    DIGITAL
                  </span>
                  <span className="hero-line block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-primary leading-[1.02] opacity-0">
                    <span className="text-secondary relative inline-block">
                      CRAFTSMANSHIP
                      <span
                        className="absolute -bottom-2 sm:-bottom-3 left-0 w-1/3 h-px bg-gradient-to-r from-border-medium to-transparent"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </div>
              </div>
            </h1>

            {/* Description */}
            <p className="hero-description max-w-xl text-sm sm:text-base md:text-lg text-secondary leading-relaxed mb-8 sm:mb-12 opacity-0 font-light">
              I design and build high-performance backend systems, real-time
              APIs, and AI-powered infrastructure focused on scalability,
              reliability, and production use.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-wrapper flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-0">
              <button
                ref={ctaRef}
                onClick={handleLaunch}
                className="group relative px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-light min-h-[44px]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-dark)",
                  boxShadow: "0 0 30px var(--accent-muted)",
                }}
                aria-label="Explore my work"
              >
                <span className="relative z-10 tracking-wider text-xs sm:text-sm font-medium flex items-center gap-2">
                  <span className="group-hover:-translate-x-1 transition-transform duration-300">
                    VIEW WORK
                  </span>
                  <ArrowRight
                    size={16}
                    className="transform transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/90 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl" />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-border-light/20 text-muted hover:text-secondary hover:border-border-light/40 transition-all duration-300 min-h-[44px]"
                aria-label="Learn more about me"
              >
                <span className="text-xs sm:text-sm font-light tracking-wide">
                  LEARN MORE
                </span>
                <ArrowDown
                  size={16}
                  className="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <TechStack activeIndex={activeTech} setActiveIndex={setActiveTech} />

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-border-light/20 to-border-light/30 animate-pulse" />
          <span className="text-[9px] tracking-[0.3em] text-muted/30 font-light">
            SCROLL
          </span>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .parallax-layer-1,
        .parallax-layer-2,
        .parallax-layer-3,
        .floating-orb-1,
        .floating-orb-2,
        .floating-orb-3 {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .parallax-layer-1,
          .parallax-layer-2,
          .parallax-layer-3,
          .floating-orb-1,
          .floating-orb-2,
          .floating-orb-3 {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
