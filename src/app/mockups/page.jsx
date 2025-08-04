"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectDashboard from "../components/playground/ProjectManagement";

const CubeSceneMini = dynamic(
  () => import("@/app/components/ProjectPreviewComponents/CubeSceneMini"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[250px] w-full bg-gray-900 animate-pulse rounded-t-xl" />
    ),
  }
);

const ScrollStoryMini = dynamic(
  () => import("@/app/components/ProjectPreviewComponents/ScrollStoryMini"),
  { ssr: false }
);

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Projects />
    </Suspense>
  );
}

const uiExperiments = [
  {
    title: "Project Management Dashboard",
    slug: "playground/project-dashboard",
    description: "Project management dashboard",
    image: "/images/3d-viewer-demo.gif",
    link: "/playground/project-dashboard",
    tags: ["React", "Next.js", "Tailwind CSS", "Project Management"],
    liveComponent: <ProjectDashboard />,
  },
  {
    title: "Scroll Storytelling",
    slug: "playground/scroll-storytelling",
    description: "Scroll-driven parallax and pinning.",
    image: "/images/scroll-storytelling.gif",
    link: "/playground/scroll-storytelling",
    tags: ["Framer Motion", "ScrollTrigger"],
    liveComponent: <ScrollStoryMini />,
  },
  {
    title: "3D Product Viewer",
    slug: "playground/product-demo",
    description: "Interactive 3D scene using react-three-fiber.",
    image: "/images/3d-viewer-demo.gif",
    link: "/playground/3d-viewer",
    tags: ["Three.js", "React Three Fiber", "WebGL"],
    liveComponent: <CubeSceneMini />,
  },
];

function Projects() {
  return (
    <section
      id="project-section"
      className="relative min-h-screen pt-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {uiExperiments.map((proj, idx) => (
            <ProjectCard key={idx} {...proj} target="_self" />
          ))}
        </div>
      </div>
    </section>
  );
}
