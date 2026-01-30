import Link from "next/link";
import { createSkill } from "../actions";

const CATEGORIES = ["Languages", "Frontend", "Backend", "Databases", "Cloud/DevOps", "Tools"] as const;

export default async function NewSkillPage({
  searchParams,
}: {
  searchParams?: { category?: string } | Promise<{ category?: string }>;
}) {
  const searchParamsResolved = await Promise.resolve(searchParams);
  const defaultCategory =
    searchParamsResolved?.category && (CATEGORIES as readonly string[]).includes(searchParamsResolved.category)
      ? searchParamsResolved.category
      : CATEGORIES[0];

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>New Skill</h1>
        <Link href="/admin/skills">Back</Link>
      </div>

      <form action={createSkill} style={{ display: "grid", gap: 12, maxWidth: 600 }}>
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

        <button type="submit" style={{ cursor: "pointer" }}>
          Create Skill
        </button>
      </form>
    </section>
  );
}
