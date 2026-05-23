import Link from "next/link";

export default function HomePage() {
  const features = [
    "Drag-and-drop tasks",
    "Progress tracking",
    "Activity logs",
    "Team collaboration",
  ];

  const stats = [
    { num: "∞", label: "Projects" },
    { num: "DnD", label: "Board" },
    { num: "Live", label: "Logs" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Corner accents */}
      <div className="absolute right-6 top-6 h-16 w-16 border-r border-t border-white/20" />
      <div className="absolute bottom-6 left-6 h-10 w-10 border-b border-l border-white/10" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between border-b border-white/10 px-8 py-5">
        <span className="text-sm font-semibold tracking-widest uppercase text-white">
          PMT
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/30">
          Front-End Assessment
        </span>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-61px)] max-w-3xl flex-col items-center justify-center px-6 text-center">

        {/* Author badge */}
        <div className="mb-8 inline-flex items-center gap-2 border border-white/15 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="text-[11px] uppercase tracking-widest text-white/50">
            Ralph E. Eco &nbsp;·&nbsp; Frontend Developer
          </span>
        </div>

        <p className="mb-5 text-[11px] uppercase tracking-[0.15em] text-white/30">
          Project Management Tool
        </p>

        <h1 className="max-w-135 text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
          Manage tasks with{" "}
          <span className="text-white/40 font-normal italic">clarity</span>
          {" "}and speed.
        </h1>

        <div className="my-7 h-px w-12 bg-white/15" />

        <p className="max-w-md text-sm font-light leading-relaxed text-white/40">
          Organize projects, update progress with drag-and-drop, and keep your
          team aligned — all in one focused workspace.
        </p>

        {/* Feature pills */}
        <div className="mb-10 mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <span className="h-px w-3 bg-white/30" />
              <span className="text-xs tracking-wide text-white/35">{f}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/login"
            className="border border-white bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="border border-white/20 px-7 py-3 text-sm font-light text-white/60 transition hover:border-white/50 hover:text-white"
          >
            Create account
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-14 flex gap-12 border-t border-white/8] pt-8">
          {stats.map(({ num, label }) => (
            <div key={label} className="text-center">
              <span className="block text-2xl font-semibold text-white">
                {num}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-widest text-white/30">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}