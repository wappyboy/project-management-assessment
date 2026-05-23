import { api } from "@/lib/api";
import {
    CreateProjectPayload,
    PatchProjectPayload,
    Project,
} from "./projects.types";

export async function createProject(payload: CreateProjectPayload) {
    const response = await api.post("/test02/create_project", payload);
    return response.data;
}

export async function getAllProjects(): Promise<Project[]> {
    const response = await api.get("/test02/get_all_project");
    return response.data.data ?? response.data;
}

export async function getProject(project_id: number): Promise<Project> {
  const response = await api.get("/test02/get_project", {
    params: { project_id },
  });

  return response.data.data ?? response.data;
}

export async function patchProject(payload: PatchProjectPayload) {
  const response = await api.patch("/test02/patch_project", payload);
  return response.data;
}