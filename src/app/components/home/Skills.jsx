"use client";
import { motion } from "framer-motion";
import { categories } from "../../../../data";

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
      whileHover={{
        y: -4,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
      }}
    >
      <div className="text-3xl p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
        {skill.icon}
      </div>
      <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
};

const SkillCategory = ({ title, icon: Icon, skills, color, delay }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{
        y: -5,
        boxShadow: `0 10px 30px -10px ${color}20`,
      }}
    >
      {/* Gradient accent */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur-sm"
            style={{
              backgroundColor: `${color}15`,
              border: `1px solid ${color}30`,
            }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function TechStack() {
  return (
    <section className="relative py-24 max-sm:px-4 md:px-6 overflow-hidden">
      <div className="relative max-w-7xl w-full mx-auto z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Technical Toolbox
            </span>
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            My curated collection of technologies and tools I use to build
            exceptional digital experiences
          </motion.p>
        </motion.div>

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
