"use client";

import { motion } from "framer-motion";

import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiElectron,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiWebrtc,
  SiPython,
  SiFastapi,
  SiAmazon,
  SiGooglecloud,
  SiDocker,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiRedis,
  SiElastic,
  SiOpenai,
  SiLangchain,
} from "react-icons/si";

import {
  Code,
  Server,
  BrainCircuit,
  Cpu,
  Database,
  Languages,
  Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";
import CosmicBackground from "../CosmicBackground";

const SkillCategory = ({ title, icon: Icon, skills, color, delay }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-white/10 p-6 backdrop-blur-sm bg-white/5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <h3 className="text-lg font-medium" style={{ color }}>
            {title}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-3xl">{skill.icon}</div>
              <span className="text-xs text-white/80">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function TechStack() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const icons = [Code, Server, Cpu, Database, Languages];
    const newBubbles = Array.from({ length: 12 }).map((_, i) => ({
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      delay: Math.random() * 0.5,
    }));
    setBubbles(newBubbles);
  }, []);

  const categories = [
    {
      title: "Frontend",
      icon: Code,
      color: "#38bdf8",
      skills: [
        { icon: <SiReact className="text-[#61dafb]" />, name: "React" },
        { icon: <SiNextdotjs className="text-white" />, name: "Next.js" },
        { icon: <SiAngular className="text-[#dd1b16]" />, name: "Angular" },
        {
          icon: <SiElectron className="text-[#47848F]" />,
          name: "Electron.js",
        },
        {
          icon: <SiJavascript className="text-[#f7df1e]" />,
          name: "JavaScript",
        },
        {
          icon: <SiTypescript className="text-[#3178c6]" />,
          name: "TypeScript",
        },
      ],
    },
    {
      title: "Backend",
      icon: Server,
      color: "#4ade80",
      skills: [
        { icon: <SiNodedotjs className="text-[#339933]" />, name: "Node.js" },
        { icon: <SiGraphql className="text-[#e10098]" />, name: "GraphQL" },
        { icon: <SiExpress className="text-white" />, name: "Express.js" },
        { icon: <SiNestjs className="text-[#e0234e]" />, name: "Nest.js" },
        { icon: <SiWebrtc className="text-[#333]" />, name: "WebRTC" },
        { icon: <SiFastapi className="text-[#009688]" />, name: "FastAPI" },
      ],
    },
    {
      title: "AI/ML",
      icon: BrainCircuit,
      color: "#c084fc",
      skills: [
        { icon: <Sparkles className="text-[#a78bfa]" />, name: "LLMs" },
        { icon: <SiLangchain className="text-[#5c2d91]" />, name: "LangChain" },
        { icon: <SiOpenai className="text-[#10a37f]" />, name: "OpenAI" },
      ],
    },
    {
      title: "Cloud/DevOps",
      icon: Cpu,
      color: "#f59e0b",
      skills: [
        { icon: <SiAmazon className="text-[#ff9900]" />, name: "AWS" },
        { icon: <SiGooglecloud className="text-[#4285f4]" />, name: "GCP" },
        {
          icon: <SiAmazon className="text-[#0078d7]" />,
          name: "Azure",
        },
        { icon: <SiDocker className="text-[#0db7ed]" />, name: "Docker" },
      ],
    },
    {
      title: "Databases",
      icon: Database,
      color: "#f472b6",
      skills: [
        { icon: <SiMongodb className="text-[#47a248]" />, name: "MongoDB" },
        { icon: <SiMysql className="text-[#00758f]" />, name: "MySQL" },
        {
          icon: <SiPostgresql className="text-[#336791]" />,
          name: "PostgreSQL",
        },
        { icon: <SiFirebase className="text-[#ffca28]" />, name: "Firebase" },
        { icon: <SiRedis className="text-[#005571]" />, name: "Redis" },
        { icon: <SiElastic className="text-[#003b57]" />, name: "Elastic" },
      ],
    },
    {
      title: "Languages",
      icon: Languages,
      color: "#ec4899",
      skills: [
        {
          icon: <SiTypescript className="text-[#3178c6]" />,
          name: "TypeScript",
        },
        {
          icon: <SiJavascript className="text-[#f7df1e]" />,
          name: "JavaScript",
        },
        { icon: <SiPython className="text-[#3776ab]" />, name: "Python" },
      ],
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* <CosmicBackground></CosmicBackground> */}
      <div className="relative max-w-7xl w-full mx-auto z-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* <BrainCircuit className="text-pink-500" size={32} /> */}
          <span className="bg-gradient-to-r from-orange-400 to-purple-800 bg-clip-text text-transparent">
            Technical Toolbox
          </span>
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              color={category.color}
              delay={i * 0.1}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70 max-w-2xl mx-auto">
            Continuously expanding my toolkit with modern technologies and best
            practices to build scalable, performant applications.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
