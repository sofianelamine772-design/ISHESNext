
"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function registerStudentAction(formData: {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  niveau: string;
  planId: string;
  parentPrenom?: string;
  parentNom?: string;
}) {
  console.log("Starting registration for:", formData.email, "Plan:", formData.planId);
  try {
    // 1. Enregistre/Met à jour l'étudiant
    const studentId = `temp_${Date.now()}`;
    const { error: studentError } = await supabaseAdmin
      .from('etudiants')
      .upsert({
        id: studentId,
        email: formData.email,
        first_name: formData.prenom,
        last_name: formData.nom,
        phone: formData.telephone,
        parent_first_name: formData.parentPrenom,
        parent_last_name: formData.parentNom,
        status: 'en_attente'
      }, { onConflict: 'email' });
    
    if (studentError) {
      console.error("Student Upsert Error:", studentError);
      throw studentError;
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
    
    if (isPresentiel) {
      console.log("Presentiel selected: Waiting for secretary assignment");
      // Pour le présentiel, on enregistre seulement l'intérêt pour la formation sans classe fixe
      const { error: insError } = await supabaseAdmin
        .from('inscriptions')
        .upsert({
          etudiant_id: studentId,
          formation_id: formation!.id, // On stocke la formation souhaitée
          status: 'en_attente_daffectation'
        }, { onConflict: 'etudiant_id, formation_id' });
      
      if (insError) throw insError;
    } else {
      // 3. Distanciel: Récupère la classe la plus récente pour cette formation
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
            type: 'distanciel'
          })
          .select()
          .single();
        
        if (cError) {
          console.error("Class Creation Error:", cError);
          throw cError;
        }
        classe = newClass;
      }

      // 4. Inscrit l'élève à la classe
      const { error: insError } = await supabaseAdmin
        .from('inscriptions')
        .upsert({
          etudiant_id: studentId,
          class_id: classe!.id,
          status: 'en_attente'
        }, { onConflict: 'etudiant_id, class_id' });
      
      if (insError) {
         console.error("Inscription Upsert Error:", insError);
         throw insError;
      }
    }

    console.log("Registration successful for:", formData.email);
    return { success: true };
  } catch (err: any) {
    console.error("Critical Action Error:", err.message || err);
    return { success: false, error: err.message || "Internal Server Error" };
  }
}

export async function fetchStudentsAction() {
  try {
    const { data, error } = await supabaseAdmin
      .from('etudiants')
      .select(`
        *,
        inscriptions (
          status,
          formation_id,
          class_id,
          formations (title)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Fetch Action Error:", err);
    return { success: false, error: "Failed to fetch students" };
  }
}

export async function fetchClassesAction() {
  try {
    // On récupère les classes avec les infos de formation
    const { data: classes, error: cError } = await supabaseAdmin
      .from('classes')
      .select(`
        *,
        formations (title),
        inscriptions (
          etudiant_id,
          etudiants (first_name, last_name, email, created_at)
        )
      `);
    
    if (cError) throw cError;

    const formatted = classes.map((c: any) => ({
      id: c.id,
      name: c.name,
      type: c.type,
      formationTitle: c.formations?.title,
      students: c.inscriptions.map((i: any) => ({
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
    const { error } = await supabaseAdmin
      .from('inscriptions')
      .update({ 
        class_id: classId,
        status: 'actif' 
      })
      .eq('etudiant_id', studentId);
    
    if (error) throw error;
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
