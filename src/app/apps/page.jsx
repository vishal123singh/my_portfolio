"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { FiSearch, FiArrowRight, FiStar, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import CosmicBackground from "../components/CosmicBackground";

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
      app.category.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen p-4 sm:p-6 text-white relative overflow-hidden">
      <Head>
        <title>Craftmind | App Showcase</title>
        <meta
          name="description"
          content="Explore cutting-edge applications built with futuristic technologies"
        />
      </Head>

      <CosmicBackground />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl sm:max-w-7xl mx-auto text-center mb-12 sm:mb-16 relative z-10 px-4"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-xl text-white/60 max-w-3xl mx-auto"
        >
          Explore next-generation applications
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
          <FiSearch className="text-gray-500 text-xl" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="relative z-10 w-full pl-12 pr-6 py-3 sm:py-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 text-base sm:text-lg bg-black/30 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30"
        />
      </motion.div>

      {isLoading ? (
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {filteredApps.some((app) => app.featured) && (
            <section className="max-w-7xl mx-auto mb-16 sm:mb-20 relative z-10 px-4">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-white"
              >
                <FiStar className="text-orange-400 mr-3 animate-pulse" />
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
                      className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-500 bg-gradient-to-br from-black/30 to-gray-900/50 backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="shine-strip"></div>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                            isHovering === app.id ? "opacity-100" : ""
                          }`}
                        ></div>
                      </div>

                      <div className="p-6 sm:p-8 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4 sm:mb-6">
                          <h3 className="text-xl sm:text-2xl font-bold relative z-10">
                            {app.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-500"></span>
                          </h3>
                          <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 group-hover:bg-purple-500/20 transition-colors">
                            {app.category}
                          </span>
                        </div>

                        <p className="text-white/60 text-sm sm:text-base mb-4 sm:mb-6 group-hover:text-white/80 transition-colors">
                          {app.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                          {app.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-1 rounded bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <motion.a
                          href={app.url}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden group"
                        >
                          <span className="relative z-10">
                            Launch Interface
                          </span>
                          <FiArrowRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </section>
          )}

          <section className="max-w-7xl mx-auto relative z-10 px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 text-white"
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
                    className="relative group overflow-hidden rounded-xl border border-white/10 hover:border-orange-400/40 transition-all duration-500 bg-gradient-to-b from-black/20 to-gray-900/30 backdrop-blur-sm"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          {app.name}
                          <span className="block w-0 h-0.5 bg-blue-400 mt-1 group-hover:w-full transition-all duration-300"></span>
                        </h3>
                        <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                          {app.category}
                        </span>
                      </div>

                      <p className="text-sm text-white/60 mb-4 sm:mb-6 group-hover:text-white/80 transition-colors">
                        {app.description}
                      </p>

                      <motion.a
                        href={app.url}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center text-sm px-4 py-2 rounded-lg bg-[#2a2a2e] text-blue-400 hover:bg-[#3a3a3e] transition-colors duration-300 group"
                      >
                        <span>Access</span>
                        <FiExternalLink className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </motion.a>
                    </div>
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
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">👾</div>
          <h3 className="text-xl sm:text-2xl font-medium mb-2 text-white">
            No applications found
          </h3>
          <p className="text-white/60 text-sm sm:text-base">
            Try adjusting your search parameters
          </p>
        </motion.div>
      )}

      {/* Styles remain unchanged */}
      <style jsx global>{`
        .shine-strip {
          /* unchanged */
        }
        @keyframes shine {
          /* unchanged */
        }
        .spinner {
          /* unchanged */
        }
        @keyframes spin {
          /* unchanged */
        }
      `}</style>
    </div>
  );
}
