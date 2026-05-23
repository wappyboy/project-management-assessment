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

  console.log("Raw change logs response:", response.data);

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data.data)) {
    return response.data.data;
  }

  if (Array.isArray(response.data.logs)) {
    return response.data.logs;
  }

  if (Array.isArray(response.data.data?.data)) {
    return response.data.data.data;
  }

  return [];
}

export async function getChangeLog(id: number): Promise<ChangeLog | null> {
  const logs = await getAllChangeLogs();
  return logs.find((log) => log.id === id) ?? null;
}

export async function updateChangeLog(payload: UpdateChangeLogPayload) {
  const response = await api.patch("/test04/update_change_log", payload);
  return response.data;
}