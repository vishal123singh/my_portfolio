"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Apps", href: "/apps" },
];

export default function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // ✅ Smooth scroll (throttled)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          setVisible(
            currentScrollY < lastScrollY.current || currentScrollY < 10,
          );

          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Lock body scroll safely
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : original;

    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // ✅ Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ✅ ESC to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ✅ Better route matching
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 mix-blend-difference"
      >
        <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="text-white text-2xl font-light tracking-tight relative group"
          >
            <span className="relative z-10">
              <span className="text-gray-400">{"<"}</span>
              dev
              <span className="text-gray-400">{"/>"}</span>
            </span>
            <div className="absolute -inset-2 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map(({ label, href }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-item group relative text-sm tracking-wide transition-colors ${
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{label}</span>

                  <span
                    className={`absolute -bottom-1 left-0 w-full h-px bg-white transform transition-transform duration-500 origin-left ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-gray-300 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="absolute top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-gray-800 px-8 py-12 flex flex-col space-y-8 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Close */}
              <div className="flex justify-end">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Logo */}
              <div className="mb-8 text-white text-2xl font-light">
                <span className="text-gray-600">{"<"}</span>
                dev
                <span className="text-gray-600">{"/>"}</span>
              </div>

              {/* Links */}
              <div className="flex flex-col space-y-6">
                {navLinks.map(({ label, href }) => {
                  const active = isActive(href);

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`relative group text-lg tracking-wide ${
                        active
                          ? "text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <span className="relative z-10">{label}</span>

                      <span
                        className={`absolute -bottom-1 left-0 w-full h-px transform transition-transform duration-500 origin-left ${
                          active
                            ? "scale-x-100 bg-white"
                            : "scale-x-0 bg-gray-600 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Decorative */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 border border-gray-800 rounded-full opacity-20" />
              <div className="absolute -top-20 -left-20 w-40 h-40 border border-gray-800 rounded-full opacity-20" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
