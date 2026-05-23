"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/features/projects/projects.types";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

type ProjectListProps = {
  projects: Project[];
  isLoading: boolean;
};

const PAGE_SIZE = 6;

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
}

export function ProjectList({ projects, isLoading }: ProjectListProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginatedProjects = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return projects.slice(start, end);
  }, [projects, safePage]);

  const visiblePages = useMemo(() => {
    return getVisiblePages(safePage, totalPages);
  }, [safePage, totalPages]);

  function goToPreviousPage() {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  }

  function goToNextPage() {
    setPage((currentPage) => Math.min(totalPages, currentPage + 1));
  }

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
        <h3 className="text-base font-semibold text-zinc-950">
          No projects yet
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          Create your first project to start organizing tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-zinc-500 sm:text-left">
            Page {safePage} of {totalPages} · {projects.length} projects
          </p>

          <div className="flex items-center justify-center gap-1 overflow-x-auto pb-1 sm:justify-end sm:pb-0">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={safePage === 1}
              aria-label="Go to previous page"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

            {visiblePages.map((pageNumber, index) => {
              const previousPage = visiblePages[index - 1];
              const shouldShowEllipsis =
                previousPage && pageNumber - previousPage > 1;

              return (
                <div
                  key={pageNumber}
                  className="flex shrink-0 items-center gap-1"
                >
                  {shouldShowEllipsis ? (
                    <span className="px-1 text-sm text-zinc-400">...</span>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition",
                      safePage === pageNumber
                        ? "bg-zinc-950 text-white"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
                    )}
                  >
                    {pageNumber}
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={goToNextPage}
              disabled={safePage === totalPages}
              aria-label="Go to next page"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}