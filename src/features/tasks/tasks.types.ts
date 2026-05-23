import { TaskStatus } from "@/lib/constants";

export type Task = {
  id: number;
  project_id: number;
  name: string;
  status: TaskStatus;
  contents: string;
};

export type CreateTaskPayload = {
  project_id: number;
  name: string;
  status: TaskStatus;
  contents: string;
};

export type PatchTaskPayload = {
  task_id: number;
  name: string;
  status: TaskStatus;
  contents: string;
};