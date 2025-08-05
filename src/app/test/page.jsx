"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const jobs = [
  {
    title: "Frontend Developer",
    company: "GoRTNM Innovations",
    date: "Jan 2022 - Present",
    description:
      "Worked on modern UI with React and WebRTC for video platforms.",
  },
  {
    title: "Full Stack Developer",
    company: "TechNova",
    date: "Aug 2020 - Dec 2021",
    description: "Built scalable apps with Node.js and MongoDB.",
  },
  {
    title: "Intern",
    company: "StartUpX",
    date: "Jan 2020 - Jul 2020",
    description: "Assisted in developing internal dashboards and tooling.",
  },
  {
    title: "Frontend Developer",
    company: "GoRTNM Innovations",
    date: "Jan 2022 - Present",
    description:
      "Worked on modern UI with React and WebRTC for video platforms.",
  },
  {
    title: "Full Stack Developer",
    company: "TechNova",
    date: "Aug 2020 - Dec 2021",
    description: "Built scalable apps with Node.js and MongoDB.",
  },
  {
    title: "Intern",
    company: "StartUpX",
    date: "Jan 2020 - Jul 2020",
    description: "Assisted in developing internal dashboards and tooling.",
  },
  {
    title: "Frontend Developer",
    company: "GoRTNM Innovations",
    date: "Jan 2022 - Present",
    description:
      "Worked on modern UI with React and WebRTC for video platforms.",
  },
  {
    title: "Full Stack Developer",
    company: "TechNova",
    date: "Aug 2020 - Dec 2021",
    description: "Built scalable apps with Node.js and MongoDB.",
  },
  {
    title: "Intern",
    company: "StartUpX",
    date: "Jan 2020 - Jul 2020",
    description: "Assisted in developing internal dashboards and tooling.",
  },
];

export default function JourneyCanvasPage() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(jobs.length - 1) * 100}%`]
  );
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <div
      style={{ background: "#000", color: "white", fontFamily: "sans-serif" }}
    >
      {/* Intro Section */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          My Professional Journey
        </h1>
      </section>

      {/* Horizontal Scroll Section */}
      <section
        ref={sectionRef}
        style={{
          height: `${jobs.length * 100}vh`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              height: "100%",
              width: `${jobs.length * 100}vw`,
              x: smoothX,
            }}
          >
            {jobs.map((job, index) => (
              <div
                key={index}
                style={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 70%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "1rem",
                    boxShadow: "0 0 60px rgba(255, 0, 255, 0.2)",
                    maxWidth: "600px",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">
                    {job.title}
                  </h2>
                  <h3 className="text-xl text-pink-400">{job.company}</h3>
                  <p className="text-sm text-gray-400">{job.date}</p>
                  <p className="mt-4 text-md text-white">{job.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Outro Section */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="text-xl text-center">Thanks for exploring my journey.</p>
      </section>
    </div>
  );
}
