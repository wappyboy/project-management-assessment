import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center justify-center text-center">
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
          Front-End Developer Assessment
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Simple project management tool for teams and tasks.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
          Manage projects, organize tasks, update progress with drag-and-drop,
          and track important task changes through logs.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}