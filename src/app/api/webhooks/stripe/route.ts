import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

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
        .eq('clerk_id', clerkUserId)
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

      // Upsert de l'inscription et récupération de l'ID
      const { data: inscription, error } = await supabaseAdmin
        .from('inscriptions')
        .upsert({
          etudiant_id: etudiant.id,
          formation_id: formationId,
          class_id: classId,
          status: 'valide',
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'etudiant_id, formation_id'
        })
        .select('id')
        .single();

      if (error) console.error('[WEBHOOK_DB_ERROR]', error);
      
      await supabaseAdmin
        .from('etudiants')
        .update({ status: 'actif' })
        .eq('id', etudiant.id);

      // Si paiement direct (non récurrent), on le log dans 'paiements'
      if (session.mode === 'payment' && inscription) {
        await supabaseAdmin.from('paiements').insert({
          inscription_id: inscription.id,
          etudiant_id: etudiant.id,
          stripe_session_id: session.id,
          amount: (session.amount_total || 0) / 100,
          currency: (session.currency || 'eur').toUpperCase(),
          status: 'succeeded'
        });
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
        .eq('email', customerEmail)
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
        }
      } else {
        console.warn(`[WEBHOOK] Étudiant non trouvé pour l'email de facture: ${customerEmail}`);
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
