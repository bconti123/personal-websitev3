import Link from "next/link";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>New Project</h1>
        <Link href="/admin/projects">Back</Link>
      </div>

      <form action={createProject} style={{ display: "grid", gap: 12, maxWidth: 700 }}>
        <label>
          Slug
          <input name="slug" placeholder="incident-tracking-system" required />
        </label>

        <label>
          Title
          <input name="title" placeholder="Incident Tracking System" required />
        </label>

        <label>
          Summary
          <textarea name="summary" rows={3} placeholder="1–2 sentence summary..." required />
        </label>

        <label>
          Highlights (comma or new line separated)
          <textarea name="highlights" rows={4} placeholder="RBAC admin/support/user&#10;Audit log&#10;Ticket workflows" />
        </label>

        <label>
          Tech tags (comma or new line separated)
          <textarea name="tech" rows={2} placeholder="Next.js, Prisma, Postgres, Tailwind" />
        </label>

        <label>
          Repo URL
          <input name="repoUrl" placeholder="https://github.com/..." />
        </label>

        <label>
          Live URL
          <input name="liveUrl" placeholder="https://..." />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" name="featured" />
          Featured
        </label>

        <label>
          Sort order
          <input type="number" name="sortOrder" defaultValue={0} />
        </label>

        <button type="submit" style={{ cursor: "pointer" }}>
          Create Project
        </button>
      </form>
    </section>
  );
}
