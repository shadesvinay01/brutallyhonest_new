import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idea, isBrutal } = body;

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Logic based on System Prompt:
    // If isBrutal = true: "Be extremely direct, critical, and brutally honest. Do not soften negative feedback."
    // If isBrutal = false: "Be constructive, professional, and balanced in feedback."

    const roastData = {
      truthScore: isBrutal ? 12 : 45,
      brutalRoast: isBrutal 
        ? "This idea isn't new — you're entering a crowded space without a clear edge. You're solving a problem, but not one people are desperate enough to pay for. Your execution plan is practically non-existent."
        : "While the concept has potential, the current market is highly saturated with established players. To succeed, you'll need a much stronger differentiation strategy and a clearer path to monetization.",
      competitorAnalysis: [
        { name: "Existing Giant", whatTheyDo: "Dominates the general market with massive scale.", whyTheyreStrong: "Infinite budget and deep user trust." },
        { name: "Niche Player", whatTheyDo: "Specializes in your specific feature set.", whyTheyreStrong: "Fast execution and high community engagement." },
        { name: "Startup X", whatTheyDo: "Recent VC darling with high growth.", whyTheyreStrong: "Highly aggressive user acquisition strategy." }
      ],
      marketInsight: {
        targetUsers: "Early stage founders / Indie Hackers",
        demandLevel: isBrutal ? "Low (High Saturation)" : "Medium (Fragmented)",
        problemClarity: isBrutal ? "Low (Solution in search of a problem)" : "Moderate (Needs Refinement)"
      },
      improvementPlan: {
        differentiation: "Stop targeting 'everyone'. Focus on a hyper-niche segment like students or creators first.",
        keyFeature: "Add a 'Validation Score' system that compares ideas against historical market data.",
        positioning: "Position as a 'Risk Mitigation Tool' rather than a 'Feedback App'.",
        gtm: "Start with tech communities like Product Hunt or Indie Hackers to build social proof."
      },
      monetizationIdeas: ["Tiered Subscription ($9/mo)", "Premium Deep-Dive Reports", "Expert Analysis Upsell"]
    };

    return NextResponse.json(roastData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate roast" }, { status: 500 });
  }
}
