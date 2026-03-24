"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ProjectCard({
  slug,
  title,
  description,
  displayImage,
  images = [],
  tags = [],
  liveComponent = null,
  fullPageImages = [], // Array of image URLs that are full page screenshots
}) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const imageToShow =
    hovered && images.length > 0 ? images[currentImageIndex] : displayImage;

  // Check if current image is a full page screenshot
  const isFullPage = fullPageImages.includes(imageToShow);

  // Handle the scroll animation only for full page images
  useEffect(() => {
    if (!liveComponent && hovered && images.length > 0) {
      // Only run scroll animation for full page images
      if (isFullPage) {
        const startScroll = () => {
          let startTime = null;
          const scrollDuration = 3000; // 3 seconds for full scroll

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / scrollDuration, 1);

            // Easing function for smooth scroll
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setScrollProgress(easeProgress * 100);

            if (progress < 1) {
              animationRef.current = requestAnimationFrame(animate);
            } else {
              // Reached bottom, prepare for next image
              setIsTransitioning(true);

              // Transition to next image after a brief pause
              transitionTimeoutRef.current = setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
                setScrollProgress(0);
                setIsTransitioning(false);
              }, 500);
            }
          };

          animationRef.current = requestAnimationFrame(animate);
        };

        startScroll();
      } else {
        // For regular images, just do a simple slideshow
        const interval = setInterval(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
            setIsTransitioning(false);
          }, 300);
        }, 2500);

        return () => clearInterval(interval);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [hovered, images, currentImageIndex, liveComponent, isFullPage]);

  // Reset when hover ends
  useEffect(() => {
    if (!hovered) {
      setCurrentImageIndex(0);
      setScrollProgress(0);
      setIsTransitioning(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    }
  }, [hovered]);

  return (
    <Link href={`/projects/${slug}`}>
      <motion.div
        className="group rounded-xl overflow-hidden cursor-pointer flex flex-col h-full transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: "var(--gradient-metal)",
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-inset-light), var(--shadow-lg)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top Preview - Full Page Screenshot with Scrolling */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {liveComponent ? (
            <div className="w-full h-full relative">{liveComponent}</div>
          ) : (
            <>
              {/* Current Image with Scroll Effect */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{
                  opacity: isTransitioning ? 0 : 1,
                  scale: isTransitioning ? 0.95 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundImage: `url(${imageToShow})`,
                  backgroundSize: isFullPage ? "100% auto" : "contain",
                  backgroundPosition: isFullPage
                    ? `center ${scrollProgress}%`
                    : "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "var(--bg-darker)",
                }}
              />

              {/* Background Blur Layer (only for non-full images) */}
              {!isFullPage && (
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${imageToShow})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  animate={{
                    opacity: isTransitioning ? 0 : 1,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="absolute inset-0 backdrop-blur-2xl"
                    style={{ backgroundColor: "var(--overlay-dark)" }}
                  />
                </motion.div>
              )}

              {/* Main Image Layer */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{
                  opacity: isTransitioning ? 0 : 1,
                  scale: isTransitioning ? 0.96 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundImage: `url(${imageToShow})`,
                  backgroundSize: isFullPage ? "100% auto" : "contain",
                  backgroundPosition: isFullPage
                    ? `center ${scrollProgress}%`
                    : "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </>
          )}

          {/* Gradient Overlay - Matching About style */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none z-20" />

          {/* Progress Indicator */}
          {hovered && images.length > 0 && !liveComponent && (
            <div className="absolute top-2 right-2 flex gap-1 z-30">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "w-4" : "w-2"
                  }`}
                  style={{
                    background:
                      index === currentImageIndex
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Full Page Indicator */}
          {hovered && isFullPage && (
            <div
              className="absolute bottom-2 left-2 text-white/50 text-[10px] px-2 py-1 rounded-full backdrop-blur-sm z-30"
              style={{
                background: "var(--overlay-dark)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--border-light)",
              }}
            >
              ↓ {Math.round(scrollProgress)}%
            </div>
          )}
        </div>

        {/* Card Body - Matching About styling */}
        <div className="flex flex-col flex-1 px-4 py-5">
          <h3
            className="text-lg font-medium mb-1 leading-tight line-clamp-1 transition-colors group-hover:opacity-100"
            style={{ color: "var(--text-secondary)" }}
          >
            {title}
          </h3>
          <p
            className="text-sm mb-3 line-clamp-3"
            style={{ color: "var(--text-muted)" }}
          >
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full transition-colors group-hover:opacity-80"
                style={{
                  color: "var(--text-secondary)",
                  background: "var(--accent-muted)",
                  border: "1px solid var(--border-light)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm font-medium transition-colors group-hover:opacity-80">
            <span style={{ color: "var(--accent)" }}>View Project</span>
            <ExternalLink
              size={14}
              className="opacity-70"
              style={{ color: "var(--accent)" }}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
