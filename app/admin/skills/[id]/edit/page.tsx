export const runtime = "nodejs";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateSkill } from "../../actions";

const categories = ["Languages", "Frontend", "Backend", "Databases", "Cloud/DevOps", "Tools"];

export default async function EditSkillPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await Promise.resolve(params);

  const skill = await prisma.skill.findUnique({ where: { id } });

  if (!skill) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Skill not found</h1>
        <Link className="btn btn-secondary" href="/admin/skills">
          Back
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Skills
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Edit skill</h1>
        </div>
        <Link className="btn btn-secondary" href="/admin/skills">
          Back
        </Link>
      </div>

      <form
        action={async (formData) => {
          "use server";
          await updateSkill(skill.id, formData);
        }}
        className="grid gap-6 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm"
      >
        <label className="grid gap-2">
          <span className="label">Name</span>
          <input className="input" name="name" defaultValue={skill.name} required />
        </label>

        <label className="grid gap-2">
          <span className="label">Category</span>
          <select className="input" name="category" defaultValue={skill.category} required>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="label">Sort order</span>
          <input className="input" type="number" name="sortOrder" defaultValue={skill.sortOrder} />
        </label>

        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </section>
  );
}
