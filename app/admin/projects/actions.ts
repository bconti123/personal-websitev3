"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionState = { ok: boolean; message?: string };

function toStringArray(input: FormDataEntryValue | null) {
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

function prismaMessage(e: unknown) {
  if (typeof e === "object" && e && "code" in e && (e as any).code === "P2002") {
    return "That project slug already exists. Please choose a different slug.";
  }
  return "Something went wrong. Please try again.";
}

export async function createProject(_: ActionState, formData: FormData): Promise<ActionState> {
  const slug = (formData.get("slug")?.toString() ?? "").trim();
  const title = (formData.get("title")?.toString() ?? "").trim();
  const summary = (formData.get("summary")?.toString() ?? "").trim();

  if (!slug || !title || !summary) {
    return { ok: false, message: "Slug, title, and summary are required." };
  }

  try {
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

    revalidatePath("/");
    revalidatePath("/admin/projects");
  } catch (e) {
    return { ok: false, message: prismaMessage(e) };
  }

  redirect("/admin/projects");
}

export async function updateProject(projectId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  const slug = (formData.get("slug")?.toString() ?? "").trim();
  const title = (formData.get("title")?.toString() ?? "").trim();
  const summary = (formData.get("summary")?.toString() ?? "").trim();

  if (!slug || !title || !summary) {
    return { ok: false, message: "Slug, title, and summary are required." };
  }

  try {
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

    revalidatePath("/");
    revalidatePath("/admin/projects");
  } catch (e) {
    return { ok: false, message: prismaMessage(e) };
  }

  redirect("/admin/projects");
}

export async function deleteProject(projectId: string) {
  await prisma.project.delete({ where: { id: projectId } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}