import { api } from "@/lib/api";
import { CreateTaskPayload, PatchTaskPayload, Task } from "./tasks.types";

type ApiResponse<T> = {
  data: T;
};

export async function createTask(payload: CreateTaskPayload) {
  const response = await api.post("/test03/create_task", payload);
  return response.data;
}

export async function getAllTasks(): Promise<Task[]> {
  const response = await api.get<ApiResponse<Task[]> | Task[]>(
    "/test03/get_all_task"
  );

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data.data ?? [];
}

export async function getTask(task_id: number): Promise<Task | null> {
  const response = await api.get<ApiResponse<Task> | Task>(
    "/test03/get_task",
    {
      params: { task_id },
    }
  );

  if ("data" in response.data) {
    return response.data.data;
  }

  return response.data;
}

export async function patchTask(payload: PatchTaskPayload) {
  const response = await api.patch("/test03/patch_task", payload);
  return response.data;
}