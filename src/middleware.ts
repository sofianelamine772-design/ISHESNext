import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/', 
  '/program(.*)', 
  '/contact(.*)', 
  '/api/webhooks(.*)', 
  '/mentions-legales(.*)', 
  '/formation-enseignant(.*)', 
  '/campus(.*)', 
  '/conseil-spiritualite(.*)', 
  '/fr(.*)',
  '/institut(.*)',
  '/boutique(.*)',
  '/inscription(.*)'
]);
const isAdminRoute = createRouteMatcher(['/app/admin(.*)']);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // Protection de base pour les routes privées
  if (!userId && !isPublicRoute(request)) {
    return (await auth()).redirectToSignIn();
  }

  // Logique de rôle par email
  if (userId && isAdminRoute(request)) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

    const isAdmin = userEmail === process.env.ADMIN_EMAIL;

    // Si pas admin et essaie d'accéder au dashboard admin -> Redirection vers l'espace élève
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/app/eleve", request.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
