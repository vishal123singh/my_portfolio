// components/ProjectDetailClient.tsx
"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  ExternalLink,
  Code2,
  Cpu,
  Database,
  Globe,
  Layout,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import ProjectGalleryClient from "./ProjectGalleryClient";

// 🧠 Map tags to icons (you can extend this as needed)
const tagIcons = {
  React: <Layout size={16} className="text-sky-400" />,
  Nextjs: <Globe size={16} className="text-white" />,
  Nodejs: <Cpu size={16} className="text-green-400" />,
  Express: <Cpu size={16} className="text-gray-300" />,
  MongoDB: <Database size={16} className="text-green-500" />,
  Firebase: <Sparkles size={16} className="text-yellow-400" />,
  TypeScript: <Code2 size={16} className="text-blue-400" />,
  JavaScript: <Code2 size={16} className="text-yellow-300" />,
};

export default function ProjectDetailClient({ project }) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 text-white space-y-10">
      {/* Back Link */}
      <Link
        href="/projects"
        className="text-sm text-slate-400 hover:underline transition"
      >
        ← Back to all projects
      </Link>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500"
      >
        {project.title}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-slate-300 leading-relaxed text-lg"
      >
        {project.description}
      </motion.p>

      {/* Live Link */}
      {project.link && (
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 transition text-white text-sm"
        >
          <ExternalLink size={16} />
          View Live Project
        </motion.a>
      )}

      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full rounded-lg overflow-hidden border border-slate-800 shadow-md"
      >
        <ProjectGalleryClient images={project.images} />
      </motion.div>

      {/* Key Features */}
      {project.features?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">
            Key Features
          </h2>
          <ul className="space-y-2 text-slate-300">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle size={18} className="text-emerald-400 mt-1" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Contributions */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="space-y-3"
      >
        <h2 className="text-2xl font-semibold text-pink-400">
          My Contributions
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          {project.contributions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </motion.section>

      {/* Tech Stack with Icons */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="mt-4 flex flex-wrap gap-3"
        aria-label="Tech Stack"
      >
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-sm text-white transition-all shadow shadow-slate-900/40"
          >
            {tagIcons[tag] ?? <Code2 size={16} className="text-slate-400" />}
            {tag}
          </span>
        ))}
      </motion.section>
    </main>
  );
}
