"use client";

import { useDroppable } from "@dnd-kit/core";
import { Task } from "@/features/tasks/tasks.types";
import { TaskStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TaskCard } from "./TaskCard";

type TaskColumnProps = {
  status: TaskStatus;
  tasks: Task[];
};

export function TaskColumn({ status, tasks }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      status,
    },
  });

  return (
    <section
      ref={setNodeRef}
      className={cn(
        "rounded-3xl border border-zinc-200 bg-zinc-100/70 p-4 transition",
        isOver && "border-zinc-400 bg-zinc-200/80"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-950">{status}</h2>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-zinc-500 ring-1 ring-zinc-200">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-4 text-center text-sm text-zinc-500">
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}