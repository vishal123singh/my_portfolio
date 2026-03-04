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

/* Tag Icons unchanged */
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

export default function ProjectDetailClient({ project }) {
  return (
    <main className="px-4 py-10 lg:py-16 text-white max-w-7xl mx-auto space-y-2">
      {/* ========== HERO SECTION (Split Layout) ========== */}
      <section className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Title + Description */}
        <div className="space-y-6">
          <Link
            href="/projects"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back to all projects
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500"
          >
            {project.title}
          </motion.h1>

          <p className="text-slate-300 text-lg leading-relaxed">
            {project.description}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-sm font-medium"
            >
              <ExternalLink size={16} />
              View Live Project
            </a>
          )}
        </div>

        {/* Right: Gallery */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-800">
          <ProjectGalleryClient
            images={project.images}
            fullPageImages={project.fullPageImages}
          />
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      {project.features?.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-emerald-400">
              Key Features
            </h2>
            <div className="h-px flex-1 bg-slate-800 ml-6 hidden sm:block" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-emerald-500/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-100">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========== STACK + CONTRIBUTIONS SIDE BY SIDE ========== */}
      <section className="grid lg:grid-cols-2 gap-12">
        {/* Contributions */}
        {project.contributions?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-pink-400">
              My Contributions
            </h2>
            <ul className="space-y-3 text-slate-300">
              {project.contributions.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle
                    size={18}
                    className="text-pink-400 mt-0.5 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {project.tags?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-400">
              Tech Stack
            </h2>

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-emerald-500/30 text-sm transition"
                >
                  {tagIcons[tag] ?? (
                    <Code2 size={16} className="text-slate-400" />
                  )}
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
