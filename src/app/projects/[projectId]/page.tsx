"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAuthUser } from "@/features/auth/auth.storage";
import { getProject } from "@/features/projects/projects.api";
import { Project } from "@/features/projects/projects.types";
import { getAllTasks } from "@/features/tasks/tasks.api";
import { Task } from "@/features/tasks/tasks.types";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { Button } from "@/components/ui/Button";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();

  const projectId = Number(params.projectId);

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [error, setError] = useState("");

  const projectTasks = useMemo(() => {
    return tasks.filter((task) => task.project_id === projectId);
  }, [tasks, projectId]);

  const fetchProject = useCallback(async () => {
    try {
      setIsLoadingProject(true);
      setError("");

      const projectData = await getProject(projectId);

      if (!projectData) {
        setError("Project not found.");
        return;
      }

      setProject(projectData);
    } catch (error) {
      console.error(error);
      setError("Failed to load project.");
    } finally {
      setIsLoadingProject(false);
    }
  }, [projectId]);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoadingTasks(true);

      const taskList = await getAllTasks();

    console.log("Tasks from API:", taskList);
    console.table(taskList.slice(0, 5));
      setTasks(taskList);
    } catch (error) {
      console.error(error);
      setError("Failed to load tasks.");
    } finally {
      setIsLoadingTasks(false);
    }
  }, []);

  useEffect(() => {
    const authUser = getAuthUser();

    if (!authUser) {
      router.replace("/login");
      return;
    }

    if (!projectId || Number.isNaN(projectId)) {
      setError("Invalid project ID.");
      return;
    }

    fetchProject();
    fetchTasks();
  }, [router, projectId, fetchProject, fetchTasks]);

  if (isLoadingProject) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">Loading project...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-950"
            >
              ← Back to dashboard
            </Link>

            <h1 className="mt-3 text-2xl font-semibold text-zinc-950">
              {project?.name ?? `Project #${projectId}`}
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-500">
              {project?.description ?? "Manage tasks for this project."}
            </p>
          </div>

          <Button
            type="button"
            onClick={fetchTasks}
            className="w-fit bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
          >
            Refresh tasks
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        {error ? (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Total tasks</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-950">
              {projectTasks.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">In progress</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-950">
              {
                projectTasks.filter((task) => task.status === "In Progress")
                  .length
              }
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Done</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-950">
              {projectTasks.filter((task) => task.status === "Done").length}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <TaskForm projectId={projectId} onTaskCreated={fetchTasks} />

          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-zinc-950">
                Task board
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Tasks are grouped by their current status.
              </p>
            </div>

            <TaskBoard tasks={projectTasks} isLoading={isLoadingTasks} />
          </div>
        </div>
      </section>
    </main>
  );
}