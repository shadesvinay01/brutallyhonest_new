"use client";
import { useState } from "react";

interface Stats {
  overview: {
    totalUsers: number;
    totalRoasts: number;
    totalReactions: number;
    totalXP: number;
    avgXP: number;
    avgCredibility: number;
    maxXP: number;
  };
  modeBreakdown: Record<string, number>;
  categoryBreakdown: { category: string; _count: { category: number } }[];
  topRoastsByViews: { id: string; idea: string; truthScore: number; viewCount: number }[];
  recentRoasts: { id: string; idea: string; category: string; mode: string; truthScore: number }[];
}

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats", { headers: { "x-admin-key": key } });
      if (!res.ok) { setError("Invalid admin key or server error"); return; }
      setStats(await res.json());
    } catch { setError("Failed to fetch stats"); }
    finally { setLoading(false); }
  };

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "monospace", padding: "40px" }}>
      <h1 style={{ color: "#ff7c00", fontSize: "28px", fontWeight: 900, marginBottom: "8px" }}>
        🔥 BRUTALLY HONEST — Admin Dashboard
      </h1>
      <p style={{ color: "#666", marginBottom: "32px" }}>Internal use only.</p>

      {!stats && (
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
          <input
            type="password"
            placeholder="Enter admin key..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchStats()}
            style={{ padding: "10px 16px", background: "#111", border: "1px solid #333", color: "#fff", borderRadius: "8px", width: "300px" }}
          />
          <button
            onClick={fetchStats}
            disabled={loading}
            style={{ padding: "10px 24px", background: "#ff7c00", color: "#000", fontWeight: 900, borderRadius: "8px", cursor: "pointer", border: "none" }}
          >
            {loading ? "Loading..." : "Access"}
          </button>
        </div>
      )}

      {error && <p style={{ color: "#ff2d2d", marginBottom: "16px" }}>{error}</p>}

      {stats && (
        <div>
          <button onClick={() => setStats(null)} style={{ marginBottom: "24px", background: "#222", color: "#ff7c00", border: "1px solid #ff7c00", padding: "6px 16px", borderRadius: "6px", cursor: "pointer" }}>
            ← Logout
          </button>

          {/* Overview Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
            {[
              { label: "Total Users", value: stats.overview.totalUsers },
              { label: "Total Roasts", value: stats.overview.totalRoasts },
              { label: "Total Reactions", value: stats.overview.totalReactions },
              { label: "Total XP Earned", value: stats.overview.totalXP.toLocaleString() },
              { label: "Avg XP / User", value: stats.overview.avgXP },
              { label: "Avg Credibility", value: `${stats.overview.avgCredibility}%` },
              { label: "Highest XP", value: stats.overview.maxXP.toLocaleString() },
              { label: "AI Modes", value: Object.keys(stats.modeBreakdown).length },
            ].map((card) => (
              <div key={card.label} style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "20px" }}>
                <div style={{ color: "#666", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "8px" }}>{card.label.toUpperCase()}</div>
                <div style={{ color: "#ff7c00", fontSize: "28px", fontWeight: 900 }}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Mode Breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "24px" }}>
              <h2 style={{ color: "#ff7c00", marginBottom: "16px", fontSize: "14px", letterSpacing: "0.1em" }}>AI MODE USAGE</h2>
              {Object.entries(stats.modeBreakdown).map(([mode, count]) => (
                <div key={mode} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1a1a1a" }}>
                  <span style={{ color: "#aaa" }}>{mode}</span>
                  <span style={{ color: "#fff", fontWeight: 700 }}>{count}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "24px" }}>
              <h2 style={{ color: "#ff7c00", marginBottom: "16px", fontSize: "14px", letterSpacing: "0.1em" }}>TOP CATEGORIES</h2>
              {stats.categoryBreakdown.map((c) => (
                <div key={c.category} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1a1a1a" }}>
                  <span style={{ color: "#aaa" }}>{c.category}</span>
                  <span style={{ color: "#fff", fontWeight: 700 }}>{c._count.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Roasts */}
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "24px" }}>
            <h2 style={{ color: "#ff7c00", marginBottom: "16px", fontSize: "14px", letterSpacing: "0.1em" }}>RECENT ROASTS</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#555", fontSize: "11px" }}>
                  {["Idea", "Category", "Mode", "Score"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #1a1a1a" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentRoasts.map((r) => (
                  <tr key={r.id} style={{ fontSize: "13px" }}>
                    <td style={{ padding: "10px 8px", color: "#ccc", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.idea}</td>
                    <td style={{ padding: "10px 8px", color: "#888" }}>{r.category}</td>
                    <td style={{ padding: "10px 8px", color: "#ff7c00" }}>{r.mode}</td>
                    <td style={{ padding: "10px 8px", color: r.truthScore < 30 ? "#ff2d2d" : "#00ff88", fontWeight: 700 }}>{r.truthScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
