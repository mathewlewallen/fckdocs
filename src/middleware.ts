import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define routes that should NOT be protected
const isPublicRoute = createRouteMatcher([
  '/', // Marketing page
  '/sign-in(.*)', // Clerk sign-in routes
  '/sign-up(.*)', // Clerk sign-up routes
  '/(api)(.*)',
  '/(docs)(.*)',
  '/(legal)(.*)',
  // Add any other public routes here (e.g., '/about', '/pricing')
])

export default clerkMiddleware((auth, req) => {
  // Protect all routes that are not public
  if (!isPublicRoute(req)) {
    // Check if user is signed in, redirect to sign-in if not
    return auth().then(auth => {
      if (!auth.userId) {
        return auth.redirectToSignIn({ returnBackUrl: req.url });
      }
    });
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Run on API routes if needed, or exclude them if handled differently
    '/(api|trpc)(.*)', // Include API routes if they need auth check
  ],
}