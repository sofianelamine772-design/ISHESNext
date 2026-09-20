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

function isCheckoutSessionId(sessionId?: string | null): boolean {
  return String(sessionId || '').startsWith('cs_');
}

/**
 * Après suppression/recréation de profil, un 2e checkout (cs_…) peut exister.
 * On garde le PREMIER checkout (bon abonnement Stripe) + toutes les mensualités (in_…).
 * Les frères/sœurs avec des checkouts distincts restent chacun avec leur 1er cs_.
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
  getStudentName: (etudiantId: string) => {
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
  const unique = Array.from(bySession.values());

  const normalizeEmail = (email?: string | null) =>
    String(email || '')
      .trim()
      .toLowerCase()
      .split('+')[0];

  const checkouts: T[] = [];
  const others: T[] = [];
  for (const payment of unique) {
    if (isCheckoutSessionId(payment.stripe_session_id)) checkouts.push(payment);
    else others.push(payment);
  }

  const sortedCheckouts = [...checkouts].sort(
    (a, b) =>
      new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime(),
  );

  const seenPersonCheckout = new Set<string>();
  const keptCheckouts: T[] = [];
  for (const payment of sortedCheckouts) {
    const studentId = String(payment.etudiant_id || '');
    const names = getStudentName(studentId);
    const personKey = normalizeBillingPersonKey(names.firstName, names.lastName);
    const emailKey = normalizeEmail(names.email);
    const groupKey =
      personKey !== '|'
        ? `${emailKey}|${personKey}`
        : studentId || payment.id;

    if (seenPersonCheckout.has(groupKey)) continue;
    seenPersonCheckout.add(groupKey);
    keptCheckouts.push(payment);
  }

  return [...keptCheckouts, ...others].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime(),
  );
}

export function sumSucceededBillingPayments<
  T extends { amount?: number | null; status?: string | null },
>(payments: T[]): number {
  return payments
    .filter((p) => SUCCEEDED_PAYMENT_STATUSES.has(String(p.status || '')))
    .reduce((acc, p) => acc + Number(p.amount || 0), 0);
}
