import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateLoginStreak } from "@/lib/gamification";

// This route is called by Supabase Auth webhook on user signup
// Set it in Supabase Dashboard → Auth → Webhooks → on_signup → https://yourdomain.com/api/auth/sync
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Supabase sends: { type: "INSERT", table: "users", record: { id, email, ... } }
    const { type, record } = body;

    if (!record?.email || !record?.id) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (type === "INSERT") {
      // New user signed up — create record in our DB
      const existing = await prisma.user.findUnique({ where: { email: record.email } });

      if (!existing) {
        await prisma.user.create({
          data: {
            id: record.id, // Use Supabase UUID as our PK for easy cross-reference
            email: record.email,
            username: record.user_metadata?.username || null,
            avatarUrl: record.user_metadata?.avatar_url || null,
            credits: 5, // Free tier starter credits
            xp: 0,
            level: 1,
            streakCount: 0,
          },
        });
      }

      return NextResponse.json({ success: true, action: "user_created" });
    }

    if (type === "UPDATE") {
      // User logged in — update streak
      await prisma.user.upsert({
        where: { email: record.email },
        update: { lastLogin: new Date() },
        create: {
          id: record.id,
          email: record.email,
          credits: 5,
          xp: 0,
          level: 1,
          streakCount: 1,
          lastLogin: new Date(),
        },
      });

      // Award streak XP
      const user = await prisma.user.findUnique({ where: { email: record.email } });
      if (user) await updateLoginStreak(user.id);

      return NextResponse.json({ success: true, action: "streak_updated" });
    }

    return NextResponse.json({ success: true, action: "ignored" });
  } catch (error) {
    console.error("[Auth Sync] Error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
