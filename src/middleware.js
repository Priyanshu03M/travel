import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signUp'
  const token = request.cookies.get('token')?.value || ''
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  if (path === '/profile' && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  if (path.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    try {
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      const isAdmin = tokenPayload.isAdmin;

      if (!isAdmin) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }

}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signUp',
    '/admin/:path*',
  ]
}