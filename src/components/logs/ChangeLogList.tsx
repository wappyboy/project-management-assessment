import { ChangeLog } from "@/features/change-logs/changeLogs.types";

type ChangeLogListProps = {
  logs: ChangeLog[];
  isLoading: boolean;
};

export function ChangeLogList({ logs, isLoading }: ChangeLogListProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 shadow-sm">
        Loading change logs...
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-6 text-center shadow-sm">
        <h3 className="text-sm font-semibold text-zinc-950">
          No change logs yet
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          Move a task to another status to create the first log.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-950">Change logs</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Recent task status changes for this project.
        </p>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
          >
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-zinc-950">
                Task #{log.task_id}
              </span>

              <span className="text-zinc-400">changed from</span>

              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
                {log.old_status}
              </span>

              <span className="text-zinc-400">to</span>

              <span className="rounded-full bg-zinc-950 px-2.5 py-1 text-xs font-medium text-white">
                {log.new_status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {log.remark}
            </p>

            {log.created_at ? (
              <p className="mt-3 text-xs text-zinc-400">
                {new Date(log.created_at).toLocaleString()}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}