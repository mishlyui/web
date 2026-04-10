import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit, rateLimiters } from "@/config/rate-limit"
import { RATE_LIMIT_HEADERS, MIDDLEWARE_CONFIG } from "@/constants"
import { auth } from "@/features/auth/lib/server"
import type { RateLimitCheck, RateLimitRule, RateLimitRequestBody } from "@/types/rate-limit"

type RateLimiterType = keyof typeof rateLimiters

function getIP(request: NextRequest): string {
  return (
    request.headers.get(MIDDLEWARE_CONFIG.HEADERS.X_FORWARDED_FOR)?.split(",")[0]?.trim() ||
    request.headers.get(MIDDLEWARE_CONFIG.HEADERS.X_REAL_IP) ||
    MIDDLEWARE_CONFIG.DEFAULT_IP
  )
}

async function parseBody(request: NextRequest): Promise<RateLimitRequestBody | null> {
  try {
    return await request.clone().json()
  } catch {
    return null
  }
}

function findMatchingRule(pathname: string, rules: RateLimitRule[]): RateLimitRule | null {
  return rules.find((rule) => pathname.includes(rule.endpoint)) || null
}

function createIdentifier(prefix: string, value: string): string {
  return `${prefix}:${value}`
}

async function getUserId(request: NextRequest): Promise<string | null> {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    return session?.user?.id || null
  } catch {
    return null
  }
}

export function createRateLimitMiddleware(rules: RateLimitRule[]) {
  return async function withRateLimit(
    request: NextRequest,
    handler: (req: NextRequest) => Promise<Response>,
  ): Promise<NextResponse> {
    try {
      const pathname = new URL(request.url).pathname
      const rule = findMatchingRule(pathname, rules)

      if (!rule) {
        const response = await handler(request)
        return response instanceof NextResponse
          ? response
          : new NextResponse(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            })
      }

      const body = request.method === "POST" ? await parseBody(request) : null
      const userId = rule.requiresSession ? await getUserId(request) : null
      const checks = rule.getChecks(request, body, userId)

      let lastCheckResult: { remaining: number; reset: number } | null = null

      for (const check of checks) {
        const limiter = rateLimiters[check.limiter]
        const result = await checkRateLimit(check.identifier, limiter)

        lastCheckResult = { remaining: result.remaining, reset: result.reset }

        if (!result.success) {
          const retryAfter = Math.ceil((result.reset - Date.now()) / 1000)

          return NextResponse.json(
            {
              error: MIDDLEWARE_CONFIG.ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
              code: MIDDLEWARE_CONFIG.ERROR_CODES.RATE_LIMIT_EXCEEDED,
              retryAfter,
            },
            {
              status: MIDDLEWARE_CONFIG.HTTP_STATUS.TOO_MANY_REQUESTS,
              headers: {
                [RATE_LIMIT_HEADERS.REMAINING]: "0",
                [RATE_LIMIT_HEADERS.RESET]: result.reset.toString(),
                "Retry-After": retryAfter.toString(),
              },
            },
          )
        }
      }

      const response = await handler(request)

      const nextResponse =
        response instanceof NextResponse
          ? response
          : new NextResponse(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            })

      if (lastCheckResult) {
        nextResponse.headers.set(RATE_LIMIT_HEADERS.REMAINING, lastCheckResult.remaining.toString())
        nextResponse.headers.set(RATE_LIMIT_HEADERS.RESET, lastCheckResult.reset.toString())
      }

      return nextResponse
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      const pathname = new URL(request.url).pathname

      console.error(
        `${MIDDLEWARE_CONFIG.LOG_PREFIXES.MIDDLEWARE} Error in ${request.method} ${pathname}:`,
        {
          error: errorMessage,
          stack: error instanceof Error ? error.stack : undefined,
        },
      )

      return NextResponse.json(
        {
          error: MIDDLEWARE_CONFIG.ERROR_MESSAGES.INTERNAL_ERROR,
          code: MIDDLEWARE_CONFIG.ERROR_CODES.INTERNAL_ERROR,
        },
        { status: MIDDLEWARE_CONFIG.HTTP_STATUS.INTERNAL_ERROR },
      )
    }
  }
}

export const authRateLimitRules: RateLimitRule[] = [
  {
    endpoint: MIDDLEWARE_CONFIG.AUTH_ENDPOINTS.MAGIC_LINK,
    requiresSession: false,
    getChecks: (request, body) => {
      const checks: RateLimitCheck[] = []
      const ip = getIP(request)

      if (body?.email) {
        checks.push({
          limiter: "strict",
          identifier: createIdentifier(
            MIDDLEWARE_CONFIG.IDENTIFIER_PREFIXES.EMAIL,
            body.email.toLowerCase(),
          ),
        })

        checks.push({
          limiter: "strictIp",
          identifier: createIdentifier(MIDDLEWARE_CONFIG.IDENTIFIER_PREFIXES.IP, ip),
        })
      } else {
        checks.push({
          limiter: "strictIp",
          identifier: createIdentifier(MIDDLEWARE_CONFIG.IDENTIFIER_PREFIXES.IP, ip),
        })
      }

      return checks
    },
  },
  {
    endpoint: MIDDLEWARE_CONFIG.AUTH_ENDPOINTS.SOCIAL_SIGN_IN,
    requiresSession: true,
    getChecks: (request, body, userId) => {
      const checks: RateLimitCheck[] = []
      const ip = getIP(request)

      if (userId && body?.provider) {
        checks.push({
          limiter: "auth",
          identifier: createIdentifier(
            MIDDLEWARE_CONFIG.IDENTIFIER_PREFIXES.USER,
            `${userId}:${MIDDLEWARE_CONFIG.IDENTIFIER_PREFIXES.SOCIAL}:${body.provider}`,
          ),
        })
      } else if (body?.provider) {
        checks.push({
          limiter: "auth",
          identifier: createIdentifier(
            ip,
            `${MIDDLEWARE_CONFIG.IDENTIFIER_PREFIXES.SOCIAL}:${body.provider}`,
          ),
        })
      } else {
        checks.push({
          limiter: "auth",
          identifier: ip,
        })
      }

      return checks
    },
  },
  {
    endpoint: MIDDLEWARE_CONFIG.AUTH_ENDPOINTS.SIGN_IN,
    requiresSession: false,
    getChecks: (request) => [
      {
        limiter: "auth",
        identifier: getIP(request),
      },
    ],
  },
]

export const withAuthRateLimit = createRateLimitMiddleware(authRateLimitRules)
