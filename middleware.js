import { clerkMiddleware } from "@clerk/nextjs/server";

const PROTECTED_PATH_PATTERNS = [/^\/alerts(?:\/.*)?$/, /^\/api\/alerts(?:\/.*)?$/];

// Clerk's createRouteMatcher reads req.nextUrl.pathname, a Next.js-specific
// property that isn't present on the plain Fetch API Request Vercel passes
// to middleware here. Match against req.url directly instead, which every
// Request object has regardless of runtime.
function isProtectedRoute(req) {
  const pathname = new URL(req.url).pathname;
  return PROTECTED_PATH_PATTERNS.some((pattern) => pattern.test(pathname));
}

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
