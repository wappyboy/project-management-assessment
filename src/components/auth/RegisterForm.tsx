"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createMember } from "@/features/members/members.api";
import {
  saveAuthUser,
  saveStoredMember,
} from "@/features/auth/auth.storage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getAllMember } from "@/features/members/members.api";

type RegisterFormState = {
  user_id: string;
  email: string;
  password: string;
};

const initialFormState: RegisterFormState = {
  user_id: "",
  email: "",
  password: "",
};

export function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterFormState>(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof RegisterFormState, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function validateForm() {
    if (!form.user_id.trim()) return "User ID is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.email.includes("@")) return "Please enter a valid email.";
    if (!form.password.trim()) return "Password is required.";
    if (form.password.length < 4) {
      return "Password must be at least 4 characters.";
    }

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
    const email = form.email.trim();

    const members = await getAllMember();

    const userIdAlreadyExists = members.some(
      (member) => member.user_id === userId
    );

    if (userIdAlreadyExists) {
      setError("This User ID is already taken. Please choose another one.");
      return;
    }

    const emailAlreadyExists = members.some(
      (member) => member.email === email
    );

    if (emailAlreadyExists) {
      setError("This email is already registered. Please use another email.");
      return;
    }

        await createMember({
        user_id: userId,
        email,
        password: form.password,
        });

        saveStoredMember({
        user_id: userId,
        email,
        password: form.password,
        });

        saveAuthUser({
        user_id: userId,
        });

    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    setError("Registration failed. Please check your details and try again.");
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium text-zinc-500">Create account</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
          Start managing your projects
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Register as a member to create projects and tasks.
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
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
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
          Create account
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-zinc-950 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}