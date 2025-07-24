'use client';

import { motion } from 'framer-motion';
import { ScrollText, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function SmoothMotionSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden gap-12 px-4 py-16 rounded-xl">
    {/* relative min-h-screen py-20 px-6 overflow-hidden rounded-xl */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-full bg-pink-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0 overflow-x-hidden" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-full bg-cyan-400/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0 overflow-x-hidden" />
      {/* Card 1 */}
      <motion.div
        className="bg-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl
          rounded-3xl max-w-lg w-full text-center px-6 py-12 sm:p-12 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.6 }}
      >
        {/* Top-left glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-600/30 blur-[90px] rounded-full opacity-30 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/30 blur-[90px] rounded-full opacity-30 pointer-events-none" />

        {/* Icon */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-5xl mb-4 flex justify-center"
        >
          <ScrollText className="w-10 h-10 text-cyan-400 drop-shadow" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">
          Scroll-Based Motion Perfected
        </h2>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed">
          Scroll-triggered animations make your interface feel alive. With Framer Motion, elements animate into view fluidly — engaging users and guiding them through your content.
        </p>

        <p className="mt-4 text-sm text-white/60">
          Powered by <span className="font-medium text-cyan-300">Framer Motion</span> +{' '}
          <span className="font-medium text-indigo-300">Tailwind CSS</span>
        </p>
      </motion.div>

      {/* Card 2 – About Framer Motion */}
      <motion.div
        className="bg-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl
          rounded-3xl max-w-lg w-full text-center px-6 py-12 sm:p-12 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.6 }}
      >
        {/* Glows */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan-500/30 blur-[80px] rounded-full opacity-30 pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-emerald-500/30 blur-[80px] rounded-full opacity-30 pointer-events-none" />

        {/* Icon */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white text-5xl mb-4 flex justify-center"
        >
          <Sparkles className="w-10 h-10 text-emerald-400" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
          Why Framer Motion?
        </h2>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed">
          Framer Motion gives developers powerful animation tools with no learning curve. Coupled with scroll detection, you can build delightful, performant experiences that wow users on every pixel.
        </p>

        <p className="mt-4 text-sm text-white/60">
          Deliver <span className="text-emerald-400 font-medium">modern</span>, <span className="text-cyan-400 font-medium">interactive UIs</span> with ease.
        </p>
      </motion.div>
    </section>
  );
}
