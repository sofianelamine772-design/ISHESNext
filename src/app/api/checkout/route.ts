import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { CLASS_ID_TO_UUID, resolvePresentielCheckoutSlug, getPresentielCapacityLimit } from '@/lib/presentiel-data';
import {
  DISTANCE_CLASS_ID_TO_UUID,
  isOfficialDistanceClassId,
  isLeveledDistanceFormationSlug,
} from '@/lib/distance-data';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { addedFormationCharge, bumpPriceMetadataKey, getFamilyCheckoutTotal, getNamedChildren, getSiblingDiscount } from '@/lib/pricing';
import { getStripeClient, resolveStripeAccount } from '@/lib/stripe-accounts';
import {
  applyPromoToTotalCents,
  installmentAmountAfterPromoCents,
  resolveStripePromoDiscount,
} from '@/lib/stripe-promo';

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
    const registrationType = body.registrationType || 'adult';
    const classIdsToCheck: number[] = [];
    const collectClassId = (raw: unknown) => {
      const id = parseInt(String(raw ?? ''), 10);
      if (Number.isInteger(id) && id > 0) classIdsToCheck.push(id);
    };
    if (registrationType === 'child' && Array.isArray(body.childrenList)) {
      body.childrenList.forEach((child: any) => {
        if (child.classId) collectClassId(child.classId);
      });
    } else if (body.classId) {
      collectClassId(body.classId);
    }

    let formationId = resolvePresentielCheckoutSlug(
      body.formationId || body.planId || '',
      classIdsToCheck,
    );
    // Anciens slugs doublons → formations remplacées
    if (formationId === 'arabe_coran_junior' || formationId === 'arabe-coran-junior') {
      formationId = 'arabe_enfant_distance';
    } else if (formationId === 'sciences-islamiques') {
      formationId = 'sciences_islamiques';
    }

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
      .select('price, title, type')
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

    const mainSlug = formationId.replace(/-/g, '_');
    const bumpSlugs = [...new Set(
      String(body.orderBump || '')
        .split(',')
        .map((slug: string) => slug.trim())
        .filter(Boolean),
    )].filter((slug) => slug.replace(/-/g, '_') !== mainSlug);

    const bumpUnitPrices: Record<string, number> = {};
    for (const slug of bumpSlugs) {
      const { data: bump } = await supabaseAdmin
        .from('formations')
        .select('price')
        .eq('slug', slug)
        .maybeSingle();
      if (!bump) {
        return NextResponse.json(
          { error: `Formation ajoutée introuvable : ${slug}` },
          { status: 404 },
        );
      }
      const unit = Number(bump.price) || 0;
      bumpUnitPrices[slug] = unit;
      totalAmount += addedFormationCharge(unit, slug, registrationType, childrenCount);
    }

    // --- SECURITY: Check if présentiel classes are full / inactive ---
    // Les IDs distanciel (101–108, dont Tarbiya 107/108) ne sont pas des créneaux présentiel.
    const presentielIdsToCheck = classIdsToCheck.filter((id) => CLASS_ID_TO_UUID[id]);
    const unknownClassIds = classIdsToCheck.filter(
      (id) => !CLASS_ID_TO_UUID[id] && !isOfficialDistanceClassId(id),
    );
    if (unknownClassIds.length > 0) {
      return NextResponse.json(
        { error: "Cette classe n'est plus ouverte à l'inscription. Veuillez choisir un autre créneau." },
        { status: 400 }
      );
    }

    // Arabe / Tajwid / Tarbiya distance : le niveau (classe 101–108) est obligatoire.
    if (isLeveledDistanceFormationSlug(formationId)) {
      const namedChildren = getNamedChildren(body.childrenList || []);
      const needsChildLevels = registrationType === 'child' || namedChildren.length > 0;
      if (needsChildLevels) {
        if (namedChildren.length === 0) {
          return NextResponse.json(
            { error: 'Indiquez chaque enfant et son niveau avant le paiement.' },
            { status: 400 },
          );
        }
        const missingLevel = namedChildren.some((child: any) => {
          const id = parseInt(String(child.classId ?? ''), 10);
          return !isOfficialDistanceClassId(id);
        });
        if (missingLevel) {
          return NextResponse.json(
            { error: 'Choisissez le niveau de chaque enfant (Niveau 1, 2 ou 3 / année).' },
            { status: 400 },
          );
        }
      } else {
        const adultClassId = parseInt(String(body.classId ?? ''), 10);
        if (!isOfficialDistanceClassId(adultClassId)) {
          return NextResponse.json(
            { error: 'Choisissez un niveau avant le paiement.' },
            { status: 400 },
          );
        }
      }
    }

    if (presentielIdsToCheck.length > 0) {
      const { data: selectedClasses, error: classLookupError } = await supabaseAdmin
        .from('classes')
        .select('external_id, is_active')
        .eq('type', 'presentiel')
        .in('external_id', presentielIdsToCheck);

      if (classLookupError) {
        return NextResponse.json({ error: 'Impossible de vérifier les classes.' }, { status: 500 });
      }

      const activeIds = new Set(
        (selectedClasses || [])
          .filter((c: { is_active: boolean }) => c.is_active)
          .map((c: { external_id: number }) => c.external_id)
      );
      const missingOrInactive = presentielIdsToCheck.filter((id) => !activeIds.has(id));
      if (missingOrInactive.length > 0) {
        return NextResponse.json(
          { error: "Cette classe n'est plus ouverte à l'inscription. Veuillez choisir un autre créneau." },
          { status: 400 }
        );
      }

      const { data: statusData, error: statusError } = await supabaseAdmin
        .from('vue_etat_creneaux')
        .select('classe_numero, est_plein, inscrits_count, capacity_limit')
        .in('classe_numero', presentielIdsToCheck);

      if (!statusError && statusData) {
        const fullClasses = statusData.filter((c: any) => {
          const official = getPresentielCapacityLimit(c.classe_numero);
          const inscrits = Number(c.inscrits_count) || 0;
          if (official != null) return inscrits >= official;
          return c.est_plein === true;
        });
        if (fullClasses.length > 0) {
          return NextResponse.json(
            { error: "Désolé, l'une des classes sélectionnées vient de se remplir. Veuillez choisir un autre créneau." },
            { status: 400 }
          );
        }
      }
    }
    // ------------------------------------------

    const unitAmountBeforePromo = Math.round(totalAmount * 100);

    const installments = body.installments ? parseInt(String(body.installments), 10) : 1;

    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // En local, on s'adapte dynamiquement au port (ex: 3005) pour éviter les erreurs de redirection
    const origin = req.headers.get('origin');
    if (origin && origin.includes('localhost')) {
      baseUrl = origin;
    }

    const isLocal = baseUrl.includes('localhost');

    let sessionParams: Stripe.Checkout.SessionCreateParams;

    const stripeAccount = resolveStripeAccount({
      formationId,
      formationType: formationData?.type || null,
    });
    const stripe = getStripeClient(stripeAccount);

    // Codes promo : UNIQUEMENT distanciel.
    const isDistancielCheckout =
      !isPlanPresentiel &&
      formationData?.type !== 'presentiel' &&
      stripeAccount !== 'presentiel';

    let promoDiscountCents = 0;
    let promoCodeLabel = '';
    let promoPromotionCodeId = '';
    const rawPromoCode = String(body.promoCode || body.promotionCode || '').trim();
    if (rawPromoCode) {
      if (!isDistancielCheckout) {
        return NextResponse.json(
          { error: 'Les codes promo sont réservés aux formations distanciel.' },
          { status: 400 },
        );
      }
      const resolved = await resolveStripePromoDiscount(stripe, rawPromoCode, unitAmountBeforePromo);
      if (!resolved.ok) {
        return NextResponse.json({ error: resolved.error }, { status: 400 });
      }
      promoDiscountCents = resolved.discount.discountCents;
      promoCodeLabel = resolved.discount.code;
      promoPromotionCodeId = resolved.discount.promotionCodeId;
    }

    const unitAmount = applyPromoToTotalCents(unitAmountBeforePromo, promoDiscountCents);
    const promoDiscountEuros = promoDiscountCents / 100;

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
      promo_code: promoCodeLabel,
      promo_discount_euros: String(promoDiscountEuros || 0),
      promo_discount_cents: String(promoDiscountCents || 0),
      promo_promotion_code_id: promoPromotionCodeId,
      amount_before_promo_cents: String(unitAmountBeforePromo),
      amount_after_promo_cents: String(unitAmount),
      allow_promo: isDistancielCheckout ? 'true' : 'false',
      stripe_account: stripeAccount,
      order_bump: bumpSlugs.join(','),
    };
    for (const slug of bumpSlugs) {
      metadata[bumpPriceMetadataKey(slug)] = String(bumpUnitPrices[slug] ?? 0);
    }

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

    const promoLineNote = promoDiscountCents > 0
      ? ` · code ${promoCodeLabel} −${promoDiscountEuros.toFixed(2)} €`
      : '';

    // Promo native Stripe UNIQUEMENT en paiement 1× sans code déjà appliqué.
    // En mensualités, un coupon « once » ne touche que le 1er mois → dette fausse.
    // On force donc la saisie site (répartition correcte) pour le Nx.
    const showStripePromoField =
      isDistancielCheckout && promoDiscountCents <= 0 && !(installments > 1);

    if (installments > 1) {
      const installmentAmount = installmentAmountAfterPromoCents(
        unitAmountBeforePromo,
        promoDiscountCents,
        installments,
      );

      // Création dynamique du tarif Stripe récurrent
      const dynamicPrice = await stripe.prices.create({
        currency: 'eur',
        unit_amount: installmentAmount,
        recurring: {
          interval: 'month',
        },
        product_data: {
          name: `Paiement en ${installments}x - ${formationTitle}${promoLineNote}`,
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
        ...(showStripePromoField ? { allow_promotion_codes: true } : {}),
        success_url: isLocal
          ? `${baseUrl}/api/checkout/local-success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(body.email || '')}`
          : `${baseUrl}/sign-up?email_address=${encodeURIComponent(body.email || '')}`,
        cancel_url: `${baseUrl}/inscription?canceled=true`,
        metadata: {
          ...metadata,
          installments_total: String(installments),
          installment_amount_cents: String(installmentAmount),
        },
        subscription_data: {
          metadata: {
            ...metadata,
            installments_total: String(installments),
            installment_amount_cents: String(installmentAmount),
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
                description: `${stripeDescription}${promoLineNote}`,
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        ...(showStripePromoField ? { allow_promotion_codes: true } : {}),
        invoice_creation: {
          enabled: true,
        },
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
