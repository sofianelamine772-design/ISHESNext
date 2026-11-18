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
};

export const PROMO_CAMPAIGN: PromoCampaign = {
  code: 'ISHES100',
  discountEuros: 100,
  // Active dès le 18 novembre 2026 (heure de Paris), sans date de fin programmée.
  startsAt: '2026-11-18T00:00:00+01:00',
  endsAt: null,
  badge: 'Rentrée 2026',
  headline: '−100 € sur toutes les formations à distance',
  note: 'Arabe, Tajwid, Coran, Fiqh, Aqîda, Sîrah… en direct avec nos enseignants, depuis chez vous.',
  ctaLabel: 'Je m’inscris maintenant',
  ctaHref: '/fr/cours-a-distance',
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

/** Pages « liste » qui restent autorisées bien qu'elles commencent par /fr/cours-. */
const FR_LISTING_PAGES = new Set(['/fr/cours-a-distance', '/fr/cours-en-presentiel']);

/** Pages /fr qui sont des fiches formation sans suivre le motif /fr/cours-*. */
const FR_FORMATION_PAGES = new Set([
  '/fr/les-cles-du-coran',
  '/fr/correction-fatiha',
  '/fr/guide-tilawa-memorisation-coran',
]);

/**
 * Le pop-up s'affiche partout (accueil compris) SAUF :
 * - tunnel d'inscription, espace élève, connexion, pages légales ;
 * - fiches formation détaillées (/program/<id>, /fr/cours-*, /fr/formation-*…),
 *   où le visiteur est déjà en train de lire une formation.
 */
export function shouldShowPromoPopupOnPath(pathname: string | null | undefined): boolean {
  const p = String(pathname || '/').split('?')[0].replace(/\/+$/, '') || '/';

  if (p.startsWith('/inscription')) return false;
  if (p.startsWith('/app') || p.startsWith('/sign-in') || p.startsWith('/sign-up')) return false;
  if (p === '/cgv' || p === '/mentions-legales' || p === '/politique-de-confidentialite') return false;
  if (p === '/unauthorized' || p === '/test-db') return false;

  // Fiches formation
  if (/^\/program\/[^/]+/.test(p)) return false;
  if (p.startsWith('/fr/cours-') && !FR_LISTING_PAGES.has(p)) return false;
  if (p.startsWith('/fr/formation-')) return false;
  if (FR_FORMATION_PAGES.has(p)) return false;

  return true;
}
