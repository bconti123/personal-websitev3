export const runtime = "nodejs";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import EditProjectForm from "./EditProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await Promise.resolve(params);

  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Project not found</h1>
        <Link className="btn btn-secondary" href="/admin/projects">
          Back
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Projects
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Edit project</h1>
        </div>
        <Link className="btn btn-secondary" href="/admin/projects">
          Back
        </Link>
      </div>

      <EditProjectForm
        project={{
          id: project.id,
          slug: project.slug,
          title: project.title,
          summary: project.summary,
          highlights: project.highlights,
          tech: project.tech,
          repoUrl: project.repoUrl,
          liveUrl: project.liveUrl,
          featured: project.featured,
          sortOrder: project.sortOrder,
        }}
      />
    </section>
  );
}
