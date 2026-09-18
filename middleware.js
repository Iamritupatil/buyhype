import * as clerkServerNs from "@clerk/nextjs/server";

// @clerk/nextjs/server ships as CommonJS. Under native Node ESM (how Vercel
// runs middleware.js as a Node.js function) the whole CJS module.exports
// object lands on the namespace's "default" key; under webpack's CJS interop
// (how Next's own build analyzes this file) named exports land directly on
// the namespace instead. A literal `.default` property access here would
// make webpack statically reject the import (it has no real default
// export), so the key is looked up dynamically to dodge that static check
// while still supporting both places named exports might actually live.
const DEFAULT_KEY = "default";
const clerkServer = clerkServerNs[DEFAULT_KEY] || clerkServerNs;
const { clerkMiddleware, createRouteMatcher } = clerkServer;

const isProtectedRoute = createRouteMatcher(["/alerts(.*)", "/api/alerts(.*)"]);

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
