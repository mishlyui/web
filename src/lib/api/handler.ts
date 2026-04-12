import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit, rateLimiters } from "@/lib/rate-limit/client"
import { handleApiError, apiInternalError, apiError } from "@/lib/api"
import { API_CONFIG, API_HEADERS, API_STATUS_CODES } from "@/constants/api"
import { RATE_LIMIT_HEADERS, RATE_LIMIT_ERROR, RATE_LIMIT_PRESETS } from "@/constants/rate-limit"

type ApiHandler = (request: NextRequest, context?: any) => Promise<NextResponse> | NextResponse

type RateLimitType = "api" | "auth" | "strict" | false

interface HandlerOptions {
  rateLimit?: RateLimitType
  source?: string
}

export function createApiHandler(handler: ApiHandler, options?: HandlerOptions) {
  return async (request: NextRequest, context?: any) => {
    const startTime = Date.now()
    const requestId = crypto.randomUUID()

    try {
      request.headers.set(API_HEADERS.REQUEST_ID, requestId)

      const rateLimitType = options?.rateLimit ?? RATE_LIMIT_PRESETS.API

      if (rateLimitType !== RATE_LIMIT_PRESETS.DISABLED) {
        const limiter = rateLimiters[rateLimitType]
        const identifier = request.headers.get("x-forwarded-for") || "anonymous"

        const { success, remaining, reset } = await checkRateLimit(identifier, limiter)

        if (!success) {
          return apiError(RATE_LIMIT_ERROR.MESSAGE, API_STATUS_CODES.VALIDATION_ERROR, {
            code: RATE_LIMIT_ERROR.CODE,
            requestId,
            details: {
              remaining,
              reset: new Date(reset).toISOString(),
            },
          })
        }

        request.headers.set(RATE_LIMIT_HEADERS.REMAINING, remaining.toString())
        request.headers.set(RATE_LIMIT_HEADERS.RESET, reset.toString())
      }

      const response = await handler(request, context)

      const duration = Date.now() - startTime
      response.headers.set(API_HEADERS.REQUEST_ID, requestId)
      response.headers.set(API_HEADERS.RESPONSE_TIME, `${duration}ms`)

      if (options?.rateLimit !== RATE_LIMIT_PRESETS.DISABLED) {
        const remaining = request.headers.get(RATE_LIMIT_HEADERS.REMAINING)
        const reset = request.headers.get(RATE_LIMIT_HEADERS.RESET)
        if (remaining) response.headers.set(RATE_LIMIT_HEADERS.REMAINING, remaining)
        if (reset) response.headers.set(RATE_LIMIT_HEADERS.RESET, reset)
      }

      return response
    } catch (error) {
      const { error: message, statusCode, code } = handleApiError(error)

      console.error("API Error:", {
        requestId,
        path: request.nextUrl.pathname,
        method: request.method,
        error: message,
        code,
        statusCode,
      })

      return apiInternalError(message, {
        code,
        requestId,
        source: options?.source || API_CONFIG.DEFAULT_SOURCE,
      })
    }
  }
}

export function withErrorHandling(handler: ApiHandler, source?: string) {
  return createApiHandler(handler, { source })
}

export function withRateLimit(
  handler: ApiHandler,
  limiter: RateLimitType = "api",
  source?: string,
) {
  return createApiHandler(handler, { rateLimit: limiter, source })
}
