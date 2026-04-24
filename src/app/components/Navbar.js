"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Apps", href: "/apps" },
];

// Custom hook for scroll visibility
function useScrollVisibility(threshold = 10) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setVisible(
            currentScrollY < lastScrollY.current || currentScrollY < threshold,
          );
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return visible;
}

// Custom hook for body scroll lock
function useLockBodyScroll(shouldLock) {
  useEffect(() => {
    const original = document.body.style.overflow;

    if (shouldLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }

    return () => {
      document.body.style.overflow = original;
    };
  }, [shouldLock]);
}

// Custom hook for escape key handler
function useEscapeKey(onEscape) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEscape]);
}

// NavLink component for consistency
function NavLink({ href, label, isActive, onClick, className = "" }) {
  const active = isActive(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative group tracking-wide transition-colors ${className} ${
        active ? "text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      <span className="relative z-10">{label}</span>
      <span
        className={`absolute -bottom-1 left-0 w-full h-px bg-white transform transition-transform duration-500 origin-left ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

// Mobile menu button component
function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      className="md:hidden text-white hover:text-gray-300 transition-colors"
      onClick={onClick}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}

// Logo component
function Logo() {
  return (
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
  );
}

// Mobile drawer component
function MobileDrawer({ isOpen, onClose, navLinks, isActive }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="absolute top-0 right-0 h-full w-[280px] bg-gradient-matte border-l border-gray-800 px-8 py-12 flex flex-col space-y-8 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Logo */}
            <div className="text-white text-2xl font-light">
              <span className="text-gray-600">{"<"}</span>
              dev
              <span className="text-gray-600">{"/>"}</span>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col space-y-6">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`relative group text-lg tracking-wide ${
                    isActive(href)
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="relative z-10">{label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-px transform transition-transform duration-500 origin-left ${
                      isActive(href)
                        ? "scale-x-100 bg-white"
                        : "scale-x-0 bg-gray-600 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            <div className="flex gap-6 pt-6">
              <a
                href="https://github.com/vishalsinghlab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <SiGithub size={20} />
              </a>

              <a
                href="https://linkedin.com/in/vishal-singh-b57b7b109"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <SiLinkedin size={20} />
              </a>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 border border-gray-800 rounded-full opacity-20" />
            <div className="absolute -top-20 -left-20 w-40 h-40 border border-gray-800 rounded-full opacity-20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Desktop navigation component
function DesktopNav({ navLinks, isActive }) {
  return (
    <div className="hidden md:flex gap-8">
      {navLinks.map(({ label, href }) => (
        <NavLink
          key={href}
          href={href}
          label={label}
          isActive={isActive}
          className="text-sm"
        />
      ))}
    </div>
  );
}

export default function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(
    !pathname.includes("/apps/algo-teacher"),
  );
  const isVisible = useScrollVisibility();
  useLockBodyScroll(menuOpen);
  useEscapeKey(() => setMenuOpen(false));

  if (!showNavbar) {
    return null;
  }

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 mix-blend-difference"
      >
        <div className="flex flex-1 items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <Logo />

          {/* Nav */}
          <div className="mx-auto hidden md:flex">
            <DesktopNav navLinks={navLinks} isActive={isActive} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {/* Socials */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/vishalsinghlab"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="GitHub"
              >
                <SiGithub
                  className="text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                  size={18}
                />
              </a>

              <a
                href="https://linkedin.com/in/vishal-singh-b57b7b109"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <SiLinkedin
                  className="text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                  size={18}
                />
              </a>
            </div>

            {/* Mobile Menu */}
            <MobileMenuButton isOpen={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </motion.nav>

      <MobileDrawer
        isOpen={menuOpen}
        onClose={closeMenu}
        navLinks={navLinks}
        isActive={isActive}
      />
    </>
  );
}
