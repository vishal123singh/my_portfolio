"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Example image data: replace with any image URLs or content. All aspect ratios are fixed to prevent layout jank.
 */
const images = [
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    alt: "Mountains",
    title: "Cinematic Mountains",
    description:
      "Parallax brings depth—this image glides slower than the text for a cinematic scroll effect.",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    alt: "Forest",
    title: "Immersive Forest",
    description:
      "Foreground and background scroll at different speeds, drawing your audience into the story.",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    alt: "Desert",
    title: "Dynamic Desert",
    description:
      "Modern scroll animations, driven by Framer Motion, make static pages feel interactive and alive.",
  },
];

export default function ParallaxImageScroll() {
  const sectionRef = useRef(null);

  // Scroll progress for the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Subtle, staggered parallax ranges for true smoothness, keeping UI unbroken on all screens
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const yFg = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Add spring smoothing to all transforms
  const smoothYBg = useSpring(yBg, { stiffness: 40, damping: 20 });
  const smoothYMid = useSpring(yMid, { stiffness: 40, damping: 20 });
  const smoothYFg = useSpring(yFg, { stiffness: 40, damping: 20 });

  // List of parallax values per card, slowest at back
  const parallaxYs = [smoothYBg, smoothYMid, smoothYFg];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col items-center justify-center
      rounded-xl px-0 sm:px-8 py-24 overflow-x-hidden" style={{overflow: 'hidden'}}
    >
    <div className="absolute top-[-80px] left-[-80px] w-[250px] h-full bg-pink-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0 overflow-x-hidden" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-full bg-cyan-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0 overflow-x-hidden" />
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-3xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
      >
        Parallax Scrolling Images<br />
        <span className="text-lg font-normal text-gray-300 block mt-3">
          Built with Framer Motion — scroll to experience interactive depth!
        </span>
      </motion.h2>

      {/* Parallax Image Cards */}
      <div className="relative w-full sm:w-[100vw] max-w-3xl flex flex-col gap-10 sm:gap-20">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            className="relative w-full aspect-[16/7] p-20 overflow-hidden rounded-2xl shadow-2xl group will-change-transform"
            style={{ y: parallaxYs[i] }}
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* The Image */}
            <motion.img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none will-change-transform"
              style={{
                scale: 1.13,
                filter: "brightness(0.85) blur(0px)",
                transition: "filter .36s cubic-bezier(.4,0,.2,1)",
              }}
              whileHover={{
                filter: "brightness(1.02) blur(2px)",
                scale: 1.18,
              }}
              draggable={false}
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.67, delay: 0.1, ease: "easeOut" }}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent"
              >
                {img.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.75, delay: 0.22, ease: "easeOut" }}
                className="text-base sm:text-lg text-gray-200 max-w-xl mt-2 drop-shadow-lg"
              >
                {img.description}
              </motion.p>
            </div>
            {/* Faint border for accessible focus & style */}
            <div className="absolute inset-0 border border-cyan-300/15 rounded-2xl pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
