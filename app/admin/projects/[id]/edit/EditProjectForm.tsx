"use client";

import { useActionState, useState } from "react";
import { updateProject } from "../../actions";
import { S3ImageField } from "@/app/components";

type ProjectData = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  tech: string[];
  imageUrl: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  sortOrder: number;
};

const initialState = { ok: true as const, message: "" };

export default function EditProjectForm({ project }: { project: ProjectData }) {
  const boundAction = updateProject.bind(null, project.id);
  const [state, formAction, pending] = useActionState(boundAction as any, initialState);
  const [slugValue, setSlugValue] = useState(project.slug);

  function slugToKey(input: string) {
    const sanitized = input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return sanitized || "untitled";
  }

  return (
    <form action={formAction} className="grid gap-6 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
      {!state.ok && state.message ? (
        <div className="error-box">{state.message}</div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="label">Slug</span>
          <input
            className="input"
            name="slug"
            value={slugValue}
            required
            onChange={(event) => setSlugValue(event.target.value)}
          />
        </label>

        <label className="grid gap-2">
          <span className="label">Title</span>
          <input className="input" name="title" defaultValue={project.title} required />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="label">Summary</span>
        <textarea className="textarea" name="summary" rows={3} defaultValue={project.summary} required />
      </label>

      <S3ImageField
        name="imageUrl"
        label="Project image"
        currentUrl={project.imageUrl}
        hint="Re-uploading replaces the existing one using the current slug."
        getObjectKey={() => `projects/${slugToKey(slugValue)}/cover`}
      />

      <label className="grid gap-2">
        <span className="label">Highlights (comma or new line separated)</span>
        <textarea className="textarea" name="highlights" rows={4} defaultValue={project.highlights.join("\n")} />
      </label>

      <label className="grid gap-2">
        <span className="label">Tech tags (comma or new line separated)</span>
        <textarea className="textarea" name="tech" rows={2} defaultValue={project.tech.join(", ")} />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="label">Repo URL</span>
          <input className="input" name="repoUrl" defaultValue={project.repoUrl ?? ""} />
        </label>

        <label className="grid gap-2">
          <span className="label">Live URL</span>
          <input className="input" name="liveUrl" defaultValue={project.liveUrl ?? ""} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="featured" defaultChecked={project.featured} />
          Featured
        </label>

        <label className="grid gap-2">
          <span className="label">Sort order</span>
          <input className="input" type="number" name="sortOrder" defaultValue={project.sortOrder} />
        </label>
      </div>

      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
