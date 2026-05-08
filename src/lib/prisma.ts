import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
    datasourceUrl: process.env.DATABASE_URL, // Uses pooled URL via pgbouncer
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
