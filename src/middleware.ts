
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  const { pathname } = request.nextUrl;

  const publicPaths = [
      '/',
      '/signup',
      '/otp-verification',
      '/create-password',
      '/forgot-password',
      '/password-success',
      '/set-password'
  ];

  if (!token && !publicPaths.some(path => pathname === path)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  if (token && publicPaths.some(path => pathname === path)) {
      // Redirect to dashboard if user is authenticated and tries to access public pages like login/signup
      return NextResponse.redirect(new URL('/organization/home', request.url));
  }

  return NextResponse.next();
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
     * - fonts (font files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
}
