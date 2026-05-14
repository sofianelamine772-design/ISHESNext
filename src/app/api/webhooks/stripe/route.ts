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
  const headerList = await headers();
  const signature = headerList.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const clerkUserId = session.metadata?.clerkUserId;
    const formationId = session.metadata?.formationId;
    const parentEmail = session.metadata?.email;
    const slot = session.metadata?.slot;

    // 1. Identifier les élèves à valider
    let etudiantsToValidate: { id: string }[] = [];

    if (clerkUserId) {
      const { data: etudiant } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .eq('clerk_id', clerkUserId)
        .maybeSingle();
      if (etudiant) etudiantsToValidate.push(etudiant);
    } 
    
    // On cherche aussi par email si on a un parentEmail, même si on a un clerkUserId
    if (parentEmail && parentEmail.includes('@')) {
      const [emailBase, emailDomain] = parentEmail.split('@');

      const { data: etudiants } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .or(`email.eq."${parentEmail}",email.ilike."${emailBase}+%@${emailDomain}"`);
      
      if (etudiants) {
        // Fusionner les listes sans doublons
        const existingIds = new Set(etudiantsToValidate.map(e => e.id));
        etudiants.forEach(e => {
          if (!existingIds.has(e.id)) etudiantsToValidate.push(e);
        });
      }
    }

    // 2. Pour chaque élève trouvé, on crée/valide l'inscription
    for (const etudiant of etudiantsToValidate) {
      let classId = null;

      // Recherche de la classe pour le créneau présentiel
      if (slot) {
        const { data: classe } = await supabaseAdmin
          .from('classes')
          .select('id')
          .ilike('day_of_week', slot)
          .maybeSingle();
        if (classe) classId = classe.id;
      }

      const { error } = await supabaseAdmin
        .from('inscriptions')
        .upsert({
          etudiant_id: etudiant.id,
          formation_id: formationId,
          class_id: classId,
          status: 'valide',
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'etudiant_id, formation_id'
        });

      if (error) console.error('[WEBHOOK_DB_ERROR]', error);
      
      // On passe aussi le statut de l'étudiant à 'actif'
      await supabaseAdmin
        .from('etudiants')
        .update({ status: 'actif' })
        .eq('id', etudiant.id);
    }
  }

  return new NextResponse(null, { status: 200 });
}
