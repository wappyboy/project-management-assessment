import { api } from "@/lib/api";

export type LoginPayLoad = {
    user_id: string;
    password_id: string;
}

export type LoginResponse = {
    data: unknown;
};

export async function login(payload: LoginPayLoad): Promise<LoginResponse> {
    const response = await api.post("/testlogin", payload);
    return response.data;
}