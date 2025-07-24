"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GiCommercialAirplane } from "react-icons/gi";

const SKY_BG =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";
// const FOREST = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308";
const FOREST = "/icons/forest.png";

export default function AirplaneParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Responsive transform values for mobile screens
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 2.10]);
  const forestLeftX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -60] : [0, -120]);
  const forestRightX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 60] : [0, 120]);
  const forestScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const airplaneX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 180] : [0, 420]);
  const airplaneY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -100] : [0, -250]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden rounded-xl overflow-x-hidden"
    >
      {/* <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-pink-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0" /> */}

      {/* Sky Background (zooming) */}
      <motion.div style={{ scale: skyScale }} className="absolute inset-0 -z-50">
        <Image
          src={SKY_BG}
          alt="Sky"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </motion.div>

      {/* Forest Left */}
      <motion.div
        style={{ x: forestLeftX, scale: forestScale }}
        className="hidden sm:flex  justify-end absolute bottom-0 left-0 w-full sm:w-[110%]  -z-10 pointer-events-none"
      >
        <Image
          src={FOREST}
          alt="Forest Left"
          width={800}
          height={100}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
          priority
        />
      </motion.div>

      {/* Forest Right (flipped) */}
      <motion.div
        style={{ x: forestRightX, scale: forestScale }}
        className="hidden sm:flex absolute bottom-0 right-0 w-full h-full justify-start -z-50 pointer-events-none"
      >
        <Image
          src={FOREST}
          alt="Forest Right"
          width={800}
          height={100}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            transform: "scaleX(-1)",
          }}
          priority
        />
      </motion.div>

      {/* Airplane (icon flying diagonally) */}
      <motion.div
        style={{ x: airplaneX, y: airplaneY }}
        className="absolute left-[12vw] bottom-[34%] z-50 pointer-events-none"
      >
        <GiCommercialAirplane
          className="text-gray-50 drop-shadow-xl AirplaneIcon"
          style={{ transform: "rotate(-10deg)" }}
        />
      </motion.div>

      {/* Title */}
      <div className="relative z-30 w-full text-center pointer-events-none">
        <h1 className="text-3xl sm:text-5xl md:text-7xl text-white font-extrabold mt-44 drop-shadow-lg">
          Parallax Flight
        </h1>
      </div>

      {/* Mobile-specific airplane icon size */}
      <style jsx global>{`
        .AirplaneIcon {
          font-size: 6rem;
        }

        @media (max-width: 640px) {
          .AirplaneIcon {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
