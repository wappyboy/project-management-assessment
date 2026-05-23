import { api } from "@/lib/api";
import {
  ChangeLog,
  CreateChangeLogPayload,
  UpdateChangeLogPayload,
} from "./changeLogs.types";

export async function createChangeLog(payload: CreateChangeLogPayload) {
  const response = await api.post("/test04/create_changelog", payload);
  return response.data;
}

export async function getAllChangeLogs(): Promise<ChangeLog[]> {
  const response = await api.get("/test04/get_all_change_log");
  return response.data.data ?? response.data;
}

export async function getChangeLog(changelog_id: number): Promise<ChangeLog> {
  const response = await api.get("/test04/get_change_log", {
    params: { changelog_id },
  });

  return response.data.data ?? response.data;
}

export async function updateChangeLog(payload: UpdateChangeLogPayload) {
  const response = await api.patch("/test04/update_change_log", payload);
  return response.data;
}