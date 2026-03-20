"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const marqueeRef = useRef(null);
  const linksRef = useRef([]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.fromTo(
        ".footer-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Links stagger animation
      gsap.fromTo(
        ".footer-link-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Social icons stagger animation
      gsap.fromTo(
        ".social-icon-item",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Magnetic effect for social icons
      const socialIcons = document.querySelectorAll(".social-icon");
      socialIcons.forEach((icon) => {
        icon.addEventListener("mousemove", (e) => {
          const rect = icon.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(icon, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      // Infinite marquee
      if (marqueeRef.current) {
        const marqueeTl = gsap.timeline({ repeat: -1 });
        marqueeTl.to(marqueeRef.current, {
          x: "-50%",
          duration: 40,
          ease: "none",
        });

        marqueeRef.current.addEventListener("mouseenter", () =>
          marqueeTl.pause(),
        );
        marqueeRef.current.addEventListener("mouseleave", () =>
          marqueeTl.resume(),
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-dark)",
        color: "var(--text-primary)",
      }}
    >
      <div className="relative px-6 md:px-12 lg:px-24 py-16 md:py-20">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: `
            linear-gradient(to bottom, transparent, rgba(255,255,255,0.02)),
            radial-gradient(circle at 20% 0%, rgba(255,255,255,0.03), transparent 60%)
          `,
            }}
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
              backgroundSize: "70px 70px",
            }}
          />

          {/* Matte orbs */}
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/[0.02] blur-3xl" />
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="footer-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            {/* Brand */}
            <div className="lg:col-span-4 space-y-4">
              <Link
                href="/"
                className="inline-block text-3xl font-light tracking-tight relative group"
              >
                <span className="relative z-10">
                  <span style={{ color: "var(--text-muted)" }}>{"<"}</span>
                  VS
                  <span style={{ color: "var(--text-muted)" }}>{"/>"}</span>
                </span>

                <div
                  className="absolute -inset-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </Link>

              <p
                className="text-sm leading-relaxed max-w-md"
                style={{ color: "var(--text-secondary)" }}
              >
                Crafting digital experiences where precision meets poetry, and
                performance becomes art.
              </p>

              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80" />
                </span>
                Available for collaborations
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3">
              <h3
                className="text-xs tracking-[0.3em] mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                NAVIGATION
              </h3>

              <ul className="space-y-3">
                {footerLinks.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm transition"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span className="relative overflow-hidden">
                        {link.name}
                        <span
                          className="absolute -bottom-1 left-0 w-full h-px transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                          style={{ background: "var(--accent)" }}
                        />
                      </span>

                      <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h3
                className="text-xs tracking-[0.3em] mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                CONTACT
              </h3>

              <div className="space-y-4 text-sm">
                <a
                  href="mailto:bs08081996@gmail.com"
                  className="group flex items-center gap-2 transition"
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
            </div>

            {/* Stats */}
            <div className="lg:col-span-2 space-y-4">
              <h3
                className="text-xs tracking-[0.3em]"
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
                  <div className="text-xl font-light">{stat.value}</div>
                  <div
                    className="text-[10px] tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} VISHAL SINGH
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} target="_blank">
                  <div
                    className="p-3 rounded-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(145deg, #161616, #0e0e0e)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ color: "var(--text-secondary)" }}>
                      {social.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-xs transition"
              style={{ color: "var(--text-muted)" }}
            >
              BACK TO TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
