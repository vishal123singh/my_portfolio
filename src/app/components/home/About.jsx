"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";
import { experiences } from "../../../../data.js";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { skill: "Frontend Development", level: "95%" },
  { skill: "UI/UX Design", level: "88%" },
  { skill: "Performance Optimization", level: "92%" },
  { skill: "3D Web Experiences", level: "85%" },
  { skill: "Backend Development", level: "95%" },
  { skill: "DevOps", level: "95%" },
];

export default function About() {
  const sectionRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);

  const aboutText = [
    "With over 4 years of experience crafting digital solutions",
    "for global brands and innovative startups, I blend technical",
    "excellence with creative vision.",
  ];

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Animate paragraphs (instead of per word for performance)
      gsap.fromTo(
        ".about-word",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            once: true, // only run once
          },
        },
      );

      // Animate skill bars
      gsap.to(".skill-bar-fill", {
        width: (i, target) => target.dataset.width || "0%",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Timeline items
      gsap.fromTo(
        ".timeline-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
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
          className="absolute inset-0 opacity-10"
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
        <header ref={aboutRef} className="mb-16">
          <span className="text-sm tracking-[0.3em] text-muted">
            <span
              className="inline-block w-12 h-px mr-4"
              style={{ background: "var(--accent)" }}
            />
            ABOUT
          </span>

          <h2 className="text-5xl md:text-6xl mt-6">
            <span className="font-medium text-primary">Behind</span>
            <span className="ml-4 text-secondary">the Code</span>
          </h2>
        </header>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT */}
          <div>
            {/* Profile */}
            <figure className="relative w-32 h-32 mb-8 group">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "var(--gradient-metal)",
                  border: "1px solid var(--border-light)",
                  boxShadow: `
                    inset 0 1px 0 var(--border-light),
                    0 10px 25px rgba(0,0,0,0.8)
                  `,
                }}
              />

              <div className="relative w-full h-full rounded-full overflow-hidden border border-border-light">
                <Image
                  src="/personal/image.webp"
                  alt="Profile photo of Vishal Singh"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </figure>

            {/* Text */}
            <div className="space-y-4 text-lg mb-12 text-secondary">
              {aboutText.map((line, i) => (
                <p key={i}>
                  {line.split(" ").map((word, idx) => (
                    <span
                      key={idx}
                      className="inline-block mr-2 overflow-hidden"
                    >
                      <span className="about-word inline-block translate-y-full">
                        {word}
                      </span>
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="space-y-6">
              <h3 className="text-xl mb-6 text-primary">Expertise</h3>

              {skills.map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between text-sm mb-2 text-muted">
                    <span>{s.skill}</span>
                    <span>{s.level}</span>
                  </div>

                  {/* Track */}
                  <div
                    className="h-[2px] rounded-full overflow-hidden"
                    style={{
                      background: "var(--border-light)",
                    }}
                  >
                    {/* Fill */}
                    <div
                      className="skill-bar-fill h-full"
                      data-width={s.level}
                      style={{
                        width: "0%",
                        background:
                          "linear-gradient(90deg, var(--accent), var(--text-muted))",
                        boxShadow: "0 0 10px var(--accent-muted)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIMELINE */}
          <div ref={timelineRef}>
            <h3 className="text-xl mb-8 flex items-center gap-2 text-secondary">
              <Briefcase size={18} style={{ color: "var(--accent)" }} />
              Journey
            </h3>

            <div className="relative">
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{ background: "var(--border-light)" }}
              />

              <ul className="space-y-8">
                {experiences.map((exp, i) => (
                  <li key={i} className="timeline-item pl-12 opacity-0">
                    <div
                      className="absolute left-2 top-2 w-4 h-4 rounded-full"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 0 10px var(--accent-muted)",
                      }}
                    />

                    {/* Card */}
                    <article
                      className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: "var(--gradient-metal)",
                        border: "1px solid var(--border-light)",
                        boxShadow: `
                          inset 0 1px 0 var(--border-light),
                          0 10px 25px rgba(0,0,0,0.8)
                        `,
                      }}
                    >
                      <h4 className="text-primary">{exp.title}</h4>
                      <p className="text-muted text-sm">{exp.company}</p>
                      <p className="text-muted/70 text-sm mt-2">
                        {exp.description}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Decor */}
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ border: "1px solid var(--border-light)" }}
        />
      </div>

      <style jsx>{`
        .about-word {
          transform: translateY(100%);
        }
      `}</style>
    </section>
  );
}
