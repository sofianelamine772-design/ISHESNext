
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
    console.log("Supabase URL Check:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "OK" : "MISSING");
    console.log("Supabase Key Check:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "MISSING");

    // 1. Enregistre/Met à jour l'étudiant
    let studentId = `temp_${Date.now()}`;
    
    console.log("Checking if student exists for email:", formData.email);
    const { data: existingStudent, error: fetchError } = await supabaseAdmin
      .from('etudiants')
      .select('id')
      .eq('email', formData.email)
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
    
    if (isPresentiel) {
      console.log("Presentiel selected: Waiting for secretary assignment");
      
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
          .update({ status: 'en_attente_daffectation' })
          .eq('id', existingIns.id);
        if (insError) throw insError;
      } else {
        const { error: insError } = await supabaseAdmin
          .from('inscriptions')
          .insert({
            etudiant_id: studentId,
            formation_id: formation!.id,
            status: 'en_attente_daffectation'
          });
        if (insError) throw insError;
      }
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
      const { data: existingIns, error: insFetchError } = await supabaseAdmin
        .from('inscriptions')
        .select('id')
        .eq('etudiant_id', studentId)
        .eq('class_id', classe!.id)
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
            class_id: classe!.id,
            status: 'en_attente'
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
          formations (title),
          classes (
            name,
            formations (title)
          )
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

export async function fetchStudentByIdAction(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('etudiants')
      .select(`
        *,
        inscriptions (
          status,
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
          status: 'actif'
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
        is_active: true
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
    const filtered = data.filter((s: any) => {
      if (!s.inscriptions || s.inscriptions.length === 0) return true;
      return s.inscriptions.some((i: any) => !i.class_id || i.status === 'en_attente_daffectation');
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
  parent_first_name?: string;
  parent_last_name?: string;
  address?: string;
}) {
  try {
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
        status: 'en_attente' // Utilisation du statut correct pour la table etudiants
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: newStudent };
  } catch (err) {
    console.error("Manual Student Creation Error:", err);
    return { success: false, error: "Failed to create student profile" };
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
        parent_last_name: data.parent_last_name,
        address: data.address
      })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Update Student Error:", err);
    return { success: false, error: "Failed to update student profile" };
  }
}

export async function fetchPaymentsAction() {
  try {
    const { data, error } = await supabaseAdmin
      .from('paiements')
      .select(`
        *,
        etudiants (
          first_name,
          last_name,
          email,
          phone
        ),
        inscriptions (
          classes (
            formations (
              title
            )
          )
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Fetch Payments Error:", err);
    return { success: false, error: "Failed to fetch payments" };
  }
}
