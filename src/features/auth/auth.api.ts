import { api } from "@/lib/api";

export type LoginPayload = {
  user_id: string;
  password: string;
};

export type LoginResponse = {
  data: unknown;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/testlogin", payload);
  return response.data;
}