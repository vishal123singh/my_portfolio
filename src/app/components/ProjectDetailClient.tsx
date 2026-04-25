"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  ExternalLink,
  Code2,
  Cpu,
  Database,
  Globe,
  Layout,
  Sparkles,
  Bot,
  Plug,
  CreditCard,
  Cloud,
  Smartphone,
  MapPin,
  MessageSquare,
  Monitor,
  Video,
  Repeat,
  Zap,
  ArrowRight,
} from "lucide-react";
import ProjectGalleryClient from "./ProjectGalleryClient";

// Complete tag icon mapping
const tagIcons: Record<string, React.ReactNode> = {
  React: <Layout size={14} />,
  "Next.js": <Globe size={14} />,
  Nextjs: <Globe size={14} />,
  "Node.js": <Cpu size={14} />,
  NodeJS: <Cpu size={14} />,
  Express: <Cpu size={14} />,
  "Express.js": <Cpu size={14} />,
  MongoDB: <Database size={14} />,
  Firebase: <Sparkles size={14} />,
  TypeScript: <Code2 size={14} />,
  JavaScript: <Code2 size={14} />,
  Python: <Code2 size={14} />,
  "AI Agents": <Bot size={14} />,
  MCP: <Plug size={14} />,
  GCP: <Cloud size={14} />,
  AWS: <Cloud size={14} />,
  RAG: <Database size={14} />,
  Langchain: <Sparkles size={14} />,
  FASTAPI: <Zap size={14} />,
  FastAPI: <Zap size={14} />,
  WebRTC: <Video size={14} />,
  "Socket.io": <MessageSquare size={14} />,
  "React Native": <Smartphone size={14} />,
  Android: <Smartphone size={14} />,
  IOS: <Smartphone size={14} />,
  Electron: <Monitor size={14} />,
  WordPress: <Globe size={14} />,
  Angular: <Layout size={14} />,
  Webhook: <Plug size={14} />,
  Automation: <Repeat size={14} />,
  Tracking: <MapPin size={14} />,
  Animation: <Sparkles size={14} />,
  Vercel: <Globe size={14} />,
  "Payment Gateway": <CreditCard size={14} />,
};

// Type definitions
interface Feature {
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface Metric {
  value: string;
  label: string;
  color?: string;
}

interface Project {
  title: string;
  slug: string;
  description: string;
  link?: string;
  images: string[];
  fullPageImages?: string[];
  tags: string[];
  features?: Feature[];
  contributions?: string[];
  displayImage: string;
  metrics?: Metric[];
  challenge?: string;
  results?: string[];
}

// Default metrics for projects
const defaultMetrics: Record<string, Metric[]> = {
  "koodums-chat": [
    { value: "10K+", label: "Daily tool calls", color: "#10B981" },
    { value: "<150ms", label: "Avg latency", color: "#F59E0B" },
    { value: "40%", label: "Token reduction", color: "#8B5CF6" },
    { value: "92%", label: "Retrieval rate", color: "#EC4899" },
  ],
  investoreye: [
    { value: "10K+", label: "Pages processed", color: "#10B981" },
    { value: "92%", label: "Retrieval accuracy", color: "#8B5CF6" },
    { value: "Real-time", label: "Sentiment analysis", color: "#F59E0B" },
    { value: "SEC", label: "Filings", color: "#3B82F6" },
  ],
  resiliq: [
    { value: "5K+", label: "Req/min", color: "#10B981" },
    { value: "Exactly-once", label: "Processing", color: "#F59E0B" },
    { value: "HMAC", label: "Security", color: "#8B5CF6" },
    { value: "409", label: "Conflict detection", color: "#EC4899" },
  ],
  velotransact: [
    { value: "Multi-role", label: "User types", color: "#10B981" },
    { value: "Stripe", label: "Payments", color: "#8B5CF6" },
    { value: "vAuto", label: "Inventory sync", color: "#F59E0B" },
    { value: "Real-time", label: "Transactions", color: "#3B82F6" },
  ],
};

// Default challenge text
const defaultChallenges: Record<string, string> = {
  resiliq:
    "Third-party webhook deliveries were causing duplicate orders and inventory mismatches. The system needed exactly-once processing under high concurrency.",
  "koodums-chat":
    "AI agents needed to orchestrate multiple external tools while maintaining conversational context and sub-second response times.",
  investoreye:
    "Financial analysts needed conversational querying of thousands of earnings call transcripts — keyword search wasn't enough.",
};

// Default results
const defaultResults: Record<string, string[]> = {
  resiliq: [
    "Zero duplicate orders since deployment",
    "5K req/min sustained without degradation",
    "Full auditability with trace IDs",
  ],
  "koodums-chat": [
    "10K+ daily tool calls at <150ms latency",
    "40% token reduction, 92% retrieval accuracy",
    "Successfully integrated Maps, YouTube, and APIs",
  ],
  investoreye: [
    "92% retrieval accuracy on transcripts",
    "Real-time sentiment analysis",
    "Voice assistant for conversational queries",
  ],
};

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
  const metrics = project.metrics || defaultMetrics[project.slug] || [];
  const challenge = project.challenge || defaultChallenges[project.slug];
  const results = project.results || defaultResults[project.slug];

