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
      const { supabaseAdmin } = await import("@/lib/supabaseAdmin");

      // On cherche si un profil existe déjà avec cet email (ex: via le formulaire d'inscription vitrine)
      const { data: existingUser } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .ilike('email', userEmail)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingUser) {
        // Si c'est un ID temporaire, on le migre proprement en évitant les erreurs de clé étrangère
        if (existingUser.id.startsWith('temp_')) {
          const { migrateStudentIdInNode } = await import('@/app/actions/students');
          const { error: migrationError } = await migrateStudentIdInNode(existingUser.id, userId);
          if (migrationError) {
            console.error("Migration Error:", migrationError);
          }
        }
        
        // On met à jour les informations annexes sur le nouvel ID
        await supabaseAdmin
          .from('etudiants')
          .update({
            ...(user.firstName ? { first_name: user.firstName } : {}),
            ...(user.lastName ? { last_name: user.lastName } : {}),
            ...(user.imageUrl ? { photo_url: user.imageUrl } : {}),
            status: 'actif'
          })
          .eq('id', existingUser.id.startsWith('temp_') ? userId : existingUser.id);
      } else {
        // Sinon, si c'est un administrateur, on autorise la création de son compte
        if (isAdminEmail(userEmail)) {
          await supabaseAdmin
            .from('etudiants')
            .upsert({
              id: userId,
              email: userEmail,
              first_name: user.firstName,
              last_name: user.lastName,
              photo_url: user.imageUrl,
              role: 'admin',
              status: 'actif'
            }, { onConflict: 'id' });
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
