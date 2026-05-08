import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/leaderboard?mode=impact|savagery|streak
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode") || "impact";
    const limit = Math.min(Number(searchParams.get("limit") || 10), 50);

    const users = await prisma.user.findMany({
      take: limit,
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        xp: true,
        level: true,
        streakCount: true,
        credibilityScore: true,
        _count: { select: { roasts: true, reactions: true } },
        reactions: {
          select: { type: true },
        },
      },
    });

    const ranked = users
      .map((u) => {
        const savageCount = u.reactions.filter((r) => r.type === "SAVAGE").length;
        const accurateCount = u.reactions.filter((r) => r.type === "ACCURATE").length;
        const helpfulCount = u.reactions.filter((r) => r.type === "HELPFUL").length;

        const impactScore =
          u.xp + accurateCount * 10 + helpfulCount * 8 + savageCount * 5;

        return {
          id: u.id,
          username: u.username || u.email.split("@")[0],
          avatarUrl: u.avatarUrl,
          xp: u.xp,
          level: u.level,
          streakCount: u.streakCount,
          credibilityScore: u.credibilityScore,
          roastCount: u._count.roasts,
          impactScore,
          savageCount,
          accurateCount,
          helpfulCount,
        };
      })
      .sort((a, b) => {
        if (mode === "savagery") return b.savageCount - a.savageCount;
        if (mode === "streak") return b.streakCount - a.streakCount;
        return b.impactScore - a.impactScore; // default: impact
      });

    return NextResponse.json({ mode, leaderboard: ranked });
  } catch (error) {
    console.error("[Leaderboard] Error:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
