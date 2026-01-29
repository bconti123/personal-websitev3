"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function toStringArray(input: FormDataEntryValue | null) {
  // Accept comma-separated OR newline-separated
  const raw = (input?.toString() ?? "").trim();
  if (!raw) return [];
  return raw
    .split(/[\n,]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function toBool(input: FormDataEntryValue | null) {
  return input === "on" || input === "true";
}

function toInt(input: FormDataEntryValue | null, fallback = 0) {
  const n = Number(input);
  return Number.isFinite(n) ? n : fallback;
}

export async function createProject(formData: FormData) {
  const slug = (formData.get("slug")?.toString() ?? "").trim();
  const title = (formData.get("title")?.toString() ?? "").trim();
  const summary = (formData.get("summary")?.toString() ?? "").trim();

  if (!slug || !title || !summary) {
    throw new Error("slug, title, and summary are required.");
  }

  await prisma.project.create({
    data: {
      slug,
      title,
      summary,
      highlights: toStringArray(formData.get("highlights")),
      tech: toStringArray(formData.get("tech")),
      repoUrl: (formData.get("repoUrl")?.toString() ?? "").trim() || null,
      liveUrl: (formData.get("liveUrl")?.toString() ?? "").trim() || null,
      featured: toBool(formData.get("featured")),
      sortOrder: toInt(formData.get("sortOrder"), 0),
    },
  });

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(projectId: string, formData: FormData) {
  const slug = (formData.get("slug")?.toString() ?? "").trim();
  const title = (formData.get("title")?.toString() ?? "").trim();
  const summary = (formData.get("summary")?.toString() ?? "").trim();

  if (!slug || !title || !summary) {
    throw new Error("slug, title, and summary are required.");
  }

  await prisma.project.update({
    where: { id: projectId },
    data: {
      slug,
      title,
      summary,
      highlights: toStringArray(formData.get("highlights")),
      tech: toStringArray(formData.get("tech")),
      repoUrl: (formData.get("repoUrl")?.toString() ?? "").trim() || null,
      liveUrl: (formData.get("liveUrl")?.toString() ?? "").trim() || null,
      featured: toBool(formData.get("featured")),
      sortOrder: toInt(formData.get("sortOrder"), 0),
    },
  });

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(projectId: string) {
  await prisma.project.delete({ where: { id: projectId } });
  revalidatePath("/admin/projects");
}
