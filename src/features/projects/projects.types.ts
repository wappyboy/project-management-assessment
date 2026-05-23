export type Project = {
  id: number;
  name: string;
  description: string;
  created_at?: string;
};

export type CreateProjectPayload = {
  user_id: string;
  name: string;
  description: string;
};

export type PatchProjectPayload = {
  id: number;
  name: string;
  description: string;
};