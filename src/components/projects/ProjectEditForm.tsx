"use client";

import { FormEvent, useState } from "react";
import { Project } from "@/features/projects/projects.types";
import { patchProject } from "@/features/projects/projects.api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

type ProjectEditFormProps = {
  project: Project;
  userId?: string;
  onCancel: () => void;
  onProjectUpdated: (project: Project) => void;
};

type ProjectEditFormState = {
  name: string;
  description: string;
};

export function ProjectEditForm({
  project,
  onCancel,
  onProjectUpdated,
}: ProjectEditFormProps) {
  const [form, setForm] = useState<ProjectEditFormState>({
    name: project.name,
    description: project.description,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof ProjectEditFormState, value: string) {
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

        await patchProject({
        id: project.id,
        name: form.name.trim(),
        description: form.description.trim(),
        });

      onProjectUpdated({
        ...project,
        name: form.name.trim(),
        description: form.description.trim(),
      });
    } catch (error) {
      console.error(error);
      setError("Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-950">Edit project</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Update the project name and description.
        </p>
      </div>

      <ErrorMessage message={error} className="mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <Input
          label="Project name"
          name="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
        />

        <div className="space-y-1.5">
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
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-200"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" isLoading={isSubmitting}>
            Save changes
          </Button>

          <Button
            type="button"
            onClick={onCancel}
            className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}