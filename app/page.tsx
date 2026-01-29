import { prisma } from "@/lib/prisma";

export default async function Home() {
  const site = await prisma.siteContent.findUnique({ where: { id: "site" } });
  const socials = await prisma.socialLink.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } });
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  const projects = await prisma.project.findMany({ orderBy: [{ featured: "desc" }, { sortOrder: "asc" }] });

  return (
    <main style={{ padding: 24 }}>
      <h1>{site?.heroHeadline ?? "Personal Website"}</h1>
      <p>{site?.heroSubline}</p>

      <h2>Social</h2>
      <ul>
        {socials.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
          </li>
        ))}
      </ul>

      <h2>Skills</h2>
      <ul>
        {skills.map((sk) => (
          <li key={sk.id}>{sk.category}: {sk.name}</li>
        ))}
      </ul>

      <h2 id="projects">Projects</h2>
      {projects.length === 0 ? <p>No projects yet.</p> : null}
    </main>
  );
}