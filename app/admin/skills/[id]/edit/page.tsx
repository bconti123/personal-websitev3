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
      <section>
        <h1>Skill not found</h1>
        <Link href="/admin/skills">Back</Link>
      </section>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Edit Skill</h1>
        <Link href="/admin/skills">Back</Link>
      </div>

      <form
        action={async (formData) => {
          "use server";
          await updateSkill(skill.id, formData);
        }}
        style={{ display: "grid", gap: 12, maxWidth: 600 }}
      >
        <label>
          Name
          <input name="name" defaultValue={skill.name} required />
        </label>

        <label>
          Category
          <select name="category" defaultValue={skill.category} required>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort order
          <input type="number" name="sortOrder" defaultValue={skill.sortOrder} />
        </label>

        <button type="submit" style={{ cursor: "pointer" }}>
          Save Changes
        </button>
      </form>
    </section>
  );
}
