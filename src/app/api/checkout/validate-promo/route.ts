import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getStripeClient, resolveStripeAccount } from '@/lib/stripe-accounts';
import { resolvePresentielCheckoutSlug } from '@/lib/presentiel-data';
import { resolveStripePromoDiscount } from '@/lib/stripe-promo';

/**
 * Prévisualise un code promo distanciel avant paiement.
 * Body: { promoCode, planId?, formationId?, amountEuros? }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const promoCode = String(body.promoCode || '').trim();
    if (!promoCode) {
      return NextResponse.json({ error: 'Indiquez un code promo.' }, { status: 400 });
    }

    let totalCents = Math.round(Number(body.amountEuros || 0) * 100);
    const formationId = resolvePresentielCheckoutSlug(
      body.formationId || body.planId || '',
      [],
    );

    let formationType: string | null = null;
    if (formationId) {
      const { data: formation } = await supabaseAdmin
        .from('formations')
        .select('type, price')
        .eq('slug', formationId)
        .maybeSingle();
      formationType = formation?.type || null;
      if (!(totalCents > 0) && formation?.price != null) {
        totalCents = Math.round(Number(formation.price) * 100);
      }
    }

    const isPresentiel =
      formationType === 'presentiel' ||
      formationId.toLowerCase().includes('presentiel');
    if (isPresentiel) {
      return NextResponse.json(
        { error: 'Les codes promo sont réservés aux formations distanciel.' },
        { status: 400 },
      );
    }

    if (!(totalCents > 0)) {
      return NextResponse.json({ error: 'Montant invalide pour vérifier le code.' }, { status: 400 });
    }

    const stripeAccount = resolveStripeAccount({
      formationId,
      formationType,
    });
    if (stripeAccount === 'presentiel') {
      return NextResponse.json(
        { error: 'Les codes promo sont réservés aux formations distanciel.' },
        { status: 400 },
      );
    }

    const stripe = getStripeClient(stripeAccount);
    const resolved = await resolveStripePromoDiscount(stripe, promoCode, totalCents);
    if (!resolved.ok) {
      return NextResponse.json({ error: resolved.error }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      code: resolved.discount.code,
      discountEuros: resolved.discount.discountEuros,
      discountCents: resolved.discount.discountCents,
      totalAfterEuros: Math.max(0, totalCents - resolved.discount.discountCents) / 100,
      stripeAccount,
    });
  } catch (err) {
    console.error('[validate-promo]', err);
    return NextResponse.json({ error: 'Erreur lors de la vérification du code.' }, { status: 500 });
  }
}
