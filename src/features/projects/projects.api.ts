import { api } from "@/lib/api";
import {
  CreateProjectPayload,
  PatchProjectPayload,
  Project,
} from "./projects.types";

let cachedProjects: Project[] | null = null;
let lastFetchedAt = 0;

const PROJECT_CACHE_DURATION = 30_000;


export async function createProject(payload: CreateProjectPayload) {
  const response = await api.post("/test02/create_project", payload);
  return response.data;
}

export async function getAllProjects(): Promise<Project[]> {
  const now = Date.now();

  if (cachedProjects && now - lastFetchedAt < PROJECT_CACHE_DURATION) {
    return cachedProjects;
  }

  const response = await api.get("/test02/get_all_project");

  let projects: Project[] = [];

  if (Array.isArray(response.data)) {
    projects = response.data;
  } else if (Array.isArray(response.data.data)) {
    projects = response.data.data;
  } else if (Array.isArray(response.data.projects)) {
    projects = response.data.projects;
  } else if (Array.isArray(response.data.data?.data)) {
    projects = response.data.data.data;
  }

  cachedProjects = projects;
  lastFetchedAt = now;

  return projects;
}
export async function getProject(projectId: number): Promise<Project | null> {
  const projects = await getAllProjects();

  const project = projects.find((project) => project.id === projectId);

  return project ?? null;
}

export async function patchProject(payload: PatchProjectPayload) {
  const response = await api.patch("/test02/patch_project", payload);

  clearProjectsCache();

  return response.data;
}

export function clearProjectsCache() {
  cachedProjects = null;
  lastFetchedAt = 0;
}