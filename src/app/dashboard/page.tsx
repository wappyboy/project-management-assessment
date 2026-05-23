"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearAuthUser,
  getAuthUser,
  AuthUser,
} from "@/features/auth/auth.storage";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const authUser = getAuthUser();

    if (!authUser) {
      router.replace("/login");
      return;
    }

    setUser(authUser);
    setIsCheckingSession(false);
  }, [router]);

  function handleLogout() {
    clearAuthUser();
    router.push("/login");
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-500">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm text-zinc-500">Project Management Tool</p>
            <h1 className="text-xl font-semibold text-zinc-950">Dashboard</h1>
          </div>

          <Button onClick={handleLogout} className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200">
            Logout
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Signed in as</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
            {user?.user_id}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600">
            Authentication is now working. The next phase is project management:
            fetching projects, creating projects, and showing them in a clean
            dashboard layout.
          </p>
        </div>
      </section>
    </main>
  );
}