
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
      .select('id')
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
          parent_first_name: formData.parentPrenom,
          parent_last_name: formData.parentNom,
          status: 'en_attente'
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
          parent_first_name: formData.parentPrenom,
          parent_last_name: formData.parentNom,
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
    
    // On ne filtre plus les étudiants "en_attente" pour qu'ils soient visibles par l'administration
    
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

    // Ne pas afficher les étudiants "en_attente" (non payés)
    filtered = filtered.filter((s: any) => s.status !== 'en_attente');

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
  parent_first_name?: string;
  parent_last_name?: string;
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
        parent_first_name: data.parent_first_name,
        parent_last_name: data.parent_last_name,
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
    const { error } = await supabaseAdmin
      .from('etudiants')
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        parent_first_name: data.parent_first_name,
        parent_last_name: data.parent_last_name
      })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Update Student Error:", err);
    return { success: false, error: "Failed to update student profile" };
  }
}

export async function deleteStudentAction(id: string) {
  try {
    // 1. Delete from Clerk if it's a real user
    if (!id.startsWith('manual_') && !id.startsWith('temp_')) {
      const { clerkClient } = await import("@clerk/nextjs/server");
      try {
        const client = await clerkClient();
        await client.users.deleteUser(id);
        console.log(`Clerk user ${id} deleted successfully.`);
      } catch (clerkErr) {
        console.error(`Failed to delete Clerk user ${id}:`, clerkErr);
      }
    }

    // 2. Find all children if this student is a parent
    const { data: children } = await supabaseAdmin
      .from('etudiants')
      .select('id')
      .eq('parent_id', id);

    const idsToDelete = [id];
    if (children && children.length > 0) {
      children.forEach(c => idsToDelete.push(c.id));
    }

    // 3. Delete related records in Supabase for the student AND all their children
    // Using .in('etudiant_id', idsToDelete) to cover everything in one go
    await supabaseAdmin.from('inscriptions').delete().in('etudiant_id', idsToDelete);
    await supabaseAdmin.from('paiements').delete().in('etudiant_id', idsToDelete);
    
    // For messages, we only care about the parent ID usually, but let's cover all
    for (const studentId of idsToDelete) {
      await supabaseAdmin.from('messages').delete().eq('sender_id', studentId);
      await supabaseAdmin.from('messages').delete().eq('receiver_id', studentId);
    }

    // 4. Delete the children first (to avoid foreign key parent_id errors if no CASCADE)
    if (children && children.length > 0) {
      const childIds = children.map(c => c.id);
      await supabaseAdmin.from('etudiants').delete().in('id', childIds);
    }

    // 5. Delete the main student (parent)
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
          phone,
          parent_id
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

    // ── Enrichissement familial ──────────────────────────────────────────
    // Pour chaque paiement, on récupère tous les enfants couverts
    // (liés au payeur via parent_id) avec leurs inscriptions.
    const enriched = await Promise.all((data || []).map(async (p: any) => {
      const payer = Array.isArray(p.etudiants) ? p.etudiants[0] : p.etudiants;
      if (!payer) return { ...p, familyMembers: [] };

      const payerId = payer.id;

      // Chercher tous les enfants du payeur
      const { data: children } = await supabaseAdmin
        .from('etudiants')
        .select(`
          id, first_name, last_name, email,
          inscriptions (
            id, status, paid_status,
            formations ( title ),
            classes ( name, type )
          )
        `)
        .eq('parent_id', payerId);

      const familyMembers = (children || []).map((c: any) => ({
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
      console.warn("[SYNC ON LOGIN] Clerk ID mismatch or not authenticated");
      return { success: false, error: "Non autorisé" };
    }

    const { clerkUserId, email, firstName, lastName, phone } = profile;

    const getBaseEmail = (e: string) => {
      if (!e) return "";
      const parts = e.split('@');
      if (parts.length !== 2) return e;
      const username = parts[0].split('+')[0];
      return `${username}@${parts[1]}`.toLowerCase();
    };
    const baseEmail = getBaseEmail(email);

    // 1. Check if the student already exists under their clerkUserId
    let { data: etudiant } = await supabaseAdmin
      .from('etudiants')
      .select('*')
      .eq('id', clerkUserId)
      .maybeSingle();

    const emailPattern = `${baseEmail.split('@')[0]}%@${baseEmail.split('@')[1]}`;
    // 2. Find all students created manually or via Stripe with this email base
    const { data: potentialStudents, error: fetchErr } = await supabaseAdmin
      .from('etudiants')
      .select('*')
      .ilike('email', emailPattern);

    const tempEtudiants = potentialStudents?.filter(s => getBaseEmail(s.email) === baseEmail) || [];

    if (!etudiant) {
      // The user is logging in for the first time.
      const isAdmin = isAdminEmail(email);

      // On ne migre QUE la fiche temp qui appartient au parent lui-même (pas de parent_id)
      // Les enfants (qui ont un parent_id) sont déjà bien liés et ne doivent pas être migrés vers le Clerk ID parent.
      const exactMatch = tempEtudiants.find(s =>
        s.email.toLowerCase() === email.toLowerCase() &&
        s.id !== clerkUserId &&
        s.id.startsWith('temp_') &&
        !s.parent_id // ← Seulement si c'est le parent lui-même (pas un enfant)
      );

      if (exactMatch) {
        console.log(`[SYNC ON LOGIN] Migrating exact match temp student ${exactMatch.id} to ${clerkUserId}`);
        // 1. Temporarily rename email to avoid unique constraint
        await supabaseAdmin.from('etudiants').update({ email: exactMatch.email + '+migrated_' + Date.now() }).eq('id', exactMatch.id);
        
        // 2. Insert newParent
        const { data: newParent, error: insertError } = await supabaseAdmin
          .from('etudiants')
          .insert({
            id: clerkUserId,
            email: email,
            first_name: firstName || exactMatch.first_name || '',
            last_name: lastName || exactMatch.last_name || '',
            phone: phone || exactMatch.phone || '',
            role: isAdmin ? 'admin' : exactMatch.role || 'eleve',
            status: exactMatch.status || 'actif',
            parent_first_name: exactMatch.parent_first_name,
            parent_last_name: exactMatch.parent_last_name
          })
          .select('*')
          .single();

        if (insertError) {
          console.error('[SYNC ON LOGIN] Auto-create migrated parent error:', insertError);
          // Restore email just in case
          await supabaseAdmin.from('etudiants').update({ email: exactMatch.email }).eq('id', exactMatch.id);
          return { success: false, error: "Erreur lors de la création du profil" };
        }

        // 3. Migrate references
        await supabaseAdmin.from('inscriptions').update({ etudiant_id: clerkUserId }).eq('etudiant_id', exactMatch.id);
        await supabaseAdmin.from('paiements').update({ etudiant_id: clerkUserId }).eq('etudiant_id', exactMatch.id);
        await supabaseAdmin.from('etudiants').update({ parent_id: clerkUserId }).eq('parent_id', exactMatch.id);

        // 4. Delete old temp
        await supabaseAdmin.from('etudiants').delete().eq('id', exactMatch.id);

        etudiant = newParent;
      } else {
        // Si l'utilisateur n'est pas admin et qu'aucune inscription temporaire/manuelle n'existe pour cet email,
        // on ne crée pas de profil (cas d'un élève désinscrit/supprimé).
        if (!isAdmin && (!tempEtudiants || tempEtudiants.length === 0)) {
          console.warn(`[SYNC ON LOGIN] Connexion non autorisée ou élève désinscrit : ${email}`);
          return { success: false, error: "Profil non trouvé ou désinscrit" };
        }

        // We create a "Parent" or "Admin" profile with the Clerk ID
        const { data: newParent, error: insertError } = await supabaseAdmin
          .from('etudiants')
          .insert({
            id: clerkUserId,
            email: email,
            first_name: firstName || '',
            last_name: lastName || '',
            phone: phone || '',
            role: isAdmin ? 'admin' : 'parent',
            status: 'actif'
          })
          .select('*')
          .single();

        if (insertError) {
          console.error('[SYNC ON LOGIN] Auto-create parent/student error:', insertError);
          return { success: false, error: "Erreur lors de la création du profil" };
        }

        etudiant = newParent;
      }
    }

    // 3. Link all children to this parent (runs every login to catch newly added children)
    if (tempEtudiants && tempEtudiants.length > 0) {
      const childrenToLink = tempEtudiants.filter(child => child.id !== clerkUserId && child.parent_id !== clerkUserId);
      if (childrenToLink.length > 0) {
        console.log(`[SYNC ON LOGIN] Found ${childrenToLink.length} unlinked children for base email ${baseEmail}. Linking to parent ${clerkUserId}`);
        for (const child of childrenToLink) {
          await supabaseAdmin
            .from('etudiants')
            .update({ parent_id: clerkUserId })
            .eq('id', child.id);
        }
      }
    }

    // 4. Sync Stripe payments for all children of this parent
    if (etudiant) {
      // Find all children IDs (or just the parent ID if they have no separate children records)
      const { data: children } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .or(`id.eq.${clerkUserId},parent_id.eq.${clerkUserId}`);
      
      const familyIds = children ? children.map(c => c.id) : [clerkUserId];

      const { data: inscriptions } = await supabaseAdmin
        .from('inscriptions')
        .select('*')
        .in('etudiant_id', familyIds);

      const hasUnpaid = inscriptions?.some(ins => ins.paid_status === 'impaye' || ins.status === 'en_attente' || ins.status === 'en_attente_daffectation');
      const hasNoInscriptions = !inscriptions || inscriptions.length === 0;

      if (hasUnpaid || hasNoInscriptions) {
        console.log(`[SYNC ON LOGIN] Checking Stripe checkout sessions for ${email}...`);
        
        // List recent checkout sessions
        const sessions = await stripe.checkout.sessions.list({
          limit: 50
        });

        // Filter sessions by email or metadata or clerkUserId
        const matchingSessions = sessions.data.filter(session => 
          session.payment_status === 'paid' && 
          (getBaseEmail(session.customer_details?.email || '') === baseEmail || 
           getBaseEmail(session.metadata?.email || '') === baseEmail ||
           session.metadata?.clerkUserId === clerkUserId)
        );

        if (matchingSessions.length > 0) {
          console.log(`[SYNC ON LOGIN] Found ${matchingSessions.length} paid sessions. Syncing...`);
          
          for (const session of matchingSessions) {
            const formationId = session.metadata?.formationId;
            const slot = session.metadata?.slot;
            const sessionEmail = session.metadata?.email || session.customer_details?.email || '';


            // Resolve formation UUID
            let formationUuid = null;
            if (formationId) {
              const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(formationId);
              if (isUuid) {
                formationUuid = formationId;
              } else {
                const { data: formation } = await supabaseAdmin
                  .from('formations')
                  .select('id')
                  .eq('slug', formationId)
                  .maybeSingle();
                if (formation) formationUuid = formation.id;
              }
            }

            if (formationUuid) {
              let classId = null;
              if (slot) {
                const { data: classe } = await supabaseAdmin
                  .from('classes')
                  .select('id')
                  .ilike('day_of_week', slot)
                  .maybeSingle();
                if (classe) classId = classe.id;
              }

              // ── Récupérer tous les membres de la famille ────────────────
              // Parent (clerkUserId) + tous les enfants (parent_id = clerkUserId)
              const { data: allChildren } = await supabaseAdmin
                .from('etudiants')
                .select('id')
                .eq('parent_id', clerkUserId);

              const memberIds: string[] = [clerkUserId];
              if (allChildren) memberIds.push(...allChildren.map((c: any) => c.id));

              // Vérifier si le paiement a déjà été enregistré
              const { data: existingPayment } = await supabaseAdmin
                .from('paiements')
                .select('id')
                .eq('stripe_session_id', session.id)
                .maybeSingle();
              let paymentLogged = !!existingPayment;

              // ── Valider les inscriptions de TOUS les membres ────────────
              for (const memberId of memberIds) {
                const { data: existingIns } = await supabaseAdmin
                  .from('inscriptions')
                  .select('id')
                  .eq('etudiant_id', memberId)
                  .eq('formation_id', formationUuid)
                  .maybeSingle();

                let inscriptionId = null;
                if (existingIns) {
                  inscriptionId = existingIns.id;
                  await supabaseAdmin
                    .from('inscriptions')
                    .update({
                      class_id: classId || undefined,
                      status: 'valide',
                      paid_status: 'paye'
                    })
                    .eq('id', inscriptionId);
                } else {
                  const { data: newIns } = await supabaseAdmin
                    .from('inscriptions')
                    .insert({
                      etudiant_id: memberId,
                      formation_id: formationUuid,
                      class_id: classId,
                      status: 'valide',
                      paid_status: 'paye',
                      academic_year: getCurrentAcademicYear()
                    })
                    .select('id')
                    .single();
                  if (newIns) inscriptionId = newIns.id;
                }

                // Marquer actif
                await supabaseAdmin
                  .from('etudiants')
                  .update({ status: 'actif' })
                  .eq('id', memberId);

                // Log le paiement UNE SEULE FOIS (sur le premier membre)
                if (!paymentLogged && inscriptionId) {
                  await supabaseAdmin.from('paiements').insert({
                    inscription_id: inscriptionId,
                    etudiant_id: memberId,
                    stripe_session_id: session.id,
                    amount: (session.amount_total || 0) / 100,
                    currency: (session.currency || 'eur').toUpperCase(),
                    status: 'succeeded'
                  });
                  paymentLogged = true;
                  console.log(`[SYNC ON LOGIN] Logged payment for family (member: ${memberId}): ${session.id}`);
                }
              }
            }
          }
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("[SYNC ON LOGIN ERROR]", error);
    return { success: false, error: String(error) };
  }
}

export async function fetchPaymentsByStudentAction(studentId: string) {
  try {
    // ── 1. Récupérer l'étudiant et son contexte familial ────────────────
    const { data: etudiant } = await supabaseAdmin
      .from('etudiants')
      .select('id, email, parent_id, first_name, last_name')
      .eq('id', studentId)
      .maybeSingle();

    if (!etudiant) return { success: true, data: [] };

    // Déterminer l'ID du compte payeur (parent ou soi-même si pas d'enfants)
    // Si l'étudiant a un parent_id → le payeur est le parent
    // Sinon → le payeur c'est l'étudiant lui-même
    const payerId = etudiant.parent_id || etudiant.id;

    // Récupérer tous les enfants du payeur (fratrie)
    const { data: siblings } = await supabaseAdmin
      .from('etudiants')
      .select('id, first_name, last_name, inscriptions(id, status, paid_status, formations(title), classes(name))')
      .eq('parent_id', payerId);

    // Récupérer le profil du payeur
    const { data: payerProfile } = await supabaseAdmin
      .from('etudiants')
      .select('id, first_name, last_name, inscriptions(id, status, paid_status, formations(title), classes(name))')
      .eq('id', payerId)
      .maybeSingle();

    // ── 2. Construire la liste des membres de la famille couverts ────────
    const allMembers: { id: string; firstName: string; lastName: string; inscriptions: any[] }[] = [];

    if (payerProfile) {
      allMembers.push({
        id: payerProfile.id,
        firstName: payerProfile.first_name || '',
        lastName: payerProfile.last_name || '',
        inscriptions: Array.isArray(payerProfile.inscriptions) ? payerProfile.inscriptions : (payerProfile.inscriptions ? [payerProfile.inscriptions] : []),
      });
    }
    if (siblings) {
      siblings.forEach((s: any) => {
        allMembers.push({
          id: s.id,
          firstName: s.first_name || '',
          lastName: s.last_name || '',
          inscriptions: Array.isArray(s.inscriptions) ? s.inscriptions : (s.inscriptions ? [s.inscriptions] : []),
        });
      });
    }

    const isFamilyAccount = allMembers.length > 1;

    // ── 3. Récupérer les paiements du payeur (déduplication par session_id) ──
    const { data: payerPayments, error } = await supabaseAdmin
      .from('paiements')
      .select(`
        *,
        inscriptions (
          formations (title),
          classes (name)
        )
      `)
      .eq('etudiant_id', payerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // ── 4. Dédupliquer par stripe_session_id (évite les doublons de syncs) ─
    const seen = new Set<string>();
    const deduplicated = (payerPayments || []).filter((p: any) => {
      const key = p.stripe_session_id || p.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // ── 5. Enrichir chaque paiement avec le contexte familial ───────────
    const enriched = deduplicated.map((p: any) => {
      const paymentFormationTitle = p.inscriptions?.formations?.title;

      // Trouver l'inscription de l'étudiant correspondant à la formation de ce paiement spécifique
      const paymentFamilyMembers = allMembers.map(m => {
        const matchingIns = m.inscriptions.find((i: any) => i.formations?.title === paymentFormationTitle) || m.inscriptions[0];
        return {
          id: m.id,
          firstName: m.firstName,
          lastName: m.lastName,
          inscription: matchingIns || null
        };
      });

      return {
        ...p,
        isFamilyPayment: isFamilyAccount,
        familyMembersCount: isFamilyAccount ? allMembers.length : 1,
        familyMembers: isFamilyAccount ? paymentFamilyMembers : [],
      };
    });

    return { success: true, data: enriched };
  } catch (err) {
    console.error("Fetch Student Payments Error:", err);
    return { success: false, error: "Failed to fetch student payments" };
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
    const { clerkUserId } = profile;

    // Sync student state on login (handles missing Clerk ID migrations and Stripe webhook delays)
    await syncStudentStateOnLogin(profile);

    const { data: familyMembers, error: familyError } = await supabaseAdmin
      .from('etudiants')
      .select('*')
      .or(`id.eq.${clerkUserId},parent_id.eq.${clerkUserId}`);
    
    if (familyError || !familyMembers || familyMembers.length === 0) {
      console.error("No family members found for certificate:", clerkUserId, familyError);
      return { success: false, error: "Étudiant non trouvé" };
    }

    const familyIds = familyMembers.map((m: any) => m.id);

    const { data: inscriptions, error: iError } = await supabaseAdmin
      .from('inscriptions')
      .select(`
        id,
        etudiant_id,
        status,
        created_at,
        formations (title),
        classes (name, type, whatsapp_link)
      `)
      .in('etudiant_id', familyIds)
      .in('status', ['valide', 'actif', 'en_attente', 'en_attente_daffectation'])
      .order('created_at', { ascending: false });

    if (iError) {
      console.error("Error fetching active inscriptions for family:", familyIds, iError);
      return { success: false, error: "Aucune inscription active trouvée" };
    }

    // Map each child to their latest active inscription
    const childrenData = familyMembers
      .map((member: any) => {
        const memberInscriptions = inscriptions?.filter((i: any) => i.etudiant_id === member.id) || [];
        const latestInscription = memberInscriptions[0]; // Already ordered by created_at DESC
        
        if (!latestInscription) return null;

        const className = latestInscription.status === 'en_attente_daffectation'
          ? 'En attente d\'affectation'
          : (latestInscription.status === 'en_attente'
            ? 'En attente de validation'
            : ((latestInscription.classes as any)?.name || 'Session Standard'));

        return {
          id: member.id,
          firstName: member.first_name || '',
          lastName: member.last_name || '',
          email: member.email,
          dateJoined: member.created_at,
          inscriptionId: latestInscription.id,
          inscriptionDate: latestInscription.created_at,
          formationTitle: (latestInscription.formations as any)?.title || 'FORMATION ISHES',
          className: className,
          classType: (latestInscription.classes as any)?.type || 'distanciel',
          whatsappLink: (latestInscription.classes as any)?.whatsapp_link || null,
          status: latestInscription.status,
        };
      })
      .filter(Boolean); // Remove family members without active inscriptions

    if (childrenData.length === 0) {
      return { success: false, error: "Aucune inscription active trouvée pour cette famille." };
    }

    return {
      success: true,
      data: childrenData
    };
  } catch (err: any) {
    console.error("Certificate Data Error:", err);
    return { success: false, error: "Erreur lors de la récupération des données du certificat" };
  }
}


