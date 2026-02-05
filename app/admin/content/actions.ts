"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveSiteContent(formData: FormData) {
  const heroHeadline = (formData.get("heroHeadline")?.toString() ?? "").trim();
  const heroSubline = (formData.get("heroSubline")?.toString() ?? "").trim() || null;
  const primaryCtaText = (formData.get("primaryCtaText")?.toString() ?? "").trim() || null;
  const primaryCtaUrl = (formData.get("primaryCtaUrl")?.toString() ?? "").trim() || null;
  const headshotUrl = (formData.get("headshotUrl")?.toString() ?? "").trim() || null;
//   const resumeUrl = (formData.get("resumeUrl")?.toString() ?? "").trim() || null;

  if (!heroHeadline) throw new Error("heroHeadline is required.");

  // singleton row
  await prisma.siteContent.upsert({
    where: { id: "site" },
    update: { heroHeadline, heroSubline, primaryCtaText, primaryCtaUrl, headshotUrl },
    create: { id: "site", heroHeadline, heroSubline, primaryCtaText, primaryCtaUrl, headshotUrl },
  });

  revalidatePath("/");
  revalidatePath("/admin/content");
  redirect("/admin/content");
}
