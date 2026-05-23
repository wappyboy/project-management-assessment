export type Project = {
    project_id: number;
    user_id: string;
    name: string;
    description: string;
};

export type CreateProjectPayload = {
    user_id: string;
    name: string;
    description: string;
};

export type PatchProjectPayload = {
    project_id: number;
    user_id?: string;
    name?: string;
    description?: string;
};
