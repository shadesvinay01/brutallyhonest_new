import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idea, audience, problem, pricing } = body;

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock AI Response with Comprehensive Market Data
    const roastData = {
      truthScore: 18,
      summary: "A derivative solution for a problem that exists only in your imagination. This is less of a business and more of a charity for your ego.",
      flaws: [
        "No defensible moat; you'll be crushed by incumbents in weeks.",
        "Your pricing model assumes users are irrational and wealthy.",
        "The problem you're solving is a minor inconvenience at best.",
        "Total lack of market validation beyond your circle of friends."
      ],
      marketReality: "The market is currently oversaturated with similar 'AI-first' wrappers. Investors are moving toward infrastructure, not surface-level tools.",
      risks: [
        "Platform risk (OpenAI/Google can sherlock you tomorrow).",
        "Zero customer acquisition strategy beyond 'going viral'.",
        "Burn rate will exceed revenue within 3 months."
      ],
      suggestions: [
        "Pivoting to a niche B2B industrial application might save you.",
        "Kill the features that don't solve a core pain point immediately.",
        "Go talk to 50 strangers and see how many would actually pay."
      ],
      // New: Market Specifics
      marketMetrics: {
        tam: "$12.4B",
        hostility: "94%",
        saturation: "High",
        competitors: ["OpenAI", "Google", "1,200+ Indie Wrappers"]
      },
      successScenario: {
        title: "The Unicorn Timeline",
        outcome: "Against all market logic, you achieve hyper-growth by capturing a cult-like following among niche power users.",
        keyMilestones: [
          "Month 3: Viral adoption in the indie-hacker community.",
          "Month 12: Series A funding at a $50M valuation.",
          "Year 3: Acquisition by a tech giant for $250M."
        ],
        whyItWorked: "You perfectly timed a cultural shift that the incumbents were too slow to recognize.",
        visionaryQuote: "History is made by those who are too stubborn to accept the 'Brutally Honest' truth."
      }
    };

    return NextResponse.json(roastData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate roast" }, { status: 500 });
  }
}
