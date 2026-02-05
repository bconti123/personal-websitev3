export const runtime = "nodejs";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { saveSiteContent } from "./actions";
import { S3ImageField } from "@/app/components";

export default async function AdminContentPage() {
  const site = await prisma.siteContent.findUnique({ where: { id: "site" } });

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Site Content
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Homepage details</h1>
        </div>
        <Link className="btn btn-secondary" href="/admin">
          Back
        </Link>
      </div>

      <form action={saveSiteContent} className="grid gap-6 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
        <S3ImageField
          name="headshotUrl"
          label="Headshot"
          currentUrl={site?.headshotUrl}
          objectKey="headshot/headshot"
          aspectClass="aspect-square"
          hint="This image will be used on the homepage hero."
        />

        <label className="grid gap-2">
          <span className="label">Hero headline</span>
          <input className="input" name="heroHeadline" defaultValue={site?.heroHeadline ?? ""} required />
        </label>

        <label className="grid gap-2">
          <span className="label">Hero subline</span>
          <input className="input" name="heroSubline" defaultValue={site?.heroSubline ?? ""} />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="label">Primary CTA text</span>
            <input
              className="input"
              name="primaryCtaText"
              defaultValue={site?.primaryCtaText ?? ""}
              placeholder="View Projects"
            />
          </label>

          <label className="grid gap-2">
            <span className="label">Primary CTA URL</span>
            <input
              className="input"
              name="primaryCtaUrl"
              defaultValue={site?.primaryCtaUrl ?? ""}
              placeholder="#projects"
            />
          </label>
        </div>

        {/* <label>
          Resume URL
          <input name="resumeUrl" defaultValue={site?.resumeUrl ?? ""} placeholder="/resume.pdf" />
        </label> */}

        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </section>
  );
}
