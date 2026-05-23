import { api } from "@/lib/api";
import {
    CreateMemberPayload,
    Member,
    UpdateMemberPayload,
} from "./members.types";

export async function createMember(payload: CreateMemberPayload) {
    const response = await api.post("/test01/create_member", payload);
    return response.data;
}

export async function getAllMember(): Promise<Member[]> {
    const response = await api.get("/test01/get_all_members");
    return response.data.data ?? response.data;
}

export async function getMember(user_id: string): Promise<Member> {
    const response = await api.get("/test01/get_member", {
        params: { user_id },
    });

    return response.data.data ?? response.data;
}

export async function updateMember(payload: UpdateMemberPayload) {
    const response = await api.patch("/test01/update_member", payload);
    return response.data;
}