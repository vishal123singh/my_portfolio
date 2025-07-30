"use client";

import Contact from "./components/home/Contact";
import Skills from "./components/home/Skills";
import About from "./components/home/About";
import HomeHero from "./components/home/Hero";
import Testimonial from "./components/home/Testimonial";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HomeHero />

      {/* Skills Section */}
      <Skills />

      {/* About Section */}
      <About></About>

      {/* Testimonials Section */}
      <Testimonial />
      {/* Contact Section */}
      <Contact />
    </>
  );
}
