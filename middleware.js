import { clerkMiddleware } from "@clerk/nextjs/server";

// No protected routes pre-launch — everything is public (landing page,
// coming-soon placeholders, and the Clerk waitlist). Middleware is still
// needed so Clerk can manage session/auth state and its own /__clerk
// auto-proxy path.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
