/**
 * Campagne mise en avant sur le site (pop-up).
 *
 * Deux formes possibles :
 * - avec `code` : code promo à saisir à l'étape paiement (il doit AUSSI
 *   exister dans Stripe, compte distanciel — voir `scripts/create-promo-code.mjs`) ;
 * - sans `code` (`null`) : avantage appliqué automatiquement par le site
 *   (ex. Pack Accompagnement offert, voir `src/lib/distanciel-offer.ts`).
 *
 * Le site n'applique jamais une remise lui-même hors des règles de
 * `distanciel-offer.ts` : c'est /api/checkout qui calcule le montant.
 * Les codes promo sont réservés au distanciel.
 */
export type PromoCampaign = {
  /** Identifiant stable (clé de stockage du pop-up). */
  id: string;
  /** Code saisi par le client (majuscules), ou `null` si l'avantage est automatique. */
  code: string | null;
  /** Remise en euros, pour l'affichage uniquement (0 si pas de remise chiffrée). */
  discountEuros: number;
  /** Début d'affichage (inclus). */
  startsAt: string;
  /** Fin d'affichage (exclue). `null` = pas de fin programmée. */
  endsAt: string | null;
  /** Petit badge au-dessus du titre (ex. « Rentrée 2026 »). */
  badge: string;
  /** Gros texte du bandeau (ex. « OFFERT »). */
  highlight: string;
  /** Titre sous le gros texte. */
  headline: string;
  /** Petite ligne sous le titre (ex. « D'une valeur de 399 € »), '' = aucune. */
  valueLabel: string;
  /** Accroche en tête du corps ('' = aucune). */
  tagline: string;
  /** Liste d'avantages (titre + précision). */
  bullets: { title: string; detail: string }[];
  /** Précision affichée sous le titre. */
  note: string;
  /** Bouton principal du pop-up. */
  ctaLabel: string;
  /** Destination du bouton principal. */
  ctaHref: string;
  /** Date limite lisible ('' = aucune échéance affichée). */
  deadlineLabel: string;
  /** Petite ligne sous le bouton. */
  footnote: string;
};

export const PROMO_CAMPAIGN: PromoCampaign = {
  id: 'pack-offert-2026',
  code: null,
  discountEuros: 0,
  startsAt: '2026-11-25T00:00:00+01:00',
  // Valable jusqu'au 31 décembre 2026 inclus (fin = 1er janvier 00h00 Paris).
  endsAt: '2027-01-01T00:00:00+01:00',
  badge: 'Offre exceptionnelle',
  highlight: 'OFFERT',
  headline: 'Le Pack Accompagnement',
  valueLabel: 'D’une valeur de 399 €',
  note: '',
  tagline: 'Ne chemine plus seul dans ta religion.',
  bullets: [
    { title: 'Une communauté WhatsApp privée', detail: 'Échange et avance avec d’autres cheminants.' },
    { title: '4 cours de spiritualité en direct', detail: 'Avec Oustadha Rachida.' },
    { title: 'Des rencontres mensuelles en direct', detail: 'Avec les fondateurs de l’Institut ISHES.' },
    { title: 'Des entretiens individuels d’orientation', detail: 'Pour être guidé dans ton cheminement religieux.' },
  ],
  ctaLabel: 'Je profite de l’offre',
  // Inscription gratuite au pack (0 €, sans paiement).
  ctaHref: '/inscription?plan=pack_accompagnement&audience=adulte',
  deadlineLabel: 'Offre valable jusqu’au 31 décembre 2026',
  footnote: 'Pack ajouté automatiquement, sans code promo.',
};

/** Clé de stockage : le pop-up n'est montré qu'une fois par visite (sessionStorage). */
export const PROMO_POPUP_STORAGE_KEY = `ishes_promo_popup_${PROMO_CAMPAIGN.id}`;

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
