
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  const { pathname } = request.nextUrl;

  // If there's no token and the user is trying to access a protected route, redirect to login.
  if (!token && pathname.startsWith('/organization')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  
  // If the user is logged in and tries to access the login page, redirect them to their home.
  if (token && (pathname === '/' || pathname === '/signup')) {
     const url = request.nextUrl.clone()
     url.pathname = '/organization/home'
     return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
