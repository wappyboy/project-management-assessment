"use client";

import { FormEvent, useState } from "react";
import { createTask } from "@/features/tasks/tasks.api";
import { TaskStatus } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type TaskFormProps = {
  projectId: number;
  onTaskCreated: () => void;
};

type TaskFormState = {
  name: string;
  contents: string;
  status: TaskStatus;
};

const initialFormState: TaskFormState = {
  name: "",
  contents: "",
  status: "Todo",
};

export function TaskForm({ projectId, onTaskCreated }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormState>(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof TaskFormState>(
    field: K,
    value: TaskFormState[K]
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function validateForm() {
    if (!form.name.trim()) return "Task name is required.";
    if (!form.contents.trim()) return "Task description is required.";

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

      await createTask({
        project_id: projectId,
        name: form.name.trim(),
        contents: form.contents.trim(),
        status: form.status,
      });

      setForm(initialFormState);
      onTaskCreated();
    } catch (error) {
      console.error(error);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-950">
          Create new task
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Add a task to this project and assign its starting status.
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <Input
          label="Task name"
          name="name"
          placeholder="Example: Design login page"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
        />

        <div className="space-y-1.5">
          <label
            htmlFor="contents"
            className="text-sm font-medium text-zinc-800"
          >
            Description
          </label>

          <textarea
            id="contents"
            name="contents"
            rows={4}
            placeholder="Describe the task"
            value={form.contents}
            onChange={(event) => updateField("contents", event.target.value)}
            className="w-full rounded-xl text-black border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-200"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="status" className="text-sm font-medium text-zinc-800">
            Status
          </label>

          <select
            id="status"
            name="status"
            value={form.status}
            onChange={(event) =>
              updateField("status", event.target.value as TaskStatus)
            }
            className="h-11 w-full rounded-xl border text-black border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-200"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Create task
        </Button>
      </form>
    </div>
  );
}