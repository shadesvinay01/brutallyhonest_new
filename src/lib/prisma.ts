import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
    // DATABASE_URL and DIRECT_URL are read from env via schema.prisma datasource block.
    // Do NOT pass datasourceUrl here — it would shadow DIRECT_URL and break migrations.
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

