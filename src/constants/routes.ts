export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  API: {
    AUTH: "/api/auth",
  },
} as const

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN] as const

export const AUTH_ROUTES = [ROUTES.LOGIN] as const

export const PROTECTED_ROUTES = [ROUTES.PROFILE] as const
