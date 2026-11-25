/**
 * Offre « Rentrée » sur les formations à distance :
 * - −49 € sur le tarif habituel (barré), appliqué à l'affichage ET au
 *   montant réellement facturé par /api/checkout (le prix de base reste
 *   celui de Supabase `formations.price`, la remise est appliquée dessus) ;
 * - Pack Accompagnement (49 €) offert pour toute inscription à une
 *   formation à distance.
 *
 * Jamais sur le présentiel. Non cumulable avec un code promo : quand l'offre
 * s'applique au panier, les codes sont refusés.
 *
 * Pour arrêter l'offre : renseigner `endsAt` (ou mettre `discountEuros` à 0
 * et `packOffered` à false).
 */
export const DISTANCIEL_OFFER = {
  discountEuros: 49,
  /** Début (inclus), heure de Paris. */
  startsAt: '2026-11-23T00:00:00+01:00',
  /** Fin (exclue), heure de Paris. `null` = jusqu'à nouvel ordre. */
  endsAt: null as string | null,
  label: 'Offre de rentrée',
  /** Pack Accompagnement offert avec une formation à distance. */
  packOffered: true,
  packSlug: 'pack_accompagnement',
  packValueEuros: 49,
};

export const DISTANCIEL_OFFER_EXCLUDED_SLUGS = new Set([
  'pack_accompagnement',
  'correction_fatiha',
  'cours_particuliers',
  'formation_enseignante_tajwid',
  'formation_enseignante_tarbya',
]);

export type OfferFormation = {
  slug?: string | null;
  /** `formations.type` en base (`distanciel` | `presentiel`), si connu. */
  type?: string | null;
};

export type OfferedPrice = {
  /** Tarif habituel (celui du catalogue / de la base). */
  original: number;
  /** Tarif à afficher et à facturer. */
  current: number;
  /** Remise appliquée en euros (0 si l'offre ne s'applique pas). */
  discount: number;
};

export function normalizeFormationSlug(slug: string | null | undefined): string {
  return String(slug || '').trim().toLowerCase().replace(/-/g, '_');
}

export function isDistancielOfferActive(now: Date = new Date()): boolean {
  if (!(DISTANCIEL_OFFER.discountEuros > 0)) return false;
  const start = new Date(DISTANCIEL_OFFER.startsAt).getTime();
  if (!Number.isFinite(start) || now.getTime() < start) return false;
  if (DISTANCIEL_OFFER.endsAt) {
    const end = new Date(DISTANCIEL_OFFER.endsAt).getTime();
    if (Number.isFinite(end) && now.getTime() >= end) return false;
  }
  return true;
}

/**
 * Une formation est éligible si elle est à distance et tarifée.
 * Le `type` de la base prime quand il est connu ; sinon on se fie au slug.
 */
export function isDistancielOfferEligible(formation: OfferFormation): boolean {
  const slug = normalizeFormationSlug(formation.slug);
  if (!slug) return false;
  if (DISTANCIEL_OFFER_EXCLUDED_SLUGS.has(slug)) return false;
  if (slug.includes('presentiel')) return false;
  if (formation.type != null && formation.type !== '') {
    return String(formation.type).toLowerCase() === 'distanciel';
  }
  return true;
}

/**
 * Applique l'offre à un prix. Si elle ne s'applique pas (hors période,
 * présentiel, prix nul, prix inférieur ou égal à la remise…), `current === original`.
 */
export function applyDistancielOffer(
  price: number | null | undefined,
  formation: OfferFormation,
  now: Date = new Date(),
): OfferedPrice {
  const original = Number(price);
  if (!Number.isFinite(original) || original <= 0) {
    return { original: Number.isFinite(original) ? original : 0, current: Number.isFinite(original) ? original : 0, discount: 0 };
  }
  const discount = DISTANCIEL_OFFER.discountEuros;
  if (
    !isDistancielOfferActive(now) ||
    !isDistancielOfferEligible(formation) ||
    original <= discount
  ) {
    return { original, current: original, discount: 0 };
  }
  return { original, current: original - discount, discount };
}

/**
 * Le Pack Accompagnement est-il offert avec cette formation principale ?
 * (offre active, pack offert, formation à distance tarifée)
 */
export function isPackOfferedWith(mainFormation: OfferFormation, now: Date = new Date()): boolean {
  return (
    DISTANCIEL_OFFER.packOffered &&
    isDistancielOfferActive(now) &&
    isDistancielOfferEligible(mainFormation)
  );
}

/** Tarif d'une formation ajoutée au panier : le pack est à 0 € s'il est offert. */
export function addedFormationOfferPrice(
  price: number | null | undefined,
  addedFormation: OfferFormation,
  mainFormation: OfferFormation,
  now: Date = new Date(),
): OfferedPrice & { offered: boolean } {
  const original = Number(price);
  const safe = Number.isFinite(original) && original > 0 ? original : 0;
  if (
    normalizeFormationSlug(addedFormation.slug) === DISTANCIEL_OFFER.packSlug &&
    isPackOfferedWith(mainFormation, now)
  ) {
    return { original: safe, current: 0, discount: safe, offered: true };
  }
  return { ...applyDistancielOffer(price, addedFormation, now), offered: false };
}

/** « 399 € » → 399 ; « Sur Devis » / « 0 € » → null. */
export function parsePriceEuros(label: string | null | undefined): number | null {
  const digits = String(label || '').replace(/[^\d]/g, '');
  if (!digits) return null;
  const value = parseInt(digits, 10);
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function formatEuros(value: number): string {
  return `${value.toLocaleString('fr-FR')} €`;
}
