import { prisma } from "@/lib/db/client"
import { betterAuth } from "better-auth"
import { magicLink } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { env, isDevelopment } from "@/config/env"

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
