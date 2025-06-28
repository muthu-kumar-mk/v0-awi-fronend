import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login'
  
  // Check for authentication by looking for the token in cookies
  // Note: We're checking for the existence of the 'userCred' item in localStorage
  // but since middleware runs on the server, we need to use cookies
  const authCookie = request.cookies.get('userCred')?.value
  const isAuthenticated = !!authCookie
  
  // Check if user is trying to access a protected route without being logged in
  if (!isPublicPath && !isAuthenticated) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Check if user is trying to access login page while already logged in
  if (isPublicPath && isAuthenticated) {
    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Continue with the request if none of the conditions are met
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Match all routes except for:
    // - API routes
    // - Static files (images, etc)
    // - Favicon
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}