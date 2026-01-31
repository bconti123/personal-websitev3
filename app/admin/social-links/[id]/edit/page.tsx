export const runtime = "nodejs";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateSocialLink } from "../../actions";

export default async function EditSocialLinkPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await Promise.resolve(params);

  const link = await prisma.socialLink.findUnique({ where: { id } });

  if (!link) {
    return (
      <section>
        <h1>Social link not found</h1>
        <Link href="/admin/social-links">Back</Link>
      </section>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Edit Social Link</h1>
        <Link href="/admin/social-links">Back</Link>
      </div>

      <form
        action={async (formData) => {
          "use server";
          await updateSocialLink(link.id, formData);
        }}
        style={{ display: "grid", gap: 12, maxWidth: 650 }}
      >
        <label>
          Label
          <input name="label" defaultValue={link.label} required />
        </label>

        <label>
          URL
          <input name="url" defaultValue={link.url} required />
        </label>

        <label>
          Icon key (optional)
          <input name="iconKey" defaultValue={link.iconKey ?? ""} />
        </label>

        <label>
          Sort order
          <input type="number" name="sortOrder" defaultValue={link.sortOrder} />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" name="visible" defaultChecked={link.visible} />
          Visible
        </label>

        <button type="submit" style={{ cursor: "pointer" }}>
          Save
        </button>
      </form>
    </section>
  );
}
