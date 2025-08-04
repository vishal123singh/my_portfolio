// app/projects/[slug]/page.tsx

import { notFound } from "next/navigation";
import { projects } from "../../../../data";
import ProjectDetailClient from "@/app/components/ProjectDetailClient.jsx"; // 👈 NEW client component

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return <ProjectDetailClient project={project} />;
}
