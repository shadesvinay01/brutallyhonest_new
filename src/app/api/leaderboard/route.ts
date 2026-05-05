import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leaderboard = await prisma.roast.findMany({
      orderBy: {
        truthScore: "asc", // Show the lowest scores (most roasted) first
      },
      take: 10,
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return NextResponse.json({ error: "Failed to fetch the elite casualties." }, { status: 500 });
  }
}
