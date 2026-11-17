/**
 * Campagne promo affichée sur le site (pop-up) et pré-remplie à l'inscription.
 *
 * ⚠️ Le code doit AUSSI exister dans Stripe (compte distanciel) : coupon
 * `amount_off` + promotion code. Voir `scripts/create-promo-code.mjs`.
 * Le site n'applique jamais la remise lui-même : c'est /api/checkout qui
 * vérifie le code auprès de Stripe.
 */
export type PromoCampaign = {
  /** Code saisi par le client (majuscules). */
  code: string;
  /** Remise en euros, pour l'affichage uniquement. */
  discountEuros: number;
  /** Début d'affichage (inclus). */
  startsAt: string;
  /** Fin d'affichage (exclue). `null` = pas de fin programmée. */
  endsAt: string | null;
  /** Texte court affiché dans le pop-up. */
  headline: string;
  /** Précision affichée sous le code. */
  note: string;
};

export const PROMO_CAMPAIGN: PromoCampaign = {
  code: 'ISHES100',
  discountEuros: 100,
  // Minuit heure de Paris, le 20 novembre 2026
  startsAt: '2026-11-20T00:00:00+01:00',
  endsAt: null,
  headline: '−100 € sur votre formation à distance',
  note: 'Valable sur les formations à distance, à saisir à l’étape paiement.',
};

/** Clé localStorage : le pop-up n'est montré qu'une fois par jour et par navigateur. */
export const PROMO_POPUP_STORAGE_KEY = `ishes_promo_popup_${PROMO_CAMPAIGN.code}`;

export function isPromoCampaignActive(
  campaign: PromoCampaign = PROMO_CAMPAIGN,
  now: Date = new Date(),
): boolean {
  const start = new Date(campaign.startsAt).getTime();
  if (!Number.isFinite(start) || now.getTime() < start) return false;
  if (campaign.endsAt) {
    const end = new Date(campaign.endsAt).getTime();
    if (Number.isFinite(end) && now.getTime() >= end) return false;
  }
  return true;
}

/** La campagne active, ou `null` hors période. */
export function getActivePromoCampaign(now: Date = new Date()): PromoCampaign | null {
  return isPromoCampaignActive(PROMO_CAMPAIGN, now) ? PROMO_CAMPAIGN : null;
}

/** Pages où le pop-up ne doit pas s'afficher (tunnel de paiement, légal). */
export function shouldShowPromoPopupOnPath(pathname: string | null | undefined): boolean {
  const p = String(pathname || '/');
  if (p.startsWith('/inscription')) return false;
  if (p.startsWith('/app') || p.startsWith('/sign-in') || p.startsWith('/sign-up')) return false;
  if (p === '/cgv' || p === '/mentions-legales' || p === '/politique-de-confidentialite') return false;
  return true;
}
