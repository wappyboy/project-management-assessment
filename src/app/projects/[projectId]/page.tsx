"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { AuthUser, getAuthUser } from "@/features/auth/auth.storage";
import { getProject } from "@/features/projects/projects.api";
import { Project } from "@/features/projects/projects.types";

import { getAllTasks, patchTask } from "@/features/tasks/tasks.api";
import { Task } from "@/features/tasks/tasks.types";

import {
  createChangeLog,
  getAllChangeLogs,
} from "@/features/change-logs/changelogs.api";
import { ChangeLog } from "@/features/change-logs/changeLogs.types";

import { TaskStatus } from "@/lib/constants";

import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectEditForm } from "@/components/projects/ProjectEditForm";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { ChangeLogList } from "@/components/logs/ChangeLogList";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { MotionContainer } from "@/components/ui/MotionContainer";
import { ErrorMessage } from "@/components/ui/ErrorMessage";export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();

  const projectId = Number(params.projectId);
  const isInvalidProjectId = !projectId || Number.isNaN(projectId);
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [error, setError] = useState("");
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [authUser] = useState<AuthUser | null>(() => getAuthUser());  const [isEditingProject, setIsEditingProject] = useState(false);
  const hasFetchedInitialData = useRef(false);
  const projectTasks = useMemo(() => {
    return tasks.filter((task) => task.project_id === projectId);
  }, [tasks, projectId]);

  const projectTaskIds = useMemo(() => {
  return new Set(projectTasks.map((task) => task.id));
}, [projectTasks]);

const projectChangeLogs = useMemo(() => {
  return changeLogs.filter((log) => projectTaskIds.has(log.task_id));
}, [changeLogs, projectTaskIds]);

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
      setTasks(taskList);
    } catch (error) {
      console.error(error);
      setError("Failed to load tasks.");
    } finally {
      setIsLoadingTasks(false);
    }
  }, []);

    const fetchChangeLogs = useCallback(async () => {
    try {
      setIsLoadingLogs(true);

      const logs = await getAllChangeLogs();


      setChangeLogs(logs);
    } catch (error) {
      console.error(error);
      setError("Failed to load change logs.");
    } finally {
      setIsLoadingLogs(false);
    }
  }, []);

  async function handleTaskStatusChange(task: Task, newStatus: TaskStatus) {
  const oldStatus = task.status;

  if (oldStatus === newStatus) return;

  const previousTasks = tasks;

  const updatedTasks = tasks.map((item) =>
    item.id === task.id ? { ...item, status: newStatus } : item
  );

  setTasks(updatedTasks);

  try {
    await patchTask({
      task_id: task.id,
      name: task.name,
      status: newStatus,
      contents: task.contents,
    });

    await createChangeLog({
      task_id: task.id,
      old_status: oldStatus,
      new_status: newStatus,
      remark: `Task "${task.name}" moved from ${oldStatus} to ${newStatus}.`,
    });

    await fetchChangeLogs();

  } catch (error) {
    console.error(error);
    setTasks(previousTasks);
    setError("Failed to update task status. Please try again.");
  }
}

  function handleProjectUpdated(updatedProject: Project) {
    setProject(updatedProject);
    setIsEditingProject(false);
  }

  useEffect(() => {
    if (!authUser) {
      router.replace("/login");
      return;
    }

    if (isInvalidProjectId) {
      return;
    }

    if (!hasFetchedInitialData.current) {
      hasFetchedInitialData.current = true;

      fetchProject();
      fetchTasks();
      fetchChangeLogs();
    }
  }, [
    router,
    authUser,
    isInvalidProjectId,
    fetchProject,
    fetchTasks,
    fetchChangeLogs,
  ]);

  if (!authUser) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <p className="text-sm text-zinc-500">Redirecting to login...</p>
    </main>
  );
}

if (isInvalidProjectId) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-lg font-semibold text-zinc-950">
          Invalid project
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          The selected project ID is invalid.
        </p>
      </div>
    </main>
  );
}

  if (isLoadingProject) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">Loading project...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
            <PageHeader
        title={project?.name ?? `Project #${projectId}`}
        description={project?.description ?? "Manage tasks for this project."}
        backHref="/dashboard"
        backLabel="Back to dashboard"
        action={
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          onClick={() => setIsEditingProject(true)}
          className="w-fit bg-white text-zinc-950 ring-1 ring-zinc-200 hover:bg-zinc-100"
        >
          Edit project
        </Button>

        <Button
          type="button"
          onClick={fetchTasks}
          className="w-fit bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
        >
          Refresh tasks
        </Button>
      </div>
    }
      />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <MotionContainer>
       <ErrorMessage message={error} className="mb-5" />

       {isEditingProject && project ? (
      <ProjectEditForm
      project={project}
      onCancel={() => setIsEditingProject(false)}
      onProjectUpdated={handleProjectUpdated}
    />
    ) : null}

       <div className="mb-8 grid gap-4 md:grid-cols-3">
  <StatCard label="Total tasks" value={projectTasks.length} />

  <StatCard
    label="In progress"
    value={projectTasks.filter((task) => task.status === "In Progress").length}
  />

  <StatCard
    label="Done"
    value={projectTasks.filter((task) => task.status === "Done").length}
  />
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

            <TaskBoard
            tasks={projectTasks}
            isLoading={isLoadingTasks}
            onTaskStatusChange={handleTaskStatusChange}
          />

          <div className="mt-8">
          <ChangeLogList logs={projectChangeLogs} isLoading={isLoadingLogs} />
        </div>
          </div>
        </div>
        </MotionContainer>
      </section>
      
    </main>
  );
}