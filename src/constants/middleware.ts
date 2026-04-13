import { API_STATUS_CODES, API_ERROR_CODES, API_ERROR_MESSAGES } from "./api"

export const MIDDLEWARE_CONFIG = {
  DEFAULT_IP: "127.0.0.1",
  IDENTIFIER_PREFIXES: {
    EMAIL: "email",
    SOCIAL: "social",
    USER: "user",
    API_KEY: "apikey",
    IP: "ip",
  },
  HEADERS: {
    X_FORWARDED_FOR: "x-forwarded-for",
    X_REAL_IP: "x-real-ip",
    X_API_KEY: "x-api-key",
  },
  LOG_PREFIXES: {
    RATE_LIMIT: "[Rate Limit]",
    MIDDLEWARE: "[Rate Limit Middleware]",
  },
  AUTH_ENDPOINTS: {
    MAGIC_LINK: "/magic-link",
    SOCIAL_SIGN_IN: "/sign-in/social",
    SIGN_IN: "/sign-in",
  },
} as const

export const MIDDLEWARE_HTTP_STATUS = API_STATUS_CODES
export const MIDDLEWARE_ERROR_CODES = {
  RATE_LIMIT_EXCEEDED: API_ERROR_CODES.RATE_LIMIT_EXCEEDED,
  INTERNAL_ERROR: API_ERROR_CODES.INTERNAL_ERROR,
} as const
export const MIDDLEWARE_ERROR_MESSAGES = {
  RATE_LIMIT_EXCEEDED: API_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
  INTERNAL_ERROR: API_ERROR_MESSAGES.INTERNAL_ERROR,
} as const
