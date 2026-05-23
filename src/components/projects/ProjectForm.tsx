"use client";

import { FormEvent, useState } from "react";
import { createProject } from "@/features/projects/projects.api";
import { AuthUser } from "@/features/auth/auth.storage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type ProjectFormProps = {
  user: AuthUser;
  onProjectCreated: () => void;
};

type ProjectFormState = {
  name: string;
  description: string;
};

const initialFormState: ProjectFormState = {
  name: "",
  description: "",
};

export function ProjectForm({ user, onProjectCreated }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormState>(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof ProjectFormState, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function validateForm() {
    if (!form.name.trim()) return "Project name is required.";
    if (!form.description.trim()) return "Project description is required.";

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

      await createProject({
        user_id: user.user_id,
        name: form.name.trim(),
        description: form.description.trim(),
      });

      setForm(initialFormState);
      onProjectCreated();
    } catch (error) {
      console.error(error);
      setError("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-950">
          Create new project
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Add a project where you can organize related tasks.
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <Input
          label="Project name"
          name="name"
          placeholder="Example: Website Redesign"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
        />

        <div className="space-y-1.5 text-black">
          <label
            htmlFor="description"
            className="text-sm font-medium text-zinc-800"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Short description about this project"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-200"
          />
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Create project
        </Button>
      </form>
    </div>
  );
}