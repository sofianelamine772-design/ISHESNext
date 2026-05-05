import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth-utils";

export default async function AppDispatcher() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

  // --- SYNC WITH SUPABASE ---
  if (userEmail) {
    try {
      const { supabase } = await import("@/lib/supabase");

      // On cherche si un profil existe déjà avec cet email (ex: via le formulaire d'inscription vitrine)
      const { data: existingUser } = await supabase
        .from('etudiants')
        .select('id')
        .eq('email', userEmail)
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
          .eq('email', userEmail);
      } else {
        // Sinon on crée un nouveau profil élève
        await supabase
          .from('etudiants')
          .insert({
            id: userId,
            email: userEmail,
            first_name: user.firstName,
            last_name: user.lastName,
            photo_url: user.imageUrl,
            role: isAdminEmail(userEmail) ? 'admin' : 'eleve',
            status: 'actif'
          });
      }
    } catch (err) {
      console.error("Supabase Sync Error:", err);
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
