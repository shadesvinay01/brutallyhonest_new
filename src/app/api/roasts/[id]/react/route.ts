import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { awardXPForReaction, updateCredibilityScore } from "@/lib/gamification";

// POST /api/roasts/[id]/react
// Body: { userId: string, type: "SAVAGE" | "ACCURATE" | "HELPFUL" }
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: roastId } = await params; // Next.js 15+: params is a Promise
    const body = await req.json();
    const { userId, type } = body;

    if (!userId || !type) {
      return NextResponse.json({ error: "userId and type are required" }, { status: 400 });
    }

    const validTypes = ["SAVAGE", "ACCURATE", "HELPFUL"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid reaction type" }, { status: 400 });
    }

    // Check roast exists
    const roast = await prisma.roast.findUnique({ where: { id: roastId } });
    if (!roast) {
      return NextResponse.json({ error: "Roast not found" }, { status: 404 });
    }

    // Upsert reaction (user can change their vote)
    const reaction = await prisma.reaction.upsert({
      where: { roastId_userId: { roastId, userId } },
      update: { type },
      create: { roastId, userId, type },
    });

    // Award XP to roast owner if they exist and it's not a self-reaction
    if (roast.userId && roast.userId !== userId) {
      await awardXPForReaction(roast.userId, type);
      await updateCredibilityScore(roast.userId);

      // Send notification to roast owner
      await prisma.notification.create({
        data: {
          userId: roast.userId,
          type: "NEW_REACTION",
          message: `Someone marked your roast as "${type}" 🔥`,
          metadata: { roastId, reactionType: type },
        },
      });
    }

    // Get updated counts
    const counts = await prisma.reaction.groupBy({
      by: ["type"],
      where: { roastId },
      _count: { type: true },
    });

    const reactionCounts = { SAVAGE: 0, ACCURATE: 0, HELPFUL: 0 };
    counts.forEach((c) => {
      reactionCounts[c.type] = c._count.type;
    });

    return NextResponse.json({ reaction, counts: reactionCounts });
  } catch (error) {
    console.error("[React API] Error:", error);
    return NextResponse.json({ error: "Failed to react" }, { status: 500 });
  }
}

// GET /api/roasts/[id]/react — get reaction counts
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: roastId } = await params; // Next.js 15+: params is a Promise

    const counts = await prisma.reaction.groupBy({
      by: ["type"],
      where: { roastId },
      _count: { type: true },
    });

    const reactionCounts = { SAVAGE: 0, ACCURATE: 0, HELPFUL: 0 };
    counts.forEach((c) => {
      reactionCounts[c.type] = c._count.type;
    });

    return NextResponse.json(reactionCounts);
  } catch (error) {
    console.error("[React GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch reactions" }, { status: 500 });
  }
}
