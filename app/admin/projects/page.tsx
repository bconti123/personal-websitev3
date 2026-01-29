import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "./actions";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Projects</h1>
        <Link href="/admin/projects/new">+ New Project</Link>
      </div>

      {projects.length === 0 ? <p>No projects yet.</p> : null}

      <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
        {projects.map((p) => (
          <li key={p.id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <strong>{p.title}</strong> {p.featured ? "⭐" : ""}
                <div style={{ opacity: 0.8 }}>{p.slug}</div>
                <div style={{ marginTop: 8 }}>{p.summary}</div>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Link href={`/admin/projects/${p.id}/edit`}>Edit</Link>

                <form
                  action={async () => {
                    "use server";
                    await deleteProject(p.id);
                  }}
                >
                  <button type="submit" style={{ cursor: "pointer" }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>

            {p.tech.length ? (
              <div style={{ marginTop: 10, opacity: 0.85 }}>
                <small>Tech: {p.tech.join(", ")}</small>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
