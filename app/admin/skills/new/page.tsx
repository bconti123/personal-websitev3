import Link from "next/link";
import { createSkill } from "../actions";

const CATEGORIES = ["Languages", "Frontend", "Backend", "Databases", "Cloud/DevOps", "Tools"] as const;

export default function NewSkillPage() {
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
          <select name="category" defaultValue={CATEGORIES[0]} required>
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
