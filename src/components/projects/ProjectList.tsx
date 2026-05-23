"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/features/projects/projects.types";
import { ProjectCard } from "./ProjectCard";

type ProjectListProps = {
  projects: Project[];
  isLoading: boolean;
};

const PAGE_SIZE = 6;

export function ProjectList({ projects, isLoading }: ProjectListProps) {
  const [page, setPage] = useState(1);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 shadow-sm">
        Loading projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
        <h3 className="text-base font-semibold text-zinc-950">No projects yet</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Create your first project to start organizing tasks.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const paginated = projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {paginated.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-1 border-t border-zinc-100 pt-4">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition ${
                page === p
                  ? "bg-zinc-950 text-white"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}