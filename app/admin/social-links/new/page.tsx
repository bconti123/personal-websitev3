import Link from "next/link";
import { createSocialLink } from "../actions";

export default function NewSocialLinkPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Social Links
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">New social link</h1>
        </div>
        <Link className="btn btn-secondary" href="/admin/social-links">
          Back
        </Link>
      </div>

      <form action={createSocialLink} className="grid gap-6 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
        <label className="grid gap-2">
          <span className="label">Label</span>
          <input className="input" name="label" placeholder="GitHub" required />
        </label>

        <label className="grid gap-2">
          <span className="label">URL</span>
          <input className="input" name="url" placeholder="https://github.com/yourname" required />
        </label>

        <label className="grid gap-2">
          <span className="label">Icon key (optional)</span>
          <input className="input" name="iconKey" placeholder="github" />
        </label>

        <label className="grid gap-2">
          <span className="label">Sort order</span>
          <input className="input" type="number" name="sortOrder" defaultValue={0} />
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="visible" defaultChecked />
          Visible
        </label>

        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    </section>
  );
}
