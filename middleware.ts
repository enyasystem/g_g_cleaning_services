import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for your auth cookie (set on login)
    const isAuthenticated = request.cookies.get('admin-auth')?.value === 'true';
    if (!isAuthenticated) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }
  return NextResponse.next();
}

// Apply middleware only to /admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
