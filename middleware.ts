import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if the path is for a protected route
  const isProtectedRoute = 
    path !== '/login' && 
    !path.startsWith('/api/') && 
    !path.includes('/_next/') &&
    !path.includes('/favicon.ico') &&
    !path.includes('/no-internet') &&
    !path.includes('/not-found') &&
    !path.includes('/unauthorized') &&
    !path.includes('/server-error')

  // Get the token from the cookies
  const token = request.cookies.get('userCred')?.value

  // If it's a protected route and there's no token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Continue with the request
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}