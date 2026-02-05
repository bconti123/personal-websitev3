export const runtime = "nodejs";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSocialLink } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components";

export default async function SocialLinksPage() {
  const links = await prisma.socialLink.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Social Links
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Manage socials</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-secondary" href="/admin">
            Back
          </Link>
          <Link className="btn btn-primary" href="/admin/social-links/new">
            + New
          </Link>
        </div>
      </div>

      {links.length === 0 ? <p>No social links yet.</p> : null}

      <ul className="grid gap-4">
        {links.map((s) => (
          <li key={s.id}>
            <Card className="bg-white/80">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <CardTitle>
                      {s.label} {s.visible ? null : <span className="text-slate-400">(hidden)</span>}
                    </CardTitle>
                    <p className="mt-1 text-sm text-slate-500">{s.url}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      iconKey: {s.iconKey ?? "—"} • sortOrder: {s.sortOrder}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a className="btn btn-secondary" href={s.url} target="_blank" rel="noreferrer">
                      Preview
                    </a>
                    <Link className="btn btn-secondary" href={`/admin/social-links/${s.id}/edit`}>
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteSocialLink(s.id);
                      }}
                    >
                      <button className="btn btn-secondary" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </CardHeader>
              <CardContent />
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
