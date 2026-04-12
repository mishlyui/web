export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  COMPONENTS: "/components",
  PRICING: "/pricing",
  API: {
    AUTH: "/api/auth",
  },
} as const

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.COMPONENTS, ROUTES.PRICING] as const

export const AUTH_ROUTES = [ROUTES.LOGIN] as const

export const PROTECTED_ROUTES = [ROUTES.PROFILE] as const
