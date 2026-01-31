import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/projects">Projects</Link>
        <Link href="/">View site</Link>
        <Link href="/admin/social-links">Socials & Icons</Link>
      </header>
      {children}
    </main>
  );
}
