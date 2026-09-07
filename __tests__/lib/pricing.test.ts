import {
  getExpectedAmountForChild,
  getFamilyCheckoutTotal,
  getNamedChildren,
  getSiblingDiscount,
  SIBLING_DISCOUNT_EUR,
} from '@/lib/pricing';

describe('Réduction fratrie (inscription simultanée)', () => {
  it('ne réduit pas un enfant unique', () => {
    expect(getSiblingDiscount(1)).toBe(0);
    expect(getFamilyCheckoutTotal(480, 1)).toBe(480);
  });

  it('applique 50 € par enfant supplémentaire', () => {
    expect(SIBLING_DISCOUNT_EUR).toBe(50);
    expect(getSiblingDiscount(2)).toBe(50);
    expect(getFamilyCheckoutTotal(480, 2)).toBe(910);
    expect(getSiblingDiscount(3)).toBe(100);
    expect(getFamilyCheckoutTotal(480, 3)).toBe(1340);
  });

  it('ignore les inscriptions déjà existantes hors de ce paiement', () => {
    expect(getSiblingDiscount(0)).toBe(0);
    expect(getFamilyCheckoutTotal(480, 0)).toBe(0);
  });

  it('facture le premier enfant plein tarif et les suivants à −50 €', () => {
    expect(getExpectedAmountForChild(480, 0, 2)).toBe(480);
    expect(getExpectedAmountForChild(480, 1, 2)).toBe(430);
    expect(getExpectedAmountForChild(480, 2, 3)).toBe(430);
  });

  it('ignore les enfants sans prénom ou nom', () => {
    expect(getNamedChildren([
      { prenom: 'Amina', nom: 'Benali' },
      { prenom: '', nom: 'Benali' },
      { prenom: 'Youssef', nom: '   ' },
      { prenom: 'Sara', nom: 'Benali' },
    ])).toHaveLength(2);
    expect(getNamedChildren(undefined)).toEqual([]);
  });
});
