"use client";
import { easeOut, motion, useScroll, useTransform } from "framer-motion";

export default function CarouselSection() {
  const { scrollYProgress } = useScroll();
const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const projects = [
    {
      title: "Crafted for Founders",
      description:
        "Clean, modern website for a SaaS startup — built in Next.js. Helped increase conversions by 32%.",
      tag: "SaaS / Landing Page",
    },
    {
      title: "Personalized Portfolio",
      description:
        "Storytelling portfolio site built with Framer Motion & Tailwind. Fully responsive and lightweight.",
      tag: "Portfolio / Scroll Story",
    },
    {
      title: "UI Revamp for Mobile",
      description:
        "Rebuilt UI for a finance app’s mobile dashboard with better UX and performance.",
      tag: "App UI / Animation",
    },
    {
      title: "Creative Agency",
      description:
        "Creative brand website with motion graphics and scroll-triggered transitions.",
      tag: "Agency / Branding",
    },
    {
      title: "E-commerce Redesign",
      description:
        "Fashion store optimized with new filters, cart UX, and responsive design.",
      tag: "E-commerce / UI/UX",
    },
  ];

  const skills = [
    { name: "Framer Motion", level: "Animation / Transitions" },
    { name: "Next.js", level: "Fullstack Framework" },
    { name: "Tailwind CSS", level: "Utility-first CSS" },
    { name: "Lenis Scroll", level: "Smooth Scrolling" },
    { name: "TypeScript", level: "Strong Typing" },
    { name: "GSAP", level: "Pro Motion Effects" },
  ];

  return (
    <div className="relative min-h-screen py-20 px-6 overflow-hidden rounded-xl">

      {/* Section Heading */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12">
        Work That Moves People
      </h2>

      {/* Animated horizontal scroll container */}
      <motion.div
        className="flex gap-6 w-max-full no-scrollbar overflow-x-scroll overflow-y-hidden px-2 sm:px-10"
        style={{ x }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 600 }}
            className="w-[80vw] sm:w-[400px] shrink-0 p-6 bg-white/5 border border-white/20 rounded-2xl 
              backdrop-blur-md shadow-lg text-left text-white relative group overflow-hidden"
          >
            {/* Tag */}
            <span className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-emerald-500 
              text-sm px-3 py-1 rounded-full shadow-md font-medium">
              {project.tag}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-semibold my-3">{project.title}</h3>

            {/* Description */}
            <p className="text-sm text-white/70 mb-6">{project.description}</p>

            {/* CTA */}
            <motion.a
              whileHover={{ x: 4 }}
              href="/projects"
              className="cursor-pointer text-cyan-400 font-semibold inline-flex items-center gap-2 text-sm transition"
            >
              View Project →
            </motion.a>

            {/* Glow */}
            <div className="absolute -bottom-8 -right-10 w-40 h-40 bg-cyan-400/30 blur-[80px] 
              rounded-full opacity-20 group-hover:opacity-40 transition" />
          </motion.div>
        ))}
      </motion.div>

      {/* NEW SECTION — Skills with Motion Cards */}
      <motion.div
        className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            initial={{opacity: 0, y: 40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              delay: idx * 0.2, // Staggered delay for each skill
              duration: 0.6,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 p-6 rounded-xl border border-white/20 backdrop-blur-md"
          >
            <h4 className="font-bold text-lg text-cyan-400 mb-2">{skill.name}</h4>
            <p className="text-sm text-white/70">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Shadow Glow for entire section */}
      <div className="absolute -z-10 top-[90%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] bg-cyan-500/10 blur-[150px] opacity-20 pointer-events-none" />
    </div>
  );
}
