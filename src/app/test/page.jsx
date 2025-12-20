"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Sparkles,
  Star,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ---------------- FAKE DATA ---------------- */
const products = [
  {
    id: 1,
    name: "Aurora Smart Watch",
    price: "$249",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Nebula Noise‑Cancel Headphones",
    price: "$399",
    image: "https://images.unsplash.com/photo-1518441902117-fb8b3d7c6c3d",
    tag: "New",
  },
  {
    id: 3,
    name: "Pulse Fitness Band",
    price: "$129",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    tag: "Trending",
  },
  {
    id: 4,
    name: "Orbit Wireless Earbuds",
    price: "$179",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693",
    tag: "Editor’s Pick",
  },
];

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Product Designer",
    text: "This UI feels insanely premium. Smooth animations, clean layout, and perfect spacing.",
  },
  {
    name: "Riya Sharma",
    role: "Startup Founder",
    text: "If I saw this on Upwork, I’d hire instantly. The UX screams conversion‑focused design.",
  },
  {
    name: "Daniel Lee",
    role: "Ecommerce Consultant",
    text: "Modern, elegant, and realistic. This doesn’t feel like a demo — it feels production‑ready.",
  },
];

export default function EcommerceLandingPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur bg-[#020617]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            NovaStore
          </span>
          <nav className="hidden md:flex gap-8 text-sm text-slate-300">
            <a className="hover:text-cyan-400 transition">Shop</a>
            <a className="hover:text-cyan-400 transition">Collections</a>
            <a className="hover:text-cyan-400 transition">About</a>
            <a className="hover:text-cyan-400 transition">Contact</a>
          </nav>
          <Button
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-400 text-black"
          >
            Cart (2)
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22d3ee33,transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300 mb-6">
              <Sparkles className="h-4 w-4" /> Premium Tech Store
            </span>
            <h1 className="text-6xl font-bold leading-tight">
              Future‑Ready{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Gadgets
              </span>
              <br />
              Designed for Life
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl">
              Discover beautifully crafted tech products with a seamless
              shopping experience built for modern ecommerce.
            </p>
            <div className="mt-10 flex gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-indigo-400 text-black hover:opacity-90"
              >
                Explore Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10"
              >
                View UI Case Study
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 shadow-2xl flex items-center justify-center">
              <ShoppingBag className="h-32 w-32 text-cyan-300" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-cyan-400/40 transition">
                  <div className="relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-56 w-full object-cover group-hover:scale-105 transition"
                    />
                    <span className="absolute top-4 left-4 bg-cyan-500/90 text-black text-xs px-3 py-1 rounded-full">
                      {p.tag}
                    </span>
                    <Heart className="absolute top-4 right-4 h-5 w-5 text-cyan-300" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-cyan-300">{p.price}</span>
                      <Button
                        size="sm"
                        className="bg-cyan-500 text-black hover:bg-cyan-400"
                      >
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: Truck,
              title: "Fast Shipping",
              desc: "Worldwide delivery in 3‑5 days",
            },
            {
              icon: ShieldCheck,
              title: "Secure Payments",
              desc: "Trusted & encrypted checkout",
            },
            { icon: Star, title: "Top Rated", desc: "Loved by 10,000+ users" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <f.icon className="h-10 w-10 mx-auto mb-4 text-cyan-300" />
              <h4 className="font-semibold text-lg">{f.title}</h4>
              <p className="text-slate-400 text-sm mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 border-white/10 h-full">
                  <CardContent className="p-8">
                    <p className="text-slate-200 mb-6">“{t.text}”</p>
                    <div className="text-sm">
                      <p className="font-semibold text-cyan-300">{t.name}</p>
                      <p className="text-slate-400">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 border-t border-white/10 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Built for High‑End UI/UX Portfolios
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-10">
          This ecommerce landing page is crafted to impress clients, showcase UX
          thinking, and demonstrate modern frontend skills.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-400 to-indigo-400 text-black"
        >
          Use This Demo
        </Button>
      </section>

      <footer className="py-10 text-center text-slate-500 text-sm">
        © 2025 NovaStore — UI/UX Demo Concept
      </footer>
    </main>
  );
}
