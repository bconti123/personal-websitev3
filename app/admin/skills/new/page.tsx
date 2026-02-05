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
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Skills
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">New skill</h1>
        </div>
        <Link className="btn btn-secondary" href="/admin/skills">
          Back
        </Link>
      </div>

      <NewSkillForm defaultCategory={defaultCategory} />
    </section>
  );
}
