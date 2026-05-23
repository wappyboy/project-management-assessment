"use client";

import { useDraggable } from "@dnd-kit/core";
import { Task } from "@/features/tasks/tasks.types";
import { TaskStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: Task;
};

function getStatusBadgeClass(status: TaskStatus) {
  if (status === "Todo") {
    return "bg-zinc-100 text-zinc-700 ring-zinc-200";
  }

  if (status === "In Progress") {
    return "bg-blue-50 text-blue-700 ring-blue-200";
  }

  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        task,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition active:cursor-grabbing",
        isDragging && "opacity-60 ring-2 ring-zinc-300"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-zinc-950">{task.name}</h3>

        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1",
            getStatusBadgeClass(task.status)
          )}
        >
          {task.status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-500">{task.contents}</p>

      <p className="mt-4 text-xs font-medium text-zinc-400">
        Task ID: {task.id}
      </p>
    </article>
  );
}