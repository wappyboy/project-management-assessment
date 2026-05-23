import { InputHTMLAttributes  } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
    const inputId = id || props.name;

    return (
        <div className="space-y-1.5">
            <label htmlFor={inputId} className="text-sm font-medium text-zinc-800">
                {label}
                </label>

                <input
                id={inputId}
                className={cn(
                    "h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-200",
                     error && "border-red-500 focus:border-red-500 focus:ring-red-100",
                     className
        
                )}
                {...props}
                />

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
    );
}