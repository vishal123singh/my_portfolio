"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ArrowRight } from "lucide-react";
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
import { SiGithub, SiLinkedin } from "react-icons/si";
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

// ------------------- Loader with Character Animations -------------------
function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const textContainerRef = useRef(null);
  const vsCharsRef = useRef([]);
  const taglineCharsRef = useRef([]);

  // Split text into characters
  useEffect(() => {
    if (textContainerRef.current) {
      const vsText = "VS";
      textContainerRef.current.innerHTML = "";
      const vsSpans = vsText.split("").map((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        if (char === "V")
          span.className =
            "text-6xl sm:text-8xl text-primary font-light tracking-tight";
        if (char === "S")
          span.className =
            "text-6xl sm:text-8xl text-muted font-light tracking-tight";
        textContainerRef.current.appendChild(span);
        return span;
      });
      vsCharsRef.current = vsSpans;
    }

    if (taglineCharsRef.current.length === 0) {
      const taglineEl = document.querySelector("[data-tagline]");
      if (taglineEl) {
        const text = "CRAFTING DIGITAL EXPERIENCES";
        taglineEl.innerHTML = "";
        const chars = text.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          if (char !== " ") span.style.transform = "scale(0)";
          taglineEl.appendChild(span);
          return span;
        });
        taglineCharsRef.current = chars;
      }
    }
  }, []);

  useEffect(() => {
    const loaderEl = loaderRef.current;
    if (!loaderEl) return;

    const originalOverflow = document.body.style.overflow;
    const originalPointerEvents = document.body.style.pointerEvents;
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onStart: () => {
          setTimeout(() => {
            onComplete();
          }, 2200);
        },
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          document.body.style.pointerEvents = originalPointerEvents;
        },
      });

      // Animate each character of "VS" with stagger
      tl.fromTo(
        vsCharsRef.current,
        {
          opacity: 0,
          y: 40,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.5)",
        },
      )

        // Add a 3D flip effect to the second character
        .to(
          vsCharsRef.current[1],
          {
            rotationY: 360,
            duration: 0.6,
            repeat: 1,
            yoyo: true,
            ease: "power2.inOut",
          },
          "+=0.5",
        )

        // Animate the dividing line with pulse effect
        .to(
          ".loader-line",
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.3",
        )

        // Animate tagline characters with wave effect
        .to(
          taglineCharsRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: {
              each: 0.03,
              from: "center",
              ease: "back.out(1.2)",
            },
          },
          "-=0.2",
        )

        // Glow pulse animation on the whole text
        .to(
          textContainerRef.current,
          {
            textShadow: "0 0 30px rgba(0,0,0,0.1)",
            duration: 0.8,
            repeat: 2,
            yoyo: true,
            ease: "power1.inOut",
          },
          "+=0.3",
        )

        // Animate out the loader
        .to(loaderEl, {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.5,
          ease: "power4.inOut",
          delay: 0.5,
        })
        .to(loaderEl, { display: "none", duration: 0 }, "-=1.2");
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow;
      document.body.style.pointerEvents = originalPointerEvents;
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-light z-[100] flex items-center justify-center"
      style={{ transformOrigin: "top" }}
      aria-label="Loading screen"
      role="status"
    >
      <div className="text-center relative px-4">
        <div className="relative">
          <div
            ref={textContainerRef}
            className="relative flex justify-center gap-2"
            style={{ perspective: "500px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border-light/20 to-transparent blur-3xl animate-pulse" />
        </div>

        <div className="mt-8 relative overflow-hidden">
          <div
            className="loader-line w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-border-medium to-transparent mx-auto"
            style={{ transform: "scaleX(0)", opacity: 0 }}
          />
          <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-border-light to-transparent mx-auto mt-1 animate-pulse" />
        </div>

        <div
          data-tagline
          className="mt-8 text-muted text-xs sm:text-sm tracking-[0.3em]"
        >
          CRAFTING DIGITAL EXPERIENCES
        </div>
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

// ------------------- HomeHero -------------------
export default function HomeHero() {
  const router = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
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
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    const mouseLeaveHandler = () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      gsap.to(ctaEl, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
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

  // ------------------- Hero & Scroll Animations with quickSetter -------------------
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo(
          ".hero-line",
          { y: 200, opacity: 0, rotateX: -45, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: HERO_LINE_DURATION,
            stagger: 0.15,
            ease: "power4.out",
          },
        )
        .fromTo(
          ".hero-pre-title",
          { y: 30, opacity: 0, rotateX: -15 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out" },
          "-=1.4",
        )
        .fromTo(
          ".hero-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8",
        )
        .fromTo(
          ".hero-cta",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: HERO_CTA_EASE },
          "-=0.5",
        );

      // Tech stack animation
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

      // ------------------- Optimized Parallax Layers -------------------
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        const parallaxLayers = [
          { selector: ".parallax-layer-1", yPercent: 20 },
          { selector: ".parallax-layer-2", yPercent: 30, scale: 1.1 },
          {
            selector: ".parallax-layer-3",
            yPercent: 40,
            opacity: 0.2,
            scale: 1.2,
          },
        ];

        parallaxLayers.forEach((layer) => {
          const set = gsap.quickSetter(layer.selector, "yPercent");
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => set(layer.yPercent * self.progress),
          });
          // Optional: scale & opacity can also use quickSetter if needed
          if (layer.scale) {
            const setScale = gsap.quickSetter(layer.selector, "scale");
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
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
              scrub: true,
              onUpdate: (self) => setOpacity(layer.opacity * self.progress),
            });
          }
        });
      }

      // ------------------- Floating Orbs -------------------
      const floatingOrbs = [
        { selector: ".floating-orb-1", x: 100, y: 50, duration: 20 },
        { selector: ".floating-orb-2", x: -80, y: -30, duration: 15 },
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isReady]);

  // ------------------- ScrollTrigger refresh on resize -------------------
  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="overflow-hidden relative min-h-screen">
      {!isReady && <Loader onComplete={() => setIsReady(true)} />}

      <section
        ref={containerRef}
        className="relative min-h-screen bg-gradient-matte text-primary"
        aria-label="Hero section"
      >
        {/* Top Right Socials */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-12 z-20 flex items-center gap-4">
          <a
            href="https://github.com/vishalsinghlab"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="GitHub"
          >
            <SiGithub
              size={20}
              className="text-muted group-hover:text-primary transition-colors duration-300"
            />
          </a>

          <a
            href="https://linkedin.com/in/vishal-singh-b57b7b109"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="LinkedIn"
          >
            <SiLinkedin
              size={20}
              className="text-muted group-hover:text-primary transition-colors duration-300"
            />
          </a>
        </div>
        <div
          ref={heroRef}
          className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-20 z-10"
        >
          <div className="max-w-7xl mx-auto w-full relative">
            {/* Pre-title */}
            <span className="hero-pre-title inline-block text-muted text-[10px] sm:text-xs md:text-sm tracking-[0.3em] mb-3 sm:mb-4 md:mb-6 opacity-0">
              <span
                className="inline-block w-6 sm:w-8 md:w-12 h-px mr-2 sm:mr-3 md:mr-4 align-middle"
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              />
              VISHAL SINGH - FULL-STACK DEVELOPER
            </span>

            {/* Hero Title */}
            <h1 className="mb-6 sm:mb-8">
              <div className="sr-only">Digital Craftsmanship</div>
              <div aria-hidden="true">
                <span className="hero-line block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-light tracking-tight text-primary opacity-0 leading-[1.1] sm:leading-[0.9]">
                  DIGITAL
                </span>
              </div>
              <div aria-hidden="true" className="mt-1 sm:mt-0">
                <span className="hero-line block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-light tracking-tight text-primary opacity-0 leading-[1.1] sm:leading-[0.9]">
                  <span className="text-secondary relative inline-block">
                    CRAFTSMANSHIP
                    <span
                      className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-medium to-transparent"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </div>
            </h1>

            {/* Description */}
            <div className="hero-description max-w-xl sm:max-w-2xl opacity-0">
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-secondary leading-relaxed">
                Building performant, scalable systems with obsessive attention
                to detail and user experience through first principles thinking.
              </p>
            </div>

            {/* CTA Button */}
            <div className="hero-cta mt-8 sm:mt-10 md:mt-12 opacity-0">
              <button
                ref={ctaRef}
                onClick={handleLaunch}
                className="magnetic-cta group relative px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-dark)",
                  boxShadow: "0 0 20px var(--accent-muted)",
                }}
                aria-label="Explore my work"
              >
                <span className="relative z-10 tracking-wider text-xs sm:text-sm font-medium flex items-center gap-2">
                  EXPLORE MY WORK
                  <ArrowRight
                    size={16}
                    className="transform transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <TechStack activeIndex={activeTech} setActiveIndex={setActiveTech} />
      </section>

      {/* Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 3s ease-in-out infinite;
        }

        .parallax-layer-1,
        .parallax-layer-2,
        .parallax-layer-3,
        .floating-orb-1,
        .floating-orb-2,
        .floating-orb-3 {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll,
          .floating-orb-1,
          .floating-orb-2,
          .floating-orb-3,
          .parallax-layer-1,
          .parallax-layer-2,
          .parallax-layer-3 {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
