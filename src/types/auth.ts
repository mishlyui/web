export interface User {
  id: string
  email: string
  name?: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  user: User
  session: {
    id: string
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string
    userAgent?: string
  }
}

import { AUTH_PROVIDERS } from "@/constants/auth"

export type AuthProvider = typeof AUTH_PROVIDERS.GITHUB | typeof AUTH_PROVIDERS.GOOGLE
