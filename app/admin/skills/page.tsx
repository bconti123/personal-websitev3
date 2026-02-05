import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSkill } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  // Group by category
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Skills
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Manage skills</h1>
        </div>
        <Link className="btn btn-primary" href="/admin/skills/new">
          + New Skill
        </Link>
      </div>

      {skills.length === 0 ? <p>No skills yet.</p> : null}

      <div className="grid gap-6">
        {categories.map((category) => (
          <Card key={category} className="bg-white/80">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <CardTitle>{category}</CardTitle>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span>{grouped[category].length} item(s)</span>
                  <Link
                    className="btn btn-secondary"
                    href={`/admin/skills/new?category=${encodeURIComponent(category)}`}
                  >
                    + New Skill
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3">
                {grouped[category].map((s) => (
                  <li key={s.id} className="rounded-xl border border-slate-200/80 bg-white p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                        <p className="mt-1 text-xs text-slate-500">Sort order: {s.sortOrder}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link className="btn btn-secondary" href={`/admin/skills/${s.id}/edit`}>
                          Edit
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await deleteSkill(s.id);
                          }}
                        >
                          <button className="btn btn-secondary" type="submit">
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
