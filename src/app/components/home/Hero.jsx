"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ArrowRight } from "lucide-react";

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
  const loaderRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [activeTech, setActiveTech] = useState(null);
  const animationFrameRef = useRef(null);

  // Memoize the navigation handler
  const handleLaunch = useCallback(() => {
    router.push("/projects");
  }, [router]);

  // Loader animation effect
  useEffect(() => {
    const loaderElement = loaderRef.current;
    if (!loaderElement) return;

    // Store original overflow styles
    const originalOverflow = document.body.style.overflow;
    const originalPointerEvents = document.body.style.pointerEvents;

    // Prevent scrolling during loader
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    const loaderCtx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsReady(true);
          document.body.style.overflow = originalOverflow;
          document.body.style.pointerEvents = originalPointerEvents;
        },
      });

      tl.to(loaderElement, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.8,
        ease: "power4.inOut",
        delay: 1,
      }).to(
        loaderElement,
        {
          display: "none",
          duration: 0,
        },
        "-=1.3",
      );
    });

    return () => {
      loaderCtx.revert();
      document.body.style.overflow = originalOverflow;
      document.body.style.pointerEvents = originalPointerEvents;
    };
  }, []);

  // Main animations effect
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    let mouseMoveHandler = null;
    let mouseLeaveHandler = null;

    const ctx = gsap.context(() => {
      // Setup magnetic effect for CTA
      const cta = document.querySelector(".magnetic-cta");

      if (cta) {
        mouseMoveHandler = (e) => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }

          animationFrameRef.current = requestAnimationFrame(() => {
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
        };

        mouseLeaveHandler = () => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }

          gsap.to(cta, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        cta.addEventListener("mousemove", mouseMoveHandler);
        cta.addEventListener("mouseleave", mouseLeaveHandler);
      }

      // Main title animation
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

      // Tech stack animation with ScrollTrigger
      ScrollTrigger.create({
        trigger: ".tech-stack",
        start: "top bottom-=50",
        onEnter: () => {
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
              ease: "back.out(1.7)",
            },
          );
        },
        onLeaveBack: () => {
          gsap.set(".tech-item", {
            y: 30,
            opacity: 0,
            scale: 0.8,
          });
        },
      });

      // Parallax layers - only on desktop
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        const parallaxElements = [
          { selector: ".parallax-layer-1", yPercent: 20, scrub: 1.5 },
          { selector: ".parallax-layer-2", yPercent: 30, scale: 1.1, scrub: 2 },
          {
            selector: ".parallax-layer-3",
            yPercent: 40,
            opacity: 0.2,
            scale: 1.2,
            scrub: 2.5,
          },
        ];

        parallaxElements.forEach(
          ({ selector, yPercent, scale, opacity, scrub }) => {
            const target = {
              yPercent,
              ...(scale && { scale }),
              ...(opacity && { opacity }),
            };
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub,
              onUpdate: (self) => {
                gsap.to(selector, {
                  ...target,
                  duration: 0,
                  overwrite: true,
                  ease: "none",
                  yPercent: target.yPercent * self.progress,
                });
              },
            });
          },
        );
      }

      // Floating orbs animation
      const orbs = [
        { selector: ".floating-orb-1", x: 100, y: 50, duration: 20 },
        { selector: ".floating-orb-2", x: -80, y: -30, duration: 15 },
        { selector: ".floating-orb-3", x: 60, y: -80, duration: 18 },
      ];

      orbs.forEach(({ selector, x, y, duration }) => {
        gsap.to(selector, {
          x,
          y,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (mouseMoveHandler && mouseLeaveHandler) {
        const cta = document.querySelector(".magnetic-cta");
        if (cta) {
          cta.removeEventListener("mousemove", mouseMoveHandler);
          cta.removeEventListener("mouseleave", mouseLeaveHandler);
        }
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isReady]);

  // Handle resize to refresh ScrollTrigger
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Loading Screen */}
      <div
        ref={loaderRef}
        className="fixed inset-0 bg-[#0a0a0a] z-[100] flex items-center justify-center"
        style={{ transformOrigin: "top" }}
        aria-label="Loading screen"
        role="status"
      >
        <div className="text-center relative px-4">
          <div className="relative">
            <span className="text-6xl sm:text-8xl text-white font-light tracking-tight relative z-10">
              V<span className="text-white/40">S</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent blur-3xl animate-pulse" />
          </div>
          <div className="mt-8 relative">
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-1 animate-pulse" />
          </div>
          <div className="mt-8 text-white/40 text-xs sm:text-sm tracking-[0.3em] animate-pulse">
            CRAFTING DIGITAL EXPERIENCES
          </div>
        </div>
      </div>

      <section
        ref={containerRef}
        className="relative min-h-screen"
        style={{
          background: "var(--gradient-matte, #0a0a0a)",
          color: "var(--text-primary, #ffffff)",
        }}
        aria-label="Hero section"
      >
        {/* Parallax Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div
            className="parallax-layer-1 absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at top, rgba(255,255,255,0.03), transparent 60%),
                linear-gradient(var(--bg-dark, #0f0f0f), var(--bg-darker, #050505))
              `,
            }}
            aria-hidden="true"
          />
          <div
            className="parallax-layer-2 absolute inset-0 opacity-30"
            aria-hidden="true"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
          </div>
          <div className="parallax-layer-3 absolute inset-0" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-800/5 rounded-full blur-3xl" />
          </div>

          {/* Floating Orbs */}
          <div
            className="floating-orb-1 absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-gray-800/10 to-gray-900/10 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="floating-orb-2 absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-gray-800/10 to-gray-900/10 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="floating-orb-3 absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-gray-800/10 to-gray-900/10 rounded-full blur-3xl"
            aria-hidden="true"
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
            aria-hidden="true"
          />
        </div>

        <div
          ref={heroRef}
          className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-20"
        >
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Pre-title */}
            <span className="hero-pre-title inline-block text-white/50 text-[10px] sm:text-xs md:text-sm tracking-[0.3em] mb-3 sm:mb-4 md:mb-6 opacity-0">
              <span
                className="inline-block w-6 sm:w-8 md:w-12 h-px mr-2 sm:mr-3 md:mr-4 align-middle"
                style={{ background: "var(--accent, #ffffff)" }}
                aria-hidden="true"
              />
              VISHAL SINGH - FULL-STACK DEVELOPER
            </span>

            {/* Main Title */}
            <h1 className="mb-6 sm:mb-8">
              <div className="sr-only">Digital Craftsmanship</div>
              <div aria-hidden="true">
                <span className="hero-line block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-light tracking-tight text-white opacity-0 leading-[1.1] sm:leading-[0.9]">
                  DIGITAL
                </span>
              </div>
              <div aria-hidden="true" className="mt-1 sm:mt-0">
                <span className="hero-line block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-light tracking-tight text-white opacity-0 leading-[1.1] sm:leading-[0.9]">
                  <span className="text-white/60 relative inline-block">
                    CRAFTSMANSHIP
                    <span
                      className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </div>
            </h1>

            {/* Description */}
            <div className="hero-description max-w-xl sm:max-w-2xl opacity-0">
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/60 leading-relaxed">
                Building performant, scalable systems with obsessive attention
                to detail and user experience through first principles thinking.
              </p>
            </div>

            {/* CTA Button */}
            <div className="hero-cta mt-8 sm:mt-10 md:mt-12 opacity-0">
              <button
                onClick={handleLaunch}
                className="magnetic-cta group relative px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px]"
                style={{
                  background: "var(--accent, #ffffff)",
                  color: "#000",
                  boxShadow: "0 0 20px rgba(255,255,255,0.2)",
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
                <div
                  className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-0 h-0 group-hover:w-full group-hover:h-full transition-all duration-500 bg-white/10 rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="tech-stack absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-0 right-0 px-3 sm:px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-10 max-w-7xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="tech-item group relative opacity-0 cursor-pointer"
                onMouseEnter={() => setActiveTech(index)}
                onMouseLeave={() => setActiveTech(null)}
                aria-label={`${tech.name} - ${tech.category}`}
              >
                <div className="flex flex-col items-center">
                  <span
                    className="text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    {tech.icon}
                  </span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-white/40 group-hover:text-white/60 transition-colors duration-500 tracking-wider whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span
                    className={`absolute -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] text-white/30 whitespace-nowrap transition-opacity duration-300 ${
                      activeTech === index ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    {tech.category}
                  </span>
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent group-hover:w-full transition-all duration-500"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 hidden sm:block pointer-events-none"
          aria-label="Scroll down indicator"
        >
          <div className="relative">
            <div
              className="w-px h-10 sm:h-12 md:h-16 bg-gradient-to-b from-gray-600 via-gray-600/50 to-transparent mx-auto animate-scroll"
              aria-hidden="true"
            />
            <div className="absolute top-6 sm:top-7 md:top-8 lg:top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px] text-white/30 tracking-[0.3em] rotate-90 block">
                SCROLL
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="absolute top-1/2 right-2 lg:right-4 xl:right-8 transform -translate-y-1/2 hidden lg:block">
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            {[
              { label: "YEARS", value: "4+" },
              { label: "PROJECTS", value: "15+" },
              { label: "CLIENTS", value: "15+" },
            ].map((stat) => (
              <div key={stat.label} className="text-right">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light">
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white/30 tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute -bottom-16 sm:-bottom-24 md:-bottom-32 -right-16 sm:-right-24 md:-right-32 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 border border-gray-800 rounded-full opacity-5 hidden xs:block"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -left-16 sm:-left-20 md:-left-24 lg:-left-32 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 border border-gray-800 rounded-full opacity-5 hidden xs:block"
          aria-hidden="true"
        />
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
