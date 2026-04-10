export const RATE_LIMIT_PRESETS = {
  API: "api",
  AUTH: "auth",
  STRICT: "strict",
  DISABLED: false,
} as const

export const RATE_LIMIT_CONFIGS = {
  API: {
    REQUESTS: 100,
    WINDOW: "60 s",
    PREFIX: "ratelimit:api",
  },
  AUTH: {
    REQUESTS: 20,
    WINDOW: "60 s",
    PREFIX: "ratelimit:auth",
  },
  STRICT: {
    REQUESTS: 10,
    WINDOW: "60 s",
    PREFIX: "ratelimit:strict",
  },
} as const

export const BETTER_AUTH_RATE_LIMIT = {
  DEFAULT: {
    WINDOW: 60,
    MAX: 100,
  },
  SIGN_IN: {
    WINDOW: 60,
    MAX: 10,
  },
  SOCIAL: {
    WINDOW: 60,
    MAX: 15,
  },
  MAGIC_LINK: {
    WINDOW: 300,
    MAX: 5,
  },
} as const

export const RATE_LIMIT_HEADERS = {
  REMAINING: "x-ratelimit-remaining",
  RESET: "x-ratelimit-reset",
} as const

export const RATE_LIMIT_ERROR = {
  CODE: "RATE_LIMIT_EXCEEDED",
  MESSAGE: "Rate limit exceeded",
} as const
