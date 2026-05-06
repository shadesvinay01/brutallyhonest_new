import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idea, isBrutal, category } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are the "Brutally Honest" AI Interrogator. Your job is to analyze startup ideas, decisions, or profiles.
      
      TONE:
      ${isBrutal 
        ? "Be extremely direct, critical, and brutally honest. Use sharp, edgy language. Do not soften negative feedback. Act like a high-stakes VC who has seen it all and has zero patience for fluff." 
        : "Be constructive, professional, and balanced. Provide helpful feedback that identifies risks but also suggests clear paths forward."
      }

      CONTEXT:
      Category: ${category || "General"}
      Input: "${idea}"

      OUTPUT FORMAT:
      You MUST return a JSON object with the following structure:
      {
        "truthScore": number (0-100, where 100 is high potential/truth),
        "brutalRoast": "string (the main feedback text)",
        "competitorAnalysis": [
          { "name": "string", "whatTheyDo": "string", "whyTheyreStrong": "string" }
        ],
        "marketInsight": {
          "targetUsers": "string",
          "demandLevel": "string",
          "problemClarity": "string"
        },
        "improvementPlan": {
          "differentiation": "string",
          "keyFeature": "string",
          "positioning": "string",
          "gtm": "string"
        },
        "monetizationIdeas": ["string", "string", "string"]
      }

      IMPORTANT: Return ONLY the JSON object. No markdown formatting, no preamble.
    `;

    const result = await model.generateContentStream(systemPrompt);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullResponse += chunkText;
            controller.enqueue(encoder.encode(chunkText));
          }

          // After stream completes, try to save to DB
          try {
            const jsonString = fullResponse.replace(/```json|```/g, "").trim();
            const roastData = JSON.parse(jsonString);

            await prisma.roast.create({
              data: {
                idea,
                category: category || "General",
                isBrutal,
                truthScore: roastData.truthScore,
                brutalRoast: roastData.brutalRoast,
                fullData: roastData,
              },
            });
          } catch (dbError) {
            console.error("Background Database Save Error:", dbError);
          }

          controller.close();
        } catch (streamError) {
          console.error("Stream processing error:", streamError);
          controller.error(streamError);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI Streaming Error:", error);
    return NextResponse.json({ error: "The truth is too heavy right now. Try again." }, { status: 500 });
  }
}
