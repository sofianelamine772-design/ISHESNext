/** Réduction appliquée à chaque enfant supplémentaire inscrit dans le même paiement. */
export const SIBLING_DISCOUNT_EUR = 50;

export function getNamedChildren<T extends { prenom?: string; nom?: string }>(
  list: T[] | null | undefined
): T[] {
  if (!Array.isArray(list)) return [];
  return list.filter((child) =>
    String(child?.prenom || '').trim() !== '' && String(child?.nom || '').trim() !== ''
  );
}

export function getSiblingDiscount(childrenCount: number): number {
  if (!Number.isFinite(childrenCount) || childrenCount < 2) return 0;
  return SIBLING_DISCOUNT_EUR * (childrenCount - 1);
}

export function getFamilyCheckoutTotal(basePrice: number, childrenCount: number): number {
  const count = Math.max(0, Number.isFinite(childrenCount) ? childrenCount : 0);
  const subtotal = basePrice * count;
  return Math.max(0, subtotal - getSiblingDiscount(count));
}

/** Premier enfant au tarif plein, chaque enfant suivant à −50 €. */
export function getExpectedAmountForChild(
  basePrice: number,
  childIndex: number,
  childrenCount: number
): number {
  if (childrenCount < 2 || childIndex === 0) return basePrice;
  return Math.max(0, basePrice - SIBLING_DISCOUNT_EUR);
}
