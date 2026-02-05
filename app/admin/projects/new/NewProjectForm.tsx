"use client";

import { useActionState, useState } from "react";
import { createProject } from "../actions";
import { S3ImageField } from "@/app/components";

const initialState = { ok: true as const, message: "" };

export default function NewProjectForm() {
  const [state, formAction, pending] = useActionState(createProject, initialState);
  const [slugValue, setSlugValue] = useState("");

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
            placeholder="incident-tracking-system"
            required
            value={slugValue}
            onChange={(event) => setSlugValue(event.target.value)}
          />
        </label>

        <label className="grid gap-2">
          <span className="label">Title</span>
          <input className="input" name="title" placeholder="Incident Tracking System" required />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="label">Summary</span>
        <textarea className="textarea" name="summary" rows={3} placeholder="1–2 sentence summary..." required />
      </label>

      <S3ImageField
        name="imageUrl"
        label="Project image"
        hint="Use the slug above before uploading. Re-uploading replaces the existing one."
        getObjectKey={() => `projects/${slugToKey(slugValue)}/cover`}
      />

      <label className="grid gap-2">
        <span className="label">Highlights (comma or new line separated)</span>
        <textarea
          className="textarea"
          name="highlights"
          rows={4}
          placeholder={"RBAC admin/support/user\nAudit log\nTicket workflows"}
        />
      </label>

      <label className="grid gap-2">
        <span className="label">Tech tags (comma or new line separated)</span>
        <textarea className="textarea" name="tech" rows={2} placeholder="Next.js, Prisma, Postgres, Tailwind" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="label">Repo URL</span>
          <input className="input" name="repoUrl" placeholder="https://github.com/..." />
        </label>

        <label className="grid gap-2">
          <span className="label">Live URL</span>
          <input className="input" name="liveUrl" placeholder="https://..." />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="featured" />
          Featured
        </label>

        <label className="grid gap-2">
          <span className="label">Sort order</span>
          <input className="input" type="number" name="sortOrder" defaultValue={0} />
        </label>
      </div>

      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
