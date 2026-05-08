import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/notifications?userId=xxx
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const unreadCount = await prisma.notification.count({ where: { userId, readStatus: false } });

  return NextResponse.json({ notifications, unreadCount });
}

// PATCH /api/notifications — mark all as read
export async function PATCH(req: Request) {
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  await prisma.notification.updateMany({
    where: { userId, readStatus: false },
    data: { readStatus: true },
  });

  return NextResponse.json({ success: true });
}
