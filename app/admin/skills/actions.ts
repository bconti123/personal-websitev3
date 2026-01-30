"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function toInt(input: FormDataEntryValue | null, fallback = 0) {
  const n = Number(input);
  return Number.isFinite(n) ? n : fallback;
}

export async function createSkill(formData: FormData) {
  const name = (formData.get("name")?.toString() ?? "").trim();
  const category = (formData.get("category")?.toString() ?? "").trim();
  const sortOrder = toInt(formData.get("sortOrder"), 0);

  if (!name || !category) throw new Error("name and category are required.");

  await prisma.skill.create({
    data: { name, category, sortOrder },
  });

  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(skillId: string, formData: FormData) {
  const name = (formData.get("name")?.toString() ?? "").trim();
  const category = (formData.get("category")?.toString() ?? "").trim();
  const sortOrder = toInt(formData.get("sortOrder"), 0);

  if (!name || !category) throw new Error("name and category are required.");

  await prisma.skill.update({
    where: { id: skillId },
    data: { name, category, sortOrder },
  });

  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(skillId: string) {
  await prisma.skill.delete({ where: { id: skillId } });
  revalidatePath("/admin/skills");
}
