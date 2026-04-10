import { ROUTES } from "./routes"

export const AUTH_PROVIDERS = {
  GITHUB: "github",
  GOOGLE: "google",
} as const

export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS]

export const AUTH_CALLBACKS = {
  DEFAULT: ROUTES.HOME,
  LOGIN: ROUTES.LOGIN,
  PROFILE: ROUTES.PROFILE,
} as const

export const AUTH_COOKIE = {
  SESSION_TOKEN: "better-auth.session_token",
} as const
