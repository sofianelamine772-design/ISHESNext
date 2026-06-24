import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth-utils";

export default async function AppDispatcher() {
  const { userId } = await auth();
  
  let user = null;
  try {
    user = await currentUser();
  } catch (error) {
    console.error("Clerk API Response Error in AppDispatcher:", error);
  }

  if (!userId || !user) {
    redirect("/sign-in");
  }

  const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

  // --- SYNC WITH SUPABASE ---
  if (userEmail) {
    let shouldRedirectUnauthorized = false;

    try {
      const { supabase } = await import("@/lib/supabase");

      // On cherche si un profil existe déjà avec cet email (ex: via le formulaire d'inscription vitrine)
      const { data: existingUser } = await supabase
        .from('etudiants')
        .select('id')
        .ilike('email', userEmail)
        .single();

      if (existingUser) {
        // Si il existe, on met à jour l'ID temporaire par le vrai ID Clerk
        await supabase
          .from('etudiants')
          .update({
            id: userId,
            first_name: user.firstName,
            last_name: user.lastName,
            photo_url: user.imageUrl,
            status: 'actif'
          })
          .ilike('email', userEmail);
      } else {
        // Sinon, si c'est un administrateur, on autorise la création de son compte
        if (isAdminEmail(userEmail)) {
          await supabase
            .from('etudiants')
            .insert({
              id: userId,
              email: userEmail,
              first_name: user.firstName,
              last_name: user.lastName,
              photo_url: user.imageUrl,
              role: 'admin',
              status: 'actif'
            });
        } else {
          // Sinon (élève non inscrit / n'ayant pas payé et non invité) -> Bloqué et redirigé !
          shouldRedirectUnauthorized = true;
        }
      }
    } catch (err) {
      console.error("Supabase Sync Error:", err);
    }

    if (shouldRedirectUnauthorized) {
      redirect("/unauthorized");
    }
  }
  // --- END SYNC ---

  const isAdmin = isAdminEmail(userEmail);

  if (isAdmin) {
    redirect("/app/admin");
  } else {
    redirect("/app/eleve");
  }

  return null;
}
