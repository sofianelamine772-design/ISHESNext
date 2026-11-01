/// <reference types="jest" />
import { shouldRecordSubscriptionInvoice } from '@/lib/stripe-invoice-sync';

describe('shouldRecordSubscriptionInvoice', () => {
  it('ignore les factures one-shot Checkout (pas d’abonnement)', () => {
    const gate = shouldRecordSubscriptionInvoice({
      billing_reason: 'manual',
      subscription: null,
    });
    expect(gate.ok).toBe(false);
  });

  it('ignore le 1er mois déjà loggé via checkout.session.completed', () => {
    const gate = shouldRecordSubscriptionInvoice({
      billing_reason: 'subscription_create',
      subscription: 'sub_123',
    });
    expect(gate.ok).toBe(false);
  });

  it('accepte les mensualités suivantes', () => {
    expect(
      shouldRecordSubscriptionInvoice({
        billing_reason: 'subscription_cycle',
        subscription: 'sub_123',
      }).ok,
    ).toBe(true);
    expect(
      shouldRecordSubscriptionInvoice({
        billing_reason: 'subscription_cycle',
        subscription: { id: 'sub_123' },
      }).ok,
    ).toBe(true);
  });
});
