import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getCurrentAcademicYear } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

/** Normalise un email en supprimant le suffixe +xxx avant le @ */
function getBaseEmail(email: string): string {
  if (!email) return '';
  const [local, domain] = email.toLowerCase().split('@');
  if (!domain) return email.toLowerCase();
  return `${local.split('+')[0]}@${domain}`;
}

/**
 * Crée ou met à jour un étudiant par email + prénom + nom.
 * Retourne l'ID de l'étudiant.
 */
async function upsertStudent(params: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}): Promise<string | null> {
  const { email, firstName, lastName, phone } = params;
  const baseEmail = getBaseEmail(email);

  // Chercher un étudiant existant avec le même email et nom (doublon si même paiement)
  const { data: existing } = await supabaseAdmin
    .from('etudiants')
    .select('id')
    .eq('email', baseEmail)
    .ilike('first_name', firstName)
    .ilike('last_name', lastName)
    .maybeSingle();

  if (existing) {
    // Mise à jour du téléphone si disponible
    if (phone) {
      await supabaseAdmin.from('etudiants').update({ phone, status: 'actif' }).eq('id', existing.id);
    }
    return existing.id;
  }

  // Créer un nouvel étudiant avec un UUID généré côté app
  const newId = crypto.randomUUID();
  const { data: newStudent, error } = await supabaseAdmin
    .from('etudiants')
    .insert({
      id: newId,
      email: baseEmail,
      first_name: firstName,
      last_name: lastName,
      phone: phone || '',
      role: 'eleve',
      status: 'actif',
    })
    .select('id')
    .single();

  if (error) {
    console.error('[upsertStudent] Insert error:', error.message);
    return null;
  }

  return newStudent?.id || null;
}

/**
 * Résout l'UUID Supabase d'une formation à partir d'un slug ou UUID.
 * Retourne l'UUID de la formation ou null.
 */
async function resolveFormationUuid(formationId: string): Promise<string | null> {
  if (!formationId) return null;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(formationId);
  if (isUuid) return formationId;

  const { data } = await supabaseAdmin.from('formations').select('id').eq('slug', formationId).maybeSingle();
  if (data) return data.id;

  // Fallback presentiel-global
  const { data: fallback } = await supabaseAdmin.from('formations').select('id').eq('slug', 'presentiel-global').maybeSingle();
  return fallback?.id || null;
}

/**
 * Crée ou met à jour une inscription pour un étudiant.
 * Retourne l'ID de l'inscription.
 */
