export const RATE_LIMIT_PRESETS = {
  API: "api",
  AUTH: "auth",
  STRICT: "strict",
  STRICT_IP: "strictIp",
  DISABLED: false,
} as const

export const RATE_LIMIT_CONFIGS = {
  API: {
    REQUESTS: 100,
    WINDOW: "60 s",
    PREFIX: "ratelimit:api",
  },
  AUTH: {
    REQUESTS: 10,
    WINDOW: "60 s",
    PREFIX: "ratelimit:auth",
  },
  STRICT: {
    REQUESTS: 5,
    WINDOW: "300 s",
    PREFIX: "ratelimit:strict",
  },
  STRICT_IP: {
    REQUESTS: 10,
    WINDOW: "300 s",
    PREFIX: "ratelimit:strict:ip",
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
