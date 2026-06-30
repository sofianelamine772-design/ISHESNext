import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/auth-utils";

/**
 * Centralized error logger. Logs to console with request context and, when DEBUG mode is enabled,
 * returns the error details in the response (only for development).
 */
function logError(err: unknown, context: { url?: string; route?: string } = {}) {
  const isDev = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_DEBUG_ERRORS === "true";
  const base = {
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
    ...context,
  };
  console.error("[ERROR]", JSON.stringify(base, null, 2));
  return isDev ? base : { message: "Internal Server Error" };
}


const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/program(.*)',
  '/contact(.*)',
  '/api/webhooks(.*)',
  '/api/checkout(.*)',
  '/api/classes(.*)',
  '/mentions-legales(.*)',
  '/cgv(.*)',
  '/politique-de-confidentialite(.*)',
  '/formation-enseignant(.*)',
  '/campus(.*)',
  '/conseil-spiritualite(.*)',
  '/fr(.*)',
  '/institut(.*)',
  '/boutique(.*)',
  '/inscription(.*)',
  '/test-positionnement(.*)',
  '/unauthorized(.*)',
  '/__clerk(.*)',
  '/manifest.json'
]);
const isAdminRoute = createRouteMatcher(['/app/admin(.*)']);

export default clerkMiddleware(async (auth, request) => {
  try {
    const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
    const keyType = pubKey.startsWith('pk_live_') ? 'PRODUCTION' : (pubKey.startsWith('pk_test_') ? 'TEST' : 'UNKNOWN');
    const maskedKey = pubKey ? `${pubKey.substring(0, 10)}...` : 'MISSING';
    
    console.log('\n--- [CLERK DEBUG LOG] ---');
    console.log(`URL: ${request.nextUrl.href}`);
    console.log(`Host: ${request.headers.get('host')}`);
    console.log(`Origin: ${request.headers.get('origin')}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`Clerk Key Type: ${keyType}`);
    console.log(`Clerk Publishable Key: ${maskedKey}`);
    console.log('-------------------------\n');

    const publicMatch = isPublicRoute(request);
    console.log('[PROXY] isPublicRoute:', publicMatch);
    // Redirection case-sensitive pour /CGV vers /cgv
    if (request.nextUrl.pathname === '/CGV') {
      return NextResponse.redirect(new URL('/cgv', request.url), 308);
    }

    const { userId } = await auth();

    // Protection de base pour les routes privées
    if (!userId && !publicMatch) {
      // Si c'est un appel API, on renvoie une 401 au lieu d'une redirection
      if (request.nextUrl.pathname.startsWith('/api')) {
        console.warn('[PROXY] Unauthorized API request to', request.nextUrl.pathname);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      console.warn('[PROXY] Unauthorized request, redirecting to sign-in:', request.nextUrl.pathname);
      return (await auth()).redirectToSignIn();
    }

    // Logique de rôle par email
    if (userId && isAdminRoute(request)) {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;
        const isAdmin = isAdminEmail(userEmail);
        if (!isAdmin) {
          return NextResponse.redirect(new URL("/app/eleve", request.url));
        }
      } catch (error: any) {
        if (error && (error.message === 'NEXT_REDIRECT' || String(error).includes('NEXT_REDIRECT'))) {
          throw error;
        }
        const errInfo = logError(error, { url: request.nextUrl.href, route: '/admin' });
        if (process.env.NODE_ENV !== 'production') {
          return NextResponse.json({ error: errInfo }, { status: 500 });
        }
        return (await auth()).redirectToSignIn();
      }
    }
    return NextResponse.next();
  } catch (outerErr: any) {
    if (outerErr && (outerErr.message === 'NEXT_REDIRECT' || String(outerErr).includes('NEXT_REDIRECT'))) {
      throw outerErr;
    }
    const errInfo = logError(outerErr, { url: request?.nextUrl?.href, route: 'proxy middleware' });
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({ error: errInfo }, { status: 500 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
});


export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|avif|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
};
