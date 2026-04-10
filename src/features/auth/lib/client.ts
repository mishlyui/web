import { createAuthClient } from "better-auth/react"
import { magicLinkClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
  fetchOptions: {
    onError: async (context) => {
      const { response } = context
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After")
        const seconds = retryAfter ? parseInt(retryAfter) : 60
        throw new Error(`Too many requests. Please try again in ${seconds} seconds.`)
      }
    },
  },
})

export const { signIn, signOut, useSession } = authClient
