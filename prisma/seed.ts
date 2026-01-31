import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.siteContent.upsert({
    where: {
      id: "site",
    },
    update: {
      heroHeadline: "Bryant Conti — Software Engineer",
      heroSubline: "Full-stack & backend focused • Next.js • Prisma • PostgreSQL",
      primaryCtaText: "View Projects",
      primaryCtaUrl: "#projects",
    },
    create: {
      id: "site",
      heroHeadline: "Bryant Conti — Software Engineer",
      heroSubline: "Full-stack & backend focused • Next.js • Prisma • PostgreSQL",
      primaryCtaText: "View Projects",
      primaryCtaUrl: "#projects",
    },
  });

  console.log("✅ SiteContent seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
