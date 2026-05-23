"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearAuthUser,
  getAuthUser,
  AuthUser,
} from "@/features/auth/auth.storage";
import { getAllProjects } from "@/features/projects/projects.api";
import { Project } from "@/features/projects/projects.types";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ProjectList } from "@/components/projects/ProjectList";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projectError, setProjectError] = useState("");

const userProjects = useMemo(() => {
  return projects;
}, [projects]);

const fetchProjects = useCallback(async () => {
  try {
    setIsLoadingProjects(true);
    setProjectError("");

    const projectList = await getAllProjects();

    console.log("Cleaned projects list:", projectList);
    console.log("Is projectList array?", Array.isArray(projectList));

    setProjects(projectList);
  } catch (error) {
    console.error(error);
    setProjectError("Failed to load projects. Please try again.");
  } finally {
    setIsLoadingProjects(false);
  }
}, []);

  useEffect(() => {
    const authUser = getAuthUser();

    if (!authUser) {
      router.replace("/login");
      return;
    }

    setUser(authUser);
    setIsCheckingSession(false);
    fetchProjects();
  }, [router, fetchProjects]);

  function handleLogout() {
    clearAuthUser();
    router.push("/login");
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm text-zinc-500">Project Management Tool</p>
            <h1 className="text-xl font-semibold text-zinc-950">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <p className="hidden text-sm text-zinc-500 sm:block">
              Signed in as{" "}
              <span className="font-medium text-zinc-950">
                {user?.user_id}
              </span>
            </p>

            <Button
              onClick={handleLogout}
              className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Your projects</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-950">
              {userProjects.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:col-span-2">
            <p className="text-sm font-medium text-zinc-500">
              Assessment progress
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-950">
              Phase 5: Project Management
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              You can now create and view projects connected to the logged-in
              user.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {user ? (
            <ProjectForm user={user} onProjectCreated={fetchProjects} />
          ) : null}

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
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
                className="bg-white text-zinc-950 ring-1 ring-zinc-200 hover:bg-zinc-100"
              >
                Refresh
              </Button>
            </div>

            {projectError ? (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {projectError}
              </div>
            ) : null}

            <ProjectList
              projects={userProjects}
              isLoading={isLoadingProjects}
            />
          </div>
        </div>
      </section>
    </main>
  );
}