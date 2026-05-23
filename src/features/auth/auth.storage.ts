const AUTH_USER_KEY = "auth_user";
const REGISTERED_MEMBERS_KEY = "registered_members";

export type AuthUser = {
  user_id: string;
};

export type StoredMember = {
  user_id: string;
  email: string;
  password: string;
};

export function saveAuthUser(user: AuthUser) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
}

export function clearAuthUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getStoredMembers(): StoredMember[] {
  if (typeof window === "undefined") return [];

  const storedMembers = localStorage.getItem(REGISTERED_MEMBERS_KEY);

  if (!storedMembers) return [];

  try {
    return JSON.parse(storedMembers) as StoredMember[];
  } catch {
    localStorage.removeItem(REGISTERED_MEMBERS_KEY);
    return [];
  }
}

export function saveStoredMember(member: StoredMember) {
  const members = getStoredMembers();

  const existingMemberIndex = members.findIndex(
    (item) => item.user_id === member.user_id
  );

  if (existingMemberIndex >= 0) {
    members[existingMemberIndex] = member;
  } else {
    members.push(member);
  }

  localStorage.setItem(REGISTERED_MEMBERS_KEY, JSON.stringify(members));
}