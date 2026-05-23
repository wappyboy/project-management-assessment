"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AuthUser,
  clearAuthUser,
  getAuthUser,
} from "@/features/auth/auth.storage";
import { getAllProjects } from "@/features/projects/projects.api";
import { Project } from "@/features/projects/projects.types";

import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ProjectList } from "@/components/projects/ProjectList";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { MotionContainer } from "@/components/ui/MotionContainer";
import { StatCard } from "@/components/ui/StatCard";

export default function DashboardPage() {
  const router = useRouter();

  const [user] = useState<AuthUser | null>(() => getAuthUser());
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projectError, setProjectError] = useState("");

  const hasFetchedProjects = useRef(false);

  const userProjects = useMemo(() => {
    return projects;
  }, [projects]);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoadingProjects(true);
      setProjectError("");

      const projectList = await getAllProjects();
      setProjects(projectList);
    } catch (error) {
      console.error(error);
      setProjectError("Failed to load projects. Please try again.");
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!hasFetchedProjects.current) {
      hasFetchedProjects.current = true;
      fetchProjects();
    }
  }, [router, user, fetchProjects]);

  function handleLogout() {
    clearAuthUser();
    router.push("/login");
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <p className="text-sm text-zinc-500">Redirecting to login...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <PageHeader
        title="Dashboard"
        description="Manage your projects and continue your assessment workflow."
        action={
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <p className="rounded-xl bg-zinc-50 px-3 py-2 text-sm text-zinc-500 ring-1 ring-zinc-200 sm:bg-transparent sm:px-0 sm:py-0 sm:ring-0">
              Signed in as{" "}
              <span className="font-medium text-zinc-950">{user.user_id}</span>
            </p>

            <Button
              onClick={handleLogout}
              className="w-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200 sm:w-auto"
            >
              Logout
            </Button>
          </div>
        }
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <MotionContainer>
          <div className="mb-6 grid gap-4 sm:mb-8 md:grid-cols-3">
            <StatCard label="Your projects" value={userProjects.length} />

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:col-span-2">
              <p className="text-sm font-medium text-zinc-500">
                Assessment progress
              </p>

              <h2 className="mt-2 text-lg font-semibold text-zinc-950 sm:text-xl">
                Project Management
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Create, update, and manage projects with task boards and change
                logs.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
            <ProjectForm user={user} onProjectCreated={fetchProjects} />

            <div className="min-w-0">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-950">
                    Projects
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Select a project to manage its tasks.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={fetchProjects}
                  className="w-full bg-white text-zinc-950 ring-1 ring-zinc-200 hover:bg-zinc-100 sm:w-auto"
                >
                  Refresh
                </Button>
              </div>

              <ErrorMessage message={projectError} className="mb-4" />

              <ProjectList
                projects={userProjects}
                isLoading={isLoadingProjects}
              />
            </div>
          </div>
        </MotionContainer>
      </section>
    </main>
  );
}