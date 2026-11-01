/// <reference types="jest" />
import {
  applyPromoAcrossAmounts,
  applyPromoToExpectedAmount,
  applyPromoToTotalCents,
  installmentAmountAfterPromoCents,
  takePromoFromAmount,
} from '@/lib/stripe-promo';
import {
  billingTotalsForStudent,
  getExpectedAmountForChild,
  getFamilyCheckoutTotal,
} from '@/lib/pricing';
import {
  computeInstallmentCancelAt,
  shouldCancelSubscriptionNow,
} from '@/lib/stripe-subscription-stop';
import { shouldRecordSubscriptionInvoice } from '@/lib/stripe-invoice-sync';

describe('cas particuliers promo / dette / stop', () => {
  it('adulte 1× + ISHES2026 (−100) : charge = dette', () => {
    const charged = applyPromoToTotalCents(39900, 10000) / 100;
    const expected = applyPromoToExpectedAmount(399, 100, 0);
    expect(charged).toBe(299);
    expect(expected).toBe(299);
  });

  it('adulte 3× + promo : arrondi Stripe ≤ 1 cent vs dette', () => {
    const inst = installmentAmountAfterPromoCents(39900, 10000, 3);
    const charged = (inst * 3) / 100;
    const expected = applyPromoToExpectedAmount(399, 100, 0)!;
    expect(Math.abs(charged - expected)).toBeLessThanOrEqual(0.01);
  });

  it('famille 2 enfants + fratrie + promo : somme expected = net Stripe', () => {
    const base = 399;
    const promo = 100;
    const cart = getFamilyCheckoutTotal(base, 2); // 748
    const after = cart - promo; // 648
    const lines = [
      getExpectedAmountForChild(base, 0, 2),
      getExpectedAmountForChild(base, 1, 2),
    ];
    const expected = applyPromoAcrossAmounts(lines, promo);
    expect(expected.reduce((a, b) => a + b, 0)).toBe(after);
  });

  it('promo plus grande que la formation principale déborde sur le bump', () => {
    // 399 + bump 200 − promo 500 = 99 facturé
    const expected = applyPromoAcrossAmounts([399, 200], 500);
    expect(expected).toEqual([0, 99]);
    expect(expected.reduce((a, b) => a + b, 0)).toBe(99);
  });

  it('takePromoFromAmount consomme progressivement la cagnotte', () => {
    const remaining = { current: 150 };
    expect(takePromoFromAmount(100, remaining)).toBe(0);
    expect(remaining.current).toBe(50);
    expect(takePromoFromAmount(80, remaining)).toBe(30);
    expect(remaining.current).toBe(0);
  });

  it('mensualité famille : 1ère échéance répartie au prorata', () => {
    const inscriptions = [
      { studentId: 'a', expectedAmount: 299 },
      { studentId: 'b', expectedAmount: 349 },
    ];
    const payments = [
      { etudiant_id: 'a', amount: 216, status: 'succeeded', stripe_session_id: 'cs_live_1' },
    ];
    const a = billingTotalsForStudent('a', inscriptions, payments);
    const b = billingTotalsForStudent('b', inscriptions, payments);
    expect(a.totalPaid + b.totalPaid).toBeCloseTo(216);
    expect(a.resteAPayer).toBeGreaterThan(0);
    expect(b.resteAPayer).toBeGreaterThan(0);
  });

  it('facture Checkout 1× (manual) ne doit pas être re-loggée', () => {
    expect(
      shouldRecordSubscriptionInvoice({ billing_reason: 'manual', subscription: null }).ok,
    ).toBe(false);
  });

  it('après N factures payées → stop immédiat ; avant → cancel_at fin N-ème période', () => {
    expect(shouldCancelSubscriptionNow({ installmentsTotal: 5, paidInvoiceCount: 5 })).toBe(true);
    expect(shouldCancelSubscriptionNow({ installmentsTotal: 5, paidInvoiceCount: 4 })).toBe(false);
    const start = 1_700_000_000;
    const len = 30 * 24 * 3600;
    const end = start + len;
    // 1/5 payée → encore 4 périodes après la courante
    expect(
      computeInstallmentCancelAt({
        installmentsTotal: 5,
        paidInvoiceCount: 1,
        currentPeriodStart: start,
        currentPeriodEnd: end,
      }),
    ).toBe(end + 4 * len);
  });
});
