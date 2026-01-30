import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSkill } from "./actions";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  // group by category
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Skills</h1>
        <Link href="/admin/skills/new">+ New Skill</Link>
      </div>

      {skills.length === 0 ? <p>No skills yet.</p> : null}

      <div style={{ display: "grid", gap: 16 }}>
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
            <h2 style={{ marginTop: 0 }}>{category}</h2>

            <ul style={{ display: "grid", gap: 10, padding: 0, listStyle: "none" }}>
              {items.map((s) => (
                <li
                  key={s.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    borderTop: "1px solid #eee",
                    paddingTop: 10,
                  }}
                >
                  <div>
                    <strong>{s.name}</strong>
                    <div style={{ opacity: 0.8 }}>sortOrder: {s.sortOrder}</div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
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
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
