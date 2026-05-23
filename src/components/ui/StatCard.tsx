type StatCardProps = {
  label: string;
  value: number | string;
  description?: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{label}</p>
      <h2 className="mt-2 text-3xl font-semibold text-zinc-950">{value}</h2>

      {description ? (
        <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
      ) : null}
    </div>
  );
}