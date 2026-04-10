import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PUBLIC_ROUTES } from "@/constants/routes"
import { AUTH_COOKIE } from "@/constants/auth"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const isPublicPath = PUBLIC_ROUTES.some((path) => pathname === path)

  if (isPublicPath) {
    return NextResponse.next()
  }

  const sessionToken = request.cookies.get(AUTH_COOKIE.SESSION_TOKEN)

  if (!sessionToken) {
    const loginUrl = new URL(PUBLIC_ROUTES[1], request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
