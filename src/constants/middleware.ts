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
  HTTP_STATUS: {
    TOO_MANY_REQUESTS: 429,
    INTERNAL_ERROR: 500,
  },
  ERROR_CODES: {
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
    INTERNAL_ERROR: "INTERNAL_ERROR",
  },
  ERROR_MESSAGES: {
    RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later.",
    INTERNAL_ERROR: "Internal server error",
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
