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

// Tag Icons
const tagIcons = {
  React: <Layout size={16} className="text-indigo-400" />,
  Nextjs: <Globe size={16} className="text-white" />,
  Nodejs: <Cpu size={16} className="text-orange-400" />,
  Express: <Cpu size={16} className="text-gray-300" />,
  MongoDB: <Database size={16} className="text-green-500" />,
  Firebase: <Sparkles size={16} className="text-yellow-400" />,
  TypeScript: <Code2 size={16} className="text-purple-400" />,
  JavaScript: <Code2 size={16} className="text-yellow-300" />,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectDetailClient({ project }) {
  return (
    <main className="px-4 py-8 sm:py-12 text-white space-y-12 max-w-6xl mx-auto">
      {/* Back Link and Title */}
      <div className="space-y-4">
        <Link
          href="/projects"
          className="text-sm text-slate-400 hover:underline transition"
        >
          ← Back to all projects
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-slate-300 leading-relaxed text-lg max-w-3xl"
        >
          {project.description}
        </motion.p>

        {project.link && (
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm font-medium"
          >
            <ExternalLink size={16} />
            View Live Project
          </motion.a>
        )}
      </div>

      {/* Project Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mx-auto max-w-full rounded-lg overflow-hidden border border-slate-800 shadow-md"
      >
        <ProjectGalleryClient images={project.images} />
      </motion.div>

      {/* Features */}
      {project.features?.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">
            Key Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-xl">
                      {feature.icon}
                    </div>

                    <h3 className="text-base font-semibold text-slate-100">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Contributions */}
      {Array.isArray(project?.contributions) &&
        project.contributions.length > 0 && (
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
        )}

      {/* Tech Stack */}
      {Array.isArray(project.tags) && project.tags.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="mt-8"
          aria-label="Tech Stack"
        >
          <h2 className="text-2xl font-semibold text-emerald-400 mb-3">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 hover:bg-emerald-500/30 text-sm text-white transition-all shadow shadow-slate-900/40 cursor-default hover:scale-105"
              >
                {tagIcons[tag] ?? (
                  <Code2 size={16} className="text-slate-400" />
                )}
                <span>{tag}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </main>
  );
}
