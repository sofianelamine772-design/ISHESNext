/// <reference types="jest" />
/**
 * Prélèvement refusé puis relancé avec succès par Stripe : la même facture
 * passe d'« échoué » à « réglé » (même ligne, pas de doublon).
 */
const rows: Record<string, any>[] = [];
function builder() {
  const filters: Array<(r: any) => boolean> = [];
  let op: 'select' | 'update' = 'select';
  let payload: any = {};
  const exec = () => {
    const matched = rows.filter((r) => filters.every((f) => f(r)));
    if (op === 'update') matched.forEach((r) => Object.assign(r, payload));
    return matched;
  };
  const api: any = {
    select: () => api,
    order: () => api,
    limit: () => api,
    eq: (c: string, v: unknown) => (filters.push((r) => r[c] === v), api),
    in: () => api,
    update: (p: any) => ((op = 'update'), (payload = p), api),
    maybeSingle: async () => ({ data: exec()[0] ?? null, error: null }),
    then: (resolve: (v: unknown) => unknown) => resolve({ data: exec(), error: null }),
  };
  return api;
}
jest.mock('@/lib/supabaseAdmin', () => ({ supabaseAdmin: { from: () => builder() } }));
jest.mock('@/lib/paiements-insert', () => ({ insertPaiementWithStripeAccount: jest.fn() }));

import { recordInvoicePayment } from '@/lib/stripe-invoice-sync';

const invoice = (over: Record<string, unknown> = {}) =>
  ({
    id: 'in_retry_1',
    amount_paid: 0,
    amount_due: 9600,
    billing_reason: 'subscription_cycle',
    subscription: 'sub_1',
    status: 'open',
    attempt_count: 1,
    last_payment_error: { message: 'Fonds insuffisants' },
    ...over,
  }) as any;

describe('prélèvement refusé puis relancé', () => {
  beforeEach(() => {
    rows.length = 0;
    rows.push({ id: 'p1', stripe_session_id: 'in_retry_1', etudiant_id: 'e1', status: 'failed', amount: 96, error_message: 'Fonds insuffisants' });
  });

  it('la relance réussie passe la ligne « échoué » en « réglé », sans créer de doublon', async () => {
    const res = await recordInvoicePayment({
      stripe: {} as any,
      invoice: invoice({ status: 'paid', amount_paid: 9600 }),
      status: 'succeeded',
      stripeAccount: 'presentiel',
    });
    expect(res.action).toBe('updated');
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ status: 'succeeded', error_message: null, amount: 96 });
  });

  it('un second échec sur la même facture ne change rien ; un succès déjà enregistré n’est jamais rétrogradé', async () => {
    const again = await recordInvoicePayment({ stripe: {} as any, invoice: invoice(), status: 'failed', stripeAccount: 'presentiel' });
    expect(again.action).toBe('unchanged');

    rows[0].status = 'succeeded';
    const late = await recordInvoicePayment({ stripe: {} as any, invoice: invoice(), status: 'failed', stripeAccount: 'presentiel' });
    expect(late.action).toBe('unchanged');
    expect(rows[0].status).toBe('succeeded');
  });
});
