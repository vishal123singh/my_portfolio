"use client";

import Contact from "./components/home/Contact";
import Skills from "./components/home/Skills";
import About from "./components/home/About";
import HomeHero from "./components/home/Hero";
import Footer from "./components/Footer";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { keyProjects } from "../../data";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Work />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

function Work() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <span className="text-sm tracking-widest text-neutral-500 mb-4 block">
            SELECTED WORK
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {keyProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div
                  className={`order-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                >
                  <span className="text-sm text-neutral-500 mb-2 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <span
                    className={`inline-block px-4 py-2 text-sm bg-gradient-to-r ${project.color} rounded-full mb-4`}
                  >
                    {project.category}
                  </span>
                  <p className="text-neutral-400 text-lg mb-8">
                    {project.description}
                  </p>
                  <motion.a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm tracking-wide hover:gap-4 transition-all"
                    whileHover={{ x: 10 }}
                  >
                    View Project
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.a>
                </div>

                <div
                  className={`relative order-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden glass group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

                    {/* project image */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden glass group cursor-pointer"
                    >
                      {/* scrollable image container */}
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full object-cover transition-transform duration-[2000ms] ease-linear group-hover:-translate-y-[30%]"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        style={{ y }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -z-10"
      />
    </section>
  );
}
