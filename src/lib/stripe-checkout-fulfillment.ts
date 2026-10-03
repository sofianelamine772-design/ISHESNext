import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getCurrentAcademicYear } from '@/lib/utils';
import { getExpectedAmountForChild } from '@/lib/pricing';
import { insertPaiementWithStripeAccount } from '@/lib/paiements-insert';
import type { StripeAccountId } from '@/lib/stripe-accounts';

/** Normalise un email en supprimant le suffixe +xxx avant le @ */
export function getBaseEmail(email: string): string {
  if (!email) return '';
  const [local, domain] = email.toLowerCase().split('@');
  if (!domain) return email.toLowerCase();
  return `${local.split('+')[0]}@${domain}`;
}

async function upsertStudent(params: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}): Promise<string | null> {
  const { email, firstName, lastName, phone } = params;
  const baseEmail = getBaseEmail(email);

  const { data: existing } = await supabaseAdmin
    .from('etudiants')
    .select('id')
    .eq('email', baseEmail)
    .ilike('first_name', firstName)
    .ilike('last_name', lastName)
    .maybeSingle();

  if (existing) {
    if (phone) {
      await supabaseAdmin.from('etudiants').update({ phone, status: 'actif' }).eq('id', existing.id);
    }
    return existing.id;
  }

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
    console.error('[fulfillment upsertStudent]', error.message);
    return null;
  }

  return newStudent?.id || null;
}

async function resolveFormationUuid(formationId: string): Promise<string | null> {
  if (!formationId) return null;
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      formationId,
    );
  if (isUuid) return formationId;

  const { data } = await supabaseAdmin
    .from('formations')
    .select('id')
    .eq('slug', formationId)
    .maybeSingle();
  if (data) return data.id;

  const { data: fallback } = await supabaseAdmin
    .from('formations')
    .select('id')
    .eq('slug', 'presentiel-global')
    .maybeSingle();
  return fallback?.id || null;
}

async function upsertInscription(params: {
  studentId: string;
  formationUuid: string;
  classId: string | null;
  academicYear: string;
  expectedAmount?: number;
}): Promise<string | null> {
  const { studentId, formationUuid, academicYear, expectedAmount } = params;
  let resolvedClassId = params.classId;

  if (!resolvedClassId) {
    const { data: activeClass } = await supabaseAdmin
      .from('classes')
      .select('id')
      .eq('formation_id', formationUuid)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (activeClass) {
      resolvedClassId = activeClass.id;
    } else {
      const { data: formation } = await supabaseAdmin
        .from('formations')
        .select('type')
        .eq('id', formationUuid)
        .maybeSingle();

      if (formation?.type !== 'presentiel') {
        const { data: newClass } = await supabaseAdmin
          .from('classes')
          .insert({
            formation_id: formationUuid,
            name: `Session ${new Date().getFullYear()}`,
            type: 'distanciel',
            academic_year: academicYear,
            is_active: true,
          })
          .select('id')
          .maybeSingle();
        if (newClass) resolvedClassId = newClass.id;
      }
    }
  }

  const hasClass = !!resolvedClassId;
  const targetStatus = hasClass ? 'actif' : 'en_attente';

  const { data: existing } = await supabaseAdmin
    .from('inscriptions')
    .select('id')
    .eq('etudiant_id', studentId)
    .eq('formation_id', formationUuid)
    .eq('academic_year', academicYear)
    .maybeSingle();

  if (existing) {
    const updatePayload: Record<string, unknown> = {
      class_id: resolvedClassId || undefined,
      status: targetStatus,
      paid_status: 'paye',
    };
    if (expectedAmount !== undefined) updatePayload.expected_amount = expectedAmount;
    await supabaseAdmin.from('inscriptions').update(updatePayload).eq('id', existing.id);
    return existing.id;
  }

  const insertPayload: Record<string, unknown> = {
    etudiant_id: studentId,
    formation_id: formationUuid,
    class_id: resolvedClassId,
    status: targetStatus,
    paid_status: 'paye',
    academic_year: academicYear,
  };
  if (expectedAmount !== undefined) insertPayload.expected_amount = expectedAmount;

  const { data: newIns, error } = await supabaseAdmin
    .from('inscriptions')
    .insert(insertPayload)
    .select('id')
    .single();

  if (error) {
    console.error('[fulfillment upsertInscription]', error.message);
    return null;
  }
  return newIns?.id || null;
}

async function scheduleClassAssignmentEmail(
  email: string,
  firstName: string,
  className: string,
  whatsappLink: string,
) {
  try {
    const { sendClassAssignmentEmail } = await import('@/lib/mail');
    await sendClassAssignmentEmail(email, firstName, className, whatsappLink);
  } catch (err) {
    console.error('[fulfillment] WhatsApp email error:', err);
  }
}

export type FulfillCheckoutResult = {
  ok: boolean;
  skipped?: boolean;
  reason?: string;
  payerEmail: string;
  studentIds: string[];
  sessionId: string;
  stripeAccount: StripeAccountId;
};

