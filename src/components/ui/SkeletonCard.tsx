export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="h-4 w-1/3 rounded-full bg-zinc-200" />
      <div className="mt-4 h-6 w-2/3 rounded-full bg-zinc-200" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded-full bg-zinc-200" />
        <div className="h-3 w-4/5 rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}