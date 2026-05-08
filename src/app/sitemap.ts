import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://brutallyhonest.app";

export default async function sitemap() {
  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${BASE_URL}/leaderboard`, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const roasts = await prisma.roast.findMany({
    where: { isPublic: true },
    select: { id: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 1000,
  });

  const roastRoutes = roasts.map((r) => ({
    url: `${BASE_URL}/roast/${r.id}`,
    lastModified: r.createdAt,
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...roastRoutes];
}
