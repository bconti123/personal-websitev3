export const runtime = "nodejs";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { saveSiteContent } from "./actions";

export default async function AdminContentPage() {
  const site = await prisma.siteContent.findUnique({ where: { id: "site" } });

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Site Content</h1>
        <Link href="/admin">Back</Link>
      </div>

      <form action={saveSiteContent} style={{ display: "grid", gap: 12, maxWidth: 700 }}>
        <label>
          Hero headline
          <input name="heroHeadline" defaultValue={site?.heroHeadline ?? ""} required />
        </label>

        <label>
          Hero subline
          <input name="heroSubline" defaultValue={site?.heroSubline ?? ""} />
        </label>

        <label>
          Primary CTA text
          <input name="primaryCtaText" defaultValue={site?.primaryCtaText ?? ""} placeholder="View Projects" />
        </label>

        <label>
          Primary CTA URL
          <input name="primaryCtaUrl" defaultValue={site?.primaryCtaUrl ?? ""} placeholder="#projects" />
        </label>

        {/* <label>
          Resume URL
          <input name="resumeUrl" defaultValue={site?.resumeUrl ?? ""} placeholder="/resume.pdf" />
        </label> */}

        <button type="submit" style={{ cursor: "pointer" }}>
          Save
        </button>
      </form>
    </section>
  );
}
