
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get('auth_token')?.value;

  // Define public paths that don't require authentication
  const publicPaths = ['/', '/signup', '/forgot-password', '/set-password', '/otp-verification', '/create-password', '/password-success'];
  
  const isPublicPath = publicPaths.some(publicPath => path === publicPath);

  // If the user has an auth token and is trying to access a public page,
  // redirect them to the organization home.
  if (authToken && isPublicPath) {
    return NextResponse.redirect(new URL('/organization/home', request.url));
  }

  // If the user does not have an auth token and is trying to access a protected page,
  // redirect them to the login page.
  if (!authToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Otherwise, allow the request to proceed.
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
