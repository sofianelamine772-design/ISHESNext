import Stripe from 'stripe';
import { isPresentielFormationSlug } from '@/lib/presentiel-rentree-email';

export type StripeAccountId = 'distanciel' | 'presentiel';

const STRIPE_API_VERSION_CHECKOUT = '2026-08-26.dahlia' as const;
const STRIPE_API_VERSION_LEGACY = '2023-10-16' as any;

const clients = new Map<string, Stripe>();

function distancielSecret(): string {
  return (
    process.env.STRIPE_DISTANCIEL_SECRET_KEY ||
    process.env.STRIPE_SECRET_KEY ||
    'sk_test_placeholder_for_build'
  );
}

function presentielSecret(): string | null {
  const key = process.env.STRIPE_PRESENTIEL_SECRET_KEY?.trim();
  return key || null;
}

export function isPresentielStripeConfigured(): boolean {
  return Boolean(presentielSecret());
}

export function getStripeWebhookSecret(account: StripeAccountId): string | null {
  if (account === 'presentiel') {
    return process.env.STRIPE_PRESENTIEL_WEBHOOK_SECRET?.trim() || null;
  }
  return (
    process.env.STRIPE_DISTANCIEL_WEBHOOK_SECRET?.trim() ||
    process.env.STRIPE_WEBHOOK_SECRET?.trim() ||
    null
  );
}

/**
 * Compte Stripe cible selon la formation.
 * Sans clé présentiel configurée → tout reste sur Distance (comportement actuel).
 */
export function resolveStripeAccount(params: {
  formationId?: string | null;
  formationType?: string | null;
  explicitAccount?: string | null;
}): StripeAccountId {
  const explicit = String(params.explicitAccount || '').trim().toLowerCase();
  if (explicit === 'presentiel' || explicit === 'distanciel') {
    if (explicit === 'presentiel' && !isPresentielStripeConfigured()) return 'distanciel';
    return explicit as StripeAccountId;
  }

  const type = String(params.formationType || '').trim().toLowerCase();
  const slug = String(params.formationId || '').trim();

  const isPresentiel =
    type === 'presentiel' ||
    isPresentielFormationSlug(slug);

  if (isPresentiel && isPresentielStripeConfigured()) return 'presentiel';
  return 'distanciel';
}

/** Compte stocké en DB ; NULL / vide = historique Distance. */
export function normalizeStoredStripeAccount(
  value?: string | null,
): StripeAccountId {
  const v = String(value || '').trim().toLowerCase();
  if (v === 'presentiel') return 'presentiel';
  return 'distanciel';
}

export function getStripeClient(
  account: StripeAccountId = 'distanciel',
  opts?: { legacyApi?: boolean },
): Stripe {
  const resolved: StripeAccountId =
    account === 'presentiel' && !isPresentielStripeConfigured()
      ? 'distanciel'
      : account;

  const secret =
    resolved === 'presentiel' ? presentielSecret()! : distancielSecret();
  const apiVersion = opts?.legacyApi ? STRIPE_API_VERSION_LEGACY : STRIPE_API_VERSION_CHECKOUT;
  const cacheKey = `${resolved}:${opts?.legacyApi ? 'legacy' : 'modern'}:${secret.slice(0, 12)}`;

  const cached = clients.get(cacheKey);
  if (cached) return cached;

  const client = new Stripe(secret, {
    apiVersion,
    typescript: true,
  });
  clients.set(cacheKey, client);
  return client;
}

/**
 * Vérifie la signature webhook en essayant Distance puis Présentiel.
 * Retourne l'événement + le compte associé au secret qui a validé.
 */
export function constructStripeWebhookEvent(
  body: string,
  signature: string,
): { event: Stripe.Event; account: StripeAccountId } {
  const stripe = getStripeClient('distanciel', { legacyApi: true });
  const candidates: Array<{ account: StripeAccountId; secret: string }> = [];

  const distSecret = getStripeWebhookSecret('distanciel');
  if (distSecret) candidates.push({ account: 'distanciel', secret: distSecret });

  const presSecret = getStripeWebhookSecret('presentiel');
  if (presSecret) candidates.push({ account: 'presentiel', secret: presSecret });

  if (candidates.length === 0) {
    throw new Error('Aucun STRIPE_WEBHOOK_SECRET configuré');
  }

  let lastError: unknown = null;
  for (const candidate of candidates) {
    try {
      const event = stripe.webhooks.constructEvent(body, signature, candidate.secret);
      return { event, account: candidate.account };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Webhook signature invalide');
}
