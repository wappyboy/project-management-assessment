const AUTH_USER_KEY = "auth_user";

export type AuthUser = {
    user_id: string;
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
      localStorage.removeItem(AUTH_USER_KEY)
        return null;
    }
}

export function clearAuthUser() {
    localStorage.removeItem(AUTH_USER_KEY);
}