import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { Project } from "@/features/projects/projects.types";
import { motion } from "framer-motion";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white">
          <FolderKanban size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-1 text-base font-semibold text-zinc-950 group-hover:underline">
            {project.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
            {project.description}
          </p>

          <p className="mt-4 text-xs font-medium text-zinc-400">
            Project ID: {project.id}
          </p>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}