import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateProject } from "../../actions";

export default async function EditProjectPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
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

      <form
        action={async (formData) => {
          "use server";
          await updateProject(project.id, formData);
        }}
        style={{ display: "grid", gap: 12, maxWidth: 700 }}
      >
        <label>
          Slug
          <input name="slug" defaultValue={project.slug} required />
        </label>

        <label>
          Title
          <input name="title" defaultValue={project.title} required />
        </label>

        <label>
          Summary
          <textarea name="summary" rows={3} defaultValue={project.summary} required />
        </label>

        <label>
          Highlights (comma or new line separated)
          <textarea
            name="highlights"
            rows={4}
            defaultValue={project.highlights.join("\n")}
          />
        </label>

        <label>
          Tech tags (comma or new line separated)
          <textarea name="tech" rows={2} defaultValue={project.tech.join(", ")} />
        </label>

        <label>
          Repo URL
          <input name="repoUrl" defaultValue={project.repoUrl ?? ""} />
        </label>

        <label>
          Live URL
          <input name="liveUrl" defaultValue={project.liveUrl ?? ""} />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" name="featured" defaultChecked={project.featured} />
          Featured
        </label>

        <label>
          Sort order
          <input type="number" name="sortOrder" defaultValue={project.sortOrder} />
        </label>

        <button type="submit" style={{ cursor: "pointer" }}>
          Save Changes
        </button>
      </form>
    </section>
  );
}
