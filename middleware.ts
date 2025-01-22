// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)', '/sign-up(.*)',
//   '/',
//  '/api/clerk/webhook(.*)',
// ])

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect()
//   }
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }


// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/sign-in(.*)',
//   '/sign-up(.*)',
//   '/api/webhooks(.*)',
//   // '/api/initial-sync(.*)',
//   // '/api/aurinko/webhook(.*)',
//   // '/api/stripe(.*)',
//   // '/privacy',
//   // '/terms-of-service'
// ])

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }

// })


// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };



// // src/middleware.ts
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// // Define routes that are public (do not require authentication)
// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)', '/sign-up(.*)', '/', '/api/clerk/webhook(.*)',
// ]);

// // Define your middleware logic
// export default clerkMiddleware(async (auth, request) => {
//   // If the route is not public, protect it with Clerk authentication
//   if (!isPublicRoute(request)) {
//     await auth.protect(); // Protect the route, i.e., require authentication
//   }
// });

// // Specify matcher for your middleware to apply to the correct routes
// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)', // Always run for API routes
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    '/sign-in(.*)', '/sign-up(.*)',
  '/',
  '/api/clerk/webhook(.*)',
]); // Adjust paths as needed

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Protect the route and handle unauthorized access
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files (e.g., CSS, JS, images, etc.)
    '/((?!_next|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
