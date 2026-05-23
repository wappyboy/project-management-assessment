import { api } from "@/lib/api";
import {
  CreateProjectPayload,
  PatchProjectPayload,
  Project,
} from "./projects.types";

type ApiResponse<T> = {
  data: T;
};

export async function createProject(payload: CreateProjectPayload) {
  const response = await api.post("/test02/create_project", payload);
  return response.data;
}

export async function getAllProjects(): Promise<Project[]> {
  const response = await api.get<ApiResponse<Project[]> | Project[]>(
    "/test02/get_all_project"
  );

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data.data ?? [];
}

export async function getAllProject(): Promise<Project[]> {
  const response = await api.get("/test02/get_all_project");

  console.log("Raw get all projects response:", response.data);

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data.data)) {
    return response.data.data;
  }

  if (Array.isArray(response.data.projects)) {
    return response.data.projects;
  }

  if (Array.isArray(response.data.data?.data)) {
    return response.data.data.data;
  }

  return [];
}

export async function getProject(projectId: number): Promise<Project | null> {
  const projects = await getAllProjects();

  const project = projects.find((project) => project.id === projectId);

  return project ?? null;
}

export async function patchProject(payload: PatchProjectPayload) {
  const response = await api.patch("/test02/patch_project", payload);
  return response.data;
}