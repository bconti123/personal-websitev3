import Link from "next/link";
import { Container } from "@/app/components";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <div className="border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <Container className="py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Admin
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">Content Studio</h1>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm">
              <Link className="btn btn-secondary" href="/admin">
                Dashboard
              </Link>
              <Link className="btn btn-secondary" href="/admin/projects">
                Projects
              </Link>
              <Link className="btn btn-secondary" href="/admin/skills">
                Skills
              </Link>
              <Link className="btn btn-secondary" href="/admin/content">
                Site Content
              </Link>
              <Link className="btn btn-secondary" href="/admin/social-links">
                Social Links
              </Link>
              <Link className="btn btn-primary" href="/">
                View Site
              </Link>
            </nav>
          </div>
        </Container>
      </div>

      <Container className="py-10">{children}</Container>
    </main>
  );
}