/**
 * Même logique que le webhook `checkout.session.completed`.
 * Utilisé par le webhook et par la récupération admin des paiements manqués.
 */
export async function fulfillCheckoutSession(params: {
  session: Stripe.Checkout.Session;
  stripeAccount: StripeAccountId;
  /** Si true, n’envoie pas mails / invitation Clerk (dry-run partiel). */
  skipSideEffects?: boolean;
}): Promise<FulfillCheckoutResult> {
  const { session, stripeAccount, skipSideEffects = false } = params;
  const sessionId = session.id;

  if (session.payment_status !== 'paid') {
    return {
      ok: false,
      skipped: true,
      reason: `payment_status=${session.payment_status}`,
      payerEmail: '',
      studentIds: [],
      sessionId,
      stripeAccount,
    };
  }

  const payerEmail = getBaseEmail(
    session.metadata?.email || session.customer_details?.email || '',
  );
  const telephone = session.metadata?.telephone || '';
  const formationId = session.metadata?.formationId || '';
  const isRenewal = session.metadata?.isRenewal === 'true';
  const renewalYear = session.metadata?.renewalYear || getCurrentAcademicYear();
  const academicYear = getCurrentAcademicYear();
  const clerkUserId = session.metadata?.clerkUserId || null;
  const isRegularisation = session.metadata?.type === 'regularisation';

  const formationUuid = await resolveFormationUuid(formationId);
  const studentIds: string[] = [];

  if (isRegularisation) {
    const studentId = session.metadata?.clerkUserId;
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
          await supabaseAdmin
            .from('inscriptions')
            .update({ paid_status: 'paye' })
            .in(
              'etudiant_id',
              familyMembers.map((m) => m.id),
            )
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
    return {
      ok: true,
      payerEmail,
      studentIds: studentId ? [studentId] : [],
      sessionId,
      stripeAccount,
    };
  }

  if (isRenewal) {
    const studentId = session.metadata?.studentId;
    if (studentId && formationUuid) {
      const expectedAmount =
        parseFloat(session.metadata?.expected_amount || '0') || undefined;
      const insId = await upsertInscription({
        studentId,
        formationUuid,
        classId: null,
        academicYear: renewalYear,
        expectedAmount,
      });
      if (insId) studentIds.push(studentId);
    }
  } else {
    const childrenCount = parseInt(session.metadata?.childrenCount || '0', 10);

    if (childrenCount > 0) {
      for (let i = 0; i < childrenCount; i++) {
        const firstName = session.metadata?.[`child_${i}_first`] || '';
        const lastName = session.metadata?.[`child_${i}_last`] || '';
        const classId = session.metadata?.[`child_${i}_classId`] || null;
        if (!firstName || !lastName) continue;

        const studentId = await upsertStudent({
          email: payerEmail,
          firstName,
          lastName,
          phone: telephone,
        });
        if (!studentId || !formationUuid) continue;

        if (classId && !skipSideEffects) {
          const { data: classData } = await supabaseAdmin
            .from('classes')
            .select('name, whatsapp_link')
            .eq('id', classId)
            .maybeSingle();
          if (classData?.whatsapp_link) {
            await scheduleClassAssignmentEmail(
              payerEmail,
              firstName,
              classData.name || 'Votre classe',
              classData.whatsapp_link,
            );
          }
        }

        const baseExpected =
          parseFloat(session.metadata?.expected_amount || '0') || undefined;
        const siblingDiscount =
          parseFloat(session.metadata?.sibling_discount || '0') || 0;
        const expectedAmount =
          baseExpected !== undefined
            ? siblingDiscount > 0
              ? getExpectedAmountForChild(baseExpected, i, childrenCount)
              : baseExpected
            : undefined;
        const insId = await upsertInscription({
          studentId,
          formationUuid,
          classId: classId || null,
          academicYear,
          expectedAmount,
        });
        if (insId) studentIds.push(studentId);
      }
    } else {
      const firstName = session.metadata?.first_name || '';
      const lastName = session.metadata?.last_name || '';
      const classId = session.metadata?.classId || null;

      if (firstName && lastName) {
        const studentId = await upsertStudent({
          email: payerEmail,
          firstName,
          lastName,
          phone: telephone,
        });
        if (studentId && formationUuid) {
          if (classId && !skipSideEffects) {
            const { data: classData } = await supabaseAdmin
              .from('classes')
              .select('name, whatsapp_link')
              .eq('id', classId)
              .maybeSingle();
            if (classData?.whatsapp_link) {
              await scheduleClassAssignmentEmail(
                payerEmail,
                firstName,
                classData.name || 'Votre classe',
                classData.whatsapp_link,
              );
            }
          }

          const expectedAmount =
            parseFloat(session.metadata?.expected_amount || '0') || undefined;
          const insId = await upsertInscription({
            studentId,
            formationUuid,
            classId: classId || null,
            academicYear,
            expectedAmount,
          });
          if (insId) studentIds.push(studentId);
        }
      }
    }
  }

  if (studentIds.length === 0) {
    return {
      ok: false,
      reason:
        'Aucun élève créé — metadata checkout incomplète (prénom/nom/formation).',
      payerEmail,
      studentIds: [],
      sessionId,
      stripeAccount,
    };
  }

  const { data: existingPayment } = await supabaseAdmin
    .from('paiements')
    .select('id')
    .eq('stripe_session_id', session.id)
    .maybeSingle();

  if (!existingPayment) {
    await insertPaiementWithStripeAccount({
      etudiant_id: studentIds[0],
      stripe_session_id: session.id,
      amount: (session.amount_total || 0) / 100,
      currency: (session.currency || 'eur').toUpperCase(),
      status: 'succeeded',
      stripe_account: stripeAccount,
    });
  }

  if (clerkUserId) {
    for (const sid of studentIds) {
      await supabaseAdmin
        .from('etudiants')
        .update({ clerk_user_id: clerkUserId })
        .eq('id', sid)
        .is('clerk_user_id', null);
    }
  }

  if (!skipSideEffects) {
    if (payerEmail && !clerkUserId) {
      try {
        const client = await clerkClient();
        await client.invitations.createInvitation({
          emailAddress: payerEmail,
          ignoreExisting: true,
        });
      } catch (inviteErr: any) {
        if (inviteErr?.errors?.[0]?.code !== 'form_identifier_exists') {
          console.error('[fulfillment Clerk invite]', inviteErr);
        }
      }
    }

    try {
      const { syncStudentPaidStatus } = await import('@/app/actions/students');
      await syncStudentPaidStatus(studentIds[0]);
    } catch (e) {
      console.error('[fulfillment syncPaid]', e);
    }

    try {
      const {
        maybeSendPresentielRentreeEmail,
        maybeSendPresentielFournituresEmail,
        maybeSendDistancielRentreeEmail,
      } = await import('@/lib/mail');
      const { collectCheckoutClassRefs, getFournituresKindsToSend } = await import(
        '@/lib/presentiel-fournitures-email'
      );

      let formationType: string | null = null;
      if (formationUuid) {
        const { data: form } = await supabaseAdmin
          .from('formations')
          .select('type')
          .eq('id', formationUuid)
          .maybeSingle();
        formationType = form?.type || null;
      }

      await maybeSendPresentielRentreeEmail(payerEmail, formationId, formationType);
      await maybeSendDistancielRentreeEmail(payerEmail, formationId, formationType);

      const classRefs = collectCheckoutClassRefs(session.metadata);
      let kinds = getFournituresKindsToSend(classRefs);
      const isPresentiel =
        formationId === 'presentiel-global' || formationType === 'presentiel';
      let forceKinds;
      if (isPresentiel && kinds.length === 0) {
        forceKinds = ['prepa', 'elem'] as const;
      }
      await maybeSendPresentielFournituresEmail(payerEmail, {
        classRefs,
        forceKinds: forceKinds as any,
      });
    } catch (e) {
      console.error('[fulfillment mails]', e);
    }

    if (!isRenewal) {
      try {
        const { sendAdminNewStudentNotificationEmail } = await import('@/lib/mail');
        const studentName = session.metadata?.first_name
          ? `${session.metadata.first_name} ${session.metadata.last_name || ''}`
          : session.metadata?.child_0_first
            ? `${session.metadata.child_0_first} ${session.metadata.child_0_last || ''} (+ famille)`
            : 'Nouvel élève';
        const amountStr = `${((session.amount_total || 0) / 100).toFixed(2)} ${
          session.currency?.toUpperCase() || 'EUR'
        }`;
        let formationTitle = formationId;
        if (formationUuid) {
          const { data: form } = await supabaseAdmin
            .from('formations')
            .select('title')
            .eq('id', formationUuid)
            .maybeSingle();
          if (form?.title) formationTitle = form.title;
        }
        await sendAdminNewStudentNotificationEmail({
          studentName,
          studentEmail: payerEmail,
          phone: telephone,
          formation: formationTitle,
          amountStr,
        });
      } catch (e) {
        console.error('[fulfillment admin mail]', e);
      }
    }
  }

  return {
    ok: true,
    payerEmail,
    studentIds,
    sessionId,
    stripeAccount,
  };
}

/**
 * Cherche une session checkout payée pour un email sur un compte Stripe.
 */
export async function findPaidCheckoutSessionsForEmail(
  stripe: Stripe,
  email: string,
  opts?: { limit?: number; createdGte?: number },
): Promise<Stripe.Checkout.Session[]> {
  const needle = getBaseEmail(email);
  const limit = opts?.limit ?? 40;
  const sessions = await stripe.checkout.sessions.list({
    limit,
    ...(opts?.createdGte ? { created: { gte: opts.createdGte } } : {}),
  });

  return sessions.data.filter((s) => {
    if (s.payment_status !== 'paid') return false;
    const e = getBaseEmail(
      s.metadata?.email || s.customer_details?.email || s.customer_email || '',
    );
    return e === needle;
  });
}
