"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  //{ label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Mock-Ups", href: "/mockups" },
  // { label: "Productivity", href: "/productivity" },
  // { label: "Skills", href: "/skills" },
  { label: "Blogs", href: "/blogs" },
  //{ label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);
  const pathname = usePathname();

  return (
    <nav className="w-full px-6 py-4 flex justify-center space-x-6 text-sm sm:text-base bg-[#0f172a]/70 backdrop-blur-md border-b border-white/10">
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`transition duration-300 px-2 py-1 rounded-md
              ${
                isActive
                  ? "text-cyan-400 border-b-2 border-cyan-400 font-semibold"
                  : "text-slate-300 hover:text-white"
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
