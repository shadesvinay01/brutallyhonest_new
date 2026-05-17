/**
 * validate.mjs — Backend connection health check
 * Run: node validate.mjs
 * Requires: .env file in project root (copy from .env.example)
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Stripe from "stripe";

let failures = 0;

function pass(label) { console.log(`  ✅ PASS  ${label}`); }
function fail(label, reason) { console.error(`  ❌ FAIL  ${label} — ${reason}`); failures++; }

// ── 1. Required env vars ────────────────────────────────────────────────────
console.log("\n🔍 Checking environment variables...");
const REQUIRED = [
  "DATABASE_URL",
  "DIRECT_URL",
  "GOOGLE_GENERATIVE_AI_API_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];
for (const key of REQUIRED) {
  if (process.env[key]) pass(key);
  else fail(key, "not set in .env");
}

if (failures > 0) {
  console.error(`\n💥 ${failures} env var(s) missing. Fix .env before continuing.\n`);
  process.exit(1);
}

// ── 2. Prisma / Supabase DB ─────────────────────────────────────────────────
console.log("\n🔍 Testing Prisma DB connection...");
const prisma = new PrismaClient();
try {
  await prisma.$queryRaw`SELECT 1`;
  pass("Prisma connected to PostgreSQL");

  // Test write permissions
  const testRoast = await prisma.roast.create({
    data: {
      idea: "__validation_test__",
      category: "Test",
      isBrutal: false,
      truthScore: 0,
      brutalRoast: "validation",
      fullData: {},
      mode: "standard",
    },
  });
  await prisma.roast.delete({ where: { id: testRoast.id } });
  pass("Prisma read/write permissions OK");
} catch (e) {
  fail("Prisma DB", e.message);
} finally {
  await prisma.$disconnect();
}

// ── 3. Google Generative AI (Gemini) ────────────────────────────────────────
console.log("\n🔍 Testing Gemini AI API key...");
try {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent("Reply with the single word: OK");
  const text = result.response.text();
  if (text) pass(`Gemini API key valid (response: "${text.trim().slice(0, 30)}")`);
  else fail("Gemini AI", "Empty response from model");
} catch (e) {
  fail("Gemini AI", e.message);
}

// ── 4. Stripe ───────────────────────────────────────────────────────────────
console.log("\n🔍 Testing Stripe API key...");
try {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });
  await stripe.paymentMethods.list({ limit: 1 });
  pass("Stripe API key valid");
} catch (e) {
  fail("Stripe", e.message);
}

// ── Summary ─────────────────────────────────────────────────────────────────
console.log("\n" + "─".repeat(50));
if (failures === 0) {
  console.log("🎉 All checks passed. Your backend is ready.\n");
  process.exit(0);
} else {
  console.error(`💥 ${failures} check(s) failed. Fix the issues above and redeploy to Vercel.\n`);
  process.exit(1);
}
