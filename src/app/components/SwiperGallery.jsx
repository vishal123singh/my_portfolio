"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function SwiperGallery({ images, fullPageImages = [] }) {
  const swiperRef = useRef(null);
  const animationRef = useRef(null);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isFullPage = (src) => fullPageImages.includes(src);

  useEffect(() => {
    if (hoveredIndex === null) return;

    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    // 🛑 Stop autoplay while scrolling
    swiper.autoplay.stop();

    let startTime = null;
    const duration = 3500;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      setScrollProgress(eased * 100);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        // ✅ After scroll finishes → go next
        swiper.slideNext();
        setScrollProgress(0);
        setHoveredIndex(null);
        swiper.autoplay.start();
      }
    };

    animationRef.current = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
      setScrollProgress(0);
    };
  }, [hoveredIndex]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {images.map((src, i) => {
            const fullPage = isFullPage(src);
            const isHovered = hoveredIndex === i;

            return (
              <SwiperSlide key={i}>
                <div
                  className="relative w-full aspect-[16/9]"
                  onMouseEnter={() => fullPage && setHoveredIndex(i)}
                  onMouseLeave={() => fullPage && setHoveredIndex(null)}
                >
                  {/* Background Blur */}
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover blur-2xl scale-110 opacity-25"
                  />

                  {fullPage ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <div
                        className="absolute left-0 w-full"
                        style={{
                          height: "200%",
                          transform: isHovered
                            ? `translateY(-${scrollProgress}%)`
                            : "translateY(0%)",
                          transition: "transform 0.1s linear",
                        }}
                      >
                        <Image
                          src={src}
                          alt={`Full page ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full rounded-xl border border-white/10 bg-black/30 backdrop-blur-md shadow-xl overflow-hidden">
                        <Image
                          src={src}
                          alt={`Web screenshot ${i + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
