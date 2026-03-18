"use client";
import { FaLock, FaUnlock } from "react-icons/fa";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences } from "../../../../data.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SecretProfile = () => {
  return (
    <div className="relative group">
      <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-white/20">
        {/* First Image (Professional) */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src="/personal/image.webp"
            alt="Professional"
            fill
            className="object-cover rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        {/* Profile */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SecretProfile />
        </motion.div>

        {/* Introduction */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            I'm a{" "}
            <span className="text-pink-400 font-medium">
              full-stack developer{" "}
            </span>
            with 4+ years of experience building dynamic apps across mobile and
            web. My work focuses on performance, usability, and integrating
            modern tech like LLMs, microservices, and real-time communication.
          </p>
        </motion.div>

        <ExperienceSection />
      </div>
    </section>
  );
}

function ExperienceSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line grow animation
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        },
      );

      // Cards animation
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: i % 2 === 0 ? -80 : 80,
            y: 40,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );
      });

      // Stagger tech tags
      gsap.utils.toArray(".tech-tag").forEach((tag) => {
        gsap.from(tag, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: tag,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto relative">
        <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Professional Journey
        </h2>

        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/10">
          <div
            ref={lineRef}
            className="w-full bg-gradient-to-b from-blue-400 to-purple-500"
            style={{ height: 0 }}
          />
        </div>

        <div className="space-y-16 pl-16">
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg" />

              {/* Card */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:scale-[1.02] transition-transform duration-300">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    {exp.title}{" "}
                    <span className="text-purple-300">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {exp.duration}
                  </span>
                </div>

                <p className="text-white/70 text-sm mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.split(" • ").map((t, idx) => (
                    <span
                      key={idx}
                      className="tech-tag text-xs px-3 py-1 bg-white/10 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
