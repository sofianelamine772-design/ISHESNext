import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/auth-utils";

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/program(.*)',
  '/contact(.*)',
  '/api/webhooks(.*)',
  '/api/checkout(.*)',
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
  '/__clerk(.*)'
]);
const isAdminRoute = createRouteMatcher(['/app/admin(.*)']);

export default clerkMiddleware(async (auth, request) => {
  console.log('[PROXY] Incoming request:', request.nextUrl.href);
  const publicMatch = isPublicRoute(request);
  console.log('[PROXY] isPublicRoute:', publicMatch);
  // Continue with existing logic {
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

      // Si pas admin et essaie d'accéder au dashboard admin -> Redirection vers l'espace élève
      if (!isAdmin) {
          console.warn('[PROXY] Non-admin user attempted admin access, redirecting to /app/eleve');
          return NextResponse.redirect(new URL("/app/eleve", request.url));
        }
    } catch (error) {
      console.error('[PROXY] Clerk API Response Error in proxy.ts:', error);
      // If user fetch fails (e.g., user deleted in Clerk but cookie remains), redirect to sign-in
      return (await auth()).redirectToSignIn();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|__clerk|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', // Added __clerk exclusion
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
