import {
  isPresentielStripeConfigured,
  resolveStripeAccount,
  normalizeStoredStripeAccount,
  getStripeWebhookSecret,
} from '@/lib/stripe-accounts';

/**
 * Garde-fous double Stripe — bloquent le push si le routage présentiel/distanciel régresse.
 */
describe('stripe-accounts — routage nouveaux inscrits', () => {
  const prevPresentiel = process.env.STRIPE_PRESENTIEL_SECRET_KEY;
  const prevDistWhsec = process.env.STRIPE_WEBHOOK_SECRET;
  const prevPresWhsec = process.env.STRIPE_PRESENTIEL_WEBHOOK_SECRET;

  afterEach(() => {
    if (prevPresentiel === undefined) delete process.env.STRIPE_PRESENTIEL_SECRET_KEY;
    else process.env.STRIPE_PRESENTIEL_SECRET_KEY = prevPresentiel;
    if (prevDistWhsec === undefined) delete process.env.STRIPE_WEBHOOK_SECRET;
    else process.env.STRIPE_WEBHOOK_SECRET = prevDistWhsec;
    if (prevPresWhsec === undefined) delete process.env.STRIPE_PRESENTIEL_WEBHOOK_SECRET;
    else process.env.STRIPE_PRESENTIEL_WEBHOOK_SECRET = prevPresWhsec;
  });

  beforeEach(() => {
    process.env.STRIPE_PRESENTIEL_SECRET_KEY = 'sk_test_presentiel_gate';
  });

  const presentielCases = [
    { formationId: 'presentiel-global', formationType: 'presentiel' },
    { formationId: 'presentiel-enfant', formationType: 'presentiel' },
    { formationId: 'femme_debutante', formationType: null },
    { formationId: 'femme-debutante-presentiel', formationType: 'presentiel' },
    { formationId: 'femme-intermediaire-presentiel', formationType: 'presentiel' },
    { formationId: 'femme_intermediaire', formationType: null },
    { formationId: 'enfant-mercredi-presentiel', formationType: 'presentiel' },
    { formationId: 'arabe-coran-junior', formationType: 'presentiel' },
  ] as const;

  const distancielCases = [
    { formationId: 'fiqh_malikite', formationType: 'distanciel' },
    { formationId: 'tajwid_intensif', formationType: 'distanciel' },
    { formationId: 'arabe_enfant_distance', formationType: 'distanciel' },
    { formationId: 'tarbiya_islamiya', formationType: 'distanciel' },
    { formationId: 'al_aqida', formationType: 'distanciel' },
    { formationId: 'sciences_du_coran', formationType: null },
  ] as const;

  it.each(presentielCases)(
    'présentiel → Stripe présentiel ($formationId)',
    ({ formationId, formationType }) => {
      expect(resolveStripeAccount({ formationId, formationType })).toBe('presentiel');
    },
  );

  it.each(distancielCases)(
    'distanciel → Stripe distanciel ($formationId)',
    ({ formationId, formationType }) => {
      expect(resolveStripeAccount({ formationId, formationType })).toBe('distanciel');
    },
  );

  it('sans clé présentiel → tout reste sur distanciel (sécurité legacy)', () => {
    delete process.env.STRIPE_PRESENTIEL_SECRET_KEY;
    expect(isPresentielStripeConfigured()).toBe(false);
    expect(
      resolveStripeAccount({ formationId: 'presentiel-global', formationType: 'presentiel' }),
    ).toBe('distanciel');
    expect(resolveStripeAccount({ explicitAccount: 'presentiel' })).toBe('distanciel');
  });

  it('metadata explicite prioritaire', () => {
    expect(
      resolveStripeAccount({
        explicitAccount: 'presentiel',
        formationId: 'fiqh_malikite',
        formationType: 'distanciel',
      }),
    ).toBe('presentiel');
    expect(
      resolveStripeAccount({
        explicitAccount: 'distanciel',
        formationId: 'presentiel-global',
        formationType: 'presentiel',
      }),
    ).toBe('distanciel');
  });

  it('anciens paiements null/vide = distanciel (backfill historique)', () => {
    expect(normalizeStoredStripeAccount(null)).toBe('distanciel');
    expect(normalizeStoredStripeAccount(undefined)).toBe('distanciel');
    expect(normalizeStoredStripeAccount('')).toBe('distanciel');
    expect(normalizeStoredStripeAccount('presentiel')).toBe('presentiel');
  });

  it('secrets webhook distincts par compte', () => {
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_dist';
    process.env.STRIPE_PRESENTIEL_WEBHOOK_SECRET = 'whsec_pres';
    expect(getStripeWebhookSecret('distanciel')).toBe('whsec_dist');
    expect(getStripeWebhookSecret('presentiel')).toBe('whsec_pres');
  });
});
