"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/features/auth/auth.api";
import {
  getStoredMembers,
  saveAuthUser,
} from "@/features/auth/auth.storage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getAllMember } from "@/features/members/members.api";

type LoginFormState = {
  user_id: string;
  password: string;
};

const initialFormState: LoginFormState = {
  user_id: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormState>(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof LoginFormState, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function validateForm() {
    if (!form.user_id.trim()) return "User ID is required.";
    if (!form.password.trim()) return "Password is required.";

    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const validationError = validateForm();

  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    setIsSubmitting(true);
    setError("");

    const userId = form.user_id.trim();
    const password = form.password.trim();

    const storedMembers = getStoredMembers();

    const existingMember = storedMembers.find(
      (member) =>
        member.user_id.trim() === userId &&
        member.password.trim() === password
    );

    if (!existingMember) {
      setError("Invalid User ID or password.");
      return;
    }

    await login({
      user_id: userId,
      password,
    });

    saveAuthUser({
      user_id: userId,
    });

    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    setError("Login failed. Please check your User ID and password.");
  } finally {
    setIsSubmitting(false);
  }
}
  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium text-zinc-500">Welcome back</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
          Sign in to your workspace
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Continue managing your projects and task progress.
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="User ID"
          name="user_id"
          placeholder="example: ralph01"
          value={form.user_id}
          onChange={(event) => updateField("user_id", event.target.value)}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
        />

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-zinc-500">
        No account yet?{" "}
        <Link href="/register" className="font-medium text-zinc-950 underline">
          Create one
        </Link>
      </p>
    </div>
  );
}