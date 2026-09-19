import {
  getExpectedAmountForChild,
  getFamilyCheckoutTotal,
  getNamedChildren,
  getSiblingDiscount,
  pickBillingInscriptions,
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

describe('Déduplication facturation (doublons de saisie)', () => {
  it('ne compte qu’une inscription par élève / formation / année', () => {
    const picked = pickBillingInscriptions(
      [
        {
          id: 'ins_old',
          etudiant_id: 'stu_1',
          formation_id: 'form_arabe',
          academic_year: '2025-2026',
          status: 'actif',
          created_at: '2025-09-01T10:00:00Z',
        },
        {
          id: 'ins_new',
          etudiant_id: 'stu_1_bis',
          formation_id: 'form_arabe',
          academic_year: '2025-2026',
          status: 'actif',
          created_at: '2025-09-10T10:00:00Z',
        },
      ],
      (id) =>
        id === 'stu_1' || id === 'stu_1_bis'
          ? { firstName: 'Amina', lastName: 'Benali' }
          : { firstName: '', lastName: '' },
    );

    expect(picked).toHaveLength(1);
    expect(picked[0].id).toBe('ins_new');
  });

  it('conserve deux formations différentes pour le même élève', () => {
    const picked = pickBillingInscriptions(
      [
        {
          id: 'ins_a',
          etudiant_id: 'stu_1',
          formation_id: 'form_arabe',
          academic_year: '2025-2026',
          status: 'actif',
          created_at: '2025-09-01T10:00:00Z',
        },
        {
          id: 'ins_b',
          etudiant_id: 'stu_1',
          formation_id: 'form_tajwid',
          academic_year: '2025-2026',
          status: 'actif',
          created_at: '2025-09-02T10:00:00Z',
        },
      ],
      () => ({ firstName: 'Amina', lastName: 'Benali' }),
    );
    expect(picked).toHaveLength(2);
  });

  it('ignore les inscriptions terminées', () => {
    const picked = pickBillingInscriptions(
      [
        {
          id: 'ins_done',
          etudiant_id: 'stu_1',
          formation_id: 'form_arabe',
          academic_year: '2024-2025',
          status: 'termine',
          created_at: '2024-09-01T10:00:00Z',
        },
      ],
      () => ({ firstName: 'Amina', lastName: 'Benali' }),
    );
    expect(picked).toHaveLength(0);
  });
});
