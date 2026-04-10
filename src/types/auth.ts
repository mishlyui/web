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

export type AuthProvider = "github" | "google"
