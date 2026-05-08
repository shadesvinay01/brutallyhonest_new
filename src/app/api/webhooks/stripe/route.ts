import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Stripe webhook for credit top-ups and pro upgrades
// Set endpoint in Stripe Dashboard → Developers → Webhooks
// Events to listen: checkout.session.completed, customer.subscription.deleted

const CREDIT_PACKAGES: Record<string, number> = {
  price_credits_10: 10,
  price_credits_50: 50,
  price_credits_100: 100,
};

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    // In production: verify Stripe signature
    // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    // For now, parse directly:
    const event = JSON.parse(body);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const priceId = session.metadata?.priceId || session.line_items?.data?.[0]?.price?.id;
      const plan = session.metadata?.plan;

      if (!userId) {
        console.error("[Stripe] No userId in metadata");
        return NextResponse.json({ error: "No userId" }, { status: 400 });
      }

      if (plan === "pro") {
        // Upgrade to Pro plan
        await prisma.user.update({
          where: { id: userId },
          data: { isPro: true, credits: { increment: 100 } },
        });
        await prisma.notification.create({
          data: {
            userId,
            type: "LEVEL_UP",
            message: "🎉 Welcome to Pro! You now have unlimited savage power.",
          },
        });
      } else if (priceId && CREDIT_PACKAGES[priceId]) {
        // Credit top-up
        const creditsToAdd = CREDIT_PACKAGES[priceId];
        await prisma.user.update({
          where: { id: userId },
          data: { credits: { increment: creditsToAdd } },
        });
        await prisma.notification.create({
          data: {
            userId,
            type: "NEW_ROAST",
            message: `💳 ${creditsToAdd} Honesty Credits added to your account!`,
          },
        });
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const userId = subscription.metadata?.userId;
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { isPro: false },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
