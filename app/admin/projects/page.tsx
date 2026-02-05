import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Projects
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Manage projects</h1>
        </div>
        <Link className="btn btn-primary" href="/admin/projects/new">
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? <p>No projects yet.</p> : null}

      <ul className="grid gap-4">
        {projects.map((p) => (
          <li key={p.id}>
            <Card className="bg-white/80">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {p.imageUrl ? (
                      <div className="w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 aspect-[4/3]">
                        <img
                          src={p.imageUrl}
                          alt={`${p.title} cover`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div>
                      <CardTitle>
                        {p.title} {p.featured ? <span className="text-amber-600">★</span> : null}
                      </CardTitle>
                      <p className="mt-1 text-sm text-slate-500">{p.slug}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link className="btn btn-secondary" href={`/admin/projects/${p.id}/edit`}>
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProject(p.id);
                      }}
                    >
                      <button className="btn btn-secondary" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>{p.summary}</p>
                {p.tech.length ? (
                  <div className="flex flex-wrap gap-2">
                    {p.tech.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
