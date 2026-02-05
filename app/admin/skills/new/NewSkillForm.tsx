"use client";

import { useActionState } from "react";
import { createSkill } from "../actions";

const CATEGORIES = ["Languages", "Frontend", "Backend", "Databases", "Cloud/DevOps", "Tools"] as const;

type Props = { defaultCategory: string };

const initialState = { ok: true as const, message: "" };

export default function NewSkillForm({ defaultCategory }: Props) {
  const [state, formAction, pending] = useActionState(createSkill, initialState);

  return (
    <form action={formAction} className="grid gap-6 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
      {!state.ok && state.message ? (
        <div className="error-box">{state.message}</div>
      ) : null}

      <label className="grid gap-2">
        <span className="label">Name</span>
        <input className="input" name="name" placeholder="TypeScript" required />
      </label>

      <label className="grid gap-2">
        <span className="label">Category</span>
        <select className="input" name="category" defaultValue={defaultCategory} required>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="label">Sort order</span>
        <input className="input" type="number" name="sortOrder" defaultValue={0} />
      </label>

      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Skill"}
      </button>
    </form>
  );
}
