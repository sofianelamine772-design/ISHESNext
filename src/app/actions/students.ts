
"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import Stripe from "stripe";
import { currentUser, auth, clerkClient } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/lib/auth-utils";
import { sendWelcomeEmail, sendPaymentReminderEmail } from "@/lib/mail";
import { getCurrentAcademicYear } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export async function registerStudentAction(formData: {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  niveau: string;
  planId: string;
  parentPrenom?: string;
  parentNom?: string;
  classId?: string;
}) {
  console.log("Starting registration for:", formData.email, "Plan:", formData.planId);
  try {
    console.log("Supabase URL Check:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "OK" : "MISSING");
    console.log("Supabase Key Check:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "MISSING");

    // 1. Enregistre/Met à jour l'étudiant
    let studentId = `temp_${Date.now()}`;

    console.log("Checking if student exists for email:", formData.email);
    const { data: existingStudent, error: fetchError } = await supabaseAdmin
      .from('etudiants')
      .select('id, status')
      .ilike('email', formData.email)
      .ilike('first_name', formData.prenom)
      .ilike('last_name', formData.nom)
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch existing student error details:", fetchError);
      throw new Error(`Supabase Fetch Error: ${fetchError.message}`);
    }
    console.log("Existing student check result:", existingStudent ? "Found" : "Not found");

    if (existingStudent) {
      studentId = existingStudent.id;
      const { error: updateError } = await supabaseAdmin
        .from('etudiants')
        .update({
          first_name: formData.prenom,
          last_name: formData.nom,
          phone: formData.telephone,
          // Ne pas rétrograder le statut d'un étudiant déjà actif
          ...(existingStudent.status !== 'actif' && existingStudent.status !== 'valide' && { status: 'en_attente' })
        })
        .eq('id', studentId);

      if (updateError) {
        console.error("Student Update Error:", updateError);
        throw updateError;
      }
    } else {
      const { error: insertError } = await supabaseAdmin
        .from('etudiants')
        .insert({
          id: studentId,
          email: formData.email,
          first_name: formData.prenom,
          last_name: formData.nom,
          phone: formData.telephone,
          status: 'en_attente'
        });

      if (insertError) {
        console.error("Student Insert Error:", insertError);
        throw insertError;
      }
    }

    // 2. Récupère ou crée la formation
    let { data: formation, error: fFetchError } = await supabaseAdmin
      .from('formations')
      .select('id')
      .eq('slug', formData.planId)
      .maybeSingle();

    if (fFetchError) console.error("Formation Fetch Error:", fFetchError);

    if (!formation) {
      console.log("Formation not found, creating:", formData.planId);
      const { data: newFormation, error: fError } = await supabaseAdmin
        .from('formations')
        .insert({
          title: formData.planId.replace(/_/g, ' ').replace(/-/g, ' ').toUpperCase(),
          slug: formData.planId,
          price: 150,
          type: 'distanciel'
        })
        .select()
        .single();

      if (fError) {
        console.error("Formation Creation Error:", fError);
        throw fError;
      }
      formation = newFormation;
    }

    // 3. Gestion de l'affectation (Auto pour Distanciel, Manuel pour Présentiel)
    const isPresentiel = formData.planId.toLowerCase().includes('standard') || formData.planId.toLowerCase().includes('presentiel');

    // Résolution de l'UUID de classe réel dans la base de données
    // On utilise external_id pour une correspondance exacte 1-to-1 avec le frontend
    let dbClassId: string | null = null;
    if (formData.classId) {
      if (formData.classId.includes('-')) {
        // Déjà un UUID Supabase → on l'utilise directement
        dbClassId = formData.classId;
      } else {
        // ID numérique de PRESENTIEL_CLASSES (ex: "1", "26")
        // On le mappe sur external_id en base de données
        const parsedId = parseInt(formData.classId);
        if (!isNaN(parsedId)) {
          const { data: matchedClass } = await supabaseAdmin
            .from('classes')
            .select('id')
            .eq('external_id', parsedId)
            .maybeSingle();

          if (matchedClass) {
            dbClassId = matchedClass.id;
            console.log(`✅ Resolved external_id ${parsedId} → DB UUID: ${dbClassId}`);
          } else {
            console.warn(`⚠️ No class found with external_id=${parsedId}. Student will be placed manually.`);
          }
        }
      }
    }

    if (isPresentiel) {
      console.log("Presentiel selected: Waiting for secretary assignment. Resolved Class ID:", dbClassId);

      const { data: existingIns, error: insFetchError } = await supabaseAdmin
        .from('inscriptions')
        .select('id')
        .eq('etudiant_id', studentId)
        .eq('formation_id', formation!.id)
        .maybeSingle();

      if (insFetchError) console.error("Inscription Fetch Error:", insFetchError);

      if (existingIns) {
        const { error: insError } = await supabaseAdmin
          .from('inscriptions')
          .update({
            status: 'en_attente_daffectation',
            class_id: dbClassId
          })
          .eq('id', existingIns.id);
        if (insError) throw insError;
      } else {
        const { error: insError } = await supabaseAdmin
          .from('inscriptions')
          .insert({
            etudiant_id: studentId,
            formation_id: formation!.id,
            class_id: dbClassId,
            status: 'en_attente_daffectation',
            academic_year: getCurrentAcademicYear()
          });
        if (insError) throw insError;
      }
    } else {
      // 3. Distanciel: Utilise la classe passée ou récupère la classe la plus récente pour cette formation
      let finalClassId = dbClassId;

      if (!finalClassId) {
        let { data: classe, error: cFetchError } = await supabaseAdmin
          .from('classes')
          .select('id')
          .eq('formation_id', formation!.id)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (cFetchError) console.error("Class Fetch Error:", cFetchError);

        if (!classe) {
          console.log("Class not found for formation, creating default class");
          const { data: newClass, error: cError } = await supabaseAdmin
            .from('classes')
            .insert({
              formation_id: formation!.id,
              name: `Session ${new Date().getFullYear()}`,
              type: 'distanciel',
              academic_year: getCurrentAcademicYear()
            })
            .select()
            .single();

          if (cError || !newClass) {
            console.error("Class Creation Error:", cError);
            throw cError || new Error("Failed to create default class");
          }
          finalClassId = newClass.id;
        } else {
          finalClassId = classe.id;
        }
      }

      // 4. Inscrit l'élève à la classe
      const { data: existingIns, error: insFetchError } = await supabaseAdmin
        .from('inscriptions')
        .select('id')
        .eq('etudiant_id', studentId)
        .eq('class_id', finalClassId)
        .maybeSingle();

      if (insFetchError) console.error("Inscription Fetch Error:", insFetchError);

      if (existingIns) {
        const { error: insError } = await supabaseAdmin
          .from('inscriptions')
          .update({ status: 'en_attente' })
          .eq('id', existingIns.id);
        if (insError) throw insError;
      } else {
        const { error: insError } = await supabaseAdmin
          .from('inscriptions')
          .insert({
            etudiant_id: studentId,
            formation_id: formation!.id,
            class_id: finalClassId,
            status: 'en_attente',
            academic_year: getCurrentAcademicYear()
          });
        if (insError) throw insError;
      }
    }

    console.log("Registration successful for:", formData.email);
    return { success: true };
  } catch (err: any) {
    console.error("Critical Action Error:", err.message || err);
    return { success: false, error: err.message || "Internal Server Error" };
  }
}

export async function fetchStudentsAction(academicYear?: string) {
  try {
    let query = supabaseAdmin
      .from('etudiants')
      .select(`
        *,
        inscriptions (
          status,
          paid_status,
          formation_id,
          class_id,
          academic_year,
          formations (title),
          classes (
            name,
            formations (title)
          )
        )
      `)
      .order('created_at', { ascending: false });

    // If we want to filter students by academic year, we'd ideally filter on inscriptions
    // For now, we'll fetch all students and filter later or let the frontend do it if complex, 
    // but we can filter by querying inscriptions specifically if needed.
    // If we want to filter students by academic year, we filter on inscriptions
    let { data, error } = await query;

    if (error) throw error;

    if (data && academicYear) {
      data = data.filter((student: any) =>
        !student.inscriptions ||
        student.inscriptions.length === 0 ||
        student.inscriptions.some((ins: any) => ins.academic_year === academicYear)
      );
    }

    // MASQUER LES PANIERS ABANDONNÉS (Étudiants n'ayant pas payé)
    if (data) {
      data = data.filter((student: any) => {
        // Les étudiants créés manuellement par l'admin restent toujours visibles
        if (student.id && String(student.id).startsWith('manual_')) return true;
        // Si l'étudiant est actif, valide, etc., on le garde
        if (student.status !== 'en_attente') return true;
        // S'il est 'en_attente', on vérifie s'il a au moins UNE inscription payée
        const hasPaidInscription = student.inscriptions?.some((ins: any) =>
          ins.paid_status === 'paye'
        );
        return hasPaidInscription;
      });

      // MASQUER LES PARENTS (qui n'ont pas d'inscriptions de cours propres mais seulement des enfants inscrits)
      data = data.filter((student: any) => {
        const isParentWithoutInscriptions = (!student.inscriptions || student.inscriptions.length === 0) &&
          !(student.id && String(student.id).startsWith('manual_'));
        return !isParentWithoutInscriptions;
      });
    }

    return { success: true, data };
  } catch (err) {
    console.error("Fetch Action Error:", err);
    return { success: false, error: "Failed to fetch students" };
  }
}

export async function fetchStudentByIdAction(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('etudiants')
      .select(`
        *,
        inscriptions (
          status,
          academic_year,
          formations (title),
          classes (name)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Fetch Student Detail Error:", err);
    return { success: false, error: "Failed to fetch student details" };
  }
}

// Met à jour le lien WhatsApp d'une classe (admin uniquement)
export async function updateClassWhatsappAction(classId: string, whatsappLink: string) {
  try {
    const { error } = await supabaseAdmin
      .from('classes')
      .update({ whatsapp_link: whatsappLink || null })
      .eq('id', classId);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("Update Class WhatsApp Error:", err);
    return { success: false, error: err.message };
  }
}

export async function fetchClassesAction(academicYear?: string) {
  try {
    let query = supabaseAdmin
      .from('classes')
      .select(`
        *,
        formations (title),
        inscriptions (
          status,
          etudiant_id,
          etudiants (first_name, last_name, email, created_at, status)
        )
      `);

    if (academicYear) {
      query = query.eq('academic_year', academicYear);
    }

    const { data: classes, error: cError } = await query;

    if (cError) throw cError;

    const formatted = classes.map((c: any) => ({
      id: c.id,
      name: c.name,
      type: c.type,
      capacity_limit: c.capacity_limit || 23,
      formationTitle: c.formations?.title,
      whatsappLink: c.whatsapp_link || null,
      students: c.inscriptions
        .filter((i: any) => i.status !== 'en_attente' && i.etudiants?.status !== 'en_attente')
        .map((i: any) => ({
          id: i.etudiant_id,
          name: `${i.etudiants?.first_name || ''} ${i.etudiants?.last_name || ''}`.trim(),
          email: i.etudiants?.email,
          avatar: (i.etudiants?.first_name?.[0] || '') + (i.etudiants?.last_name?.[0] || ''),
          dateJoined: new Date(i.etudiants?.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
        }))
    }));

    return { success: true, data: formatted };
  } catch (err) {
    console.error("Fetch Classes Error:", err);
    return { success: false, error: "Failed to fetch classes" };
  }
}

export async function assignStudentToClassAction(studentId: string, classId: string) {
  try {
    // 1. On récupère la formation liée à cette classe
    const { data: classe, error: classError } = await supabaseAdmin
      .from('classes')
      .select('formation_id')
      .eq('id', classId)
      .single();

    if (classError) throw classError;

    // 2. On vérifie s'il y a déjà une inscription en cours
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('inscriptions')
      .select('id')
      .eq('etudiant_id', studentId)
      .eq('formation_id', classe.formation_id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existing) {
      // Mise à jour de l'inscription existante
      const { error } = await supabaseAdmin
        .from('inscriptions')
        .update({
          class_id: classId,
          status: 'actif'
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Création d'une nouvelle inscription directe
      const { error } = await supabaseAdmin
        .from('inscriptions')
        .insert({
          etudiant_id: studentId,
          class_id: classId,
          formation_id: classe.formation_id,
          status: 'actif',
          academic_year: getCurrentAcademicYear()
        });

      if (error) throw error;
    }

    // 3. On passe l'étudiant en statut 'actif' s'il ne l'était pas
    await supabaseAdmin
      .from('etudiants')
      .update({ status: 'actif' })
      .eq('id', studentId);

    return { success: true };
  } catch (err) {
    console.error("Assign Class Error:", err);
    return { success: false, error: "Failed to assign student" };
  }
}

export async function sendMessageAction(receiverId: string, content: string) {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId: adminId } = await auth();

    if (!adminId) throw new Error("Unauthorized");

    const { error } = await supabaseAdmin
      .from('messages')
      .insert({
        sender_id: adminId,
        receiver_id: receiverId,
        content: content
      });

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("Send Message Error:", err);
    return { success: false, error: err.message || "Failed to send message" };
  }
}

export async function createClassAction(data: { name: string, type: 'distanciel' | 'presentiel', formation_id: string }) {
  try {
    const { data: newClass, error } = await supabaseAdmin
      .from('classes')
      .insert({
        name: data.name,
        type: data.type,
        formation_id: data.formation_id,
        is_active: true,
        academic_year: getCurrentAcademicYear()
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: newClass };
  } catch (err) {
    console.error("Create Class Error:", err);
    return { success: false, error: "Failed to create class" };
  }
}

export async function fetchStudentsWaitingAssignmentAction() {
  try {
    // On récupère les étudiants qui n'ont pas encore d'inscription ACTIVE dans une classe
    // ou qui ont un statut d'inscription 'en_attente_daffectation'
    const { data, error } = await supabaseAdmin
      .from('etudiants')
      .select(`
        id,
        first_name,
        last_name,
        email,
        inscriptions (
          id,
          status,
          class_id
        )
      `);

    if (error) throw error;

    // Filtrer côté serveur pour simplifier : 
    // On garde ceux qui n'ont AUCUNE inscription OU au moins une inscription sans class_id
    let filtered = data.filter((s: any) => {
      if (!s.inscriptions || s.inscriptions.length === 0) return true;
      return s.inscriptions.some((i: any) => !i.class_id || i.status === 'en_attente_daffectation');
    });

    // MASQUER LES PANIERS ABANDONNÉS
    filtered = filtered.filter((student: any) => {
      if (student.id && String(student.id).startsWith('manual_')) return true;
      if (student.status !== 'en_attente') return true;
      const hasPaidInscription = student.inscriptions?.some((ins: any) =>
        ins.paid_status === 'paye'
      );
      return hasPaidInscription;
    });

    return { success: true, data: filtered };
  } catch (err) {
    console.error("Fetch Waiting Students Error:", err);
    return { success: false, error: "Failed to fetch waiting students" };
  }
}

export async function fetchFormationsAction() {
  try {
    const { data, error } = await supabaseAdmin
      .from('formations')
      .select('*')
      .order('title');

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Fetch Formations Error:", err);
    return { success: false, error: "Failed to fetch formations" };
  }
}

export async function createStudentManualAction(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address?: string;
  payment_status?: string;
  payment_method?: string;
  amount_paid?: string;
}) {
  try {
    const status = data.payment_status === 'a_jour' ? 'actif' : 'en_attente';
    const studentId = `manual_${Date.now()}`;
    const { data: newStudent, error } = await supabaseAdmin
      .from('etudiants')
      .insert({
        id: studentId,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        status: status
      })
      .select()
      .single();

    if (error) throw error;

    // Si paiement manuel effectué, on l'enregistre dans 'paiements'
    if (data.payment_status === 'a_jour') {
      const amount = parseFloat(data.amount_paid || '150') || 150;
      const methodLabel = data.payment_method === 'liquide' ? 'Liquide' : 'Virement';
      await supabaseAdmin.from('paiements').insert({
        etudiant_id: studentId,
        stripe_session_id: `manual_${data.payment_method || 'virement'}_${Date.now()}`,
        amount: amount,
        currency: 'EUR',
        status: 'succeeded',
        error_message: `Paiement Manuel (${methodLabel})`
      });
    }

    // Envoi de l'email de bienvenue
    try {
      await sendWelcomeEmail(data.email, data.first_name || 'Élève');
    } catch (mailErr) {
      console.error("Failed to send welcome email:", mailErr);
    }

    // Création de l'invitation Clerk
    try {
      const client = await clerkClient();
      await client.invitations.createInvitation({
        emailAddress: data.email,
        publicMetadata: { role: 'etudiant' },
        ignoreExisting: true // Évite une erreur si l'utilisateur a déjà été invité
      });
      console.log(`Clerk invitation sent to ${data.email}`);
    } catch (clerkErr) {
      console.error("Failed to create Clerk invitation:", clerkErr);
    }

    return { success: true, data: newStudent };
  } catch (err) {
    console.error("Manual Student Creation Error:", err);
    return { success: false, error: "Failed to create student profile" };
  }
}

export async function sendPaymentReminderAction(studentId: string) {
  try {
    const { data: student, error } = await supabaseAdmin
      .from('etudiants')
      .select('email, first_name')
      .eq('id', studentId)
      .single();

    if (error || !student) throw new Error("Student not found");

    let clerkInvited = false;

    // Tenter TOUJOURS d'envoyer l'invitation Clerk si l'ID laisse penser qu'ils n'ont pas de compte
    // ou qu'on n'est pas sûr.
    try {
      const client = await clerkClient();
      await client.invitations.createInvitation({
        emailAddress: student.email,
        ignoreExisting: true, // Si l'invitation ou le compte existe, ça l'ignore au lieu de planter
      });
      clerkInvited = true;
      console.log(`[RELANCE] Invitation Clerk envoyée à ${student.email}`);
    } catch (inviteErr: any) {
      if (inviteErr?.errors?.[0]?.code !== 'form_identifier_exists') {
        console.error('[RELANCE_CLERK_INVITE_ERROR]', inviteErr);
      }
    }

    // Tenter l'email de relance standard (Resend)
    const result = await sendPaymentReminderEmail(student.email, student.first_name || 'Élève');

    // On ignore totalement l'erreur de Resend (domaine non vérifié) pour le moment,
    // car le plus important pour l'utilisateur est l'envoi de l'invitation Clerk.
    if (!result.success) {
      console.warn("[RESEND_WARNING] Relance email échouée, mais Clerk a géré l'invitation:", result.error);
      return {
        success: true,
        warning: clerkInvited
          ? "Invitation de création de compte Clerk envoyée avec succès !"
          : "Aucune action possible (erreur d'envoi classique)."
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Payment Reminder Error:", err);
    return { success: false, error: err.message || "Failed to send payment reminder" };
  }
}

export async function updateStudentAction(id: string, data: any) {
  try {
    const { data: currentStudent } = await supabaseAdmin
      .from('etudiants')
      .select('email')
      .eq('id', id)
      .single();

    let targetEmail = data.email;
    if (currentStudent && data.email) {
      const getBaseEmail = (e: string) => {
        if (!e) return "";
        const parts = e.split('@');
        if (parts.length !== 2) return e;
        return parts[0].split('+')[0].toLowerCase();
      };

      const currentBase = getBaseEmail(currentStudent.email);
      const newBase = getBaseEmail(data.email);

      if (currentBase === newBase) {
        targetEmail = currentStudent.email;
      }
    }

    const { error } = await supabaseAdmin
      .from('etudiants')
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
        email: targetEmail,
        phone: data.phone
      })
      .eq('id', id);

    if (error) throw error;

    // Check if billing status was just changed to paid
    if (data.payment_status === 'a_jour' && data._original_payment_status === 'en_attente') {
      const methodStr = data.payment_method || 'manual';
      const { error: pError } = await supabaseAdmin
        .from('paiements')
        .insert({
          etudiant_id: id,
          amount: parseInt(data.amount_paid) || 150,
          status: 'succeeded',
          currency: 'EUR',
          stripe_session_id: `manual_${methodStr}_${Date.now()}`
        });

      if (pError) console.error("Failed to add manual payment on update:", pError);

      // Débloquer l'étudiant (et toute la famille)
      const emailToUse = targetEmail || currentStudent?.email;
      if (emailToUse) {
        const baseEmail = emailToUse.split('@').length === 2
          ? `${emailToUse.split('@')[0].split('+')[0]}@${emailToUse.split('@')[1]}`.toLowerCase()
          : emailToUse.toLowerCase();

        const { data: familyMembers } = await supabaseAdmin
          .from('etudiants')
          .select('id')
          .eq('email', baseEmail);

        if (familyMembers && familyMembers.length > 0) {
          const familyIds = familyMembers.map(m => m.id);
          await supabaseAdmin
            .from('inscriptions')
            .update({ paid_status: 'paye' })
            .in('etudiant_id', familyIds)
            .eq('status', 'valide');
          console.log(`[ADMIN_MANUAL_UNLOCK] Restored paid_status to 'paye' for family:`, familyIds);
        }
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Update Student Error:", err);
    return { success: false, error: "Failed to update student profile" };
  }
}

export async function deleteStudentAction(id: string) {
  try {
    // 1. Fetch student
    const { data: studentToDelete } = await supabaseAdmin
      .from('etudiants')
      .select('email')
      .eq('id', id)
      .maybeSingle();

    if (!studentToDelete) return { success: true };

    // On supprime AUSSI par email pour nettoyer les comptes orphelins (invitations ou comptes non liés) si c'est le DERNIER élève avec cet email
    if (studentToDelete.email) {
      const { count } = await supabaseAdmin
        .from('etudiants')
        .select('*', { count: 'exact', head: true })
        .eq('email', studentToDelete.email);

      if (count && count <= 1) {
        try {
          const { clerkClient } = await import("@clerk/nextjs/server");
          const client = await clerkClient();
          const usersList = await client.users.getUserList({
            emailAddress: [studentToDelete.email]
          });
          if (usersList && usersList.data && usersList.data.length > 0) {
            for (const u of usersList.data) {
              await client.users.deleteUser(u.id);
              console.log(`Clerk user ${u.id} (${studentToDelete.email}) deleted successfully.`);
            }
          }
        } catch (clerkErr) {
          console.error(`Failed to delete Clerk user by email ${studentToDelete.email}:`, clerkErr);
        }
      }
    }

    // Delete records linked to this specific student row
    await supabaseAdmin.from('inscriptions').delete().eq('etudiant_id', id);
    await supabaseAdmin.from('paiements').delete().eq('etudiant_id', id);
    await supabaseAdmin.from('push_subscriptions').delete().eq('etudiant_id', id);
    await supabaseAdmin.from('messages').delete().eq('sender_id', id);
    await supabaseAdmin.from('messages').delete().eq('receiver_id', id);

    const { error } = await supabaseAdmin
      .from('etudiants')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("Delete Student Error:", err);
    return { success: false, error: err.message || "Failed to delete student" };
  }
}

export async function fetchPaymentsAction() {
  try {
    const { data, error } = await supabaseAdmin
      .from('paiements')
      .select(`
        *,
        etudiants (
          id,
          first_name,
          last_name,
          email,
          phone
        ),
        inscriptions (
          id,
          status,
          paid_status,
          formations (
            title
          ),
          classes (
            name,
            type
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const getBaseEmail = (e: string) => {
      if (!e) return '';
      const [local, domain] = e.toLowerCase().split('@');
      if (!domain) return e.toLowerCase();
      return `${local.split('+')[0]}@${domain}`;
    };

    // Enrichissement familial
    // Pour chaque paiement, on récupère tous les autres membres de la famille (même email de base)
    const enriched = await Promise.all((data || []).map(async (p: any) => {
      const payer = Array.isArray(p.etudiants) ? p.etudiants[0] : p.etudiants;
      if (!payer) return { ...p, familyMembers: [] };

      const baseEmail = getBaseEmail(payer.email);

      // Chercher tous les étudiants ayant le même email de base
      const { data: family } = await supabaseAdmin
        .from('etudiants')
        .select(`
          id, first_name, last_name, email,
          inscriptions (
            id, status, paid_status,
            formations ( title ),
            classes ( name, type )
          )
        `)
        .eq('email', baseEmail);

      const familyMembers = (family || []).map((c: any) => ({
        id: c.id,
        firstName: c.first_name,
        lastName: c.last_name,
        email: c.email,
        inscription: Array.isArray(c.inscriptions) ? c.inscriptions[0] : c.inscriptions,
      }));

      return { ...p, familyMembers };
    }));

    return { success: true, data: enriched };
  } catch (err) {
    console.error("Fetch Payments Error:", err);
    return { success: false, error: "Failed to fetch payments" };
  }
}

export async function fetchStudentTimetableAction(clerkUserId: string, email?: string) {
  try {
    let query = supabaseAdmin.from('etudiants').select('id');
    if (clerkUserId) {
      query = query.eq('id', clerkUserId);
    } else if (email) {
      query = query.ilike('email', email);
    }
    const { data: etudiant, error: eError } = await query.maybeSingle();
    if (eError || !etudiant) {
      console.log("Student not found for timetable query:", clerkUserId, email);
      return { success: true, data: [] };
    }

    const { data: inscriptions, error: iError } = await supabaseAdmin
      .from('inscriptions')
      .select(`
        status,
        classes (
          id,
          name,
          type,
          day_of_week,
          periode,
          niveau,
          age_condition,
          capacity_limit,
          whatsapp_link,
          external_id
        ),
        formations (
          title
        )
      `)
      .eq('etudiant_id', etudiant.id)
      .eq('status', 'valide');

    if (iError) throw iError;

    // Formater pour l'emploi du temps
    const formattedEvents = inscriptions
      .filter((ins: any) => ins.classes)
      .map((ins: any) => {
        const c = ins.classes;
        const dayMap: Record<string, string> = {
          lundi: "Lun",
          mardi: "Mar",
          mercredi: "Mer",
          jeudi: "Jeu",
          vendredi: "Ven",
          samedi: "Sam",
          dimanche: "Dim"
        };
        const dayOfWeek = c.day_of_week?.toLowerCase() || "";
        const mappedDay = dayMap[dayOfWeek] || "Lun";
        const isMatin = c.periode === "matin";

        let timeSlot = "18:30 - 20:00";
        if (dayOfWeek === "mercredi") timeSlot = "14:00 - 17:00";
        else if (dayOfWeek === "samedi") timeSlot = isMatin ? "09:00 - 12:00" : "13:30 - 16:30";
        else if (dayOfWeek === "dimanche") timeSlot = isMatin ? "11:30 - 14:30" : "13:30 - 16:30";
        else if (dayOfWeek === "lundi" || dayOfWeek === "mardi") timeSlot = "19:00 - 20:30";

        return {
          day: mappedDay,
          time: timeSlot,
          title: ins.formations?.title || c.name,
          className: c.name,
          niveau: c.niveau,
          ageCondition: c.age_condition,
          dayOfWeek: c.day_of_week,
          periode: c.periode,
          whatsappLink: c.whatsapp_link || null,
          type: c.type === "presentiel" ? "Présentiel (Salle ISHES)" : "Distanciel (Zoom)",
          color: c.type === "presentiel" ? "bg-[#086b51]/10 border-[#086b51]/20 text-[#086b51]" : "bg-blue-50 border-blue-100 text-blue-700"
        };
      });

    return { success: true, data: formattedEvents };
  } catch (err) {
    console.error("Fetch Student Timetable Error:", err);
    return { success: false, error: "Failed to fetch student timetable" };
  }
}

// Récupère les infos de classe pour la carte "Ma Classe" dans le dashboard élève
export async function fetchStudentClassInfoAction(clerkUserId: string, email?: string) {
  try {
    let query = supabaseAdmin.from('etudiants').select('id, first_name');
    if (clerkUserId) query = query.eq('id', clerkUserId);
    else if (email) query = query.ilike('email', email);
    const { data: etudiant } = await query.maybeSingle();
    if (!etudiant) return { success: true, data: null };

    const { data: inscription } = await supabaseAdmin
      .from('inscriptions')
      .select(`
        status,
        classes (
          id, name, type, day_of_week, periode,
          niveau, age_condition, whatsapp_link, external_id
        ),
        formations (title)
      `)
      .eq('etudiant_id', etudiant.id)
      .in('status', ['valide', 'actif', 'en_attente_daffectation'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!inscription) return { success: true, data: null };

    const c = inscription.classes as any;
    const dayOfWeek = c?.day_of_week?.toLowerCase() || "";
    const isMatin = c?.periode === "matin";

    let timeSlot = "18:30 - 20:00";
    if (dayOfWeek === "mercredi") timeSlot = "14:00 - 17:00";
    else if (dayOfWeek === "samedi") timeSlot = isMatin ? "09:00 - 12:00" : "13:30 - 16:30";
    else if (dayOfWeek === "dimanche") timeSlot = isMatin ? "11:30 - 14:30" : "13:30 - 16:30";
    else if (dayOfWeek === "lundi" || dayOfWeek === "mardi") timeSlot = "19:00 - 20:30";

    return {
      success: true,
      data: {
        status: inscription.status,
        formationTitle: (inscription.formations as any)?.title || null,
        className: c?.name || null,
        niveau: c?.niveau || null,
        ageCondition: c?.age_condition || null,
        dayOfWeek: c?.day_of_week || null,
        periode: c?.periode || null,
        timeSlot,
        whatsappLink: c?.whatsapp_link || null,
        isPresentiel: c?.type === "presentiel",
      }
    };
  } catch (err) {
    console.error("Fetch Student Class Info Error:", err);
    return { success: false, error: "Failed to fetch class info" };
  }
}

/**
 * Synchronise l'état d'un utilisateur Clerk lors de son login.
 * Nouvelle architecture simple :
 * - Cherche tous les étudiants avec le même email de base
 * - Met à jour leur clerk_user_id
 * - Crée un profil Supabase minimal si nécessaire (espace vide)
 */
export async function syncStudentStateOnLogin(profile: {
  clerkUserId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId || userId !== profile.clerkUserId) {
      return { success: false, error: "Non autorisé" };
    }

    const { clerkUserId, email, firstName, lastName, phone } = profile;
    const baseEmail = email.toLowerCase().split('@').length === 2
      ? `${email.toLowerCase().split('@')[0].split('+')[0]}@${email.toLowerCase().split('@')[1]}`
      : email.toLowerCase();

    // Chercher tous les étudiants ayant cet email de base
    const { data: familyStudents } = await supabaseAdmin
      .from('etudiants')
      .select('id, clerk_user_id')
      .eq('email', baseEmail);

    if (familyStudents && familyStudents.length > 0) {
      // Mettre à jour clerk_user_id pour tous les élèves de cette famille
      for (const student of familyStudents) {
        if (student.clerk_user_id !== clerkUserId) {
          await supabaseAdmin
            .from('etudiants')
            .update({ clerk_user_id: clerkUserId })
            .eq('id', student.id);
        }
      }
      console.log(`[SYNC_LOGIN] ${familyStudents.length} student(s) linked to ${clerkUserId} for ${baseEmail}`);
    } else {
      // Aucun élève trouvé pour cet email :
      // Cas admin ou parent dont les enfants ont été désinscrit.
      const isAdmin = isAdminEmail(email);

      // Vérifier s'il existe déjà un profil avec ce Clerk ID (cas reconnexion)
      const { data: existingByClerkId } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .eq('clerk_user_id', clerkUserId)
        .maybeSingle();

      if (!existingByClerkId) {
        if (!isAdmin) {
          console.warn(`[SYNC_LOGIN] Attempted unauthorized login for non-admin: ${email}`);
          return { success: false, error: "Non autorisé (aucun élève associé à cet email)" };
        }

        const { error: insertError } = await supabaseAdmin
          .from('etudiants')
          .insert({
            id: crypto.randomUUID(),
            email: baseEmail,
            first_name: firstName || '',
            last_name: lastName || '',
            phone: phone || '',
            role: 'admin',
            status: 'actif',
            clerk_user_id: clerkUserId,
          });

        if (insertError) {
          console.warn('[SYNC_LOGIN] Profile creation error:', insertError.message);
        } else {
          console.log(`[SYNC_LOGIN] Created minimal profile for ${baseEmail} (${clerkUserId})`);
        }
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('[SYNC_LOGIN] Error:', err);
    return { success: false, error: err.message };
  }
}



export async function fetchPaymentsByStudentAction(studentId: string) {
  try {
    // Récupérer l'étudiant pour obtenir son email
    const { data: etudiant } = await supabaseAdmin
      .from('etudiants')
      .select('id, email')
      .eq('id', studentId)
      .maybeSingle();

    if (!etudiant) return { success: true, data: [] };

    const getBaseEmail = (e: string) => {
      if (!e) return '';
      const [local, domain] = e.toLowerCase().split('@');
      if (!domain) return e.toLowerCase();
      return `${local.split('+')[0]}@${domain}`;
    };

    const baseEmail = getBaseEmail(etudiant.email);

    // Récupérer tous les membres de la famille (même email de base)
    const { data: familyStudents } = await supabaseAdmin
      .from('etudiants')
      .select('id, first_name, last_name, inscriptions(id, status, paid_status, formations(title), classes(name))')
      .eq('email', baseEmail);

    const allMembers = (familyStudents || []).map((s: any) => ({
      id: s.id,
      firstName: s.first_name || '',
      lastName: s.last_name || '',
      inscriptions: Array.isArray(s.inscriptions) ? s.inscriptions : (s.inscriptions ? [s.inscriptions] : []),
    }));

    const familyIds = allMembers.map(m => m.id);

    // Récupérer les paiements de toute la famille
    const { data: payments, error } = await supabaseAdmin
      .from('paiements')
      .select(`
        *,
        inscriptions (
          formations (title),
          classes (name)
        )
      `)
      .in('etudiant_id', familyIds)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Dédupliquer par stripe_session_id
    const seen = new Set<string>();
    const deduplicated = (payments || []).filter((p: any) => {
      const key = p.stripe_session_id || p.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Enrichir avec le contexte familial
    const enriched = deduplicated.map((p: any) => {
      const paymentFormationTitle = p.inscriptions?.formations?.title;
      const paymentFamilyMembers = allMembers
        .map(m => {
          const matchingIns = m.inscriptions.find((i: any) => i.formations?.title === paymentFormationTitle) || m.inscriptions[0];
          return { id: m.id, firstName: m.firstName, lastName: m.lastName, inscription: matchingIns || null };
        })
        .filter(member => member.inscription !== null);

      const activeFamilyCount = paymentFamilyMembers.length;
      return {
        ...p,
        isFamilyPayment: activeFamilyCount > 1,
        familyMembersCount: activeFamilyCount,
        familyMembers: activeFamilyCount > 1 ? paymentFamilyMembers : [],
      };
    });

    return { success: true, data: enriched };
  } catch (err) {
    console.error('Fetch Student Payments Error:', err);
    return { success: false, error: 'Failed to fetch student payments' };
  }
}


export async function fetchStudentCertificateDataAction(profile: {
  clerkUserId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) {
  try {
    const { clerkUserId, email } = profile;
    const baseEmail = email.toLowerCase().split('@').length === 2
      ? `${email.toLowerCase().split('@')[0].split('+')[0]}@${email.toLowerCase().split('@')[1]}`
      : email.toLowerCase();

    // Sync (créer le profil si absent, lier le clerk_user_id)
    await syncStudentStateOnLogin(profile);

    // Récupérer tous les élèves de cette famille (même email)
    const { data: familyMembers } = await supabaseAdmin
      .from('etudiants')
      .select('*')
      .eq('email', baseEmail);

    if (!familyMembers || familyMembers.length === 0) {
      return { success: true, data: [], isParentOnly: true };
    }

    const familyIds = familyMembers.map((m: any) => m.id);

    // Récupérer les inscriptions actives et payées
    const { data: inscriptions } = await supabaseAdmin
      .from('inscriptions')
      .select(`
        id,
        etudiant_id,
        status,
        paid_status,
        created_at,
        formations (title),
        classes (name, type, whatsapp_link)
      `)
      .in('etudiant_id', familyIds)
      .in('status', ['valide', 'actif', 'en_attente', 'en_attente_daffectation'])
      .order('created_at', { ascending: false });

    // Mapper chaque élève à son inscription la plus récente
    const childrenData = familyMembers
      .map((member: any) => {
        const isManual = member.id && String(member.id).startsWith('manual_');
        const memberInscriptions = (inscriptions || []).filter((i: any) =>
          i.etudiant_id === member.id &&
          (i.paid_status === 'paye' || i.paid_status === 'exonere' || isManual)
        );
        const latestInscription = memberInscriptions[0];
        if (!latestInscription) return null;

        const className = latestInscription.status === 'en_attente_daffectation'
          ? "En attente d'affectation"
          : latestInscription.status === 'en_attente'
            ? 'En attente de validation'
            : ((latestInscription.classes as any)?.name || 'Session Standard');

        return {
          id: member.id,
          firstName: member.first_name || '',
          lastName: member.last_name || '',
          email: member.email,
          dateJoined: member.created_at,
          inscriptionId: latestInscription.id,
          inscriptionDate: latestInscription.created_at,
          formationTitle: (latestInscription.formations as any)?.title || 'FORMATION ISHES',
          className,
          classType: (latestInscription.classes as any)?.type || 'distanciel',
          whatsappLink: (latestInscription.classes as any)?.whatsapp_link || null,
          status: latestInscription.status,
        };
      })
      .filter(Boolean);

    // Un compte peut exister sans inscription active (parent dont les enfants sont désinscrit)
    return { success: true, data: childrenData, isParentOnly: childrenData.length === 0 };
  } catch (err: any) {
    console.error('fetchStudentCertificateDataAction error:', err);
    return { success: false, error: 'Erreur lors du chargement du profil' };
  }
}

export async function exportAllStudentsDataAction() {
  try {
    const { data: etudiants, error } = await supabaseAdmin
      .from('etudiants')
      .select(`
        id, first_name, last_name, email, phone, created_at, status, role,
        inscriptions (
          id, status, paid_status,
          formations (title),
          classes (name)
        ),
        paiements (
          id, amount, status, created_at, stripe_session_id
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: etudiants };
  } catch (err) {
    console.error('Export error:', err);
    return { success: false, error: 'Failed to export data' };
  }
}

export async function sendPaymentReminderWithLinkAction(paymentId: string) {
  try {
    const { data: paiement } = await supabaseAdmin.from('paiements').select('*, etudiants(*)').eq('id', paymentId).single();
    if (!paiement) return { success: false, error: "Paiement introuvable" };

    const student = Array.isArray(paiement.etudiants) ? paiement.etudiants[0] : paiement.etudiants;
    if (!student || !student.email) return { success: false, error: "Étudiant ou email introuvable" };

    const amountInCents = Math.round(parseFloat(paiement.amount) * 100);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ishees.vercel.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: paiement.currency || 'eur',
            product_data: {
              name: 'Régularisation de paiement - ISHES',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/app/eleve?success=true`,
      cancel_url: `${appUrl}/app/eleve?canceled=true`,
      metadata: {
        clerkUserId: student.id,
        type: 'regularisation',
        originalPaymentId: paiement.id
      },
      customer_email: student.email
    });

    if (!session.url) return { success: false, error: "Erreur lors de la création du lien de paiement" };

    const { sendPaymentReminderEmail } = await import('@/lib/mail');
    const result = await sendPaymentReminderEmail(student.email, student.first_name || 'Élève', session.url);

    if (!result.success) {
      return { success: false, error: String(result.error) };
    }

    return { success: true };
  } catch (error: any) {
    console.error("sendPaymentReminderWithLinkAction error:", error);
    return { success: false, error: String(error) };
  }
}

export async function linkTypoRegistrationAction(typoEmail: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Vous devez être connecté pour effectuer cette action." };
    }

    const cleanTypoEmail = typoEmail.trim().toLowerCase();

    // 1. Récupérer le bon email de l'utilisateur connecté sur Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { success: false, error: "Utilisateur Clerk non trouvé." };
    }
    const correctEmail = clerkUser.primaryEmailAddress?.emailAddress?.toLowerCase();
    if (!correctEmail) {
      return { success: false, error: "Adresse email Clerk introuvable." };
    }

    // 2. Chercher les candidats correspondants dans la base de données
    const { data: candidates, error: fetchErr } = await supabaseAdmin
      .from('etudiants')
      .select('id, email, clerk_user_id')
      .eq('email', cleanTypoEmail);

    if (fetchErr || !candidates || candidates.length === 0) {
      return { 
        success: false, 
        error: "Aucune inscription trouvée avec cet e-mail. Veuillez vérifier l'orthographe exacte saisie lors du paiement." 
      };
    }

    // 3. Mettre à jour l'étudiant (et sa fratrie éventuelle) avec le bon e-mail et lier son compte Clerk ID
    const { error: updateErr } = await supabaseAdmin
      .from('etudiants')
      .update({
        email: correctEmail,
        clerk_user_id: userId
      })
      .eq('email', cleanTypoEmail);

    if (updateErr) {
      console.error("[LINK_ERROR] Failed to update student record:", updateErr);
      return { success: false, error: "Erreur technique lors de la mise à jour de votre inscription." };
    }

    console.log(`[LINK_SUCCESS] Linked typo email ${cleanTypoEmail} to ${correctEmail} for Clerk ID ${userId}`);
    return { success: true, message: "Votre inscription a été associée avec succès !" };
  } catch (err: any) {
    console.error("[LINK_ACTION_ERROR]", err);
    return { success: false, error: "Une erreur interne s'est produite lors de la liaison." };
  }
}
