import { NextRequest, NextResponse } from "next/server"
import { handleApiError, apiInternalError } from "@/lib/api"
import type { ResponseOptions } from "@/types"
import { API_CONFIG, API_HEADERS } from "@/constants/api"

type ApiHandler = (request: NextRequest, context?: any) => Promise<NextResponse> | NextResponse

interface HandlerOptions {
  auth?: boolean
  rateLimit?: boolean
  source?: string
}

export function createApiHandler(handler: ApiHandler, options?: HandlerOptions) {
  return async (request: NextRequest, context?: any) => {
    const startTime = Date.now()
    const requestId = crypto.randomUUID()

    try {
      const responseOptions: ResponseOptions = {
        requestId,
        source: options?.source || API_CONFIG.DEFAULT_SOURCE,
      }

      request.headers.set(API_HEADERS.REQUEST_ID, requestId)

      const response = await handler(request, context)

      const duration = Date.now() - startTime
      response.headers.set(API_HEADERS.REQUEST_ID, requestId)
      response.headers.set(API_HEADERS.RESPONSE_TIME, `${duration}ms`)

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
