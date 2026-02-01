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
      <section>
        <h1>Project not found</h1>
        <Link href="/admin/projects">Back</Link>
      </section>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Edit Project</h1>
        <Link href="/admin/projects">Back</Link>
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
