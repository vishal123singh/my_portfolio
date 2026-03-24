"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { FiSearch, FiArrowRight, FiStar, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const apps = [
  {
    id: 1,
    name: "Live Chat",
    description:
      "AI-enhanced real-time messaging with secure, end-to-end encryption for seamless conversations.",
    category: "Communication",
    url: "/apps/live-chat",
    image: "/images/chat-app.jpg",
    featured: true,
    tech: ["Next.js", "Firebase", "AI"],
  },
  {
    id: 2,
    name: "Video Calling",
    description:
      "Real-time video calls with live language translation — choose the language you speak and the language the other participant hears, enabling seamless conversations across languages.",
    category: "Communication",
    url: "/apps/video-calling",
    image: "/images/video-call.jpg",
    featured: true,
    tech: ["WebRTC", "AI"],
  },
  {
    id: 3,
    name: "AI Agents Builder",
    description:
      " Build, test, and deploy LLM-based agents with a drag-and-drop interface. Create complex workflows in minutes, not hours.",
    category: "AI/ML",
    url: "/ai-agents",
    image: "/images/viva.png",
    featured: true,
    tech: ["WebRTC", "AI"],
  },
];

export default function AppsShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovering, setIsHovering] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="min-h-screen p-4 sm:p-6 relative overflow-hidden"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      <Head>
        <title>Apps | Vishal Singh</title>
        <meta
          name="description"
          content="Explore cutting-edge applications built with modern technologies"
        />
      </Head>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        </div>
        {/* Grid overlay - matching About */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl sm:max-w-7xl mx-auto text-center mb-12 sm:mb-16 relative z-10 px-4 pt-24"
      >
        <span className="inline-block text-white/40 text-sm tracking-[0.3em] mb-4">
          <span
            className="inline-block w-8 h-px mr-3 align-middle"
            style={{ background: "var(--accent)" }}
          />
          APPLICATIONS
        </span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
          <span className="block text-white/90">Digital</span>
          <span className="block text-white/50">Tools</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-xl text-white/60 max-w-3xl mx-auto"
        >
          Explore next-generation applications built with precision and purpose
        </motion.p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-2xl sm:max-w-4xl mx-auto relative mb-12 sm:mb-16 z-10 px-4"
      >
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-4 pl-4 flex items-center pointer-events-none z-20">
          <FiSearch className="text-white/40 text-xl" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="relative z-10 w-full pl-12 pr-6 py-3 sm:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 text-white/90 placeholder-white/30 text-base sm:text-lg transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
          }}
        />
      </motion.div>

      {isLoading ? (
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl animate-pulse" />
          </div>
        </div>
      ) : (
        <>
          {filteredApps.some((app) => app.featured) && (
            <section className="max-w-7xl mx-auto mb-16 sm:mb-20 relative z-10 px-4">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center text-2xl sm:text-3xl font-light mb-6 sm:mb-8 text-white/90"
              >
                <FiStar className="text-white/50 mr-3" />
                Featured Projects
              </motion.h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              >
                {filteredApps
                  .filter((app) => app.featured)
                  .map((app) => (
                    <motion.div
                      key={app.id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      onMouseEnter={() => setIsHovering(app.id)}
                      onMouseLeave={() => setIsHovering(null)}
                      className="relative group overflow-hidden rounded-2xl transition-all duration-500"
                      style={{
                        background:
                          "var(--gradient-metal)",
                        border: "1px solid var(--border-light)",
                        // boxShadow:
                        //   "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Interactive overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="p-6 sm:p-8 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4 sm:mb-6">
                          <h3 className="text-xl sm:text-2xl font-light relative z-10 text-white/90">
                            {app.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-500"></span>
                          </h3>
                          <span
                            className="text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors text-white/40 group-hover:text-white/60"
                            style={{
                              border: "1px solid var(--border-light)",
                              background: "rgba(255,255,255,0.05)",
                            }}
                          >
                            {app.category}
                          </span>
                        </div>

                        <p className="text-white/50 text-sm sm:text-base mb-4 sm:mb-6 group-hover:text-white/70 transition-colors">
                          {app.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                          {app.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-1 rounded text-white/40 group-hover:text-white/60 transition-colors"
                              style={{
                                background: "var(--gradient-metal)",
                                border: "1px solid var(--border-light)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <motion.a
                          href={app.url}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group"
                          style={{
                            background:
                              "var(--gradient-metal)",
                            border: "1px solid var(--border-light)",
                            // boxShadow:
                            //   "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
                            color: "var(--accent)",
                          }}
                        >
                          <span className="relative z-10 text-sm tracking-wider">
                            Launch Interface
                          </span>
                          <FiArrowRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                "var(--gradient-metal)",
                            }}
                          />
                        </motion.a>
                      </div>

                      {/* Decorative elements */}
                      <div
                        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                        style={{ border: "1px solid var(--border-light)" }}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            </section>
          )}

          <section className="max-w-7xl mx-auto relative z-10 px-4 pb-20">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 text-white/90"
            >
              All Applications
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              <AnimatePresence>
                {filteredApps.map((app) => (
                  <motion.div
                    key={app.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    className="relative group overflow-hidden rounded-xl transition-all duration-500"
                    style={{
                      background:
                        "var(--gradient-metal)",
                      border: "1px solid var(--border-light)",
                      // boxShadow:
                      //   "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
                    }}
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2">
                        <h3 className="text-lg sm:text-xl font-light text-white/90">
                          {app.name}
                          <span className="block w-0 h-px bg-white/50 mt-1 group-hover:w-full transition-all duration-300"></span>
                        </h3>
                        <span
                          className="text-xs uppercase tracking-wider px-2 py-1 rounded-full text-white/40 group-hover:text-white/60 transition-colors"
                          style={{
                            border: "1px solid var(--border-light)",
                            background: "var(--gradient-metal)",
                          }}
                        >
                          {app.category}
                        </span>
                      </div>

                      <p className="text-sm text-white/50 mb-4 sm:mb-6 group-hover:text-white/70 transition-colors line-clamp-3">
                        {app.description}
                      </p>

                      <motion.a
                        href={app.url}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center text-sm px-4 py-2 rounded-lg transition-all duration-300 group"
                        style={{
                          border: "1px solid var(--border-light)",
                          color: "var(--accent)",
                        }}
                      >
                        <span>Access</span>
                        <FiExternalLink className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </motion.a>
                    </div>

                    {/* Decorative corner */}
                    <div
                      className="absolute top-0 right-0 w-12 h-12 border-t border-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ borderColor: "var(--border-light)" }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        </>
      )}

      {filteredApps.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-7xl mx-auto text-center py-20 px-4 relative z-10"
        >
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 text-white/30">
            ◉
          </div>
          <h3 className="text-xl sm:text-2xl font-light mb-2 text-white/90">
            No applications found
          </h3>
          <p className="text-white/50 text-sm sm:text-base">
            Try adjusting your search parameters
          </p>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="relative">
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto animate-scroll" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
