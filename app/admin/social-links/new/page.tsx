import Link from "next/link";
import { createSocialLink } from "../actions";

export default function NewSocialLinkPage() {
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>New Social Link</h1>
        <Link href="/admin/social-links">Back</Link>
      </div>

      <form action={createSocialLink} style={{ display: "grid", gap: 12, maxWidth: 650 }}>
        <label>
          Label
          <input name="label" placeholder="GitHub" required />
        </label>

        <label>
          URL
          <input name="url" placeholder="https://github.com/yourname" required />
        </label>

        <label>
          Icon key (optional)
          <input name="iconKey" placeholder="github" />
        </label>

        <label>
          Sort order
          <input type="number" name="sortOrder" defaultValue={0} />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" name="visible" defaultChecked />
          Visible
        </label>

        <button type="submit" style={{ cursor: "pointer" }}>
          Create
        </button>
      </form>
    </section>
  );
}
