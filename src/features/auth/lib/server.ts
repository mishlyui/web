import { prisma } from "@/lib/db/client"
import { betterAuth } from "better-auth"
import { magicLink } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { env, isDevelopment } from "@/config/env"
import { BETTER_AUTH_RATE_LIMIT } from "@/constants/rate-limit"

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  rateLimit: {
    enabled: true,
    window: BETTER_AUTH_RATE_LIMIT.DEFAULT.WINDOW,
    max: BETTER_AUTH_RATE_LIMIT.DEFAULT.MAX,
    storage: "database",
    customRules: {
      "/sign-in/email": {
        window: BETTER_AUTH_RATE_LIMIT.SIGN_IN.WINDOW,
        max: BETTER_AUTH_RATE_LIMIT.SIGN_IN.MAX,
      },
      "/sign-in/social": {
        window: BETTER_AUTH_RATE_LIMIT.SOCIAL.WINDOW,
        max: BETTER_AUTH_RATE_LIMIT.SOCIAL.MAX,
      },
      "/magic-link/send": {
        window: BETTER_AUTH_RATE_LIMIT.MAGIC_LINK.WINDOW,
        max: BETTER_AUTH_RATE_LIMIT.MAGIC_LINK.MAX,
      },
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for"],
      ipv6Subnet: 64,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        if (isDevelopment) {
          console.log(`\nMagic link for ${email}:\n${url}\n`)
        }
      },
    }),
  ],
})
