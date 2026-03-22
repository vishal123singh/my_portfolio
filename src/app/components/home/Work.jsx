"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { keyProjects } from "../../../../data";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Adjust animations for mobile
      const isMobile = window.innerWidth < 768;

      gsap.fromTo(
        ".work-header",
        { y: isMobile ? 50 : 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
      );

      projectsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: isMobile ? 50 : 100, opacity: 0, rotateX: isMobile ? 0 : 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: isMobile ? 0.8 : 1.2,
            delay: isMobile ? 0.1 : index * 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );

        // Only add 3D effects on non-touch devices
        const imageCard = card.querySelector(".project-image-card");
        const isTouchDevice =
          "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (imageCard && !isTouchDevice) {
          const handleMouseMoveCard = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = (y - rect.height / 2) / 20;
            const rotateY = (rect.width / 2 - x) / 20;

            gsap.to(imageCard, {
              rotateX,
              rotateY,
              scale: 1.02,
              duration: 0.5,
              ease: "power2.out",
            });
          };

          const handleMouseLeaveCard = () => {
            gsap.to(imageCard, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.7,
              ease: "elastic.out(1, 0.3)",
            });
          };

          card.addEventListener("mousemove", handleMouseMoveCard);
          card.addEventListener("mouseleave", handleMouseLeaveCard);
        }
      });

      // Adjust parallax for mobile
      if (!isMobile) {
        gsap.to(".parallax-blob", {
          y: 200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    // Handle resize to reinitialize animations
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
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
            backgroundSize: "clamp(30px, 8vw, 90px) clamp(30px, 8vw, 90px)",
          }}
        />

        <div className="parallax-blob absolute top-1/2 right-0 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-white/5 rounded-full blur-3xl" />
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
          className="space-y-20 sm:space-y-24 md:space-y-32"
        >
          {keyProjects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (projectsRef.current[index] = el)}
              className="group relative opacity-0"
            >
              <div
                className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center ${
                  index % 2 !== 0 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`space-y-4 sm:space-y-6 ${index % 2 !== 0 ? "lg:order-last" : ""}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/50">
                    <span>0{index + 1}</span>
                    <span className="w-6 sm:w-8 h-px bg-white/10" />
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
                    {project.title}
                  </h3>

                  <span className="text-white/50 text-xs sm:text-sm block">
                    {project.category}
                  </span>

                  <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-md">
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
                      className="group-hover/link:translate-x-1 transition"
                    />
                  </a>
                </div>

                {/* Image Card */}
                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <div
                    className="project-image-card relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500"
                    style={{
                      background:
                        "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.06),
                        0 15px 40px rgba(0,0,0,0.8)
                      `,
                    }}
                  >
                    {/* Top reflection */}
                    <div
                      className="absolute inset-0 pointer-events-none"
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
                          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decor */}
        <div
          className="absolute -bottom-20 sm:-bottom-32 -right-20 sm:-right-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-10 pointer-events-none"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>
    </section>
  );
}
