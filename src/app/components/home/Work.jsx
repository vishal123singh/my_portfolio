"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { keyProjects } from "../../../../data";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const projectsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect device capabilities once
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
      setIsTouchDevice(touch);
    };

    checkDevice();

    const handleResize = () => {
      checkDevice();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    const ctx = gsap.context(() => {
      // Use simpler animations on mobile
      const duration = isMobile ? 0.6 : 1.5;
      const yOffset = isMobile ? 30 : 100;

      // Header animation - simpler on mobile
      gsap.fromTo(
        ".work-header",
        { y: yOffset, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power2.out",
          clearProps: isMobile ? "all" : undefined, // Clean up on mobile
        },
      );

      // Animate projects with reduced complexity on mobile
      projectsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardDuration = isMobile ? 0.5 : 1.2;
        const cardDelay = isMobile ? 0.05 * index : index * 0.2;

        gsap.fromTo(
          card,
          { y: yOffset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: cardDuration,
            delay: cardDelay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
              // Optimize ScrollTrigger for mobile
              fastScrollEnd: isMobile ? true : false,
              markers: false,
            },
          },
        );
      });

      // Only add 3D effects on non-touch devices and desktop
      if (!isTouchDevice && !isMobile) {
        projectsRef.current.forEach((card) => {
          if (!card) return;

          const imageCard = card.querySelector(".project-image-card");
          if (!imageCard) return;

          // Use requestAnimationFrame for smoother performance
          let rafId = null;
          let targetRotateX = 0;
          let targetRotateY = 0;
          let currentRotateX = 0;
          let currentRotateY = 0;
          let currentScale = 1;

          const animate = () => {
            // Smooth interpolation
            currentRotateX += (targetRotateX - currentRotateX) * 0.15;
            currentRotateY += (targetRotateY - currentRotateY) * 0.15;
            currentScale +=
              (targetRotateX !== 0 ? 1.02 - currentScale : 1 - currentScale) *
              0.15;

            gsap.set(imageCard, {
              rotateX: currentRotateX,
              rotateY: currentRotateY,
              scale: currentScale,
              overwrite: true,
            });

            rafId = requestAnimationFrame(animate);
          };

          animate();

          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            targetRotateX = (y - rect.height / 2) / 25;
            targetRotateY = (rect.width / 2 - x) / 25;
          };

          const handleMouseLeave = () => {
            targetRotateX = 0;
            targetRotateY = 0;
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            if (rafId) cancelAnimationFrame(rafId);
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
          };
        });
      }

      // Disable parallax completely on mobile for better performance
      if (!isMobile) {
        gsap.to(".parallax-blob", {
          y: 200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, isTouchDevice]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-12 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
        // Enable hardware acceleration
        transform: "translate3d(0,0,0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Background - Optimized for performance */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 will-change-transform"
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
            backgroundSize: "clamp(30px, 8vw, 90px) clamp(30px, 8vw, 90px)",
          }}
        />

        {/* Reduced blur radius on mobile for performance */}
        <div
          className="parallax-blob absolute top-1/2 right-0 -translate-y-1/2 w-[200px] sm:w-[400px] md:w-[500px] h-[200px] sm:h-[400px] md:h-[500px] bg-white/5 rounded-full"
          style={{
            filter: `blur(${isMobile ? "40px" : "80px"})`,
            transform: "translate3d(0,0,0)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="work-header mb-12 sm:mb-16 md:mb-20">
          <span className="text-white/60 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 inline-block">
            <span
              className="inline-block w-8 sm:w-12 h-px mr-2 sm:mr-4"
              style={{ background: "var(--accent)" }}
            />
            SELECTED WORK
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="font-medium text-white">Featured</span>
            <span className="block sm:inline ml-0 sm:ml-4 mt-2 sm:mt-0 text-white/40">
              Projects
            </span>
          </h2>
        </div>

        {/* Projects */}
        <div
          ref={containerRef}
          className="space-y-16 sm:space-y-24 md:space-y-32"
        >
          {keyProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) projectsRef.current[index] = el;
              }}
              className="group relative opacity-0 will-change-transform"
            >
              <div
                className={`grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start lg:items-center ${
                  index % 2 !== 0 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`space-y-3 sm:space-y-4 md:space-y-6 ${index % 2 !== 0 ? "lg:order-last" : ""}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/50">
                    <span>0{index + 1}</span>
                    <span className="w-6 sm:w-8 h-px bg-white/10" />
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
                    {project.title}
                  </h3>

                  <span className="text-white/50 text-xs sm:text-sm block">
                    {project.category}
                  </span>

                  <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  <a
                    href={project.link}
                    className="group/link inline-flex items-center gap-2 sm:gap-3 text-white/60 hover:text-white transition pt-2"
                  >
                    <span className="text-xs sm:text-sm tracking-wider">
                      VIEW PROJECT
                    </span>
                    <ArrowRight
                      size={16}
                      className="group-hover/link:translate-x-1 transition-transform duration-300"
                    />
                  </a>
                </div>

                {/* Image Card - Simplified shadows on mobile */}
                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <div
                    className="project-image-card relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 will-change-transform"
                    style={{
                      background:
                        "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      boxShadow: isMobile
                        ? "0 10px 30px rgba(0,0,0,0.5)"
                        : "inset 0 1px 0 rgba(255,255,255,0.06), 0 15px 40px rgba(0,0,0,0.8)",
                      transform: "translate3d(0,0,0)",
                    }}
                  >
                    {/* Top reflection - disabled on mobile for performance */}
                    {!isMobile && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent 40%)",
                        }}
                      />
                    )}

                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

                      {!project.image ? (
                        <div className="w-full h-full flex items-center justify-center text-white/40 p-4 text-center text-sm sm:text-base">
                          Project Image
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                          loading="lazy"
                          // Add decoding async for better performance
                          decoding="async"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decor - Reduced opacity and size on mobile */}
        <div
          className="absolute -bottom-20 sm:-bottom-32 -right-20 sm:-right-32 w-48 sm:w-80 md:w-96 h-48 sm:h-80 md:h-96 rounded-full opacity-5 sm:opacity-10 pointer-events-none"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>
    </section>
  );
}
