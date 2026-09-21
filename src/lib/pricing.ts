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

/** Supabase renvoie parfois une relation en objet, parfois en tableau. */
export function unwrapRelation<T>(value: T | T[] | null | undefined): T | null {
  if (value == null) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

/**
 * Prix facturé pour une inscription.
 * Source de vérité = prix catalogue formation. expected_amount seulement s'il est ≤ catalogue
 * (réduction fratrie). Sinon on ignore un expected gonflé (ex: 1197 = 3×399 après doublons).
 */
export function resolveBillingExpectedAmount(
  expectedAmount: number | null | undefined,
  formationPrice: number | null | undefined,
): number {
  const catalog = Number(formationPrice);
  const raw =
    expectedAmount !== null && expectedAmount !== undefined ? Number(expectedAmount) : NaN;
  const hasCatalog = Number.isFinite(catalog) && catalog > 0;
  const hasRaw = Number.isFinite(raw) && raw >= 0;

  if (hasCatalog && hasRaw) {
    return raw <= catalog + 0.01 ? raw : catalog;
  }
  if (hasCatalog) return catalog;
  if (hasRaw) return raw;
  return 0;
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
 * Garde la PREMIÈRE inscription (la plus ancienne) pour chaque couple personne/email + formation + année.
 */
export function pickBillingInscriptions<
  T extends {
    id: string;
    etudiant_id: string;
    formation_id?: string | null;
    formation_title?: string | null;
    academic_year?: string | null;
    created_at?: string | null;
    status?: string | null;
  },
>(
  inscriptions: T[],
  getStudentName: (etudiantId: string) => {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  },
): T[] {
  const filtered = (inscriptions || []).filter((ins) =>
    ACTIVE_BILLING_STATUSES.has(String(ins.status || '')),
  );
  // Plus ancienne d'abord = première facture
  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime(),
  );

  const normalizeTitle = (title?: string | null) =>
    String(title || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\b(session|cours|formation|the)\b/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const normalizeEmail = (email?: string | null) =>
    String(email || '')
      .trim()
      .toLowerCase()
      .split('+')[0];

  const seen = new Set<string>();
  const result: T[] = [];
  for (const ins of sorted) {
    const names = getStudentName(ins.etudiant_id);
    const personKey = normalizeBillingPersonKey(names.firstName, names.lastName);
    const emailKey = normalizeEmail(names.email);
    const yearKey = String(ins.academic_year || '');
    const formationId = String(ins.formation_id || '').trim();
    const formationTitle = normalizeTitle(ins.formation_title);

    const formationKeys = [
      formationId ? `id:${formationId}` : null,
      formationTitle ? `title:${formationTitle}` : null,
      !formationId && !formationTitle ? 'unknown' : null,
    ].filter(Boolean) as string[];

    const identityKeys = [
      personKey !== '|' ? personKey : null,
      emailKey && personKey !== '|' ? `${emailKey}|${personKey}` : null,
      ins.etudiant_id,
    ].filter(Boolean) as string[];

    const keys = identityKeys.flatMap((identity) =>
      formationKeys.map((formation) => `${identity}|${formation}|${yearKey}`),
    );

    if (keys.some((key) => seen.has(key))) continue;
    keys.forEach((key) => seen.add(key));
    result.push(ins);
  }
  return result;
}

const SUCCEEDED_PAYMENT_STATUSES = new Set(['succeeded', 'paid', 'payé']);

/** Paiement saisi en admin (liquide, virement, MyScol, settle…) — id préfixé `manual_`. */
export function isManualBillingPayment(payment: {
  stripe_session_id?: string | null;
}): boolean {
  return String(payment.stripe_session_id || '').startsWith('manual_');
}

/**
 * Paiement Stripe mode test (clés sk_test / checkout local).
 * Ex. cs_test_…, in_test_…, pi_test_… — à exclure de l’encaissement réel.
 */
export function isTestStripePayment(payment: {
  stripe_session_id?: string | null;
}): boolean {
  const id = String(payment.stripe_session_id || '').toLowerCase();
  if (!id || id.startsWith('manual_')) return false;
  return (
    id.startsWith('cs_test_') ||
    id.startsWith('in_test_') ||
    id.startsWith('pi_test_') ||
    id.includes('_test_')
  );
}

/** Paiement Stripe live (vrai argent). */
export function isLiveStripePayment(payment: {
  stripe_session_id?: string | null;
}): boolean {
  if (isManualBillingPayment(payment) || isTestStripePayment(payment)) return false;
  const id = String(payment.stripe_session_id || '');
  return id.length > 0;
}

/**
 * Encaissement = argent réellement reçu.
 * On déduplique uniquement par stripe_session_id (même session listée 2 fois).
 * Plusieurs cs_ pour le même élève sont conservés (ex: 2 formations = 2 checkouts).
 * Les mensualités in_… sont toutes gardées.
 */
export function pickBillingPayments<
  T extends {
    id: string;
    etudiant_id?: string | null;
    stripe_session_id?: string | null;
    amount?: number | null;
    status?: string | null;
    created_at?: string | null;
  },
>(
  payments: T[],
  _getStudentName: (etudiantId: string) => {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  } = () => ({}),
): T[] {
  const bySession = new Map<string, T>();
  for (const payment of payments || []) {
    const key = String(payment.stripe_session_id || payment.id);
    if (!bySession.has(key)) bySession.set(key, payment);
  }

  return Array.from(bySession.values()).sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime(),
  );
}

/** Somme des paiements réussis hors Stripe test (live + manuel uniquement). */
export function sumSucceededBillingPayments<
  T extends {
    amount?: number | null;
    status?: string | null;
    stripe_session_id?: string | null;
  },
>(payments: T[]): number {
  return payments
    .filter(
      (p) =>
        SUCCEEDED_PAYMENT_STATUSES.has(String(p.status || '')) &&
        !isTestStripePayment(p),
    )
    .reduce((acc, p) => acc + Number(p.amount || 0), 0);
}

/**
 * Totaux encaissés : Stripe live uniquement vs saisie manuelle.
 * Les paiements cs_test_ / in_test_ / … sont exclus (tests locaux).
 */
export function sumSucceededPaymentsBySource<
  T extends {
    amount?: number | null;
    status?: string | null;
    stripe_session_id?: string | null;
  },
>(payments: T[]): { stripe: number; manual: number; total: number } {
  let stripe = 0;
  let manual = 0;
  for (const p of payments || []) {
    if (!SUCCEEDED_PAYMENT_STATUSES.has(String(p.status || ''))) continue;
    if (isTestStripePayment(p)) continue;
    const amount = Number(p.amount || 0);
    if (isManualBillingPayment(p)) manual += amount;
    else if (isLiveStripePayment(p)) stripe += amount;
  }
  return { stripe, manual, total: stripe + manual };
}

export type InscriptionPaidStatus = 'paye' | 'partiel' | 'impaye';

/**
 * Statut financier dérivé des totaux facturation.
 * Un acompte Stripe (ex: 133 € sur 399 €) → partiel, jamais impaye.
 * Sinon l’espace élève filtre les inscriptions et bloque la connexion utile.
 */
export function resolveInscriptionPaidStatus(
  totalPaid: number,
  resteAPayer: number,
): InscriptionPaidStatus {
  const paid = Number(totalPaid) || 0;
  const reste = Number(resteAPayer) || 0;
  if (reste <= 0.01) return 'paye'; // soldé ou formation à 0 €
  if (paid > 0.01) return 'partiel';
  return 'impaye';
}

/**
 * L’espace élève n’affiche que les inscriptions « ouvertes » financièrement.
 * partiel doit toujours passer (acomptes mensuels / 1er paiement).
 */
export function inscriptionGrantsStudentAccess(
  paidStatus?: string | null,
  options?: { isManualStudent?: boolean },
): boolean {
  if (options?.isManualStudent) return true;
  const status = String(paidStatus || '').toLowerCase();
  return status === 'paye' || status === 'partiel' || status === 'exonere';
}
