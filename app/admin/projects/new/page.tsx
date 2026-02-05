import Link from "next/link";
import NewProjectForm from "./NewProjectForm";

export default function NewProjectPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Projects
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">New project</h1>
        </div>
        <Link className="btn btn-secondary" href="/admin/projects">
          Back
        </Link>
      </div>

      <NewProjectForm />
    </section>
  );
}
