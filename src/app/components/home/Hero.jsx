"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ArrowRight, Code2 } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const techStack = [
  { name: "REACT", category: "Frontend", icon: "⚛️" },
  { name: "NEXT.JS", category: "Framework", icon: "▲" },
  { name: "NODE.JS", category: "Backend", icon: "●" },
  { name: "TYPESCRIPT", category: "Language", icon: "⌘" },
  { name: "PYTHON", category: "Language", icon: "🐍" },
  { name: "AWS", category: "Cloud", icon: "☁️" },
  { name: "DOCKER", category: "DevOps", icon: "⎈" },
  { name: "GRAPHQL", category: "API", icon: "◉" },
];

export default function HomeHero() {
  const router = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const codeRef = useRef(null);
  const loaderRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeTech, setActiveTech] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial loader animation
    const loaderCtx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsReady(true);
          document.body.style.overflow = "auto";
        },
      });

      tl.to(loaderRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.8,
        ease: "power4.inOut",
        delay: 1,
      }).to(
        loaderRef.current,
        {
          display: "none",
        },
        "-=1.3",
      );
    });

    return () => {
      loaderCtx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Main animations
    const ctx = gsap.context(() => {
      // Magnetic effect for CTA
      const cta = document.querySelector(".magnetic-cta");
      if (cta) {
        cta.addEventListener("mousemove", (e) => {
          const rect = cta.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(cta, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        cta.addEventListener("mouseleave", () => {
          gsap.to(cta, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }

      // Main title animation with 3D effect
      const heroTl = gsap.timeline();

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
            duration: 1.8,
            stagger: 0.15,
            ease: "power4.out",
          },
        )
        .fromTo(
          ".hero-pre-title",
          {
            y: 30,
            opacity: 0,
            rotateX: -15,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1.4",
        )
        .fromTo(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .fromTo(
          ".hero-cta",
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.5",
        );

      // Tech stack items with staggered animation
      gsap.fromTo(
        ".tech-item",
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.03,
          delay: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".tech-stack",
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Parallax layers with smooth scroll - only on larger screens
      if (window.innerWidth >= 768) {
        gsap.to(".parallax-layer-1", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(".parallax-layer-2", {
          yPercent: 30,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });

        gsap.to(".parallax-layer-3", {
          yPercent: 40,
          opacity: 0.2,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2.5,
          },
        });
      }

      // Floating orbs animation
      gsap.to(".floating-orb-1", {
        x: 100,
        y: 50,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-orb-2", {
        x: -80,
        y: -30,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-orb-3", {
        x: 60,
        y: -80,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  const handleLaunch = () => {
    router.push("/projects");
  };

  return (
    <div className="overflow-hidden">
      {/* Loading Screen - Matching About theme */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          background: "var(--bg-darker)",
          transformOrigin: "top",
        }}
      >
        <div className="text-center relative px-4">
          <div className="relative">
            <span className="text-6xl sm:text-8xl font-light tracking-tight relative z-10 text-white/90">
              V<span className="text-white/20">S</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl animate-pulse" />
          </div>
          <div className="mt-8 relative">
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mt-1 animate-pulse" />
          </div>
          <div className="mt-8 text-white/30 text-xs sm:text-sm tracking-[0.3em] animate-pulse">
            CRAFTING DIGITAL EXPERIENCES
          </div>
        </div>
      </div>

      <section
        ref={containerRef}
        className="relative min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 py-20 overflow-hidden"
        style={{
          background: "var(--gradient-matte)",
          color: "var(--text-primary)",
        }}
      >
        {/* Parallax Background - Matching About styling */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="parallax-layer-1 absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a]" />
          <div className="parallax-layer-2 absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
          </div>
          <div className="parallax-layer-3 absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
          </div>

          {/* Floating Orbs - Subtle like About */}
          <div className="floating-orb-1 absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-full blur-3xl" />
          <div className="floating-orb-2 absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-full blur-3xl" />
          <div className="floating-orb-3 absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-full blur-3xl" />

          {/* Grid overlay - Matching About grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "90px 90px",
            }}
          />
        </div>

        <div
          ref={heroRef}
          className="relative min-h-[calc(100vh-10rem)] flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Pre-title - Matching About styling */}
            <span className="hero-pre-title inline-block text-white/40 text-xs sm:text-sm tracking-[0.3em] mb-4 sm:mb-6 opacity-0">
              <span
                className="inline-block w-8 sm:w-12 h-px mr-3 sm:mr-4 align-middle"
                style={{ background: "var(--accent)" }}
              />
              FULL-STACK DEVELOPER
            </span>

            {/* Main Title - Matching About color scheme */}
            <h1 className="mb-6 sm:mb-8">
              <div className="overflow-hidden">
                <span className="hero-line block text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light tracking-tight text-white/90 opacity-0 leading-[0.9] relative">
                  DIGITAL
                  <span className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 text-[8px] sm:text-xs text-white/30 tracking-widest rotate-12 hidden lg:inline-block">
                    ✦ SINCE 2016
                  </span>
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-line block text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light tracking-tight text-white/90 opacity-0 leading-[0.9]">
                  <span className="text-white/50 relative">
                    CRAFTSMANSHIP
                    <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </span>
                </span>
              </div>
            </h1>

            {/* Description - Matching About text opacity */}
            <div className="hero-description max-w-xl sm:max-w-2xl opacity-0">
              <p className="text-base sm:text-xl md:text-2xl text-white/60 leading-relaxed">
                Building performant, scalable systems with obsessive attention
                to detail and user experience through first principles thinking.
              </p>
            </div>

            {/* CTA Button - Styled like About cards */}
            <div className="hero-cta mt-8 sm:mt-12 opacity-0">
              <button
                onClick={handleLaunch}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="magnetic-cta group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
                }}
                aria-label="Explore my work"
              >
                <span className="relative z-10 tracking-wider text-xs sm:text-sm font-medium flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                  EXPLORE MY WORK
                  <ArrowRight
                    size={16}
                    className={`transform transition-all duration-300 ${
                      isHovering ? "translate-x-1 rotate-0" : ""
                    }`}
                    aria-hidden="true"
                  />
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Tech Stack - Bottom - Matching About styling */}
        <div className="tech-stack absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="tech-item group relative opacity-0 cursor-pointer"
                onMouseEnter={() => setActiveTech(index)}
                onMouseLeave={() => setActiveTech(null)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-base sm:text-lg mb-1 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                    {tech.icon}
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-white/30 group-hover:text-white/60 transition-colors duration-500 tracking-wider">
                    {tech.name}
                  </span>
                  <span
                    className={`absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] text-white/20 whitespace-nowrap transition-opacity duration-300 ${
                      activeTech === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {tech.category}
                  </span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Matching About styling */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div className="relative">
            <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-white/30 via-white/20 to-transparent mx-auto animate-scroll" />
            <div className="absolute top-8 sm:top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-[8px] sm:text-[10px] text-white/20 tracking-[0.3em] rotate-90 block">
                SCROLL
              </span>
            </div>
          </div>
        </div>

        {/* Floating Elements - Matching About decorative borders */}
        <div
          className="absolute -bottom-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-5"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        />
        <div
          className="absolute top-1/2 -left-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-5"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        />

        {/* Mini Stats - Matching About styling */}
        <div className="absolute top-1/2 right-4 lg:right-8 transform -translate-y-1/2 hidden 2xl:block">
          <div className="space-y-4 sm:space-y-6">
            {[
              { label: "YEARS", value: "8+" },
              { label: "PROJECTS", value: "50+" },
              { label: "CLIENTS", value: "30+" },
            ].map((stat) => (
              <div key={stat.label} className="text-right">
                <div className="text-xl sm:text-2xl text-white/60 font-light">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-white/30 tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        .parallax-layer-3 {
          will-change: transform;
        }

        .perspective {
          perspective: 2000px;
        }

        .floating-orb-1,
        .floating-orb-2,
        .floating-orb-3 {
          will-change: transform;
        }

        @media (max-width: 640px) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
