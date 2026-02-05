export const runtime = "nodejs";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateSocialLink } from "../../actions";

export default async function EditSocialLinkPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await Promise.resolve(params);

  const link = await prisma.socialLink.findUnique({ where: { id } });

  if (!link) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Social link not found</h1>
        <Link className="btn btn-secondary" href="/admin/social-links">
          Back
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Social Links
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Edit social link</h1>
        </div>
        <Link className="btn btn-secondary" href="/admin/social-links">
          Back
        </Link>
      </div>

      <form
        action={async (formData) => {
          "use server";
          await updateSocialLink(link.id, formData);
        }}
        className="grid gap-6 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm"
      >
        <label className="grid gap-2">
          <span className="label">Label</span>
          <input className="input" name="label" defaultValue={link.label} required />
        </label>

        <label className="grid gap-2">
          <span className="label">URL</span>
          <input className="input" name="url" defaultValue={link.url} required />
        </label>

        <label className="grid gap-2">
          <span className="label">Icon key (optional)</span>
          <input className="input" name="iconKey" defaultValue={link.iconKey ?? ""} />
        </label>

        <label className="grid gap-2">
          <span className="label">Sort order</span>
          <input className="input" type="number" name="sortOrder" defaultValue={link.sortOrder} />
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="visible" defaultChecked={link.visible} />
          Visible
        </label>

        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </section>
  );
}
