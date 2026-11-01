/// <reference types="jest" />
import {
  applyPromoToExpectedAmount,
  applyPromoToTotalCents,
  computeCouponDiscountCents,
  installmentAmountAfterPromoCents,
  resolveSessionPromoDiscountEuros,
} from '@/lib/stripe-promo';

describe('stripe-promo', () => {
  it('applique un montant fixe plafonné au total', () => {
    expect(computeCouponDiscountCents({ amount_off: 10000, percent_off: null, valid: true }, 39900)).toBe(10000);
    expect(computeCouponDiscountCents({ amount_off: 10000, percent_off: null, valid: true }, 5000)).toBe(5000);
  });

  it('applique un pourcentage', () => {
    expect(computeCouponDiscountCents({ amount_off: null, percent_off: 10, valid: true }, 40000)).toBe(4000);
  });

  it('répartit la remise sur les mensualités (pas le 1er mois seul)', () => {
    // 399 € − 100 € = 299 € → 3× ≈ 99,67 €
    expect(installmentAmountAfterPromoCents(39900, 10000, 3)).toBe(9967);
    expect(applyPromoToTotalCents(39900, 10000)).toBe(29900);
    // 3 × 9967 = 29901 (arrondi Stripe classique)
    expect(9967 * 3).toBe(29901);
  });

  it('réduit la dette du premier profil seulement', () => {
    expect(applyPromoToExpectedAmount(399, 100, 0)).toBe(299);
    expect(applyPromoToExpectedAmount(399, 100, 1)).toBe(399);
    expect(applyPromoToExpectedAmount(undefined, 100, 0)).toBeUndefined();
  });

  it('priorise la promo metadata (montants déjà nets) sur total_details Stripe', () => {
    expect(resolveSessionPromoDiscountEuros({
      metadata: { promo_discount_euros: '100' },
      total_details: { amount_discount: 0 },
    })).toBe(100);
    expect(resolveSessionPromoDiscountEuros({
      metadata: { promo_discount_euros: '0' },
      total_details: { amount_discount: 5000 },
    })).toBe(50);
    expect(resolveSessionPromoDiscountEuros({
      metadata: {},
      total_details: { amount_discount: 0 },
    })).toBe(0);
  });
});
