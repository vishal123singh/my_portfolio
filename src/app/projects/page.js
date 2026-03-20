"use client";

import { Suspense } from "react";
import Projects from "../components/projects";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex items-center justify-center min-h-screen"
          style={{
            background: "var(--gradient-matte)",
            color: "var(--text-primary)",
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Spinner */}
            <div
              className="animate-spin rounded-full h-12 w-12"
              style={{
                border: "2px solid rgba(255,255,255,0.08)",
                borderTop: "2px solid var(--accent)",
              }}
            />

            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)",
              }}
            />
          </div>
        </div>
      }
    >
      <Projects />
    </Suspense>
  );
}
