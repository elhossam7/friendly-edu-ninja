import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('Content-Type', 'text/html; charset=utf-8')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.delete('X-XSS-Protection')
  response.headers.delete('X-Frame-Options')
  response.headers.delete('Expires')

  return response
}

export const config = {
  matcher: '/:path*',
}
