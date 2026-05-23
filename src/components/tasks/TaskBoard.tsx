import { Task } from "@/features/tasks/tasks.types";
import { TASK_STATUSES } from "@/lib/constants";
import { TaskColumn } from "./TaskColumn";

type TaskBoardProps = {
  tasks: Task[];
  isLoading: boolean;
};

export function TaskBoard({ tasks, isLoading }: TaskBoardProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 shadow-sm">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {TASK_STATUSES.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
        />
      ))}
    </div>
  );
}