import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <main style={{ padding: 32 }}>
      <h1>Admin Dashboard</h1>
      <p>Signed in as {session?.user?.email}</p>

      <ul>
        <li><Link href="/admin/projects">Manage Projects</Link></li>
        <li><Link href="/admin/skills">Manage Skills</Link></li>
        <li><Link href="/admin/content">Site Content</Link></li>
      </ul>
    </main>
  );
}