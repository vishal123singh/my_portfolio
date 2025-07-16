"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaMobileAlt,
  FaUnlockAlt,
} from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiAngular, SiFirebase } from "react-icons/si";
import { Typewriter } from "react-simple-typewriter";

function FlippableProfile() {
  const [code, setCode] = useState("");
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    if (code.trim().toLowerCase() === "ballu & soni") {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div className="relative w-40 h-40 perspective mx-auto mb-10 group">
      {/* Card Inner */}
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        {/* Front Face */}
        <div className="flip-card-front">
          <Image
            src="/personal/profile.png"
            alt="Vishal Singh"
            fill
            className="object-cover rounded-full"
          />
        </div>
        {/* Back Face */}
        <div className="flip-card-back">
          <Image
            src="/personal/2.jpg"
            alt="Ballu & Soni"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      {/* 👇 Input & Button - visible only on hover */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="flex items-center gap-2 bg-slate-800 px-2 py-1 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Secret code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-2 py-1 rounded-md text-xs text-white bg-slate-700 w-28"
          />
          <button
            onClick={handleFlip}
            className="text-white bg-pink-500 p-2 rounded-full hover:bg-pink-600"
          >
            <FaUnlockAlt size={14} />
          </button>
        </div>
      </div>

      {/* Flip CSS */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s ease-in-out;
          transform-style: preserve-3d;
        }
        .flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 9999px;
          overflow: hidden;
          top: 0;
          left: 0;
        }
        .flip-card-front {
          z-index: 2;
          transform: rotateY(0deg);
        }
        .flip-card-back {
          transform: rotateY(180deg);
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

export default function About() {
  return (
    <section className="bg-transparent py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <FlippableProfile />
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <p className="text-slate-300 max-w-3xl mx-auto">
          I’m a{" "}
          <span className="text-pink-400 font-semibold">
            full-stack developer
          </span>{" "}
          with 3+ years of experience building dynamic apps across mobile and
          web. My work focuses on performance, usability, and integrating modern
          tech like LLMs, microservices, and real-time communication.
        </p>

        {/* Tech Icons */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-3xl text-slate-400">
          <FaReact title="React/React Native" />
          <SiNextdotjs title="Next.js" />
          <FaNodeJs title="Node.js" />
          <SiMongodb title="MongoDB" />
          <SiAngular title="Angular" />
          <SiFirebase title="Firebase" />
          <FaPython title="Python" />
        </div>

        {/* Professional Journey */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-pink-400 mb-12">
            Professional Journey
          </h3>

          <div className="relative border-l-2 border-pink-500 pl-6 space-y-12">
            {[
              {
                title: "Software Engineer",
                company: "Jai Infoway Pvt. Ltd.",
                duration: "August 2024 – Present",
                description:
                  "Leading full-stack development for global client projects in a product-service hybrid environment.",
                tech: "React, Node.js, AWS, Microservices",
              },
              {
                title: "Mobile App Developer",
                company: "Brightcode Pvt. Ltd.",
                duration: "March 2024 – August 2024",
                description:
                  "Developed cross-platform mobile applications with optimized performance and responsive UIs.",
                tech: "React Native, Node.js, GCP",
              },
              {
                title: "Software Engineer",
                company: "Jai Infoway Pvt. Ltd.",
                duration: "February 2023 – February 2024",
                description:
                  "Built client-facing applications end-to-end in Agile teams, from UI to backend services.",
                tech: "Angular, Express.js, MongoDB, MySQL",
              },
              {
                title: "Freelance Full-Stack Developer",
                company: "",
                duration: "July 2022 – January 2023",
                description:
                  "Delivered complete web solutions for local businesses, handling all development phases.",
                tech: "React, Node.js, REST APIs",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="relative pl-4 before:absolute before:w-3 before:h-3 before:bg-pink-400 before:rounded-full before:left-[-9px] before:top-1.5"
              >
                <div className="bg-[#1e293b] rounded-xl p-5 shadow hover:shadow-pink-500/20 transition">
                  <h4 className="text-lg font-semibold text-white">
                    {job.title}
                    {job.company && (
                      <>
                        {" "}
                        —{" "}
                        <span className="text-cyan-400 font-medium">
                          {job.company}
                        </span>
                      </>
                    )}
                  </h4>
                  <p className="text-sm text-slate-400 mb-1">{job.duration}</p>
                  <p className="text-sm text-slate-300">{job.description}</p>
                  <p className="text-sm text-slate-400 mt-2">
                    <strong className="text-white">Tech:</strong> {job.tech}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Projects */}
        <div className="mt-16 text-left">
          <h3 className="text-xl font-bold text-pink-400 mb-4">
            Notable Projects
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-[#334155] hover:shadow-cyan-500/10 transition">
              <h5 className="text-lg font-semibold text-white">AutoFlow</h5>
              <p className="text-sm text-slate-300 mt-1">
                Sales automation platform with multi-source data extraction and
                marketing workflows.
              </p>
              <span className="text-xs text-cyan-400 mt-2 block">
                Next.js • Apollo • TypeScript
              </span>
            </div>

            <div className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-[#334155] hover:shadow-cyan-500/10 transition">
              <h5 className="text-lg font-semibold text-white">
                Earnings Call
              </h5>
              <p className="text-sm text-slate-300 mt-1">
                AI-powered financial analysis platform with LLM integration and
                voice assistant.
              </p>
              <span className="text-xs text-cyan-400 mt-2 block">
                Next.js • AWS • AI Agents
              </span>
            </div>

            <div className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-[#334155] hover:shadow-cyan-500/10 transition">
              <h5 className="text-lg font-semibold text-white">
                OFLEP Connect
              </h5>
              <p className="text-sm text-slate-300 mt-1">
                WebRTC video conferencing with screen sharing and real-time host
                controls.
              </p>
              <span className="text-xs text-cyan-400 mt-2 block">
                React Native • WebRTC • Socket.io
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
