import { api } from "@/lib/api";
import {
  ChangeLog,
  CreateChangeLogPayload,
  UpdateChangeLogPayload,
} from "./changeLogs.types";

let cachedChangeLogs: ChangeLog[] | null = null;
let lastFetchedAt = 0;

const CHANGE_LOG_CACHE_DURATION = 30_000;

export async function createChangeLog(payload: CreateChangeLogPayload) {
  const response = await api.post("/test04/create_changelog", payload);

  clearChangeLogsCache();

  return response.data;
}

export async function getAllChangeLogs(): Promise<ChangeLog[]> {
  const now = Date.now();

  if (cachedChangeLogs && now - lastFetchedAt < CHANGE_LOG_CACHE_DURATION) {
    return cachedChangeLogs;
  }

  const response = await api.get("/test04/get_all_change_log");

  let logs: ChangeLog[] = [];

  if (Array.isArray(response.data)) {
    logs = response.data;
  } else if (Array.isArray(response.data.data)) {
    logs = response.data.data;
  } else if (Array.isArray(response.data.logs)) {
    logs = response.data.logs;
  } else if (Array.isArray(response.data.data?.data)) {
    logs = response.data.data.data;
  }

  cachedChangeLogs = logs;
  lastFetchedAt = now;

  return logs;
}

export async function getChangeLog(id: number): Promise<ChangeLog | null> {
  const logs = await getAllChangeLogs();

  return logs.find((log) => log.id === id) ?? null;
}

export async function updateChangeLog(payload: UpdateChangeLogPayload) {
  const response = await api.patch("/test04/update_change_log", payload);

  clearChangeLogsCache();

  return response.data;
}

export function clearChangeLogsCache() {
  cachedChangeLogs = null;
  lastFetchedAt = 0;
}