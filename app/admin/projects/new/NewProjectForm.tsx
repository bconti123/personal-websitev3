"use client";

import { useActionState } from "react";
import { createProject } from "../actions";

const initialState = { ok: true as const, message: "" };

export default function NewProjectForm() {
  const [state, formAction, pending] = useActionState(createProject, initialState);

  return (
    <form action={formAction} style={{ display: "grid", gap: 12, maxWidth: 700 }}>
      {!state.ok && state.message ? (
        <div style={{ border: "1px solid #f3c", borderRadius: 10, padding: 10 }}>
          {state.message}
        </div>
      ) : null}

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
        <textarea name="highlights" rows={4} placeholder={"RBAC admin/support/user\nAudit log\nTicket workflows"} />
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

      <button type="submit" disabled={pending} style={{ cursor: "pointer" }}>
        {pending ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
