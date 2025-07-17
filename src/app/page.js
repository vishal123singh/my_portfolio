"use client";

import { Typewriter } from "react-simple-typewriter";
import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiNodedotjs,
  SiGraphql,
  SiElectron,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiAmazon,
  SiGooglecloud,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiJest,
  SiDocker,
  SiGithubactions,
  SiCypress,
} from "react-icons/si";
import { motion } from "framer-motion";
import { BrainCogIcon, Sparkles } from "lucide-react";
import About from "./about/page";
import Contact from "./contact/page";

const skillsByCategory = [
  {
    title: "Frontend",
    items: [
      { icon: <SiReact color="#61dafb" />, label: "React / Native" },
      { icon: <SiNextdotjs color="white" />, label: "Next.js" },
      { icon: <SiAngular color="#dd0031" />, label: "Angular" },
      { icon: <SiElectron color="#47848f" />, label: "Electron.js" },
      { icon: <SiTailwindcss color="#38bdf8" />, label: "Tailwind CSS" },
      { icon: <SiHtml5 color="#e34f26" />, label: "HTML" },
      { icon: <SiCss3 color="#1572b6" />, label: "CSS" },
    ],
  },
  {
    title: "Backend",
    items: [
      { icon: <SiNodedotjs color="#339933" />, label: "Node.js" },
      { icon: <SiGraphql color="#e535ab" />, label: "GraphQL" },
    ],
  },
  {
    title: "AI / ML",
    items: [
      {
        icon: <Sparkles size={20} color="#a78bfa" />,
        label: "LLMs (OpenAI, Claude)",
      },
      {
        icon: <Sparkles size={20} color="#f472b6" />,
        label: "Langchain / Agents",
      },
    ],
  },
  {
    title: "DevOps & Infra",
    items: [
      { icon: <SiAmazon color="#ff9900" />, label: "AWS" },
      { icon: <SiGooglecloud color="#4285f4" />, label: "GCP" },
      { icon: <SiDocker color="#0db7ed" />, label: "Docker" },
      { icon: <SiGithubactions color="#2088ff" />, label: "GitHub Actions" },
      { icon: <SiCypress color="#58c4c4" />, label: "CI/CD / Cypress" },
    ],
  },
  {
    title: "Databases & Tools",
    items: [
      { icon: <SiMongodb color="#47a248" />, label: "MongoDB" },
      { icon: <SiMysql color="#00758f" />, label: "MySQL" },
      { icon: <SiPostgresql color="#336791" />, label: "PostgreSQL" },
      { icon: <SiFirebase color="#ffca28" />, label: "Firebase" },
      { icon: <SiGit color="#f05032" />, label: "Git / GitHub" },
      { icon: <SiJest color="#c21325" />, label: "Jest / Postman" },
    ],
  },
  {
    title: "Languages",
    items: [
      { icon: <SiJavascript color="#f7df1e" />, label: "JavaScript" },
      { icon: <SiTypescript color="#3178c6" />, label: "TypeScript" },
      { icon: <SiPython color="#3776ab" />, label: "Python" },
    ],
  },
];

function MergedSkillsSection() {
  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 text-white overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-pink-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0" />

      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-14 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 z-10 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <BrainCogIcon size={32} color="#f472b6" />
        <span>My Technical Stack</span>
      </motion.h2>

      {/* Skills Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 relative z-10">
        {skillsByCategory.map((category, i) => (
          <motion.div
            key={category.title}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-[0_0_30px_#ec4899]/20 transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-pink-400 mb-4 text-center">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-4 align-center justify-center">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center text-sm text-slate-300 hover:text-white transition duration-200"
                  title={item.label}
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="mt-1 text-xs text-center">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HomeHero() {
  const [launching, setLaunching] = useState(false);
  const router = useRouter();

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(() => {
      router.push("/projects?land=true");
    }, 1500); // matches animation duration
  };

  return (
    <section className="hero min-h-[90vh] relative overflow-hidden flex items-center justify-center px-4 md:px-8 text-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* 💫 Background blobs for visual depth */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500 rounded-full opacity-30 blur-3xl z-0"
        animate={{ x: 80, y: 80, scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-pink-500 rounded-full opacity-25 blur-3xl z-0"
        animate={{ x: -60, y: -60, scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="max-w-3xl w-full z-10">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-center leading-tight max-w-3xl mx-auto">
          Hi, I'm <span className="highlight text-accent">Vishal Singh</span>
        </h1>

        <p className="typing-line text-base md:text-lg text-slate-400 mb-6">
          <Typewriter
            words={[
              "Full Stack Developer",
              "Mobile App Creator",
              "AI Integrator",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </p>

        {/* 💻 Fake Code Block */}
        <motion.div
          className="w-full overflow-x-auto px-4 md:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <pre className="bg-[#1e293b] text-slate-300 text-sm md:text-base p-4 rounded-xl w-max max-w-full whitespace-pre-wrap break-words">
            <code>
              <span className="text-pink-400">// skills.js</span>
              {"\n"}
              <span className="text-blue-400">const</span>{" "}
              <span className="text-green-400">developer</span> = {"{"}
              {"\n"}
              {"  "}
              <span className="text-blue-400">name</span>:{" "}
              <span className="text-yellow-300">"Vishal Singh"</span>,{"\n"}
              {"  "}
              <span className="text-blue-400">stack</span>: [
              <span className="text-yellow-300">"React"</span>,{" "}
              <span className="text-yellow-300">"Node.js"</span>,{" "}
              <span className="text-yellow-300">"Next.js"</span>,{" "}
              <span className="text-yellow-300">"React Native"</span>,{" "}
              <span className="text-yellow-300">"DevOps"</span>]{"\n"}
              {"};"}
            </code>
          </pre>
        </motion.div>

        {/* 🚀 Rocket Launch with Thrust and Smoke */}
        <motion.div
          className="my-6 flex justify-center relative h-16"
          animate={
            launching
              ? { x: 120, y: -240, rotate: -35, scale: 0.7, opacity: 0 }
              : { y: [0, -5, 0] }
          }
          transition={{
            duration: launching ? 1.4 : 1.6,
            ease: "easeInOut",
            repeat: launching ? 0 : Infinity,
          }}
        >
          <div className="relative">
            {/* 🚀 Rocket */}
            <Rocket
              size={36}
              className="text-white drop-shadow-[0_0_8px_rgba(0,247,255,0.5)]"
            />

            {/* 🔥 Thrust Flames */}
            {launching && (
              <>
                <motion.div
                  className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[6px] h-[24px] bg-gradient-to-b from-yellow-400 via-orange-500 to-transparent rounded-full blur-sm"
                  animate={{ scaleY: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-300 rounded-full blur-sm"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 0.25 }}
                />
              </>
            )}

            {/* 💨 Smoke Trail */}
            {launching && (
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gray-300 rounded-full blur-sm opacity-50"
                    style={{ left: `${i * 10 - 15}px` }}
                    initial={{ y: 0, opacity: 0.5 }}
                    animate={{
                      y: [0, 25],
                      scale: [1, 1.8],
                      opacity: [0.4, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleLaunch}
            disabled={launching}
            className="hero-btn bg-accent text-[#0f172a] px-6 py-2 rounded-full font-bold shadow hover:bg-blue-500 transition duration-300 flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HomeHero />

      {/* Skills Section */}
      <MergedSkillsSection />

      {/* About Section */}
      <About></About>

      {/* Contact Section */}
      <Contact />
    </>
  );
}
