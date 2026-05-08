import { prisma } from "@/lib/prisma";

const XP_REWARDS = {
  ROAST_GENERATED: 50,
  REACTION_RECEIVED_ACCURATE: 10,
  REACTION_RECEIVED_HELPFUL: 8,
  REACTION_RECEIVED_SAVAGE: 5,
  DAILY_LOGIN: 20,
  STREAK_BONUS: 15, // per streak day
} as const;

const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500];

export function getLevelFromXP(xp: number): number {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}

export async function awardXPForRoast(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const newXP = user.xp + XP_REWARDS.ROAST_GENERATED;
  const newLevel = getLevelFromXP(newXP);
  const leveledUp = newLevel > user.level;

  await prisma.user.update({
    where: { id: userId },
    data: { xp: newXP, level: newLevel },
  });

  if (leveledUp) {
    await prisma.notification.create({
      data: {
        userId,
        type: "LEVEL_UP",
        message: `🔥 You hit Level ${newLevel}! Your roasts are getting sharper.`,
      },
    });
  }
}

export async function updateLoginStreak(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const now = new Date();
  const last = user.lastLogin;
  let newStreak = user.streakCount;
  let bonusXP = XP_REWARDS.DAILY_LOGIN;

  if (last) {
    const hoursSinceLast = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLast < 24) {
      // Already logged in today — no change
      return;
    } else if (hoursSinceLast < 48) {
      // Consecutive day
      newStreak += 1;
      bonusXP += newStreak * XP_REWARDS.STREAK_BONUS;
    } else {
      // Streak broken
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  const newXP = user.xp + bonusXP;
  const newLevel = getLevelFromXP(newXP);
  const leveledUp = newLevel > user.level;

  await prisma.user.update({
    where: { id: userId },
    data: { xp: newXP, level: newLevel, streakCount: newStreak, lastLogin: now },
  });

  if (newStreak % 7 === 0) {
    await prisma.notification.create({
      data: {
        userId,
        type: "STREAK_MILESTONE",
        message: `🔥 ${newStreak}-day streak! You're addicted to the truth.`,
      },
    });
  }

  if (leveledUp) {
    await prisma.notification.create({
      data: {
        userId,
        type: "LEVEL_UP",
        message: `🚀 Level ${newLevel} unlocked! More savage than ever.`,
      },
    });
  }
}

export async function updateCredibilityScore(userId: string): Promise<void> {
  const reactions = await prisma.reaction.findMany({
    where: { roast: { userId } },
    select: { type: true },
  });

  const accurate = reactions.filter((r) => r.type === "ACCURATE").length;
  const helpful = reactions.filter((r) => r.type === "HELPFUL").length;
  const savage = reactions.filter((r) => r.type === "SAVAGE").length;
  const total = reactions.length;

  if (total === 0) return;

  // Weighted score: Accurate=3pts, Helpful=2pts, Savage=1pt; max 100
  const rawScore = (accurate * 3 + helpful * 2 + savage * 1) / (total * 3);
  const credibilityScore = Math.round(rawScore * 100);

  await prisma.user.update({
    where: { id: userId },
    data: { credibilityScore },
  });
}

export async function awardXPForReaction(
  roastOwnerUserId: string,
  reactionType: "SAVAGE" | "ACCURATE" | "HELPFUL"
): Promise<void> {
  const xpMap = {
    SAVAGE: XP_REWARDS.REACTION_RECEIVED_SAVAGE,
    ACCURATE: XP_REWARDS.REACTION_RECEIVED_ACCURATE,
    HELPFUL: XP_REWARDS.REACTION_RECEIVED_HELPFUL,
  };
  const xpGain = xpMap[reactionType];

  const user = await prisma.user.findUnique({ where: { id: roastOwnerUserId } });
  if (!user) return;

  const newXP = user.xp + xpGain;
  const newLevel = getLevelFromXP(newXP);

  await prisma.user.update({
    where: { id: roastOwnerUserId },
    data: { xp: newXP, level: newLevel },
  });
}
