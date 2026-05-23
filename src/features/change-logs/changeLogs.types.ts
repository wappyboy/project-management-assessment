import { TaskStatus } from "@/lib/constants";

export type ChangeLog = {
  id: number;
  task_id: number;
  old_status: TaskStatus;
  new_status: TaskStatus;
  remark: string;
  created_at?: string;
};

export type CreateChangeLogPayload = {
  task_id: number;
  old_status: TaskStatus;
  new_status: TaskStatus;
  remark: string;
};

export type UpdateChangeLogPayload = {
  id?: number;
  task_id?: number;
  old_status?: TaskStatus;
  new_status?: TaskStatus;
  remark?: string;
};