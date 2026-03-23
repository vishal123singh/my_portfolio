"use client";

import { useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef(null);

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/vishal123singh",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/vishal-singh-b57b7b109",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      href: "https://twitter.com/vishal_singh",
      label: "Twitter",
      color: "hover:text-sky-400",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://instagram.com/vishal_singh",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      href: "mailto:bs08081996@gmail.com",
      label: "Email",
      color: "hover:text-amber-400",
    },
  ];

  const footerLinks = [
    { name: "HOME", href: "/" },
    { name: "PROJECTS", href: "/projects" },
    { name: "BLOGS", href: "/blogs" },
    { name: "APPS", href: "/apps" },
    { name: "CONTACT", href: "/contact" },
  ];

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, when: "beforeChildren" },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const socialVariant = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-dark)", color: "var(--text-primary)" }}
    >
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 mb-12 sm:mb-16"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Brand */}
            <motion.div
              className="lg:col-span-4 space-y-3 sm:space-y-4"
              variants={itemVariant}
            >
              <Link
                href="/"
                className="inline-block text-2xl sm:text-3xl font-light tracking-tight relative group"
              >
                <span className="relative z-10">
                  <span style={{ color: "var(--text-muted)" }}>{"<"}</span>VS
                  <span style={{ color: "var(--text-muted)" }}>{"/>"}</span>
                </span>
              </Link>

              <p
                className="text-xs sm:text-sm leading-relaxed max-w-md"
                style={{ color: "var(--text-secondary)" }}
              >
                Crafting digital experiences where precision meets poetry, and
                performance becomes art.
              </p>

              <div
                className="flex items-center gap-2 text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80" />
                </span>
                Available for collaborations
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div className="lg:col-span-3" variants={itemVariant}>
              <h3
                className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                NAVIGATION
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    className="footer-link-item"
                    variants={itemVariant}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-xs sm:text-sm transition"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span className="relative overflow-hidden">
                        {link.name}
                        <span
                          className="absolute -bottom-1 left-0 w-full h-px transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                          style={{ background: "var(--accent)" }}
                        />
                      </span>
                      <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition text-xs sm:text-sm" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div className="lg:col-span-3" variants={itemVariant}>
              <h3
                className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                CONTACT
              </h3>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <a
                  href="mailto:bs08081996@gmail.com"
                  className="group flex items-center gap-2 transition break-all"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="relative overflow-hidden">
                    bs08081996@gmail.com
                    <span
                      className="absolute -bottom-1 left-0 w-full h-px transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                      style={{ background: "var(--accent)" }}
                    />
                  </span>
                </a>
                <div style={{ color: "var(--text-muted)" }}>Ranchi, India</div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="lg:col-span-2 space-y-3 sm:space-y-4"
              variants={itemVariant}
            >
              <h3
                className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em]"
                style={{ color: "var(--text-muted)" }}
              >
                STATS
              </h3>

              {[
                { label: "YEARS OF CODE", value: "4+" },
                { label: "PROJECTS", value: "16+" },
                { label: "CLIENTS", value: "16+" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-lg sm:text-xl font-light text-primary">
                    {stat.value}
                  </div>
                  <div
                    className="text-[9px] sm:text-[10px] tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom */}
          <motion.div
            className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left"
            style={{ borderTop: "1px solid var(--border-light)" }}
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="text-[10px] sm:text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              © {new Date().getFullYear()} VISHAL SINGH
            </div>

            {/* Socials */}
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  variants={socialVariant}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div
                    className="p-2.5 sm:p-3 rounded-full transition-all duration-300"
                    style={{
                      background: "var(--gradient-metal)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <div
                      className="text-xs sm:text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {social.icon}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Back to top */}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer text-[10px] sm:text-xs transition"
              style={{ color: "var(--text-muted)" }}
            >
              BACK TO TOP
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
