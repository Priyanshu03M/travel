import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login'  || path === '/signUp'
    const token = request.cookies.get('token')?.value || ''
    console.log("token : ", token);
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if(path === '/profile' && !token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signUp',
  ]
}