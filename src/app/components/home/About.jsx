"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaLock, FaUnlock } from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiAngular,
  SiFirebase,
  SiTypescript,
} from "react-icons/si";
import Image from "next/image";
import { useState } from "react";
import CosmicBackground from "../CosmicBackground";

const TechBubble = ({ icon: Icon, color, name, delay }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon style={{ color }} />
      </div>
      <span className="text-xs text-white/80">{name}</span>
    </motion.div>
  );
};

const ExperienceCard = ({
  title,
  company,
  duration,
  description,
  tech,
  index,
}) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <h4 className="text-lg font-semibold">
          {title}
          {company && (
            <>
              {" "}
              <span className="text-blue-300">@ {company}</span>
            </>
          )}
        </h4>
        <p className="text-sm text-white/60 mb-3">{duration}</p>
        <p className="text-white/80 text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tech.split(" • ").map((item, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SecretProfile = () => {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleUnlock = () => {
    if (code.toLowerCase() === "ballu & soni") {
      setUnlocked((prev) => !prev); // toggle instead of just setting true
      setCode(""); // optional: clear input after toggle
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="relative group">
      <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-white/20">
        {/* First Image (Professional) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: unlocked ? 0 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src="/personal/image_2.png"
            alt="Professional"
            fill
            className="object-cover rounded-full"
          />
        </motion.div>

        {/* Second Image (Personal) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: unlocked ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src="/personal/2.jpg"
            alt="Personal"
            fill
            className="object-cover rounded-full"
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Secret code"
            className="bg-transparent text-white text-sm w-28 placeholder-white/50 focus:outline-none"
          />
          <button
            onClick={handleUnlock}
            className="text-white p-1 rounded-full"
            disabled={unlocked}
          >
            {unlocked ? (
              <FaUnlock className="text-green-400" size={14} />
            ) : (
              <FaLock className="text-pink-400" size={14} />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function About() {
  const techStack = [
    { icon: FaReact, color: "#61DAFB", name: "React" },
    { icon: SiNextdotjs, color: "#FFFFFF", name: "Next.js" },
    { icon: FaNodeJs, color: "#339933", name: "Node.js" },
    { icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
    { icon: SiMongodb, color: "#47A248", name: "MongoDB" },
    { icon: SiAngular, color: "#DD0031", name: "Angular" },
    { icon: SiFirebase, color: "#FFCA28", name: "Firebase" },
    { icon: FaPython, color: "#3776AB", name: "Python" },
  ];

  const experiences = [
    {
      title: "Software Engineer",
      company: "Jai Infoway Pvt. Ltd.",
      duration: "August 2024 – Present",
      description:
        "Leading full-stack development for global client projects in a product-service hybrid environment.",
      tech: "React • Node.js • AWS • Microservices",
    },
    {
      title: "Mobile App Developer",
      company: "Brightcode Pvt. Ltd.",
      duration: "March 2024 – August 2024",
      description:
        "Developed cross-platform mobile applications with optimized performance and responsive UIs.",
      tech: "React Native • Node.js • GCP",
    },
    {
      title: "Software Engineer",
      company: "Jai Infoway Pvt. Ltd.",
      duration: "February 2023 – February 2024",
      description:
        "Built client-facing applications end-to-end in Agile teams, from UI to backend services.",
      tech: "Angular • Express.js • MongoDB • MySQL",
    },
    {
      title: "Freelance Full-Stack Developer",
      company: "",
      duration: "July 2022 – January 2023",
      description:
        "Delivered complete web solutions for local businesses, handling all development phases.",
      tech: "React • Node.js • REST APIs",
    },
  ];

  const projects = [
    {
      name: "Koodums Chat",
      description: "Generative AI Agents Builder.",
      tech: "React • Node.js • TypeScript • Python • Vertex AI • GCP • Express.js",
    },
    {
      name: "Earnings Call",
      description:
        "AI-powered financial analysis platform with LLM integration and voice assistant.",
      tech: "Next.js • AWS • AI Agents",
    },
    {
      name: "Kiddie-Kredit",
      description:
        "Financial education mobile app for children. Gamified with task & reward systems.",
      tech: "React Native • Node.js • Socket.io",
    },
  ];

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
              full-stack developer
            </span>{" "}
            with 3+ years of experience building dynamic apps across mobile and
            web. My work focuses on performance, usability, and integrating
            modern tech like LLMs, microservices, and real-time communication.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-center text-orange-400 mb-8">
            Core Technologies
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-6">
            {techStack.map((tech, i) => (
              <TechBubble
                key={i}
                icon={tech.icon}
                color={tech.color}
                name={tech.name}
                delay={i * 0.05}
              />
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-12">
            Professional Journey
          </h3>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} index={i} {...exp} />
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Notable Projects
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {project.name}
                </h4>
                <p className="text-sm text-white/70 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(" • ").map((tech, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
