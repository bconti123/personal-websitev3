import Link from "next/link";
import NewSkillForm from "./NewSkillForm";

const CATEGORIES = ["Languages", "Frontend", "Backend", "Databases", "Cloud/DevOps", "Tools"] as const;

export default async function NewSkillPage({
  searchParams,
}: {
  searchParams?: { category?: string } | Promise<{ category?: string }>;
}) {
  const sp = await Promise.resolve(searchParams);

  const defaultCategory =
    sp?.category && (CATEGORIES as readonly string[]).includes(sp.category) ? sp.category : CATEGORIES[0];

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>New Skill</h1>
        <Link href="/admin/skills">Back</Link>
      </div>

      <NewSkillForm defaultCategory={defaultCategory} />
    </section>
  );
}