async function upsertInscription(params: {
  studentId: string;
  formationUuid: string;
  classId: string | null;
  academicYear: string;
}): Promise<string | null> {
  const { studentId, formationUuid, classId, academicYear } = params;
  const hasClass = !!classId;
  const targetStatus = hasClass ? 'valide' : 'en_attente_daffectation';

  const { data: existing } = await supabaseAdmin
    .from('inscriptions')
    .select('id')
    .eq('etudiant_id', studentId)
    .eq('formation_id', formationUuid)
    .eq('academic_year', academicYear)
    .maybeSingle();

  if (existing) {
    await supabaseAdmin
      .from('inscriptions')
      .update({ class_id: classId || undefined, status: targetStatus, paid_status: 'paye' })
      .eq('id', existing.id);
    return existing.id;
  }

  const { data: newIns, error } = await supabaseAdmin
    .from('inscriptions')
    .insert({
      etudiant_id: studentId,
      formation_id: formationUuid,
      class_id: classId,
      status: targetStatus,
      paid_status: 'paye',
      academic_year: academicYear,
    })
    .select('id')
    .single();

  if (error) {
    console.error('[upsertInscription] Insert error:', error.message);
    return null;
  }

  return newIns?.id || null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  const email = searchParams.get('email');

  if (!sessionId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      console.warn('[LOCAL_SUCCESS] Session not paid, skipping.');
      return NextResponse.redirect(new URL(`/sign-up?email_address=${encodeURIComponent(email || '')}`, req.url));
    }

    const payerEmail = getBaseEmail(
      session.metadata?.email || session.customer_details?.email || email || ''
    );
    const telephone = session.metadata?.telephone || '';
    const formationId = session.metadata?.formationId || '';
    const isRenewal = session.metadata?.isRenewal === 'true';
    const renewalYear = session.metadata?.renewalYear || getCurrentAcademicYear();
    const academicYear = getCurrentAcademicYear();

    console.log(`[LOCAL_SUCCESS] Processing session ${sessionId} for ${payerEmail}`);

    const formationUuid = await resolveFormationUuid(formationId);
    const studentIds: string[] = [];

    const isRegularisation = session.metadata?.type === 'regularisation';

    if (isRegularisation) {
      const studentId = session.metadata?.clerkUserId;
      console.log(`[LOCAL_SUCCESS] Processing regularisation payment for student ${studentId}`);
      if (studentId) {
        const { data: student } = await supabaseAdmin
          .from('etudiants')
          .select('email')
          .eq('id', studentId)
          .maybeSingle();

        if (student?.email) {
          const baseEmail = getBaseEmail(student.email);
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
          }
        }

        const originalPaymentId = session.metadata?.originalPaymentId;
        if (originalPaymentId) {
          await supabaseAdmin
            .from('paiements')
            .update({ status: 'succeeded', stripe_session_id: session.id })
            .eq('id', originalPaymentId);
        }
      }
      return NextResponse.redirect(new URL('/app/eleve?success=true', req.url));
    }

    if (isRenewal) {
      // Réinscription : l'étudiant existe déjà par ID
      const studentId = session.metadata?.studentId;
      if (studentId && formationUuid) {
        const insId = await upsertInscription({ studentId, formationUuid, classId: null, academicYear: renewalYear });
        if (insId) studentIds.push(studentId);
      }
    } else {
      // Nouvelle inscription — récupérer tous les élèves de la commande
      const childrenCount = parseInt(session.metadata?.childrenCount || '0', 10);

      if (childrenCount > 0) {
        // Mode famille : plusieurs élèves
        for (let i = 0; i < childrenCount; i++) {
          const firstName = session.metadata?.[`child_${i}_first`] || '';
          const lastName = session.metadata?.[`child_${i}_last`] || '';
          const classId = session.metadata?.[`child_${i}_classId`] || null;

          if (!firstName || !lastName) continue;

          const studentId = await upsertStudent({ email: payerEmail, firstName, lastName, phone: telephone });
          if (!studentId || !formationUuid) continue;

          const finalClassId = classId || null;
          const insId = await upsertInscription({ studentId, formationUuid, classId: finalClassId, academicYear });
          if (insId) studentIds.push(studentId);
        }
      } else {
        // Mode adulte seul
        const firstName = session.metadata?.first_name || '';
        const lastName = session.metadata?.last_name || '';
        const classId = session.metadata?.classId || null;

        if (firstName && lastName) {
          const studentId = await upsertStudent({ email: payerEmail, firstName, lastName, phone: telephone });
          if (studentId && formationUuid) {
            const insId = await upsertInscription({ studentId, formationUuid, classId, academicYear });
            if (insId) studentIds.push(studentId);
          }
        }
      }
    }

    // Logger le paiement (un seul paiement par session Stripe, lié au 1er étudiant)
    if (studentIds.length > 0) {
      const { data: existingPayment } = await supabaseAdmin
        .from('paiements')
        .select('id')
        .eq('stripe_session_id', session.id)
        .maybeSingle();

      if (!existingPayment) {
        await supabaseAdmin.from('paiements').insert({
          etudiant_id: studentIds[0],
          stripe_session_id: session.id,
          amount: (session.amount_total || 0) / 100,
          currency: (session.currency || 'eur').toUpperCase(),
          status: 'succeeded',
        });
      }
    }

    console.log(`[LOCAL_SUCCESS] Done. Created/updated ${studentIds.length} student(s) for ${payerEmail}`);

    return NextResponse.redirect(
      new URL(`/sign-up?email_address=${encodeURIComponent(payerEmail)}`, req.url)
    );
  } catch (error) {
    console.error('[LOCAL_SUCCESS_ERROR]', error);
    return NextResponse.redirect(
      new URL(`/sign-up?email_address=${encodeURIComponent(email || '')}`, req.url)
    );
  }
}
