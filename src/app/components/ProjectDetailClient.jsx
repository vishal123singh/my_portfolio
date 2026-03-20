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
  React: <Layout size={16} className="text-white/60" />,
  Nextjs: <Globe size={16} className="text-white/60" />,
  Nodejs: <Cpu size={16} className="text-white/60" />,
  Express: <Cpu size={16} className="text-white/60" />,
  MongoDB: <Database size={16} className="text-white/60" />,
  Firebase: <Sparkles size={16} className="text-white/60" />,
  TypeScript: <Code2 size={16} className="text-white/60" />,
  JavaScript: <Code2 size={16} className="text-white/60" />,
};

export default function ProjectDetailClient({ project }) {
  return (
    <main
      className="px-4 py-10 lg:py-16 max-w-7xl mx-auto space-y-12"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* ========== HERO SECTION (Split Layout) ========== */}
      <section className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Title + Description */}
        <div className="space-y-6">
          <Link
            href="/projects"
            className="text-sm transition-colors hover:text-white/80 inline-flex items-center gap-2"
            style={{ color: "var(--accent)" }}
          >
            ← Back to all projects
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-light text-white/90"
          >
            {project.title}
          </motion.h1>

          <p className="text-white/60 text-lg leading-relaxed">
            {project.description}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] text-sm font-medium"
              style={{
                background:
                  "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
                color: "var(--accent)",
              }}
            >
              <ExternalLink size={16} />
              View Live Project
            </a>
          )}
        </div>

        {/* Right: Gallery */}
        <div
          className="rounded-xl overflow-hidden shadow-lg"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
          }}
        >
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
            <h2
              className="text-2xl font-light"
              style={{ color: "var(--accent)" }}
            >
              Key Features
            </h2>
            <div
              className="h-px flex-1 ml-6 hidden sm:block"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors group-hover:bg-white/10"
                    style={{ color: "var(--accent)" }}
                  >
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-medium text-white/80 group-hover:text-white/90 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/50 mt-1 leading-relaxed group-hover:text-white/60 transition-colors">
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
          <div className="space-y-6">
            <h2
              className="text-2xl font-light"
              style={{ color: "var(--accent)" }}
            >
              My Contributions
            </h2>
            <ul className="space-y-3">
              {project.contributions.map((item, i) => (
                <li key={i} className="flex gap-3 text-white/60">
                  <CheckCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {project.tags?.length > 0 && (
          <div className="space-y-6">
            <h2
              className="text-2xl font-light"
              style={{ color: "var(--accent)" }}
            >
              Tech Stack
            </h2>

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                >
                  {tagIcons[tag] ?? (
                    <Code2 size={16} className="text-white/40" />
                  )}
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <style jsx global>{`
        .prose {
          color: rgba(255, 255, 255, 0.8);
        }

        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4 {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }

        .prose p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .prose code {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .prose pre {
          background: #0f0f0f;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.75rem;
        }

        .prose pre code {
          background: transparent;
          padding: 0;
          color: rgba(255, 255, 255, 0.9);
        }

        .prose blockquote {
          border-left-color: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }

        .prose a {
          color: var(--accent);
          text-decoration: none;
        }

        .prose a:hover {
          text-decoration: underline;
        }

        .prose img {
          border-radius: 0.75rem;
          margin: 1.5rem auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .prose ul,
        .prose ol {
          color: rgba(255, 255, 255, 0.7);
        }

        .prose li {
          margin: 0.25rem 0;
        }
      `}</style>
    </main>
  );
}
