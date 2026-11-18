/**
 * Campagne promo affichée sur le site (pop-up) et pré-remplie à l'inscription.
 *
 * ⚠️ Le code doit AUSSI exister dans Stripe (compte distanciel) : coupon
 * `amount_off` + promotion code. Voir `scripts/create-promo-code.mjs`.
 * Le site n'applique jamais la remise lui-même : c'est /api/checkout qui
 * vérifie le code auprès de Stripe. Les codes promo sont réservés au distanciel.
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
  /** Petit badge au-dessus du titre (ex. « Rentrée 2026 »). */
  badge: string;
  /** Texte court affiché dans le pop-up. */
  headline: string;
  /** Précision affichée sous le titre. */
  note: string;
  /** Bouton principal du pop-up. */
  ctaLabel: string;
  /** Destination du bouton principal. */
  ctaHref: string;
  /** Date limite lisible, affichée dans le pop-up. */
  deadlineLabel: string;
};

export const PROMO_CAMPAIGN: PromoCampaign = {
  code: 'ISHES2026',
  discountEuros: 100,
  // Active dès le 18 novembre 2026, valable jusqu'au 22 novembre 2026 INCLUS
  // (fin = minuit heure de Paris dans la nuit du 22 au 23).
  startsAt: '2026-11-18T00:00:00+01:00',
  endsAt: '2026-11-23T00:00:00+01:00',
  badge: 'Rentrée 2026',
  headline: '−100 € sur toutes les formations à distance',
  note: 'Arabe, Tajwid, Coran, Fiqh, Aqîda, Sîrah… en direct avec nos enseignants, depuis chez vous.',
  ctaLabel: 'Découvrir les formations à distance',
  ctaHref: '/fr/cours-a-distance',
  deadlineLabel: 'Offre valable jusqu’au 22 novembre',
};

/** Clé de stockage : le pop-up n'est montré qu'une fois par visite (sessionStorage). */
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

/**
 * Pages où le pop-up s'affiche : l'accueil et quelques pages d'entrée
 * (catalogue, cours à distance). Nulle part ailleurs, pour ne pas être
 * envahissant.
 */
export const PROMO_POPUP_PAGES = new Set([
  '/',
  '/fr',
  '/program',
  '/fr/cours-a-distance',
  '/fr/sciences-islamiques',
]);

export function shouldShowPromoPopupOnPath(pathname: string | null | undefined): boolean {
  const p = String(pathname || '/').split('?')[0].replace(/\/+$/, '') || '/';
  return PROMO_POPUP_PAGES.has(p);
}
