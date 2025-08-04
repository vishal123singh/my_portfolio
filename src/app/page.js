"use client";

import Contact from "./components/home/Contact";
import Skills from "./components/home/Skills";
import About from "./components/home/About";
import HomeHero from "./components/home/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
