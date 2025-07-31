"use client";

import { useState } from "react";
import Head from "next/head";
import { FiSearch, FiArrowRight, FiStar, FiExternalLink } from "react-icons/fi";

export default function AppsShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const apps = [
    {
      id: 1,
      name: "Live Chat",
      description:
        "Real-time messaging with end-to-end encryption and AI moderation",
      category: "Communication",
      url: "/apps/live-chat",
      image: "/images/chat-app.jpg",
      featured: true,
      tech: ["Firebase", "Next.js"],
    },
    {
      id: 2,
      name: "Video Calling",
      description:
        "4K video conferencing with virtual backgrounds and noise cancellation",
      category: "Communication",
      url: "/apps/video-calling",
      image: "/images/video-call.jpg",
      featured: true,
      tech: ["WebRTC"],
    },
  ];

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <Head>
        <title>Craftmind | App Showcase</title>
        <meta
          name="description"
          content="Explore cutting-edge applications built with futuristic technologies"
        />
      </Head>

      <header className="max-w-7xl mx-auto text-center mb-16">
        <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
          Explore next-generation applications
        </p>
      </header>

      <div className="max-w-4xl mx-auto relative mb-16">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="text-[#64748b] text-xl" />
        </div>
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-4 rounded-xl bg-[#1a2236] border border-[#2a3447] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-white placeholder-[#64748b] text-lg"
        />
      </div>

      {filteredApps.some((app) => app.featured) && (
        <section className="max-w-7xl mx-auto mb-20">
          <h2 className="flex items-center text-3xl font-medium mb-8">
            <FiStar className="text-cyan-400 mr-3" /> Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredApps
              .filter((app) => app.featured)
              .map((app) => (
                <div
                  key={app.id}
                  className="relative group overflow-hidden rounded-2xl border border-[#2a3447] bg-[#1a2236] hover:border-cyan-400/30 transition-all duration-500"
                  onMouseEnter={() => setHoveredCard(app.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="p-8 relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        {app.name}
                      </h3>
                      <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400">
                        {app.category}
                      </span>
                    </div>

                    <p className="text-[#b3bdd3] mb-6">{app.description}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {app.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded bg-[#2a3447] text-[#94a3b8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={app.url}
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                    >
                      Launch Interface <FiArrowRight className="ml-2" />
                    </a>
                  </div>

                  {/* Animated border effect */}
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      hoveredCard === app.id ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-500`}
                  >
                    <div
                      className="absolute inset-0 border-2 border-transparent border-t-cyan-400 animate-spin-slow"
                      style={{ animationDuration: "8s" }}
                    ></div>
                    <div
                      className="absolute inset-0 border-2 border-transparent border-r-cyan-400 animate-spin-slow-reverse"
                      style={{ animationDuration: "12s" }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-medium mb-8">All Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="relative group overflow-hidden rounded-xl border border-[#2a3447] bg-[#1a2236] hover:border-cyan-400/30 transition-all duration-500"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium">{app.name}</h3>
                  <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                    {app.category}
                  </span>
                </div>

                <p className="text-sm text-[#b3bdd3] mb-6">{app.description}</p>

                <a
                  href={app.url}
                  className="inline-flex items-center text-sm px-4 py-2 rounded-lg bg-[#2a3447] text-cyan-400 hover:bg-[#3a4457] transition-colors duration-300"
                >
                  Access <FiExternalLink className="ml-2" />
                </a>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/10 rounded-bl-full transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/10 rounded-tr-full transform -translate-x-1/2 translate-y-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {filteredApps.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="text-6xl mb-6">👾</div>
          <h3 className="text-2xl font-medium mb-2">No applications found</h3>
          <p className="text-[#94a3b8]">Try adjusting your search parameters</p>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slow-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse linear infinite;
        }
      `}</style>
    </div>
  );
}
