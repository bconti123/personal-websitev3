import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSkill } from "./actions";

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
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Skills</h1>
        <Link href="/admin/skills/new">+ New Skill</Link>
      </div>

      {skills.length === 0 ? <p>No skills yet.</p> : null}

      <div style={{ display: "grid", gap: 18, marginTop: 16 }}>
        {categories.map((category) => (
            <div key={category} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
                <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                }}
                >
                <h2 style={{ margin: 0 }}>{category}</h2>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <small style={{ opacity: 0.7 }}>
                    {grouped[category].length} item(s)
                    </small>

                    <Link
                    href={`/admin/skills/new?category=${encodeURIComponent(category)}`}
                    style={{ fontSize: 14 }}
                    >
                    + New Skill
                    </Link>
                </div>
            </div>

            <ul style={{ display: "grid", gap: 10, padding: 0, listStyle: "none", marginTop: 12 }}>
              {grouped[category].map((s) => (
                <li key={s.id} style={{ border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div>
                      <strong>{s.name}</strong>
                      <div style={{ opacity: 0.7, marginTop: 6 }}>
                        <small>sortOrder: {s.sortOrder}</small>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Link href={`/admin/skills/${s.id}/edit`}>Edit</Link>

                      <form
                        action={async () => {
                          "use server";
                          await deleteSkill(s.id);
                        }}
                      >
                        <button type="submit" style={{ cursor: "pointer" }}>
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
