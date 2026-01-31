"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function toInt(input: FormDataEntryValue | null, fallback = 0) {
  const n = Number(input);
  return Number.isFinite(n) ? n : fallback;
}

function toBool(input: FormDataEntryValue | null) {
  return input === "on" || input === "true";
}

export async function createSocialLink(formData: FormData) {
  const label = (formData.get("label")?.toString() ?? "").trim();
  const url = (formData.get("url")?.toString() ?? "").trim();
  const iconKey = (formData.get("iconKey")?.toString() ?? "").trim() || null;

  if (!label || !url) throw new Error("label and url are required.");

  await prisma.socialLink.create({
    data: {
      label,
      url,
      iconKey,
      sortOrder: toInt(formData.get("sortOrder"), 0),
      visible: toBool(formData.get("visible")),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/social-links");
  redirect("/admin/social-links");
}

export async function updateSocialLink(id: string, formData: FormData) {
  const label = (formData.get("label")?.toString() ?? "").trim();
  const url = (formData.get("url")?.toString() ?? "").trim();
  const iconKey = (formData.get("iconKey")?.toString() ?? "").trim() || null;

  if (!label || !url) throw new Error("label and url are required.");

  await prisma.socialLink.update({
    where: { id },
    data: {
      label,
      url,
      iconKey,
      sortOrder: toInt(formData.get("sortOrder"), 0),
      visible: toBool(formData.get("visible")),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/social-links");
  redirect("/admin/social-links");
}

export async function deleteSocialLink(id: string) {
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/social-links");
}
