import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isDashboardRoute = path.startsWith('/dashboard');
  const isAdminApiRoute = path.startsWith('/api/admin');

  if (isDashboardRoute || isAdminApiRoute) {
    const token = request.cookies.get('portfolio_admin_session')?.value;

    if (!token) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', path);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/admin/:path*'],
};
