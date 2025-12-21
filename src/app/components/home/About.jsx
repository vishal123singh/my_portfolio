"use client";
import { FaLock, FaUnlock } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { keyProjects, techStack, experiences } from "../../../../data.js";

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
  // Color variations for different cards
  const cardColors = [
    "from-blue-500/10 to-purple-600/10",
    "from-emerald-500/10 to-cyan-600/10",
    "from-amber-500/10 to-orange-600/10",
    "from-fuchsia-500/10 to-pink-600/10",
  ];

  const colorIndex = index % cardColors.length;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Animated gradient border */}
      <div
        className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r ${cardColors[colorIndex]} opacity-0 hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${cardColors[colorIndex]} blur-lg opacity-0 hover:opacity-20 transition-opacity duration-500`}
      />

      <div className="relative z-10">
        {/* Timeline indicator */}
        <div className="absolute -left-10 top-6 h-3 w-3 rounded-full bg-white/20">
          <motion.div
            className="h-full w-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h4 className="text-lg font-semibold tracking-tight">
            {title}
            {company && (
              <>
                {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  @ {company}
                </span>
              </>
            )}
          </h4>
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 font-medium">
            {duration}
          </span>
        </div>

        <p className="text-white/80 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {tech.split(" • ").map((item, i) => (
            <motion.span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1 + i * 0.05,
                type: "spring",
                stiffness: 200,
              }}
              viewport={{ once: true }}
            >
              {item}
            </motion.span>
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
            with 4+ years of experience building dynamic apps across mobile and
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

        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h3>

          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block" />

          <div className="space-y-8 sm:pl-16">
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
            {keyProjects.map((project, i) => (
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
