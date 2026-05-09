import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { awardXPForRoast } from "@/lib/gamification";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "dummy_key");

// ── Credit gate helper ─────────────────────────────────────────────────────
async function checkAndDeductCredits(userId: string, cost = 1): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.credits < cost) return false;

  await prisma.user.update({
    where: { id: userId },
    data: { credits: { decrement: cost } },
  });

  if (user.credits - cost <= 1) {
    await prisma.notification.create({
      data: {
        userId,
        type: "CREDIT_LOW",
        message: `⚠️ Only ${user.credits - cost} Honesty Credits left. Upgrade to Pro for more.`,
      },
    });
  }
  return true;
}

// ── Prompt builders ────────────────────────────────────────────────────────
function buildStandardPrompt(idea: string, category: string, isBrutal: boolean): string {
  return `You are the "Brutally Honest" AI Interrogator.
TONE: ${isBrutal ? "Extremely direct, sharp, edgy. No softening. High-stakes VC energy." : "Constructive and balanced. Identify risks but suggest paths forward."}
CATEGORY: ${category}
IDEA: "${idea}"

Return ONLY valid JSON:
{
  "truthScore": number (0-100),
  "brutalRoast": "string",
  "competitorAnalysis": [{ "name": "string", "whatTheyDo": "string", "whyTheyreStrong": "string" }],
  "marketInsight": { "targetUsers": "string", "demandLevel": "string", "problemClarity": "string" },
  "improvementPlan": { "differentiation": "string", "keyFeature": "string", "positioning": "string", "gtm": "string" },
  "monetizationIdeas": ["string", "string", "string"]
}`;
}

function buildInvestorMemoPrompt(idea: string, category: string): string {
  return `You are a brutally honest VC partner at a top-tier firm. Write a formal rejection memo.
IDEA: "${idea}" | CATEGORY: ${category}

Return ONLY valid JSON:
{
  "truthScore": number (0-100),
  "brutalRoast": "string (memo summary)",
  "memoTitle": "string",
  "executiveSummary": "string",
  "fatalFlaws": ["string", "string", "string"],
  "marketOpportunity": "string",
  "recommendation": "PASS | SOFT_PASS | WATCH",
  "competitorAnalysis": [{ "name": "string", "whatTheyDo": "string", "whyTheyreStrong": "string" }],
  "marketInsight": { "targetUsers": "string", "demandLevel": "string", "problemClarity": "string" },
  "improvementPlan": { "differentiation": "string", "keyFeature": "string", "positioning": "string", "gtm": "string" },
  "monetizationIdeas": ["string", "string", "string"]
}`;
}

function buildMultipleRealitiesPrompt(idea: string, category: string): string {
  return `You are a strategic AI forecaster. Generate 3 alternate futures for this startup.
IDEA: "${idea}" | CATEGORY: ${category}

Return ONLY valid JSON:
{
  "truthScore": number (0-100),
  "brutalRoast": "string (overall verdict)",
  "realities": {
    "bestCase": { "title": "string", "timeline": "string", "description": "string", "probability": "string" },
    "worstCase": { "title": "string", "timeline": "string", "description": "string", "probability": "string" },
    "totalCollapse": { "title": "string", "timeline": "string", "description": "string", "probability": "string" }
  },
  "competitorAnalysis": [{ "name": "string", "whatTheyDo": "string", "whyTheyreStrong": "string" }],
  "marketInsight": { "targetUsers": "string", "demandLevel": "string", "problemClarity": "string" },
  "improvementPlan": { "differentiation": "string", "keyFeature": "string", "positioning": "string", "gtm": "string" },
  "monetizationIdeas": ["string", "string", "string"]
}`;
}

// ── URL Scraper helper ─────────────────────────────────────────────────────
async function scrapeUrlMetadata(url: string): Promise<string> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = html.match(/name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const title = titleMatch?.[1]?.trim() || "";
    const desc = descMatch?.[1]?.trim() || "";
    return title || desc ? `\n\nURL Context — Title: "${title}" | Description: "${desc}"` : "";
  } catch {
    return "";
  }
}

// ── Main route ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idea, isBrutal, category, mode = "standard", userId, url } = body;

    if (!idea || idea.trim().length < 10) {
      return NextResponse.json({ error: "Idea too short to roast." }, { status: 400 });
    }

    // Credit gate — pro mode costs 2 credits
    const creditCost = mode === "investor_memo" ? 2 : 1;
    if (userId) {
      const hasCredits = await checkAndDeductCredits(userId, creditCost);
      if (!hasCredits) {
        return NextResponse.json(
          { error: "Not enough Honesty Credits. Upgrade to Pro." },
          { status: 402 }
        );
      }
    }

    // Scrape URL context if provided
    const urlContext = url ? await scrapeUrlMetadata(url) : "";
    const fullIdea = idea + urlContext;

    // Build mode-specific prompt
    let prompt: string;
    if (mode === "investor_memo") prompt = buildInvestorMemoPrompt(fullIdea, category);
    else if (mode === "multiple_realities") prompt = buildMultipleRealitiesPrompt(fullIdea, category);
    else prompt = buildStandardPrompt(fullIdea, category, isBrutal);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContentStream(prompt);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";

        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            fullResponse += text;
            // SSE format for real streaming
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk: text })}\n\n`));
          }

          // Parse and persist
          try {
            const jsonStr = fullResponse.replace(/```json|```/g, "").trim();
            const roastData = JSON.parse(jsonStr);

            const saved = await prisma.roast.create({
              data: {
                idea,
                category: category || "General",
                isBrutal: isBrutal ?? true,
                truthScore: roastData.truthScore,
                brutalRoast: roastData.brutalRoast,
                fullData: roastData,
                mode,
                userId: userId || null,
              },
            });

            // Award XP if user is logged in
            if (userId) await awardXPForRoast(userId);

            // Signal stream end with roast ID for reactions
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ done: true, roastId: saved.id })}\n\n`)
            );
          } catch (dbErr) {
            console.error("[Roast] DB save error:", dbErr);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ done: true, roastId: null })}\n\n`)
            );
          }

          controller.close();
        } catch (streamErr) {
          console.error("[Roast] Stream error:", streamErr);
          controller.error(streamErr);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Roast] Fatal error:", error);
    return NextResponse.json(
      { error: "The truth machine is overloaded. Try again." },
      { status: 500 }
    );
  }
}
