import { api } from "@/lib/api";
import { CreateTaskPayload, PatchTaskPayload, Task } from "./tasks.types";

let cachedTasks: Task[] | null = null;
let lastFetchedAt = 0;

const TASK_CACHE_DURATION = 30_000;

export async function createTask(payload: CreateTaskPayload) {
  const response = await api.post("/test03/create_task", payload);

  clearTasksCache();

  return response.data;
}

export async function getAllTasks(): Promise<Task[]> {
  const now = Date.now();

  if (cachedTasks && now - lastFetchedAt < TASK_CACHE_DURATION) {
    return cachedTasks;
  }

  const response = await api.get("/test03/get_all_task");

  let tasks: Task[] = [];

  if (Array.isArray(response.data)) {
    tasks = response.data;
  } else if (Array.isArray(response.data.data)) {
    tasks = response.data.data;
  } else if (Array.isArray(response.data.tasks)) {
    tasks = response.data.tasks;
  } else if (Array.isArray(response.data.data?.data)) {
    tasks = response.data.data.data;
  }

  cachedTasks = tasks;
  lastFetchedAt = now;

  return tasks;
}

export async function getTask(taskId: number): Promise<Task | null> {
  const tasks = await getAllTasks();

  return tasks.find((task) => task.id === taskId) ?? null;
}

export async function patchTask(payload: PatchTaskPayload) {
  const response = await api.patch("/test03/patch_task", payload);

  clearTasksCache();

  return response.data;
}

export function clearTasksCache() {
  cachedTasks = null;
  lastFetchedAt = 0;
}