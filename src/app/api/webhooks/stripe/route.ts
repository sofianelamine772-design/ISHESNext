import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getCurrentAcademicYear } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any, // Suppression de l'erreur TS
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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

  // 1. Gestion de la complétion du Checkout (Inscription)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkUserId = session.metadata?.clerkUserId;
    const formationId = session.metadata?.formationId;
    const parentEmail = session.metadata?.email;
    const slot = session.metadata?.slot;

    let etudiantsToValidate: { id: string }[] = [];

    if (clerkUserId) {
      const { data: etudiant } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .eq('id', clerkUserId)
        .maybeSingle();
      if (etudiant) etudiantsToValidate.push(etudiant);
    } 
    
    if (parentEmail && parentEmail.includes('@')) {
      const [emailBase, emailDomain] = parentEmail.split('@');
      const { data: etudiants } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .or(`email.eq."${parentEmail}",email.ilike."${emailBase}+%@${emailDomain}"`);
      
      if (etudiants) {
        const existingIds = new Set(etudiantsToValidate.map(e => e.id));
        etudiants.forEach(e => {
          if (!existingIds.has(e.id)) etudiantsToValidate.push(e);
        });
      }
    }

    // Si aucun étudiant n'existe avec cet e-mail ou cet ID, on en crée un temporaire
    // afin de pouvoir enregistrer l'inscription et le paiement dans la base de données.
    if (etudiantsToValidate.length === 0 && parentEmail) {
      const tempId = `temp_${Date.now()}`;
      const { data: newEtudiant, error: insertError } = await supabaseAdmin
        .from('etudiants')
        .insert({
          id: tempId,
          email: parentEmail,
          status: 'actif'
        })
        .select('id')
        .single();

      if (newEtudiant) {
        etudiantsToValidate.push(newEtudiant);
      } else {
        console.error('[STRIPE_WEBHOOK_INSERT_ERROR]', insertError);
      }
    }

    // Résolution de l'UUID de la formation (depuis le slug ou ID)
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
        if (formation) {
          formationUuid = formation.id;
        } else {
          console.warn(`[WEBHOOK] Formation not found for slug/id: ${formationId}`);
        }
      }
    }

    for (const etudiant of etudiantsToValidate) {
      let classId = null;

      if (slot) {
        const { data: classe } = await supabaseAdmin
          .from('classes')
          .select('id')
          .ilike('day_of_week', slot)
          .maybeSingle();
        if (classe) classId = classe.id;
      }

      let inscriptionId = null;

      if (formationUuid) {
        // Vérifie si une inscription existe déjà pour cet étudiant et cette formation
        const { data: existingIns } = await supabaseAdmin
          .from('inscriptions')
          .select('id')
          .eq('etudiant_id', etudiant.id)
          .eq('formation_id', formationUuid)
          .maybeSingle();

        if (existingIns) {
          inscriptionId = existingIns.id;
          const { error: updateError } = await supabaseAdmin
            .from('inscriptions')
            .update({
              class_id: classId || undefined,
              status: 'valide',
              paid_status: 'paye'
            })
            .eq('id', inscriptionId);
          if (updateError) {
            console.error('[WEBHOOK_DB_UPDATE_ERROR]', updateError);
          }
        } else {
          const { data: newIns, error: insertError } = await supabaseAdmin
            .from('inscriptions')
            .insert({
              etudiant_id: etudiant.id,
              formation_id: formationUuid,
              class_id: classId,
              status: 'valide',
              paid_status: 'paye',
              academic_year: getCurrentAcademicYear()
            })
            .select('id')
            .single();

          if (insertError) {
            console.error('[WEBHOOK_DB_INSERT_ERROR]', insertError);
          } else if (newIns) {
            inscriptionId = newIns.id;
          }
        }
      } else {
        console.warn(`[WEBHOOK] Impossible de traiter l'inscription car la formation n'a pas pu être résolue.`);
      }

      await supabaseAdmin
        .from('etudiants')
        .update({ status: 'actif' })
        .eq('id', etudiant.id);

      // Si paiement direct (non récurrent), on le log dans 'paiements'
      if (session.mode === 'payment' && inscriptionId) {
        const { error: payError } = await supabaseAdmin.from('paiements').insert({
          inscription_id: inscriptionId,
          etudiant_id: etudiant.id,
          stripe_session_id: session.id,
          amount: (session.amount_total || 0) / 100,
          currency: (session.currency || 'eur').toUpperCase(),
          status: 'succeeded'
        });
        if (payError) {
          console.error('[WEBHOOK_PAYMENT_LOG_ERROR]', payError);
        }
      }
    }
  }

  // 2. Gestion des paiements récurrents (Abonnements)
  if (event.type === 'invoice.payment_succeeded' || event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerEmail = invoice.customer_email;
    const status = event.type === 'invoice.payment_succeeded' ? 'succeeded' : 'failed';
    // Pour un paiement échoué, amount_paid est 0, on prend amount_due
    const amountInCents = invoice.amount_paid > 0 ? invoice.amount_paid : invoice.amount_due;
    const amount = amountInCents / 100;
    
    if (customerEmail) {
      // Trouver l'étudiant par son email
      const { data: etudiant } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .ilike('email', customerEmail)
        .maybeSingle();
      
      if (etudiant) {
        // Trouver son inscription active la plus récente
        const { data: inscription } = await supabaseAdmin
          .from('inscriptions')
          .select('id')
          .eq('etudiant_id', etudiant.id)
          .eq('status', 'valide')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Enregistrer la transaction dans la table paiements
        const { error } = await supabaseAdmin.from('paiements').insert({
          inscription_id: inscription?.id || null,
          etudiant_id: etudiant.id,
          stripe_session_id: invoice.id, // On utilise l'ID de la facture comme identifiant unique
          amount: amount,
          currency: (invoice.currency || 'eur').toUpperCase(),
          status: status,
          error_message: (invoice as any).last_payment_error?.message || null
        });

        if (error) {
          console.error('[WEBHOOK_DB_PAIEMENT_ERROR]', error);
        } else {
          console.log(`[WEBHOOK] Paiement ${status} loggé pour ${customerEmail} (Montant: ${amount})`);
          if (inscription) {
            await supabaseAdmin
              .from('inscriptions')
              .update({ paid_status: status === 'succeeded' ? 'paye' : 'refuse' })
              .eq('id', inscription.id);
          }
        }
      } else {
        console.warn(`[WEBHOOK] Étudiant non trouvé pour l'email de facture: ${customerEmail}`);
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
