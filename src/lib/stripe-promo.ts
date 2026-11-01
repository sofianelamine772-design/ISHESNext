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

/** API Stripe récente : coupon sous promotion.coupon (plus sous .coupon). */
function extractCouponRef(promo: Stripe.PromotionCode): string | Stripe.Coupon | null {
  const fromPromotion = promo.promotion?.coupon ?? null;
  if (fromPromotion) return fromPromotion;
  // Anciennes réponses éventuelles
  const legacy = (promo as unknown as { coupon?: string | Stripe.Coupon | null }).coupon;
  return legacy ?? null;
}

/**
 * Résout un code promo Stripe actif et calcule la remise sur le panier.
 * Le code doit exister sur le même compte Stripe que le checkout (distanciel).
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
      expand: ['data.promotion.coupon'],
    });
  } catch (err: any) {
    console.error('[stripe-promo] list error', err?.message || err);
    return { ok: false, error: 'Impossible de vérifier le code promo.' };
  }

  const promo = list.data[0];
  if (!promo) {
    return { ok: false, error: 'Code promo invalide ou expiré.' };
  }

  let couponRef = extractCouponRef(promo);
  let coupon: Stripe.Coupon | null =
    couponRef && typeof couponRef !== 'string' ? couponRef : null;

  if (!coupon && typeof couponRef === 'string') {
    try {
      coupon = await stripe.coupons.retrieve(couponRef);
    } catch (err: any) {
      console.error('[stripe-promo] coupon retrieve', err?.message || err);
      return { ok: false, error: 'Coupon Stripe introuvable pour ce code.' };
    }
  }

  if (!coupon) {
    return { ok: false, error: 'Coupon Stripe introuvable pour ce code.' };
  }

  if (coupon.valid === false) {
    return { ok: false, error: 'Ce code promo n’est plus valide.' };
  }

  const minAmount = promo.restrictions?.minimum_amount;
  if (typeof minAmount === 'number' && minAmount > 0 && total < minAmount) {
    return {
      ok: false,
      error: `Montant minimum requis : ${(minAmount / 100).toFixed(2)} €.`,
    };
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

/**
 * Consomme la promo restante sur une ligne de dette (formation, bump…).
 * Permet d’aligner la somme des expected sur le total Stripe quand la
 * remise dépasse le seul tarif principal (ex. promo + options).
 */
export function takePromoFromAmount(
  amount: number | undefined,
  remainingPromoEuros: { current: number },
): number | undefined {
  if (amount === undefined) return undefined;
  const value = Math.max(0, Number(amount) || 0);
  const remaining = Math.max(0, Number(remainingPromoEuros.current) || 0);
  if (!(remaining > 0)) return value;
  const cut = Math.min(value, remaining);
  remainingPromoEuros.current = Math.round((remaining - cut) * 100) / 100;
  return Math.max(0, Math.round((value - cut) * 100) / 100);
}

/** Répartit une promo sur une liste ordonnée de montants (tests / preview). */
export function applyPromoAcrossAmounts(
  amounts: number[],
  promoDiscountEuros: number,
): number[] {
  const remaining = { current: Math.max(0, Number(promoDiscountEuros) || 0) };
  return amounts.map((amount) => takePromoFromAmount(amount, remaining) ?? 0);
}

/**
 * Remise à appliquer sur la dette après paiement.
 * Priorité : metadata (promo saisie sur le site, montants déjà nets)
 * puis remise native Stripe Checkout (total_details).
 */
export function resolveSessionPromoDiscountEuros(session: {
  metadata?: Record<string, string> | null;
  total_details?: { amount_discount?: number | null } | null;
}): number {
  const fromMeta = parseFloat(session.metadata?.promo_discount_euros || '0');
  if (Number.isFinite(fromMeta) && fromMeta > 0) return fromMeta;
  const fromStripe = (session.total_details?.amount_discount || 0) / 100;
  return Number.isFinite(fromStripe) && fromStripe > 0 ? fromStripe : 0;
}

/** Extrait code + remise depuis le libellé stocké sur un paiement. */
export function parsePromoNoteFromPayment(errorMessage?: string | null): {
  code: string;
  discountEuros: number;
} | null {
  const raw = String(errorMessage || '');
  const match = raw.match(/Code promo\s+([A-Z0-9_-]+)\s*(?:\(−\s*([0-9]+(?:[.,][0-9]+)?)\s*€\))?/i);
  if (!match) return null;
  const discountEuros = match[2]
    ? parseFloat(match[2].replace(',', '.'))
    : 0;
  return {
    code: match[1].toUpperCase(),
    discountEuros: Number.isFinite(discountEuros) ? discountEuros : 0,
  };
}

/**
 * Libellé à stocker sur le paiement (code + remise).
 * Couvre la saisie site (metadata) et le champ promo natif Stripe Checkout.
 */
export function buildPromoPaymentNote(session: {
  metadata?: Record<string, string> | null;
  total_details?: { amount_discount?: number | null } | null;
  discounts?: Array<{
    promotion_code?: string | { id?: string; code?: string | null } | null;
  }> | null;
}): string | null {
  const fromMeta = String(session.metadata?.promo_code || '').trim();
  let code = fromMeta;
  if (!code && Array.isArray(session.discounts)) {
    for (const d of session.discounts) {
      const pc = d?.promotion_code;
      if (pc && typeof pc === 'object' && pc.code) {
        code = String(pc.code).trim();
        break;
      }
    }
  }
  const discountEuros = resolveSessionPromoDiscountEuros(session);
  if (!code && !(discountEuros > 0)) return null;
  if (code && discountEuros > 0) {
    return `Code promo ${code.toUpperCase()} (−${discountEuros.toFixed(2)} €)`;
  }
  if (code) return `Code promo ${code.toUpperCase()}`;
  return `Code promo (−${discountEuros.toFixed(2)} €)`;
}
