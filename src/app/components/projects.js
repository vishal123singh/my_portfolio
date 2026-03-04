"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";
import ProjectCard from "@/app/components/ProjectCard"; // adjust if needed
import { projects } from "../../../data";
import CosmicBackground from "./CosmicBackground";

export default function Projects() {
  const searchParams = useSearchParams();
  const shouldLand = searchParams.get("land") === "true";

  const [showLandingRocket, setShowLandingRocket] = useState(shouldLand);

  useEffect(() => {
    if (shouldLand) {
      const timer = setTimeout(() => setShowLandingRocket(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldLand]);

  return (
    <section
      id="project-section"
      className="relative min-h-screen pt-12 custom-section"
    >
      <div className="relative w-full h-full overflow-hidden">
        <CosmicBackground />
      </div>

      <div className="project-grid max-w-5xl mx-auto">
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>
    </section>
  );
}
