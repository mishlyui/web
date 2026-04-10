import type { NextRequest } from "next/server"
import type { Duration } from "@upstash/ratelimit"

export interface RateLimitConfig {
  requests: number
  window: Duration
  prefix?: string
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number
}

export interface RateLimitCheck {
  limiter: "api" | "auth" | "strict" | "strictIp"
  identifier: string
}

export interface RateLimitRule {
  endpoint: string
  requiresSession?: boolean
  getChecks: (
    request: NextRequest,
    body: RateLimitRequestBody | null,
    userId: string | null,
  ) => RateLimitCheck[]
}

export interface RateLimitRequestBody {
  email?: string
  provider?: string
  userId?: string
  [key: string]: unknown
}

export interface RateLimitErrorResponse {
  error: string
  code: string
  retryAfter: number
}
