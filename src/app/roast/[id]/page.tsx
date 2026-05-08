import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://brutallyhonest.app";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const roast = await prisma.roast.findUnique({
    where: { id: params.id },
    select: { idea: true, truthScore: true, brutalRoast: true },
  });

  if (!roast) return { title: "Roast Not Found" };

  const quote = roast.brutalRoast.slice(0, 100);
  const ogUrl = `${BASE_URL}/api/og?score=${roast.truthScore}&quote=${encodeURIComponent(quote)}`;

  return {
    title: `${roast.truthScore}% Truth Score — Brutally Honest`,
    description: quote,
    openGraph: {
      title: `"${roast.idea.slice(0, 60)}" got a ${roast.truthScore}% Truth Score`,
      description: quote,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${roast.truthScore}% Truth Score 🔥`,
      description: quote,
      images: [ogUrl],
    },
  };
}

export default async function RoastPage({ params }: { params: { id: string } }) {
  const roast = await prisma.roast.findUnique({
    where: { id: params.id, isPublic: true },
  });

  if (!roast) notFound();

  // Increment view count
  await prisma.roast.update({ where: { id: params.id }, data: { viewCount: { increment: 1 } } });

  const data = roast.fullData as Record<string, unknown>;
  const score = roast.truthScore;
  const scoreColor = score < 20 ? "#ff2d2d" : score < 50 ? "#ff7c00" : score < 75 ? "#ffd700" : "#00ff88";

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "monospace", padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <a href="/" style={{ color: "#ff7c00", textDecoration: "none", fontSize: "13px", letterSpacing: "0.1em" }}>← BACK TO INTERROGATOR</a>

      <div style={{ textAlign: "center", margin: "48px 0 32px" }}>
        <div style={{ fontSize: "80px", fontWeight: 900, color: scoreColor }}>{score}%</div>
        <div style={{ color: "#555", letterSpacing: "0.3em", fontSize: "12px" }}>TRUTH SCORE</div>
      </div>

      <div style={{ background: "#111", border: `1px solid ${scoreColor}40`, borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <div style={{ color: "#555", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "12px" }}>STARTUP IDEA</div>
        <p style={{ color: "#ccc", lineHeight: 1.6 }}>{roast.idea}</p>
      </div>

      <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <div style={{ color: "#ff7c00", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "12px" }}>THE VERDICT</div>
        <p style={{ color: "#fff", lineHeight: 1.8, fontSize: "15px" }}>{roast.brutalRoast}</p>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`My startup got a ${score}% Truth Score 🔥 "${roast.brutalRoast.slice(0, 80)}..." — Get roasted at`)}&url=${BASE_URL}/roast/${roast.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: 1, display: "block", textAlign: "center", padding: "12px", background: "#1da1f2", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
        >
          Share on X
        </a>
        <a
          href="/"
          style={{ flex: 1, display: "block", textAlign: "center", padding: "12px", background: "#ff7c00", color: "#000", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
        >
          Roast Your Idea
        </a>
      </div>

      <p style={{ color: "#333", textAlign: "center", fontSize: "12px" }}>Brutally Honest • {new Date(roast.createdAt).toLocaleDateString()}</p>
    </main>
  );
}
