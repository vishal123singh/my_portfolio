'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export default function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/skills">Skills</Link>
      <Link href="/contact">Contact</Link>
      {/* <button onClick={toggle} style={{ marginLeft: 'auto' }}>
        {theme === 'dark' ? '🌞' : '🌙'}
      </button> */}
    </nav>
  );
}
