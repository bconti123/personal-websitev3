export const runtime = "nodejs";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSocialLink } from "./actions";

export default async function SocialLinksPage() {
  const links = await prisma.socialLink.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Social Links</h1>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/admin">Back</Link>
          <Link href="/admin/social-links/new">+ New</Link>
        </div>
      </div>

      {links.length === 0 ? <p>No social links yet.</p> : null}

      <ul style={{ display: "grid", gap: 10, padding: 0, listStyle: "none", marginTop: 12 }}>
        {links.map((s) => (
          <li key={s.id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <strong>{s.label}</strong>{" "}
                <span style={{ opacity: 0.7 }}>{s.visible ? "" : "(hidden)"}</span>
                <div style={{ opacity: 0.85, marginTop: 6 }}>
                  <small>{s.url}</small>
                </div>
                <div style={{ opacity: 0.7, marginTop: 6 }}>
                  <small>
                    iconKey: {s.iconKey ?? "—"} • sortOrder: {s.sortOrder}
                  </small>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  Preview
                </a>

                <Link href={`/admin/social-links/${s.id}/edit`}>Edit</Link>

                <form
                  action={async () => {
                    "use server";
                    await deleteSocialLink(s.id);
                  }}
                >
                  <button type="submit" style={{ cursor: "pointer" }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
