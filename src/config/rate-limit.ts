import { Redis } from "@upstash/redis"
import { env, isRedisEnabled } from "@/config/env"
import { RATE_LIMIT_CONFIGS } from "@/constants/rate-limit"
import { Ratelimit, type Duration } from "@upstash/ratelimit"

export interface RateLimitConfig {
  requests: number
  window: Duration
  prefix?: string
}

const CONFIGS: Record<string, RateLimitConfig> = {
  api: {
    requests: RATE_LIMIT_CONFIGS.API.REQUESTS,
    window: RATE_LIMIT_CONFIGS.API.WINDOW,
    prefix: RATE_LIMIT_CONFIGS.API.PREFIX,
  },
  auth: {
    requests: RATE_LIMIT_CONFIGS.AUTH.REQUESTS,
    window: RATE_LIMIT_CONFIGS.AUTH.WINDOW,
    prefix: RATE_LIMIT_CONFIGS.AUTH.PREFIX,
  },
  strict: {
    requests: RATE_LIMIT_CONFIGS.STRICT.REQUESTS,
    window: RATE_LIMIT_CONFIGS.STRICT.WINDOW,
    prefix: RATE_LIMIT_CONFIGS.STRICT.PREFIX,
  },
}

let redis: Redis | null = null

function getRedis(): Redis | null {
  if (!isRedisEnabled) {
    return null
  }

  if (!redis) {
    redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    })
  }

  return redis
}

function createRateLimiter(config: RateLimitConfig) {
  const redisInstance = getRedis()

  if (!redisInstance) {
    return null
  }

  return new Ratelimit({
    redis: redisInstance,
    limiter: Ratelimit.slidingWindow(config.requests, config.window),
    analytics: true,
    prefix: config.prefix,
  })
}

export const rateLimiters = {
  api: createRateLimiter(CONFIGS.api),
  auth: createRateLimiter(CONFIGS.auth),
  strict: createRateLimiter(CONFIGS.strict),
}

export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit | null,
): Promise<{ success: boolean; remaining: number; reset: number }> {
  if (!limiter) {
    return { success: true, remaining: 999, reset: 0 }
  }

  const result = await limiter.limit(identifier)

  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  }
}
