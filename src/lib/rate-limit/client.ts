import { Redis } from "@upstash/redis"
import { env, isRedisEnabled } from "@/config/env"
import { RATE_LIMIT_CONFIGS } from "@/constants/rate-limit"
import { Ratelimit } from "@upstash/ratelimit"
import type { RateLimitConfig, RateLimitResult } from "@/types/rate-limit"

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
  strictIp: {
    requests: RATE_LIMIT_CONFIGS.STRICT_IP.REQUESTS,
    window: RATE_LIMIT_CONFIGS.STRICT_IP.WINDOW,
    prefix: RATE_LIMIT_CONFIGS.STRICT_IP.PREFIX,
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

export function resetRedisConnection(): void {
  if (redis) {
    redis = null
  }
}

function createRateLimiter(config: RateLimitConfig) {
  const redisInstance = getRedis()

  if (!redisInstance) {
    return null
  }

  return new Ratelimit({
    redis: redisInstance,
    limiter: Ratelimit.fixedWindow(config.requests, config.window),
    analytics: true,
    prefix: config.prefix,
  })
}

export const rateLimiters = {
  api: createRateLimiter(CONFIGS.api),
  auth: createRateLimiter(CONFIGS.auth),
  strict: createRateLimiter(CONFIGS.strict),
  strictIp: createRateLimiter(CONFIGS.strictIp),
}

export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit | null,
): Promise<RateLimitResult> {
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
