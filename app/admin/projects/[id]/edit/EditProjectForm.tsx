"use client";

import { useActionState } from "react";
import { updateProject } from "../../actions";

type ProjectData = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  tech: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  sortOrder: number;
};

const initialState = { ok: true as const, message: "" };

export default function EditProjectForm({ project }: { project: ProjectData }) {
  const boundAction = updateProject.bind(null, project.id);
  const [state, formAction, pending] = useActionState(boundAction as any, initialState);

  return (
    <form action={formAction} style={{ display: "grid", gap: 12, maxWidth: 700 }}>
      {!state.ok && state.message ? (
        <div style={{ border: "1px solid #f3c", borderRadius: 10, padding: 10 }}>
          {state.message}
        </div>
      ) : null}

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
        <textarea name="highlights" rows={4} defaultValue={project.highlights.join("\n")} />
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

      <button type="submit" disabled={pending} style={{ cursor: "pointer" }}>
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
