import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.siteContent.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      heroHeadline: "Bryant Conti — Software Engineer",
      heroSubline: "Full-stack / Backend • Next.js • Prisma • Postgres",
      primaryCtaText: "View Projects",
      primaryCtaUrl: "#projects",
    //   resumeUrl: "/resume.pdf",
    },
  });

  await prisma.socialLink.createMany({
    data: [
      { label: "GitHub", url: "https://github.com/YOURNAME", iconKey: "github", sortOrder: 1 },
      { label: "LinkedIn", url: "https://linkedin.com/in/YOURNAME", iconKey: "linkedin", sortOrder: 2 },
    ],
    skipDuplicates: true,
  });

  await prisma.skill.createMany({
    data: [
      { name: "TypeScript", category: "Languages", sortOrder: 1 },
      { name: "Next.js", category: "Frontend", sortOrder: 2 },
      { name: "Prisma", category: "Backend", sortOrder: 3 },
      { name: "PostgreSQL", category: "Databases", sortOrder: 4 },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
