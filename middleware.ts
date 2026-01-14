import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getIronSession } from "iron-session"
import type { SessionData } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Protected routes that require authentication
  const protectedPaths = ["/admin", "/checkout"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath) {
    try {
      const session = await getIronSession<SessionData>(request.cookies, response.cookies, {
        password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long_for_security",
        cookieName: "voucher_session",
        cookieOptions: {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        },
      })

      if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL(`/auth/login?redirect=${request.nextUrl.pathname}`, request.url))
      }
    } catch (error) {
      console.error("Middleware error:", error)
      return NextResponse.redirect(new URL(`/auth/login?redirect=${request.nextUrl.pathname}`, request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
