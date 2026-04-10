import "dotenv/config"
import { PrismaClient } from "@/generated/prisma"
import { PrismaNeon } from "@prisma/adapter-neon"
import { env, isDevelopment, isProduction } from "@/config/env"

const adapter = new PrismaNeon({
  connectionString: env.DATABASE_URL,
})

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: isDevelopment ? ["query", "error", "warn"] : ["error"],
  })

if (!isProduction) {
  globalForPrisma.prisma = prisma
}
