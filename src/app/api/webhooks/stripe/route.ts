import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { clerkClient } from '@clerk/nextjs/server';
import { getCurrentAcademicYear } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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
    console.error('[WEBHOOK upsertStudent] Insert error:', error.message);
    return null;
  }

  return newStudent?.id || null;
}

/** Résout l'UUID Supabase d'une formation à partir d'un slug ou UUID. */
async function resolveFormationUuid(formationId: string): Promise<string | null> {
  if (!formationId) return null;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(formationId);
  if (isUuid) return formationId;

  const { data } = await supabaseAdmin.from('formations').select('id').eq('slug', formationId).maybeSingle();
  if (data) return data.id;

  const { data: fallback } = await supabaseAdmin.from('formations').select('id').eq('slug', 'presentiel-global').maybeSingle();
  return fallback?.id || null;
}

/** Crée ou met à jour une inscription pour un étudiant. */
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
    console.error('[WEBHOOK upsertInscription] Insert error:', error.message);
    return null;
  }

  return newIns?.id || null;
}

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ── 1. Checkout completed (nouvelle inscription ou réinscription) ──────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== 'paid') {
      return new NextResponse(null, { status: 200 });
    }

    const payerEmail = getBaseEmail(
      session.metadata?.email || session.customer_details?.email || ''
    );
    const telephone = session.metadata?.telephone || '';
    const formationId = session.metadata?.formationId || '';
    const isRenewal = session.metadata?.isRenewal === 'true';
    const renewalYear = session.metadata?.renewalYear || getCurrentAcademicYear();
    const academicYear = getCurrentAcademicYear();
    const clerkUserId = session.metadata?.clerkUserId || null;

    console.log(`[WEBHOOK] checkout.session.completed for ${payerEmail}, isRenewal=${isRenewal}`);

    const formationUuid = await resolveFormationUuid(formationId);
    const studentIds: string[] = [];

    if (isRenewal) {
      const studentId = session.metadata?.studentId;
      if (studentId && formationUuid) {
        const insId = await upsertInscription({ studentId, formationUuid, classId: null, academicYear: renewalYear });
        if (insId) studentIds.push(studentId);
      }
    } else {
      const childrenCount = parseInt(session.metadata?.childrenCount || '0', 10);

      if (childrenCount > 0) {
        // Plusieurs élèves (famille)
        for (let i = 0; i < childrenCount; i++) {
          const firstName = session.metadata?.[`child_${i}_first`] || '';
          const lastName = session.metadata?.[`child_${i}_last`] || '';
          const classId = session.metadata?.[`child_${i}_classId`] || null;

          if (!firstName || !lastName) continue;

          const studentId = await upsertStudent({ email: payerEmail, firstName, lastName, phone: telephone });
          if (!studentId || !formationUuid) continue;

          // Envoyer email WhatsApp si classe connue
          if (classId) {
            const { data: classData } = await supabaseAdmin.from('classes').select('name, whatsapp_link').eq('id', classId).maybeSingle();
            if (classData?.whatsapp_link) {
              try {
                const { sendClassAssignmentEmail } = await import('@/lib/mail');
                await sendClassAssignmentEmail(payerEmail, firstName, classData.name || 'Votre classe', classData.whatsapp_link);
              } catch (err) {
                console.error('[WEBHOOK] WhatsApp email error:', err);
              }
            }
          }

          const insId = await upsertInscription({ studentId, formationUuid, classId: classId || null, academicYear });
          if (insId) studentIds.push(studentId);
        }
      } else {
        // Adulte seul
        const firstName = session.metadata?.first_name || '';
        const lastName = session.metadata?.last_name || '';
        const classId = session.metadata?.classId || null;

        if (firstName && lastName) {
          const studentId = await upsertStudent({ email: payerEmail, firstName, lastName, phone: telephone });
          if (studentId && formationUuid) {
            if (classId) {
              const { data: classData } = await supabaseAdmin.from('classes').select('name, whatsapp_link').eq('id', classId).maybeSingle();
              if (classData?.whatsapp_link) {
                try {
                  const { sendClassAssignmentEmail } = await import('@/lib/mail');
                  await sendClassAssignmentEmail(payerEmail, firstName, classData.name || 'Votre classe', classData.whatsapp_link);
                } catch (err) {
                  console.error('[WEBHOOK] WhatsApp email error:', err);
                }
              }
            }

            const insId = await upsertInscription({ studentId, formationUuid, classId: classId || null, academicYear });
            if (insId) studentIds.push(studentId);
          }
        }
      }
    }

    // Logger le paiement (un seul par session Stripe)
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

      // Lier le clerk_user_id si disponible
      if (clerkUserId) {
        for (const sid of studentIds) {
          await supabaseAdmin.from('etudiants').update({ clerk_user_id: clerkUserId }).eq('id', sid).is('clerk_user_id', null);
        }
      }
    }

    // Envoyer invitation Clerk si pas encore connecté
    if (payerEmail && !clerkUserId) {
      try {
        const client = await clerkClient();
        await client.invitations.createInvitation({ emailAddress: payerEmail, ignoreExisting: true });
        console.log(`[WEBHOOK] Clerk invitation sent to ${payerEmail}`);
      } catch (inviteErr: any) {
        if (inviteErr?.errors?.[0]?.code !== 'form_identifier_exists') {
          console.error('[WEBHOOK Clerk invite error]', inviteErr);
        }
      }
    }

    console.log(`[WEBHOOK] Done: ${studentIds.length} student(s) processed for ${payerEmail}`);
  }

  // ── 2. Paiements récurrents (abonnements) ──────────────────────────────────
  if (event.type === 'invoice.payment_succeeded' || event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerEmail = invoice.customer_email;
    const status = event.type === 'invoice.payment_succeeded' ? 'succeeded' : 'failed';
    const amountInCents = invoice.amount_paid > 0 ? invoice.amount_paid : invoice.amount_due;
    const amount = amountInCents / 100;

    if (customerEmail) {
      const baseEmail = getBaseEmail(customerEmail);

      const { data: familyMembers } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .eq('email', baseEmail);

      const primaryMember = familyMembers?.[0];

      if (primaryMember) {
        const { data: inscription } = await supabaseAdmin
          .from('inscriptions')
          .select('id')
          .eq('etudiant_id', primaryMember.id)
          .in('status', ['valide', 'en_attente'])
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        const { data: insertedPayment, error } = await supabaseAdmin.from('paiements').insert({
          inscription_id: inscription?.id || null,
          etudiant_id: primaryMember.id,
          stripe_session_id: invoice.id,
          amount,
          currency: (invoice.currency || 'eur').toUpperCase(),
          status,
          error_message: (invoice as any).last_payment_error?.message || null,
        }).select('id').single();

        if (error) {
          console.error('[WEBHOOK paiement log error]', error);
        } else {
          if (status === 'failed' && insertedPayment?.id) {
            const { sendPaymentReminderWithLinkAction } = await import('@/app/actions/students');
            await sendPaymentReminderWithLinkAction(insertedPayment.id);
          }

          if (familyMembers && familyMembers.length > 0) {
            const familyIds = familyMembers.map(m => m.id);
            await supabaseAdmin
              .from('inscriptions')
              .update({ paid_status: status === 'succeeded' ? 'paye' : 'refuse' })
              .in('etudiant_id', familyIds)
              .eq('status', 'valide');
          }
        }
      }
    }

    // Gérer la fin d'abonnement en plusieurs fois
    if (event.type === 'invoice.payment_succeeded' && (invoice as any).subscription) {
      try {
        const subscription = await stripe.subscriptions.retrieve((invoice as any).subscription as string);
        const installmentsTotal = subscription.metadata?.installments_total;
        if (installmentsTotal) {
          const total = parseInt(installmentsTotal, 10);
          const invoices = await stripe.invoices.list({ subscription: subscription.id, status: 'paid', limit: 10 });
          if (invoices.data.length >= total) {
            await stripe.subscriptions.update(subscription.id, { cancel_at_period_end: true });
            console.log(`[WEBHOOK] Abonnement ${subscription.id} terminé (${total} mensualités).`);
          }
        }
      } catch (subErr) {
        console.error('[WEBHOOK sub cancel error]', subErr);
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
