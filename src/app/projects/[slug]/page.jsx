import { notFound } from "next/navigation";
import { projects } from "../../../../data";
import ProjectDetailClient from "@/app/components/ProjectDetailClient";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params; //  REQUIRED

  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return <ProjectDetailClient project={project} />;
}
