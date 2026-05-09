import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// Stripe webhook for credit top-ups and pro upgrades
// Set endpoint in Stripe Dashboard → Developers → Webhooks
// Events to listen: checkout.session.completed, customer.subscription.deleted

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2025-02-24.acacia",
});

const CREDIT_PACKAGES: Record<string, number> = {
  price_credits_10: 10,
  price_credits_50: 50,
  price_credits_100: 100,
};



export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("[Stripe] Missing signature or webhook secret");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify the event came from Stripe — prevents spoofed webhook attacks
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("[Stripe] Signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const priceId = session.metadata?.priceId;
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
            type: "CREDIT_ADDED", // Semantically correct type
            message: `💳 ${creditsToAdd} Honesty Credits added to your account!`,
          },
        });
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { isPro: false },
        });
        await prisma.notification.create({
          data: {
            userId,
            type: "CREDIT_LOW",
            message: "⚠️ Your Pro subscription has ended. Upgrade to restore full power.",
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
