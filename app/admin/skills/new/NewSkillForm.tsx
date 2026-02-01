"use client";

import { useActionState } from "react";
import { createSkill } from "../actions";

const CATEGORIES = ["Languages", "Frontend", "Backend", "Databases", "Cloud/DevOps", "Tools"] as const;

type Props = { defaultCategory: string };

const initialState = { ok: true as const, message: "" };

export default function NewSkillForm({ defaultCategory }: Props) {
  const [state, formAction, pending] = useActionState(createSkill, initialState);

  return (
    <form action={formAction} style={{ display: "grid", gap: 12, maxWidth: 600 }}>
      {!state.ok && state.message ? (
        <div style={{ border: "1px solid #f3c", borderRadius: 10, padding: 10 }}>
          {state.message}
        </div>
      ) : null}

      <label>
        Name
        <input name="name" placeholder="TypeScript" required />
      </label>

      <label>
        Category
        <select name="category" defaultValue={defaultCategory} required>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sort order
        <input type="number" name="sortOrder" defaultValue={0} />
      </label>

      <button type="submit" disabled={pending} style={{ cursor: "pointer" }}>
        {pending ? "Creating..." : "Create Skill"}
      </button>
    </form>
  );
}
