import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AUTH_COOKIE } from "@/constants/auth"
import { PUBLIC_ROUTES, AUTH_ROUTES, ROUTES } from "@/constants/routes"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const sessionToken = request.cookies.get(AUTH_COOKIE.SESSION_TOKEN)
  const isPublicPath = PUBLIC_ROUTES.some((path) => pathname === path)
  const isAuthRoute = AUTH_ROUTES.some((path) => pathname === path)

  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
  }

  if (!isPublicPath && !sessionToken) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
