"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { PageHeader } from "@/components/layout/PageHeader";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function DashboardPage() {
  const router = useRouter();

  const [user] = useState<AuthUser | null>(() => getAuthUser());  const [projects, setProjects] = useState<Project[]>([]);
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
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
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
        <div className="flex items-center gap-3">
          <p className="hidden text-sm text-zinc-500 sm:block">
            Signed in as{" "}
            <span className="font-medium text-zinc-950">{user?.user_id}</span>
          </p>

          <Button
            onClick={handleLogout}
            className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
          >
            Logout
          </Button>
        </div>
      }
    />

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

           <ErrorMessage message={projectError} className="mb-4" />
           
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