"use client";
import { useSearchParams } from "next/navigation";
import ProjectCard from "@/app/components/ProjectCard"; // adjust if needed
import { projects } from "../../../data";

export default function Projects() {
  const searchParams = useSearchParams();

  return (
    <section
      id="project-section"
      className="relative min-h-screen custom-section"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      <div className="project-grid max-w-5xl mx-auto  pt-24">
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>
    </section>
  );
}
