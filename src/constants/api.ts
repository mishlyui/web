export const API_CONFIG = {
  DEFAULT_VERSION: "1.0",
  DEFAULT_SOURCE: "api",
} as const

export const API_HEADERS = {
  REQUEST_ID: "x-request-id",
  RESPONSE_TIME: "x-response-time",
} as const

export const API_ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const

export const API_ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  VALIDATION_FAILED: "Validation failed",
  RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later.",
  INTERNAL_ERROR: "Internal server error",
  UNKNOWN_ERROR: "Unknown error occurred",
} as const

export const API_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  INTERNAL_ERROR: 500,
} as const
