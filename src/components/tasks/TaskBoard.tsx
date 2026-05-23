"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task } from "@/features/tasks/tasks.types";
import { TASK_STATUSES, TaskStatus } from "@/lib/constants";
import { TaskColumn } from "./TaskColumn";

type TaskBoardProps = {
  tasks: Task[];
  isLoading: boolean;
  onTaskStatusChange: (task: Task, newStatus: TaskStatus) => void;
};

export function TaskBoard({
  tasks,
  isLoading,
  onTaskStatusChange,
}: TaskBoardProps) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log("Drag ended:", { active, over });

    if (!over) return;

    const task = active.data.current?.task as Task | undefined;
    const newStatus = over.id as TaskStatus;

    console.log("Dragged task:", task);
    console.log("New status:", newStatus);

    if (!task) return;
    if (task.status === newStatus) return;

    onTaskStatusChange(task, newStatus);
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 shadow-sm">
        Loading tasks...
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid gap-4 xl:grid-cols-3">
        {TASK_STATUSES.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
}