  return (
    <main className="min-h-screen bg-dark">
      {/* Hero Section - Full width with gradient */}
      <div className="relative overflow-hidden border-b border-light">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-primary mb-4"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <p className="text-secondary text-lg max-w-2xl mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Metrics row */}
          {metrics.length > 0 && (
            <div className="flex flex-wrap gap-6 mb-8">
              {metrics.map((metric, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: metric.color }}
                  />
                  <span className="text-muted text-sm">
                    <span className="text-primary font-medium">
                      {metric.value}
                    </span>{" "}
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CTA + Tags row */}
          <div className="flex flex-wrap items-center gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all hover:scale-[1.02]"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tags?.slice(0, 6).map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {tagIcons[tag] ?? (
                    <Code2 size={14} className="text-white/30" />
                  )}
                  {tag}
                </span>
              ))}
              {project.tags && project.tags.length > 6 && (
                <span className="px-3 py-1.5 text-xs text-white/40">
                  +{project.tags.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section - Full width image */}
      <div className="border-b border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProjectGalleryClient
            images={project.images}
            fullPageImages={project.fullPageImages}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Two column layout for desktop */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Main content (2/3 width) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge + Results combined */}
            {(challenge || results) && (
              <div className="space-y-6">
                {challenge && (
                  <div>
                    <h2 className="text-xs font-medium text-muted uppercase tracking-wider mb-3">
                      THE CHALLENGE
                    </h2>
                    <p className="text-secondary text-base leading-relaxed">
                      {challenge}
                    </p>
                  </div>
                )}

                {results && results.length > 0 && (
                  <div>
                    <h2 className="text-xs font-medium text-muted uppercase tracking-wider mb-3">
                      OUTCOMES
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {results.map((result, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{
                            background: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid rgba(16, 185, 129, 0.2)",
                          }}
                        >
                          <CheckCircle size={12} style={{ color: "#10B981" }} />
                          <span className="text-primary/70 text-sm">
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features - Clean grid */}
            {project.features && project.features.length > 0 && (
              <div>
                <h2 className="text-xs font-medium text-muted uppercase tracking-wider mb-6">
                  KEY FEATURES
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="group p-4 rounded-xl transition-all hover:bg-white/5"
                      style={{ border: "1px solid var(--border-light)" }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-accent mt-0.5">{feature.icon}</div>
                        <div>
                          <h3 className="text-primary/90 text-sm font-medium mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-muted text-xs leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contributions */}
            {project.contributions && project.contributions.length > 0 && (
              <div>
                <h2 className="text-xs font-medium text-muted uppercase tracking-wider mb-6">
                  MY CONTRIBUTIONS
                </h2>
                <div className="space-y-3">
                  {project.contributions.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 text-secondary text-sm"
                    >
                      <CheckCircle
                        size={14}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sidebar (1/3 width) */}
          <div className="space-y-8">
            {/* Tech Stack Card */}
            {project.tags && project.tags.length > 0 && (
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <h3 className="text-muted text-xs uppercase tracking-wider mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {tagIcons[tag] ?? (
                        <Code2 size={12} className="text-white/30" />
                      )}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats Card */}
            {metrics.length > 0 && (
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <h3 className="text-muted text-xs uppercase tracking-wider mb-4">
                  Key Metrics
                </h3>
                <div className="space-y-3">
                  {metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <span className="text-secondary text-sm">
                        {metric.label}
                      </span>
                      <span
                        className="text-primary font-medium"
                        style={{ color: metric.color }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Card */}
            {project.link && (
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  background:
                    "var(--gradient-card, linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.02) 100%))",
                  border: "1px solid var(--accent-muted, rgba(59,130,246,0.2))",
                }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
                >
                  View Live Project
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
