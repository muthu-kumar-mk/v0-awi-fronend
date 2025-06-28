import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login'
  
  // Get the token from cookies or localStorage (in this case from cookies)
  const token = request.cookies.get('userCred')?.value
  
  // Check if user is trying to access a protected route without being logged in
  if (!isPublicPath && !token) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Check if user is trying to access login page while already logged in
  if (isPublicPath && token) {
    // Redirect to dashboard or home page
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