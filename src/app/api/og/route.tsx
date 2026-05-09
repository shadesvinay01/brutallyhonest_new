import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";



// GET /api/og?score=12&quote=Your+idea+is+dead&roastId=abc
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const score = Number(searchParams.get("score") || 50);
  const quote = searchParams.get("quote") || "Brutally honest. No filter.";
  const truncatedQuote = quote.length > 120 ? quote.slice(0, 117) + "..." : quote;

  const scoreColor =
    score < 20 ? "#ff2d2d" : score < 50 ? "#ff7c00" : score < 75 ? "#ffd700" : "#00ff88";
  const flame = score < 30 ? "🔥🔥🔥" : score < 60 ? "🔥🔥" : "🔥";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,165,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#ff7c00", letterSpacing: "0.3em", fontWeight: 900 }}>
            BRUTALLY HONEST
          </span>
        </div>

        {/* Score */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "30px",
          }}
        >
          <span style={{ fontSize: "140px", fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
            {score}%
          </span>
          <span style={{ fontSize: "60px" }}>{flame}</span>
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.2em",
            marginBottom: "40px",
            textTransform: "uppercase",
          }}
        >
          TRUTH SCORE
        </div>

        {/* Quote */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.5,
            fontStyle: "italic",
            borderLeft: `4px solid ${scoreColor}`,
            paddingLeft: "24px",
          }}
        >
          {`\u201c${truncatedQuote}\u201d`}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            color: "rgba(255,255,255,0.3)",
            fontSize: "16px",
            letterSpacing: "0.1em",
          }}
        >
          brutallyhonest.app • Your startup survived the interrogation
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
