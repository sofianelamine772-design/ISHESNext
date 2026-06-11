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

/**
 * Normalise un email en supprimant le suffixe +xxx avant le @
 * Ex: benilias757+zakaria@gmail.com => benilias757@gmail.com
 */
function getBaseEmail(email: string): string {
  if (!email) return '';
  const [local, domain] = email.toLowerCase().split('@');
  if (!domain) return email.toLowerCase();
  return `${local.split('+')[0]}@${domain}`;
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

  // 1. Gestion de la complétion du Checkout (Inscription)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkUserId = session.metadata?.clerkUserId;
    const formationId = session.metadata?.formationId;
    const parentEmail = session.metadata?.email || session.customer_details?.email || '';
    const slot = session.metadata?.slot;
    const baseEmail = getBaseEmail(parentEmail);

    console.log(`[STRIPE_WEBHOOK] checkout.session.completed. Email: ${parentEmail}, Formation: ${formationId}`);

    // ─── 1A. Récupérer TOUS les membres de la famille ───────────────────────
    // Stratégie : trouver le parent (Clerk ID) et tous ses enfants (parent_id = clerkUserId)
    // OU tous les étudiants qui partagent le même email de base.
    let familyMembers: { id: string; email: string; parent_id: string | null; created_at?: string }[] = [];
    let parentMember: any = null;

    // D'abord chercher via l'ID Clerk si disponible
    if (clerkUserId) {
      const { data: parent } = await supabaseAdmin
        .from('etudiants')
        .select('id, email, parent_id, created_at')
        .eq('id', clerkUserId)
        .maybeSingle();

      if (parent) parentMember = parent;
    }

    // Chercher TOUS les étudiants liés par l'email de base
    if (baseEmail) {
      const { data: byEmail } = await supabaseAdmin
        .from('etudiants')
        .select('id, email, parent_id, created_at')
        .ilike('email', baseEmail)
        .order('created_at', { ascending: true }); // Important pour correspondre à l'ordre d'insertion

      if (byEmail && byEmail.length > 0) {
        const sessionCreatedAt = session.created * 1000; // Convert to ms
        
        // Sécurité anti-rejeu (très fréquent avec Stripe CLI en local) :
        // Un étudiant est toujours inséré en base AVANT la génération de la session Stripe.
        // Si l'étudiant a été créé *après* la session Stripe (marge de 60s), c'est un rejeu d'un vieux paiement.
        const validStudents = byEmail.filter(m => {
          const studentCreatedAt = new Date(m.created_at).getTime();
          // L'étudiant doit avoir été créé avant (ou très peu de temps après) la session.
          return studentCreatedAt <= sessionCreatedAt + 60000;
        });

        // Lier les enfants "temp_" au parent si le parent existe
        if (parentMember) {
          for (const m of validStudents) {
            if (!m.parent_id && m.id !== parentMember.id && m.id.startsWith('temp_')) {
              await supabaseAdmin.from('etudiants').update({ parent_id: parentMember.id }).eq('id', m.id);
              m.parent_id = parentMember.id;
            }
          }
        }
        validStudents.forEach(m => familyMembers.push(m));
      }
    }

    // Assurer que le parent est dans la liste s'il n'y est pas déjà
    if (parentMember && !familyMembers.find(m => m.id === parentMember.id)) {
      familyMembers.push(parentMember);
    }

    // Si aucun membre trouvé → créer un étudiant temporaire (inscription sans compte)
    if (familyMembers.length === 0 && parentEmail) {
      const tempId = `temp_${Date.now()}`;
      const { data: newEtudiant, error: insertError } = await supabaseAdmin
        .from('etudiants')
        .insert({
          id: tempId,
          email: parentEmail,
          status: 'actif'
        })
        .select('id, email, parent_id')
        .single();

      if (newEtudiant) {
        familyMembers.push(newEtudiant);
      } else {
        console.error('[STRIPE_WEBHOOK_INSERT_ERROR]', insertError);
      }
    }

    console.log(`[STRIPE_WEBHOOK] Family members to validate: ${familyMembers.map(m => m.id).join(', ')}`);

    // ─── Envoi de l'invitation Clerk si aucun compte n'est trouvé ───────────
    if (!parentMember && (baseEmail || parentEmail)) {
      const emailToInvite = baseEmail || parentEmail;
      if (emailToInvite) {
        try {
          const client = await clerkClient();
          await client.invitations.createInvitation({
            emailAddress: emailToInvite,
            ignoreExisting: true,
          });
          console.log(`[STRIPE_WEBHOOK] Invitation Clerk envoyée à ${emailToInvite}`);
        } catch (inviteErr: any) {
          // Ignore l'erreur si l'utilisateur ou l'invitation existe déjà
          if (inviteErr?.errors?.[0]?.code !== 'form_identifier_exists') {
            console.error('[STRIPE_WEBHOOK_CLERK_INVITE_ERROR]', inviteErr);
          }
        }
      }
    }

    // ─── 1B. Résoudre l'UUID de la formation ────────────────────────────────
    let formationUuid: string | null = null;
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
          console.warn(`[WEBHOOK] Formation not found for slug/id: ${formationId}. Creating a fallback "Inconnue".`);
          
          // Au lieu de prendre la première formation au hasard (qui cause le bug d'assignation à Tajwid),
          // on cherche ou crée une formation "Inconnue" pour ne pas bloquer le paiement sans fausser les données.
          const { data: fallbackFormation } = await supabaseAdmin
            .from('formations')
            .select('id')
            .eq('slug', 'formation_inconnue')
            .maybeSingle();
            
          if (fallbackFormation) {
            formationUuid = fallbackFormation.id;
          } else {
            const { data: newFallback } = await supabaseAdmin.from('formations').insert({
              title: 'Formation Inconnue (À vérifier)',
              slug: 'formation_inconnue',
              price: 0,
              type: 'distanciel'
            }).select('id').single();
            if (newFallback) formationUuid = newFallback.id;
          }
        }
      }
    }

    // ─── 1C. Pour chaque membre de la famille, valider son inscription ───────
    // Le paiement Stripe est enregistré UNE SEULE FOIS (sur le premier membre)
    let paymentLogged = false;

    // Si l'inscription est pour des enfants, on exclut le parent de l'assignation de classes
    let studentsToEnrol = familyMembers;
    if (session.metadata?.registrationType === 'child' && parentMember) {
      studentsToEnrol = familyMembers.filter(m => m.id !== parentMember.id);
    }
    
    // Si la liste est vide (anomalie), on rabat sur toute la famille
    if (studentsToEnrol.length === 0) {
       studentsToEnrol = familyMembers;
    }

    for (let i = 0; i < studentsToEnrol.length; i++) {
      const membre = studentsToEnrol[i];
      let classId: string | null = null;

      // 1. Essayer de récupérer le classId exact depuis les métadonnées (injecté par la vitrine)
      const exactClassId = session.metadata?.[`classId_${i}`] || session.metadata?.classId;
      
      if (exactClassId) {
        classId = exactClassId;
      } else if (slot) {
        // 2. Fallback (ancien système) : deviner la classe avec le jour
        const { data: classe } = await supabaseAdmin
          .from('classes')
          .select('id')
          .ilike('day_of_week', slot)
          .maybeSingle();
        if (classe) classId = classe.id;
      }

      let inscriptionId: string | null = null;

      if (formationUuid) {
        // Chercher une inscription existante pour ce membre et cette formation
        const { data: existingIns } = await supabaseAdmin
          .from('inscriptions')
          .select('id, paid_status')
          .eq('etudiant_id', membre.id)
          .eq('formation_id', formationUuid)
          .maybeSingle();

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
          console.log(`[STRIPE_WEBHOOK] Updated inscription ${inscriptionId} for member ${membre.id} (classId: ${classId})`);
        } else {
          // Créer une nouvelle inscription pour ce membre
          const { data: newIns, error: insertError } = await supabaseAdmin
            .from('inscriptions')
            .insert({
              etudiant_id: membre.id,
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
            console.log(`[STRIPE_WEBHOOK] Created inscription ${inscriptionId} for member ${membre.id}`);
          }
        }
      } else {
        // Pas de formation connue → juste marquer l'inscription en attente existante comme payée
        const { data: anyIns } = await supabaseAdmin
          .from('inscriptions')
          .select('id')
          .eq('etudiant_id', membre.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (anyIns) {
          inscriptionId = anyIns.id;
          await supabaseAdmin
            .from('inscriptions')
            .update({ status: 'valide', paid_status: 'paye' })
            .eq('id', inscriptionId);
        }
      }

      // Marquer l'étudiant comme actif
      await supabaseAdmin
        .from('etudiants')
        .update({ status: 'actif' })
        .eq('id', membre.id);

      // ─── Enregistrer le paiement UNE SEULE FOIS ─────────────────────────
      // On log le paiement sur le premier membre seulement (évite la duplication).
      // Les autres inscriptions sont marquées "paye" mais sans doublon de paiement.
      if (!paymentLogged && session.mode === 'payment' && inscriptionId) {
        // Vérifier qu'il n'existe pas déjà
        const { data: existingPayment } = await supabaseAdmin
          .from('paiements')
          .select('id')
          .eq('stripe_session_id', session.id)
          .maybeSingle();

        if (!existingPayment) {
          const { error: payError } = await supabaseAdmin.from('paiements').insert({
            inscription_id: inscriptionId,
            etudiant_id: parentMember ? parentMember.id : membre.id,
            stripe_session_id: session.id,
            amount: (session.amount_total || 0) / 100,
            currency: (session.currency || 'eur').toUpperCase(),
            status: 'succeeded'
          });

          if (payError) {
            console.error('[WEBHOOK_PAYMENT_LOG_ERROR]', payError);
          } else {
            paymentLogged = true;
            console.log(`[STRIPE_WEBHOOK] Payment logged for family (member: ${membre.id}), session: ${session.id}`);
          }
        } else {
          paymentLogged = true; // Déjà enregistré
        }
      }
    }
  }

  // 2. Gestion des paiements récurrents (Abonnements)
  if (event.type === 'invoice.payment_succeeded' || event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerEmail = invoice.customer_email;
    const status = event.type === 'invoice.payment_succeeded' ? 'succeeded' : 'failed';
    const amountInCents = invoice.amount_paid > 0 ? invoice.amount_paid : invoice.amount_due;
    const amount = amountInCents / 100;
    
    if (customerEmail) {
      const baseEmail = getBaseEmail(customerEmail);

      // Trouver tous les membres de la famille par email
      const { data: familyMembers } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .ilike('email', baseEmail);

      // Trouver le parent (Clerk ID = vrai compte)
      const parent = familyMembers?.find(m => !m.id.startsWith('temp_') && !m.id.startsWith('manual_'));
      const primaryMember = parent || familyMembers?.[0];

      if (primaryMember) {
        // Trouver l'inscription active la plus récente (valide ou en attente)
        const { data: inscription } = await supabaseAdmin
          .from('inscriptions')
          .select('id')
          .eq('etudiant_id', primaryMember.id)
          .in('status', ['valide', 'en_attente'])
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Enregistrer la transaction (une seule fois sur le membre principal)
        const { error } = await supabaseAdmin.from('paiements').insert({
          inscription_id: inscription?.id || null,
          etudiant_id: primaryMember.id,
          stripe_session_id: invoice.id,
          amount: amount,
          currency: (invoice.currency || 'eur').toUpperCase(),
          status: status,
          error_message: (invoice as any).last_payment_error?.message || null
        });

        if (error) {
          console.error('[WEBHOOK_DB_PAIEMENT_ERROR]', error);
        } else {
          console.log(`[WEBHOOK] Paiement ${status} loggé pour famille ${customerEmail} (Montant: ${amount})`);

          // Mettre à jour toutes les inscriptions actives de la famille
          if (familyMembers && familyMembers.length > 0) {
            const familyIds = familyMembers.map(m => m.id);
            await supabaseAdmin
              .from('inscriptions')
              .update({ paid_status: status === 'succeeded' ? 'paye' : 'refuse' })
              .in('etudiant_id', familyIds)
              .eq('status', 'valide');
          }
        }
      } else {
        console.warn(`[WEBHOOK] Étudiant non trouvé pour l'email de facture: ${customerEmail}`);
      }
    }

    // Gestion de la limite d'échéances pour le paiement en plusieurs fois
    if (event.type === 'invoice.payment_succeeded' && (invoice as any).subscription) {
      try {
        const subscription = await stripe.subscriptions.retrieve((invoice as any).subscription as string);
        const installmentsTotal = subscription.metadata?.installments_total;
        if (installmentsTotal) {
          const total = parseInt(installmentsTotal, 10);
          const invoices = await stripe.invoices.list({
            subscription: subscription.id,
            status: 'paid',
            limit: 10
          });
          const paidCount = invoices.data.length;
          console.log(`[STRIPE_WEBHOOK] Abonnement ${subscription.id} : ${paidCount}/${total} mensualités payées.`);
          if (paidCount >= total) {
            await stripe.subscriptions.update(subscription.id, {
              cancel_at_period_end: true
            });
            console.log(`[STRIPE_WEBHOOK] Abonnement ${subscription.id} configuré pour résiliation (toutes mensualités réglées).`);
          }
        }
      } catch (subErr) {
        console.error('[STRIPE_WEBHOOK_SUB_CANCEL_ERROR]', subErr);
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
