import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { CLASS_ID_TO_UUID } from '@/lib/presentiel-data';
import { DISTANCE_CLASS_ID_TO_UUID } from '@/lib/distance-data';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getFamilyCheckoutTotal, getNamedChildren, getSiblingDiscount } from '@/lib/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(req: Request) {
  try {
    // userId optionnel — le checkout est accessible aux non-connectés (page inscription publique)
    let userId: string | null = null;
    try {
      const authResult = await auth();
      userId = authResult.userId;
    } catch {
      // Pas connecté — autorisé pour l'inscription publique
    }

    const body = await req.json();
    const formationId = body.formationId || body.planId || '';
    const registrationType = body.registrationType || 'adult';

    // --- SÉCURITÉ : BLOCAGE DES INSCRIPTIONS PRÉSENTIELLES (30 Nov - 30 Avril) ---
    const isPlanPresentiel = formationId.toLowerCase().includes('presentiel') || formationId === 'femme_debutante' || formationId === 'femme_intermediaire';
    if (isPlanPresentiel) {
      const today = new Date();
      const currentMonth = today.getMonth(); // 0 = Janvier, 11 = Décembre
      const currentDay = today.getDate();

      let isPresentielBlocked = false;
      if (currentMonth === 11 || currentMonth === 0 || currentMonth === 1 || currentMonth === 2) {
        isPresentielBlocked = true; // Dec, Jan, Feb, Mar
      } else if (currentMonth === 10 && currentDay >= 30) {
        isPresentielBlocked = true; // A partir du 30 Novembre
      } else if (currentMonth === 3 && currentDay < 30) {
        isPresentielBlocked = true; // Jusqu'au 29 Avril
      }

      if (isPresentielBlocked) {
        return NextResponse.json(
          { error: 'Les inscriptions en présentiel sont fermées jusqu\'au 30 avril.' },
          { status: 400 }
        );
      }
    }

    // 1. Charger la formation depuis la base de données (Source unique de vérité)
    const { data: formation } = await supabaseAdmin
      .from('formations')
      .select('price, title')
      .eq('slug', formationId)
      .maybeSingle();

    let formationData = formation;

    // Fallback minimal en cas d'erreur réseau pour des formations vitales non créées.
    // L'idéal est que la base de données soit toujours à jour (règle 1 de l'architecture).
    if (!formationData) {
      return NextResponse.json({ error: 'Formation introuvable en base de données' }, { status: 404 });
    }

    const formationTitle = formationData.title || 'Formation ISHES';
    const basePrice = Number(formationData.price);

    // 2. Calculer le montant total (multiplié par le nombre d'enfants si inscription famille)
    // Réduction fratrie : −50 € par enfant supplémentaire, uniquement pour ce même paiement.
    // On ne compte que les enfants nominativement remplis — un créneau vide ne doit ni réduire ni créer un paiement à 0 €.
    let childrenCount = 1;
    let siblingDiscount = 0;
    let totalAmount = basePrice;
    if (registrationType === 'child') {
      const namedChildren = getNamedChildren(body.childrenList);
      if (namedChildren.length === 0) {
        return NextResponse.json(
          { error: 'Veuillez renseigner le prénom et le nom de chaque enfant.' },
          { status: 400 }
        );
      }
      body.childrenList = namedChildren;
      childrenCount = namedChildren.length;
      siblingDiscount = getSiblingDiscount(childrenCount);
      totalAmount = getFamilyCheckoutTotal(basePrice, childrenCount);
    }

    // --- SECURITY: Check if classes are full ---
    const classIdsToCheck: number[] = [];
    if (registrationType === 'child' && Array.isArray(body.childrenList)) {
      body.childrenList.forEach((child: any) => {
        if (child.classId) classIdsToCheck.push(parseInt(child.classId, 10));
      });
    } else if (body.classId) {
      classIdsToCheck.push(parseInt(body.classId, 10));
    }

    if (classIdsToCheck.length > 0) {
      const { data: statusData, error: statusError } = await supabaseAdmin
        .from('vue_etat_creneaux')
        .select('classe_numero, est_plein')
        .in('classe_numero', classIdsToCheck);

      if (!statusError && statusData) {
        const fullClasses = statusData.filter((c: any) => c.est_plein === true);
        if (fullClasses.length > 0) {
          return NextResponse.json(
            { error: "Désolé, l'une des classes sélectionnées vient de se remplir. Veuillez choisir un autre créneau." },
            { status: 400 }
          );
        }
      }
    }
    // ------------------------------------------

    const unitAmount = Math.round(totalAmount * 100);

    const installments = body.installments ? parseInt(String(body.installments), 10) : 1;

    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // En local, on s'adapte dynamiquement au port (ex: 3005) pour éviter les erreurs de redirection
    const origin = req.headers.get('origin');
    if (origin && origin.includes('localhost')) {
      baseUrl = origin;
    }

    const isLocal = baseUrl.includes('localhost');

    let sessionParams: Stripe.Checkout.SessionCreateParams;

    const metadata: Record<string, string> = {
      clerkUserId: userId || '',
      formationId,
      studentId: body.studentId || '',
      slot: body.slot || '',
      email: body.email || '', // Email de référence pour l'inscription
      telephone: body.telephone || '',
      type: 'inscription',
      // Paramètres de réinscription
      isRenewal: body.isRenewal ? 'true' : 'false',
      renewalYear: body.year || '',
      nextLevelTitle: body.nextLevelTitle || '',
      registrationType,
      expected_amount: String(basePrice), // Le prix de base par inscription (1er enfant)
      sibling_discount: String(siblingDiscount),
    };

    if (registrationType === 'child' && body.childrenList && Array.isArray(body.childrenList)) {
      metadata.parent_first_name = body.parentPrenom || '';
      metadata.parent_last_name = body.parentNom || '';
      metadata.childrenCount = String(body.childrenList.length);

      body.childrenList.forEach((child: any, idx: number) => {
        metadata[`child_${idx}_first`] = child.prenom || '';
        metadata[`child_${idx}_last`] = child.nom || '';
        metadata[`child_${idx}_classId`] = child.classId
          ? CLASS_ID_TO_UUID[parseInt(child.classId)] || DISTANCE_CLASS_ID_TO_UUID[parseInt(child.classId)] || child.classId
          : '';
        metadata[`child_${idx}_niveau`] = child.niveau || '';
      });
    } else {
      // Adult
      metadata.first_name = body.prenom || '';
      metadata.last_name = body.nom || '';
      metadata.classId = body.classId ? CLASS_ID_TO_UUID[parseInt(body.classId)] || DISTANCE_CLASS_ID_TO_UUID[parseInt(body.classId)] || body.classId : '';
      metadata.niveau = body.niveau || '';
    }

    const stripeDescription = siblingDiscount > 0
      ? `Inscription de ${childrenCount} enfants — réduction fratrie ${siblingDiscount} €`
      : 'Inscription — Institut ISHES';

    if (installments > 1) {
      const installmentAmount = Math.round(unitAmount / installments);

      // Création dynamique du tarif Stripe récurrent
      const dynamicPrice = await stripe.prices.create({
        currency: 'eur',
        unit_amount: installmentAmount,
        recurring: {
          interval: 'month',
        },
        product_data: {
          name: `Paiement en ${installments}x - ${formationTitle}`,
        },
      });

      sessionParams = {
        payment_method_types: ['card'],
        line_items: [
          {
            price: dynamicPrice.id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: isLocal
          ? `${baseUrl}/api/checkout/local-success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(body.email || '')}`
          : `${baseUrl}/sign-up?email_address=${encodeURIComponent(body.email || '')}`,
        cancel_url: `${baseUrl}/inscription?canceled=true`,
        metadata: {
          ...metadata,
          installments_total: String(installments),
        },
        subscription_data: {
          metadata: {
            ...metadata,
            installments_total: String(installments),
          },
        },
      };
    } else {
      sessionParams = {
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Inscription : ${formationTitle}`,
                description: stripeDescription,
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: isLocal
          ? `${baseUrl}/api/checkout/local-success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(body.email || '')}`
          : `${baseUrl}/sign-up?email_address=${encodeURIComponent(body.email || '')}`,
        cancel_url: `${baseUrl}/inscription?canceled=true`,
        metadata,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[STRIPE_ERROR]', error);
    return NextResponse.json({ error: 'Erreur interne Stripe' }, { status: 500 });
  }
}
