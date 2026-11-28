/**
 * Offre « Rentrée » sur les formations à distance :
 * - −50 € sur le tarif habituel (barré), appliqué à l'affichage ET au
 *   montant réellement facturé par /api/checkout (le prix de base reste
 *   celui de Supabase `formations.price`, la remise est appliquée dessus) ;
 * - Pack Accompagnement (49 €, valeur annoncée 399 €) offert à TOUS jusqu'au
 *   31 décembre 2026 : seul (inscription gratuite, sans Stripe) ou ajouté à
 *   n'importe quelle inscription ; ajouté d'office au panier d'une formation
 *   à distance.
 *
 * La remise −50 € ne concerne jamais le présentiel. Non cumulable avec un
 * code promo : quand l'offre s'applique au panier, les codes sont refusés.
 *
 * Pour arrêter : `endsAt` (remise) / `packEndsAt` (pack), ou `discountEuros`
 * à 0 et `packOffered` à false.
 */
export const DISTANCIEL_OFFER = {
  discountEuros: 50,
  /** Début (inclus), heure de Paris. */
  startsAt: '2026-11-23T00:00:00+01:00',
  /** Fin (exclue), heure de Paris. `null` = jusqu'à nouvel ordre. */
  endsAt: null as string | null,
  label: 'Offre de rentrée',
  /** Pack Accompagnement offert à tous (seul ou avec une inscription). */
  packOffered: true,
  /** Fin de l'offre pack (exclue), heure de Paris : valable jusqu'au 31 décembre 2026 inclus. */
  packEndsAt: '2027-01-01T00:00:00+01:00' as string | null,
  packEndsLabel: 'Offre valable jusqu’au 31 décembre 2026',
  packSlug: 'pack_accompagnement',
  /** Valeur affichée du pack (son tarif de vente seul est de 49 €). */
  packValueEuros: 399,
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

function isWithin(startsAt: string, endsAt: string | null, now: Date): boolean {
  const start = new Date(startsAt).getTime();
  if (!Number.isFinite(start) || now.getTime() < start) return false;
  if (endsAt) {
    const end = new Date(endsAt).getTime();
    if (Number.isFinite(end) && now.getTime() >= end) return false;
  }
  return true;
}

/** Remise −50 € sur les formations à distance : active ? */
export function isDistancielOfferActive(now: Date = new Date()): boolean {
  if (!(DISTANCIEL_OFFER.discountEuros > 0)) return false;
  return isWithin(DISTANCIEL_OFFER.startsAt, DISTANCIEL_OFFER.endsAt, now);
}

/** Pack Accompagnement offert à tous : actif ? (jusqu'au 31 décembre 2026) */
export function isPackOfferActive(now: Date = new Date()): boolean {
  if (!DISTANCIEL_OFFER.packOffered) return false;
  return isWithin(DISTANCIEL_OFFER.startsAt, DISTANCIEL_OFFER.packEndsAt, now);
}

export function isPackSlug(slug: string | null | undefined): boolean {
  return normalizeFormationSlug(slug) === DISTANCIEL_OFFER.packSlug;
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
  // Le pack lui-même : offert (0 €) pendant l'offre, même choisi seul.
  if (isPackSlug(formation.slug)) {
    return isPackOfferActive(now)
      ? { original, current: 0, discount: original }
      : { original, current: original, discount: 0 };
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
 * Le Pack Accompagnement doit-il être ajouté d'office au panier de cette
 * formation principale ? Oui pour une formation à distance tarifée pendant
 * l'offre. (Il reste offert, à 0 €, s'il est ajouté à la main ailleurs.)
 */
export function isPackOfferedWith(mainFormation: OfferFormation, now: Date = new Date()): boolean {
  return isPackOfferActive(now) && isDistancielOfferEligible(mainFormation);
}

/** Tarif d'une formation ajoutée au panier : le pack est à 0 € pendant l'offre, quel que soit le panier. */
export function addedFormationOfferPrice(
  price: number | null | undefined,
  addedFormation: OfferFormation,
  _mainFormation: OfferFormation,
  now: Date = new Date(),
): OfferedPrice & { offered: boolean } {
  const original = Number(price);
  const safe = Number.isFinite(original) && original > 0 ? original : 0;
  if (isPackSlug(addedFormation.slug) && isPackOfferActive(now)) {
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
