import { TaskStatus } from "@/lib/constants";

export type ChangeLog = {
  changelog_id?: number;
  task_id: number;
  old_status: TaskStatus;
  new_status: TaskStatus;
  remark: string;
};

export type CreateChangeLogPayload = {
  task_id: number;
  old_status: TaskStatus;
  new_status: TaskStatus;
  remark: string;
};

export type UpdateChangeLogPayload = {
  changelog_id?: number;
  task_id?: number;
  old_status?: TaskStatus;
  new_status?: TaskStatus;
  remark?: string;
};