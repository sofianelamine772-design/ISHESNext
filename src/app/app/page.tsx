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
    let shouldRedirect = false;
    try {
      const { syncStudentStateOnLogin } = await import("@/app/actions/students");
      const result = await syncStudentStateOnLogin({
        clerkUserId: userId,
        email: userEmail,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        phone: user.phoneNumbers[0]?.phoneNumber || undefined,
      });

      if (!result.success) {
        shouldRedirect = true;
      }
    } catch (err) {
      console.error("Supabase Sync Error:", err);
      shouldRedirect = true;
    }

    if (shouldRedirect) {
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
