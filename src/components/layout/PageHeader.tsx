import Link from "next/link";
import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  action?: ReactNode;
};

export function PageHeader({
  title,
  description,
  backHref,
  backLabel = "Back",
  action,
}: PageHeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          {backHref ? (
            <Link
              href={backHref}
              className="text-sm font-medium text-zinc-500 hover:text-zinc-950"
            >
              ← {backLabel}
            </Link>
          ) : null}

          <h1 className={backHref ? "mt-3 text-2xl font-semibold text-zinc-950" : "text-2xl font-semibold text-zinc-950"}>
            {title}
          </h1>

          {description ? (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-500">
              {description}
            </p>
          ) : null}
        </div>

        {action ? <div>{action}</div> : null}
      </div>
    </header>
  );
}