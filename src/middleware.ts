import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory rate limiter (effective for single-instance / local dev)
// TODO for production on Vercel: replace with Upstash Redis
// npm install @upstash/ratelimit @upstash/redis
// See: https://github.com/upstash/ratelimit-js
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();

// Periodically purge expired entries to prevent unbounded memory growth.
// On serverless this runs per-instance, but that's acceptable for a dev guard.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // every 5 minutes
let lastCleanup = Date.now();

function maybeCleanupMap() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of ipRequestMap.entries()) {
    if (entry.resetAt < now) ipRequestMap.delete(key);
  }
}

const RATE_LIMITS: Record<string, { requests: number; windowMs: number }> = {
  "/api/roast": { requests: 5, windowMs: 60_000 },       // 5 per minute
  "/api/roasts": { requests: 30, windowMs: 60_000 },     // 30 per minute
  "/api/leaderboard": { requests: 60, windowMs: 60_000 }, // 60 per minute
};

function getRateLimitConfig(pathname: string) {
  for (const [pattern, config] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(pattern)) return config;
  }
  return null;
}

export function middleware(req: NextRequest) {
  maybeCleanupMap();

  const pathname = req.nextUrl.pathname;
  const config = getRateLimitConfig(pathname);

  if (!config) return NextResponse.next();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous";

  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const existing = ipRequestMap.get(key);

  if (!existing || existing.resetAt < now) {
    ipRequestMap.set(key, { count: 1, resetAt: now + config.windowMs });
    return NextResponse.next();
  }

  if (existing.count >= config.requests) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. The truth engine needs a breather." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(config.requests),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(existing.resetAt / 1000)),
        },
      }
    );
  }

  existing.count += 1;
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/roast/:path*", "/api/roasts/:path*", "/api/leaderboard/:path*"],
};
