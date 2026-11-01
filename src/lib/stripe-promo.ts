import type Stripe from 'stripe';

export type ResolvedPromoDiscount = {
  promotionCodeId: string;
  code: string;
  /** Remise totale en centimes, plafonnée au montant du panier. */
  discountCents: number;
  /** Remise totale en euros (2 décimales). */
  discountEuros: number;
  couponId: string;
};

/**
 * Calcule la remise d'un coupon Stripe sur un total en centimes.
 * amount_off = fixe ; percent_off = %.
 */
export function computeCouponDiscountCents(
  coupon: Pick<Stripe.Coupon, 'amount_off' | 'percent_off' | 'valid'>,
  totalCents: number,
): number {
  const total = Math.max(0, Math.round(Number(totalCents) || 0));
  if (total <= 0) return 0;
  if (coupon.valid === false) return 0;

  if (typeof coupon.amount_off === 'number' && coupon.amount_off > 0) {
    return Math.min(total, Math.round(coupon.amount_off));
  }

  if (typeof coupon.percent_off === 'number' && coupon.percent_off > 0) {
    return Math.min(total, Math.round((total * coupon.percent_off) / 100));
  }

  return 0;
}

/** Total après promo, jamais négatif. */
export function applyPromoToTotalCents(totalCents: number, discountCents: number): number {
  return Math.max(0, Math.round(totalCents) - Math.max(0, Math.round(discountCents)));
}

/**
 * Mensualité après promo : la remise est répartie sur toutes les échéances
 * (pas uniquement le 1er mois).
 */
export function installmentAmountAfterPromoCents(
  totalCents: number,
  discountCents: number,
  installments: number,
): number {
  const n = Math.max(1, Math.round(Number(installments) || 1));
  const net = applyPromoToTotalCents(totalCents, discountCents);
  return Math.round(net / n);
}

/**
 * Résout un code promo Stripe actif et calcule la remise sur le panier.
 * Le code doit exister sur le même compte Stripe que le checkout.
 */
export async function resolveStripePromoDiscount(
  stripe: Stripe,
  rawCode: string | null | undefined,
  totalCents: number,
): Promise<{ ok: true; discount: ResolvedPromoDiscount } | { ok: false; error: string }> {
  const code = String(rawCode || '').trim().toUpperCase();
  if (!code) {
    return { ok: false, error: 'Code promo vide.' };
  }

  const total = Math.max(0, Math.round(Number(totalCents) || 0));
  if (total <= 0) {
    return { ok: false, error: 'Aucun montant à réduire.' };
  }

  let list: Stripe.ApiList<Stripe.PromotionCode>;
  try {
    list = await stripe.promotionCodes.list({
      code,
      active: true,
      limit: 1,
      expand: ['data.coupon'],
    });
  } catch (err: any) {
    console.error('[stripe-promo] list error', err?.message || err);
    return { ok: false, error: 'Impossible de vérifier le code promo.' };
  }

  const promo = list.data[0];
  if (!promo) {
    return { ok: false, error: 'Code promo invalide ou expiré.' };
  }

  const coupon = typeof promo.coupon === 'string'
    ? null
    : promo.coupon;

  if (!coupon) {
    return { ok: false, error: 'Coupon Stripe introuvable pour ce code.' };
  }

  if (coupon.valid === false) {
    return { ok: false, error: 'Ce code promo n’est plus valide.' };
  }

  const discountCents = computeCouponDiscountCents(coupon, total);
  if (discountCents <= 0) {
    return { ok: false, error: 'Ce code promo ne s’applique pas à ce montant.' };
  }

  return {
    ok: true,
    discount: {
      promotionCodeId: promo.id,
      code: promo.code || code,
      discountCents,
      discountEuros: Math.round(discountCents) / 100,
      couponId: coupon.id,
    },
  };
}

/** Applique la remise promo sur le 1er enfant / l’adulte (dette scolarité). */
export function applyPromoToExpectedAmount(
  expectedAmount: number | undefined,
  promoDiscountEuros: number,
  indexInFamily: number,
): number | undefined {
  if (expectedAmount === undefined) return undefined;
  if (!(promoDiscountEuros > 0) || indexInFamily !== 0) return expectedAmount;
  return Math.max(0, Number(expectedAmount) - promoDiscountEuros);
}
