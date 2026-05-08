import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [totalUsers, totalRoasts, totalReactions, topRoastsByViews, recentRoasts, xpStats] =
    await Promise.all([
      prisma.user.count(),
      prisma.roast.count(),
      prisma.reaction.count(),
      prisma.roast.findMany({
        orderBy: { viewCount: "desc" },
        take: 5,
        select: { id: true, idea: true, truthScore: true, viewCount: true, createdAt: true },
      }),
      prisma.roast.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, idea: true, category: true, mode: true, truthScore: true, createdAt: true },
      }),
      prisma.user.aggregate({
        _sum: { xp: true },
        _avg: { xp: true, credibilityScore: true },
        _max: { xp: true },
      }),
    ]);

  const modeBreakdown = await prisma.roast.groupBy({
    by: ["mode"],
    _count: { mode: true },
  });

  const categoryBreakdown = await prisma.roast.groupBy({
    by: ["category"],
    _count: { category: true },
    orderBy: { _count: { category: "desc" } },
    take: 5,
  });

  return NextResponse.json({
    overview: {
      totalUsers,
      totalRoasts,
      totalReactions,
      totalXP: xpStats._sum.xp || 0,
      avgXP: Math.round(xpStats._avg.xp || 0),
      avgCredibility: Math.round(xpStats._avg.credibilityScore || 0),
      maxXP: xpStats._max.xp || 0,
    },
    modeBreakdown: modeBreakdown.reduce((acc, m) => {
      acc[m.mode] = m._count.mode;
      return acc;
    }, {} as Record<string, number>),
    categoryBreakdown,
    topRoastsByViews,
    recentRoasts,
  });
}
