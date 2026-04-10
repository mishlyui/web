import { auth } from "@/features/auth/lib/server"
import { toNextJsHandler } from "better-auth/next-js"
import { NextRequest } from "next/server"
import { withAuthRateLimit } from "@/lib/api"

const handler = toNextJsHandler(auth)

export async function POST(request: NextRequest) {
  return withAuthRateLimit(request, (req) => handler.POST(req))
}

export async function GET(request: NextRequest) {
  return withAuthRateLimit(request, (req) => handler.GET(req))
}
