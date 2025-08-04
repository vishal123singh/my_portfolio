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
  { label: "UI/UX", href: "/mockups" },
  { label: "Blogs", href: "/blogs" },
  { label: "Apps", href: "/apps" },
];

export default function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[color:var(--bg-dark)]/80 backdrop-blur-lg border-b border-white/10 shadow-md"
      >
        {/* Desktop Nav */}
        <div className="hidden sm:flex space-x-6">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative transition-all duration-300 text-sm px-1 py-0.5 group ${
                  isActive
                    ? "text-[color:var(--accent)] font-semibold"
                    : "text-[color:var(--text-light)]/70 hover:text-[color:var(--text-light)]"
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                    isActive ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-[color:var(--text-light)]"
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="absolute top-0 left-0 h-full w-[70vw] max-w-xs bg-[color:var(--bg-dark)] text-[color:var(--text-light)] px-6 py-6 flex flex-col space-y-6 shadow-2xl rounded-tr-xl rounded-br-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Close */}
              <div className="flex justify-end">
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Links */}
              {navLinks.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-base font-medium tracking-wide ${
                      isActive
                        ? "text-[color:var(--accent)]"
                        : "text-[color:var(--text-light)] hover:text-[color:var(--accent)]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
