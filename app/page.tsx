import { prisma } from "@/lib/prisma";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Grid,
  Icon,
  ThemeToggle,
} from "./components";

export default async function Home() {
  const site = await prisma.siteContent.findUnique({ where: { id: "site" } });
  const socials = await prisma.socialLink.findMany({
    where: { visible: true },
    orderBy: { sortOrder: "asc" },
  });
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
  });

  const skillGroups = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const key = skill.category || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Container className="relative py-20">
        <section className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-4xl border border-white/70 bg-white/70 p-6 shadow-xl backdrop-blur">
              <div className="relative flex items-center gap-6">
                <div className="relative h-24 w-24 shrink-0 rounded-full p-1 ring-1 ring-slate-200/80 bg-white/60 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                  {site?.headshotUrl ? (
                    <Image
                      src={site.headshotUrl}
                      alt="Headshot"
                      fill
                      sizes="(min-width: 1024px) 8rem, (min-width: 640px) 7rem, 6rem"
                      className="absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-1 rounded-full bg-slate-200" />
                      <div className="absolute inset-2 rounded-full bg-white/80" />
                      <div className="absolute inset-4 rounded-full bg-slate-300" />
                    </>
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-semibold leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
                    {site?.heroHeadline ?? "[Full Name]"}
                  </h1>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                    Full Stack Developer
                  </h2>
                  <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
                    {site?.heroSubline ??
                      "Full-stack & backend focused • Next.js • Prisma • PostgreSQL"}
                  </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    <Icon name={s.iconKey} label={s.label} />
                    <span>{s.label}</span>
                  </a>
                ))}
                <ThemeToggle />
              </div>
                </div>                
              </div>
            </div>

            <Card variant="outline" className="bg-white/80">
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Highlights of my past work</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{projects.length}</p>
                  <p className="text-sm text-slate-600">Projects shipped</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-20 space-y-6" id="projects">
          <div className="flex items-center justify-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Development highlights
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">Projects</h2>
            </div>
          </div>

          {projects.length === 0 ? (
            <Card variant="outline" className="bg-white/70">
              <CardContent className="text-sm text-slate-600">
                No projects yet. Add one in the admin area to see it here.
              </CardContent>
            </Card>
          ) : (
            <Grid cols={2} gap="lg">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/85">
                  {project.imageUrl ? (
                    <div className="relative aspect-video overflow-hidden rounded-t-xl">
                      <Image
                        src={project.imageUrl}
                        alt={`${project.title} cover`}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.35),transparent_55%)]" />
                      <div className="relative flex h-full flex-col items-center justify-center gap-2">
                        <span className="font-mono text-3xl font-semibold text-white/90 sm:text-4xl">
                          {"</>"}
                        </span>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75">
                          Backend Service (no UI)
                        </p>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{project.title}</CardTitle>
                      {project.featured ? (
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <CardDescription>{project.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-slate-600">
                    <ul className="space-y-1">
                      {project.highlights.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                              
                    <span className="font-semibold">Tech stack:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {project.liveUrl ? (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer">
                          Live Demo
                        </a>
                      ) : null}
                      {project.repoUrl ? (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer">
                          Repo
                        </a>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          )}
        </section>

                <section className="mt-20 space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Capabilities
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">Skills & specialties</h2>
            </div>
            <p className="hidden max-w-sm text-sm text-slate-600 md:block">
              A selection of my key skills, organized by category.
            </p>
          </div>

          <Grid cols={3} gap="lg">
            {Object.entries(skillGroups).map(([category, items]) => (
              <Card key={category} className="bg-white/80">
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  {/* <CardDescription>
                    {items.length} skill{items.length === 1 ? "" : "s"}
                  </CardDescription> */}
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {skill.name}
                    </span>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Grid>
        </section>
      </Container>
    </div>
  );
}
