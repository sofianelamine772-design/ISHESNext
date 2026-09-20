import {
  getExpectedAmountForChild,
  getFamilyCheckoutTotal,
  getNamedChildren,
  getSiblingDiscount,
  pickBillingInscriptions,
  pickBillingPayments,
  resolveBillingExpectedAmount,
  sumSucceededBillingPayments,
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
  it('ne compte qu’une inscription et garde la première facture', () => {
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
          ? { firstName: 'Amina', lastName: 'Benali', email: 'parent@test.com' }
          : { firstName: '', lastName: '' },
    );

    expect(picked).toHaveLength(1);
    expect(picked[0].id).toBe('ins_old');
  });

  it('déduplique aussi par titre de formation si les ids formation diffèrent', () => {
    const picked = pickBillingInscriptions(
      [
        {
          id: 'ins_a',
          etudiant_id: 'stu_1',
          formation_id: 'form_a',
          formation_title: 'Tarbiya Islamiya',
          academic_year: '2026-2027',
          status: 'actif',
          created_at: '2026-09-01T10:00:00Z',
        },
        {
          id: 'ins_b',
          etudiant_id: 'stu_2',
          formation_id: 'form_b',
          formation_title: 'Tarbiya Islamiya',
          academic_year: '2026-2027',
          status: 'actif',
          created_at: '2026-09-11T10:00:00Z',
        },
      ],
      () => ({ firstName: 'Nora', lastName: 'Oojeeraully', email: 'voojeeraully@hotmail.com' }),
    );
    expect(picked).toHaveLength(1);
    expect(picked[0].id).toBe('ins_a');
  });

  it('conserve deux frères/sœurs sur le même email et la même formation', () => {
    const picked = pickBillingInscriptions(
      [
        {
          id: 'ins_yaniss',
          etudiant_id: 'stu_y',
          formation_id: 'form_pres',
          academic_year: '2026-2027',
          status: 'actif',
          created_at: '2026-09-01T10:00:00Z',
        },
        {
          id: 'ins_ines',
          etudiant_id: 'stu_i',
          formation_id: 'form_pres',
          academic_year: '2026-2027',
          status: 'actif',
          created_at: '2026-09-02T10:00:00Z',
        },
      ],
      (id) =>
        id === 'stu_y'
          ? { firstName: 'Yaniss', lastName: 'Baudoin', email: 'nora4522@hotmail.fr' }
          : { firstName: 'Inès', lastName: 'Baudoin', email: 'nora4522@hotmail.fr' },
    );
    expect(picked).toHaveLength(2);
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

describe('resolveBillingExpectedAmount', () => {
  it('garde une réduction fratrie sous le catalogue', () => {
    expect(resolveBillingExpectedAmount(430, 480)).toBe(430);
  });

  it('ignore un expected gonflé (ex: 3× catalogue collé)', () => {
    expect(resolveBillingExpectedAmount(1197, 399)).toBe(399);
  });

  it('utilise le catalogue si expected absent', () => {
    expect(resolveBillingExpectedAmount(null, 399)).toBe(399);
  });
});

  it('ne garde que le premier checkout cs_ et conserve les mensualités in_', () => {
    const picked = pickBillingPayments(
      [
        {
          id: 'p_new_cs',
          etudiant_id: 'stu_nora',
          stripe_session_id: 'cs_live_second',
          amount: 79.8,
          status: 'succeeded',
          created_at: '2026-09-11T08:42:00Z',
        },
        {
          id: 'p_old_cs',
          etudiant_id: 'stu_nora',
          stripe_session_id: 'cs_live_first',
          amount: 79.8,
          status: 'succeeded',
          created_at: '2026-09-01T13:30:00Z',
        },
        {
          id: 'p_invoice',
          etudiant_id: 'stu_nora',
          stripe_session_id: 'in_live_month2',
          amount: 79.8,
          status: 'succeeded',
          created_at: '2026-10-01T10:00:00Z',
        },
      ],
      () => ({ firstName: 'Nora', lastName: 'Oojeeraully', email: 'voojeeraully@hotmail.com' }),
    );

    expect(picked.map((p) => p.id).sort()).toEqual(['p_invoice', 'p_old_cs'].sort());
    expect(sumSucceededBillingPayments(picked)).toBeCloseTo(159.6);
  });

  it('conserve un checkout par frère/sœur', () => {
    const picked = pickBillingPayments(
      [
        {
          id: 'p_y',
          etudiant_id: 'stu_y',
          stripe_session_id: 'cs_live_yaniss',
          amount: 150,
          status: 'succeeded',
          created_at: '2026-09-01T10:00:00Z',
        },
        {
          id: 'p_i',
          etudiant_id: 'stu_i',
          stripe_session_id: 'cs_live_ines',
          amount: 150,
          status: 'succeeded',
          created_at: '2026-09-02T10:00:00Z',
        },
      ],
      (id) =>
        id === 'stu_y'
          ? { firstName: 'Yaniss', lastName: 'Baudoin', email: 'nora4522@hotmail.fr' }
          : { firstName: 'Inès', lastName: 'Baudoin', email: 'nora4522@hotmail.fr' },
    );
    expect(picked).toHaveLength(2);
  });
});
