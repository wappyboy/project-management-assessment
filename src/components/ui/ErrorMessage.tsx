import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  message: string;
  className?: string;
};

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className={cn("rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700", className)}>
      {message}
    </div>
  );
}