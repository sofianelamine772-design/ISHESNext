/// <reference types="jest" />
import {
  computeInstallmentCancelAt,
  shouldCancelSubscriptionNow,
} from '@/lib/stripe-subscription-stop';

describe('stripe-subscription-stop', () => {
  const periodStart = 1_700_000_000;
  const periodLength = 30 * 24 * 3600;
  const periodEnd = periodStart + periodLength;

  it('annule dès que N factures sont payées', () => {
    expect(shouldCancelSubscriptionNow({ installmentsTotal: 3, paidInvoiceCount: 2 })).toBe(false);
    expect(shouldCancelSubscriptionNow({ installmentsTotal: 3, paidInvoiceCount: 3 })).toBe(true);
    expect(shouldCancelSubscriptionNow({ installmentsTotal: 10, paidInvoiceCount: 10 })).toBe(true);
  });

  it('pose cancel_at à la fin de la N-ème période', () => {
    // 1/3 payée → encore 2 périodes après la courante → fin = periodEnd + 2*L
    expect(
      computeInstallmentCancelAt({
        installmentsTotal: 3,
        paidInvoiceCount: 1,
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      }),
    ).toBe(periodEnd + 2 * periodLength);

    // 2/3 → fin = periodEnd + 1*L
    expect(
      computeInstallmentCancelAt({
        installmentsTotal: 3,
        paidInvoiceCount: 2,
        currentPeriodStart: periodStart + periodLength,
        currentPeriodEnd: periodEnd + periodLength,
      }),
    ).toBe(periodEnd + periodLength + 1 * periodLength);
  });
});
