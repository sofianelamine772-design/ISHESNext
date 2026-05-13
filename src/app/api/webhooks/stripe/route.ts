import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const clerkUserId = session.metadata?.clerkUserId;
    const formationId = session.metadata?.formationId;

    if (clerkUserId) {
      // 1. Récupérer l'ID de l'étudiant via son Clerk ID
      const { data: etudiant } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .eq('clerk_id', clerkUserId)
        .single();

      if (etudiant) {
        // 2. Mettre à jour ou créer l'inscription
        const { error } = await supabaseAdmin
          .from('inscriptions')
          .upsert({
            etudiant_id: etudiant.id,
            formation_id: formationId,
            status: 'valide', // Statut après paiement
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'etudiant_id, formation_id'
          });

        if (error) {
          console.error('[WEBHOOK_DB_ERROR]', error);
          return new NextResponse('Database Error', { status: 500 });
        }
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
