import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Grid } from "@/app/components";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const [projectCount, skillCount, socialCount] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.socialLink.count(),
  ]);

  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Welcome back
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Admin Dashboard</h2>
        <p className="mt-2 text-sm text-slate-600">Signed in as {session?.user?.email}</p>
      </div>

      <Grid cols={3} gap="lg">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>{projectCount} total projects</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Link className="btn btn-primary" href="/admin/projects">
              Manage projects
            </Link>
            <Link className="btn btn-secondary" href="/admin/projects/new">
              New
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>{skillCount} total skills</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Link className="btn btn-primary" href="/admin/skills">
              Manage skills
            </Link>
            <Link className="btn btn-secondary" href="/admin/skills/new">
              New
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>{socialCount} links</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Link className="btn btn-primary" href="/admin/social-links">
              Manage links
            </Link>
            <Link className="btn btn-secondary" href="/admin/social-links/new">
              New
            </Link>
          </CardContent>
        </Card>
      </Grid>

      <Card variant="outline">
        <CardHeader>
          <CardTitle>Site content</CardTitle>
          <CardDescription>Update hero copy and primary CTA.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link className="btn btn-primary" href="/admin/content">
            Edit site content
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
