"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
  useMotionValue,
  animate,
  useInView,
} from "framer-motion";
import Image from "next/image";
import {
  FaGem,
  FaChevronUp,
  FaShoppingBag,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import { GiDiamondRing, GiNecklace, GiEarrings } from "react-icons/gi";

export default function JewelryScrollLanding() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [activeSection, setActiveSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Throttle scroll events
  useEffect(() => {
    let timer;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => setIsScrolling(false), 150);
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Update active section
    if (latest < 0.2) setActiveSection(0);
    else if (latest < 0.45) setActiveSection(1);
    else if (latest < 0.7) setActiveSection(2);
    else setActiveSection(3);

    setShowBackToTop(latest > 0.1);
  });

  const scrollToSection = (index) => {
    const section = document.getElementById(`section-${index}`);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-yellow-400/20 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              x: [null, Math.random() * 100 + "vw"],
              y: [null, Math.random() * 100 + "vh"],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 origin-left z-50 shadow-lg shadow-yellow-400/50"
      />

      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className="relative group"
            aria-label={`Go to section ${index + 1}`}
          >
            <motion.div
              className={`w-3 h-3 rounded-full border ${
                activeSection === index
                  ? "bg-yellow-400 border-yellow-400"
                  : "bg-transparent border-white/30"
              } transition-all duration-300`}
              animate={{
                scale: activeSection === index ? 1.2 : 1,
                boxShadow:
                  activeSection === index
                    ? "0 0 12px rgba(250, 204, 21, 0.8)"
                    : "none",
              }}
            />
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm border border-white/20">
              Section {index + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Scroll percentage with improved visibility */}
      <motion.div
        style={{
          x: useTransform(
            scrollYProgress,
            [0, 1],
            ["20px", "calc(100% - 60px)"]
          ),
          opacity: useTransform(
            scrollYProgress,
            [0, 0.05, 0.95, 1],
            [0, 1, 1, 0]
          ),
        }}
        className="fixed top-4 z-50"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
          <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">
            <motion.span>{percentage.get().toFixed(0)}</motion.span>%
          </span>
        </div>
      </motion.div>

      {/* Back to top with better styling */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => scrollToSection(0)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="fixed right-6 bottom-6 z-50 p-3 bg-gradient-to-br from-yellow-400/20 to-pink-500/20 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl group"
            aria-label="Back to top"
          >
            <FaChevronUp className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed left-6 bottom-6 z-50 px-4 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold rounded-xl shadow-2xl hover:shadow-yellow-400/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <FaShoppingBag />
        Shop Now
      </motion.button>

      {/* Main scroll container */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20"
      >
        <ScrollContent
          scrollYProgress={scrollYProgress}
          isScrolling={isScrolling}
        />
      </div>
    </div>
  );
}

function ScrollContent({ scrollYProgress, isScrolling }) {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const inView1 = useInView(ref1, { amount: 0.5, once: true });
  const inView2 = useInView(ref2, { amount: 0.5, once: true });
  const inView3 = useInView(ref3, { amount: 0.5, once: true });

  const jewelryCollections = [
    {
      img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
      name: "Gold Necklace",
      price: "$1,299",
      icon: <GiNecklace />,
    },
    {
      img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
      name: "Diamond Ring",
      price: "$899",
      icon: <GiDiamondRing />,
    },
    {
      img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
      name: "Silver Bracelet",
      price: "$499",
      icon: <FaGem />,
    },
    {
      img: "https://images.unsplash.com/photo-1585386959984-a4155223f19c",
      name: "Pearl Earrings",
      price: "$699",
      icon: <GiEarrings />,
    },
  ];

  const stats = [
    { value: 150, label: "Pieces Sold", suffix: "k+" },
    { value: 20, label: "Collections", suffix: "+" },
    { value: 10, label: "Years in Business", suffix: "+" },
  ];

  return (
    <div className="space-y-32 pt-20 pb-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section 0: Enhanced Hero */}
      <div
        id="section-0"
        ref={ref1}
        className="min-h-screen flex flex-col justify-center items-center text-center space-y-8 relative"
      >
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-pink-500/10 rounded-full blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, type: "spring" }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaCrown className="w-8 h-8 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 tracking-widest">
              LUXURY COLLECTION
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
              Timeless
            </span>
            <br />
            <span className="text-white">Elegance</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
        >
          Discover timeless pieces crafted for elegance and style. Each
          collection tells a story of exquisite craftsmanship and luxury.
        </motion.p>

        {/* Enhanced stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12"
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              inView={inView1}
              delay={0.7 + index * 0.2}
            />
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView1 ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-400">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>

      {/* Section 1: Enhanced Horizontal Collections */}
      <div id="section-1" ref={ref2} className="min-h-[120vh] relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="sticky top-20 z-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              Featured
            </span>
            <span className="text-white"> Collections</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Handpicked luxury pieces that redefine elegance and style
          </p>
        </motion.div>

        <div className="relative h-[60vh] lg:h-[70vh]">
          <motion.div
            className="flex gap-8 w-max px-4 sm:px-8"
            style={{
              x: useTransform(
                scrollYProgress,
                [0.2, 0.45],
                [0, -((jewelryCollections.length - 1) * 420)]
              ),
            }}
          >
            {jewelryCollections.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -20, scale: 1.02 }}
                className="w-[85vw] sm:w-[400px] shrink-0 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 flex flex-col items-center hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 group"
              >
                <div className="relative w-full h-64 mb-6 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full">
                    {item.icon}
                  </div>
                  <Image
                    src={item.img}
                    width={400}
                    height={400}
                    alt={item.name}
                    className="rounded-2xl object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="w-full">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold">{item.name}</h3>
                    <span className="text-yellow-400 text-xl font-bold">
                      {item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">
                      (48 reviews)
                    </span>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-yellow-400/10 to-pink-500/10 border border-white/20 rounded-xl hover:from-yellow-400/20 hover:to-pink-500/20 hover:border-yellow-400/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <span>View Details</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint for horizontal section */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-sm rotate-90 whitespace-nowrap">
                Scroll →
              </span>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Enhanced Feature Showcase */}
      <div
        id="section-2"
        ref={ref3}
        className="min-h-screen flex flex-col justify-center items-center text-center relative"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
          whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-4xl overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-yellow-400/20 to-pink-500/20 rounded-full mb-6"
            >
              <FaGem className="w-16 h-16 text-yellow-400" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                Limited Edition
              </span>
              <br />
              Masterpiece
            </h2>

            <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Experience the pinnacle of jewelry craftsmanship. Our limited
              edition collection features ethically sourced diamonds and 24k
              gold, crafted by master artisans.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Ethically Sourced", value: "100%" },
                { label: "Certified Diamonds", value: "GIA" },
                { label: "Warranty", value: "Lifetime" },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-yellow-400/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto">
              <FaShoppingBag />
              Reserve Your Piece
            </button>
          </div>
        </motion.div>
      </div>

      {/* Section 3: Enhanced CTA */}
      <div
        id="section-3"
        className="min-h-screen flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden"
      >
        {/* Animated background */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-pink-500/5 to-purple-500/5"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
              Your Journey
            </span>
            <br />
            <span className="text-white">Begins Here</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            Join thousands of satisfied customers who have found their perfect
            piece. Start your collection today with exclusive benefits.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold rounded-2xl shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 text-lg"
            >
              Start Shopping
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 text-lg"
            >
              Book Consultation
            </motion.button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            {[
              { label: "Free Shipping", value: "Worldwide" },
              { label: "Secure Payment", value: "256-bit SSL" },
              { label: "30-Day Returns", value: "No Questions" },
              { label: "24/7 Support", value: "Premium Service" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-yellow-400 font-semibold mb-1">
                  {item.value}
                </div>
                <div className="text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCounter({ value, label, suffix = "", inView, delay }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const controls = animate(count, value, {
        duration: 2.5,
        delay,
        ease: [0.2, 0.65, 0.3, 0.9],
      });
      return () => controls.stop();
    }
  }, [inView]);

  return (
    <motion.div
      className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-yellow-400/30 transition-all duration-300 hover:scale-105"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-baseline justify-center gap-1 mb-2">
        <motion.div className="text-4xl sm:text-5xl font-bold text-yellow-400">
          {rounded}
        </motion.div>
        {suffix && <span className="text-2xl text-yellow-400">{suffix}</span>}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}
