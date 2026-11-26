// Leftover WordPress URLs from the site's previous life. Answer 410 Gone so
// Google drops them for good instead of retrying 403s/404s.
export function proxy() {
  return new Response('Gone', {
    status: 410,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex' },
  })
}

export const config = {
  matcher: [
    '/wp-json/:path*',
    '/wp-content/:path*',
    '/wp-admin/:path*',
    '/wp-includes/:path*',
    '/wp-login.php',
    '/xmlrpc.php',
  ],
}
