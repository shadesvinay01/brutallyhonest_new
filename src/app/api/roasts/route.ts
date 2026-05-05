import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const roasts = await prisma.roast.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20, // Only show the latest 20 roasts
    });

    return NextResponse.json(roasts);
  } catch (error) {
    console.error("Failed to fetch roasts:", error);
    return NextResponse.json({ error: "Failed to fetch truth stream." }, { status: 500 });
  }
}
