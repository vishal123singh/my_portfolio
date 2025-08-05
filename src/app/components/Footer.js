"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/vishal123singh",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/vishal-singh-b57b7b109",
      label: "LinkedIn",
    },

    {
      icon: <FaEnvelope className="w-5 h-5" />,
      href: "mailto:bs08081996@gmail.com",
      label: "Email",
    },
  ];

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "UI/UX", href: "/mockups" },
    { name: "Blogs", href: "/blogs" },
    { name: "Apps", href: "/apps" },
  ];

  return (
    <div
      className="relative border-t border-white/10"
      style={{ paddingBottom: 0 }}
    >
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo/Branding */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Vishal Singh
            </Link>
            <p className="text-xs text-white/60 mt-1">Full Stack Developer</p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/50"
        >
          <p>© {new Date().getFullYear()} Vishal Singh. All rights reserved.</p>
          <p className="mt-1">
            Built with Next.js, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </div>
  );
}
