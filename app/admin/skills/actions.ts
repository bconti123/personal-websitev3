"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionState = { ok: boolean; message?: string };

function toInt(input: FormDataEntryValue | null, fallback = 0) {
  const n = Number(input);
  return Number.isFinite(n) ? n : fallback;
}

function prismaMessage(e: unknown) {
  // Prisma unique constraint errors usually have code P2002
  if (typeof e === "object" && e && "code" in e && (e as any).code === "P2002") {
    return "That skill already exists in this category.";
  }
  return "Something went wrong. Please try again.";
}

export async function createSkill(_: ActionState, formData: FormData): Promise<ActionState> {
  const name = (formData.get("name")?.toString() ?? "").trim();
  const category = (formData.get("category")?.toString() ?? "").trim();

  if (!name || !category) return { ok: false, message: "Name and category are required." };

  try {
    await prisma.skill.create({
      data: {
        name,
        category,
        sortOrder: toInt(formData.get("sortOrder"), 0),
      },
    });

    revalidatePath("/admin/skills");
  } catch (e) {
    return { ok: false, message: prismaMessage(e) };
  }

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
