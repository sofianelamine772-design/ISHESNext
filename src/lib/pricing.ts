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

const ACTIVE_BILLING_STATUSES = new Set([
  'valide',
  'actif',
  'en_attente',
  'en_attente_daffectation',
]);

export function normalizeBillingPersonKey(
  firstName?: string | null,
  lastName?: string | null,
): string {
  const norm = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  return `${norm(firstName || '')}|${norm(lastName || '')}`;
}

/**
 * Évite de compter deux fois le même élève/formation (doublons de saisie admin).
 * Garde l'inscription la plus récente pour chaque couple personne + formation + année.
 */
export function pickBillingInscriptions<
  T extends {
    id: string;
    etudiant_id: string;
    formation_id?: string | null;
    academic_year?: string | null;
    created_at?: string | null;
    status?: string | null;
  },
>(
  inscriptions: T[],
  getStudentName: (etudiantId: string) => { firstName?: string | null; lastName?: string | null },
): T[] {
  const filtered = (inscriptions || []).filter((ins) =>
    ACTIVE_BILLING_STATUSES.has(String(ins.status || '')),
  );
  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime(),
  );

  const seen = new Set<string>();
  const result: T[] = [];
  for (const ins of sorted) {
    const names = getStudentName(ins.etudiant_id);
    const personKey = normalizeBillingPersonKey(names.firstName, names.lastName);
    const formationKey = String(ins.formation_id || '');
    const yearKey = String(ins.academic_year || '');
    const byPerson = `${personKey}|${formationKey}|${yearKey}`;
    const byId = `${ins.etudiant_id}|${formationKey}|${yearKey}`;
    if (seen.has(byPerson) || seen.has(byId)) continue;
    seen.add(byPerson);
    seen.add(byId);
    result.push(ins);
  }
  return result;
}
