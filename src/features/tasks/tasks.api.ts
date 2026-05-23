import { api } from "@/lib/api";
import { CreateTaskPayload, PatchTaskPayload, Task } from "./tasks.types";

export async function createTask(payload: CreateTaskPayload) {
  const response = await api.post("/test03/create_task", payload);
  return response.data;
}

export async function getAllTasks(): Promise<Task[]> {
  const response = await api.get("/test03/get_all_task");
  return response.data.data ?? response.data;
}

export async function getTask(task_id: number): Promise<Task> {
  const response = await api.get("/test03/get_task", {
    params: { task_id },
  });

  return response.data.data ?? response.data;
}

export async function patchTask(payload: PatchTaskPayload) {
  const response = await api.patch("/test03/patch_task", payload);
  return response.data;
}