"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DenimStoreUI() {
  return (
    <div className="relative min-h-screen bg-[#1a1a1a] overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/denim-store-bg.jpg" // optional background image
          alt="Store"
          fill
          className="object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="bg-black/60 px-5 py-2 rounded-md text-sm tracking-widest">
            DENIM COLLECTION
          </div>
          <div className="bg-blue-600/80 px-4 py-2 rounded-md text-sm">
            NEW ARRIVALS
          </div>
        </div>

        {/* Jeans Rack */}
        <div className="flex justify-center gap-12 mb-16">
          {["Slim Fit", "Regular Fit", "Relaxed Fit"].map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="w-44 h-64 bg-gradient-to-b from-blue-900 to-blue-700 rounded-xl shadow-2xl" />
              <button className="mt-4 px-4 py-1 text-xs bg-black/60 rounded-full">
                Tap to Compare
              </button>
            </motion.div>
          ))}
        </div>

        {/* Center Table */}
        <div className="relative mx-auto w-[340px] bg-black/60 backdrop-blur-lg rounded-xl p-5 mb-10">
          <div className="text-sm mb-2 opacity-70">Popular Choices</div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
              Soft Stretch Denim
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
              Vintage Wash Jeans
            </span>
          </div>
        </div>

        {/* Assistant Bubble */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-10 top-44 flex items-center gap-3 bg-white/90 text-black p-4 rounded-xl shadow-xl max-w-xs"
        >
          <div className="w-12 h-12 rounded-full bg-blue-500" />
          <p className="text-sm">
            Looking for <b>slim</b> or <b>relaxed</b> fit?
          </p>
        </motion.div>

        {/* Try On Panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute right-10 bottom-20 w-72 bg-black/70 backdrop-blur-xl rounded-2xl p-5"
        >
          <h4 className="text-sm font-semibold mb-3">Try It On</h4>
          <div className="text-xs opacity-70 mb-2">Size: M</div>
          <div className="text-xs opacity-70 mb-4">
            Fits like your favorite pair
          </div>
          <button className="w-full py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 transition">
            Virtual Try-On →
          </button>
        </motion.div>

        {/* Suggested Items */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-10 bottom-24 bg-black/70 backdrop-blur-xl rounded-xl p-4 w-52"
        >
          <div className="text-xs opacity-70 mb-2">Suggested Sneaker</div>
          <div className="w-full h-16 bg-white/10 rounded-md mb-3" />
          <button className="text-xs underline opacity-80">
            Match with this top →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
