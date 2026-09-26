import {
  getExpectedAmountForChild,
  getFamilyCheckoutTotal,
  getNamedChildren,
  getSiblingDiscount,
  pickBillingInscriptions,
  pickBillingPayments,
  resolveBillingExpectedAmount,
  resolveInscriptionPaidStatus,
  inscriptionGrantsStudentAccess,
  sumSucceededBillingPayments,
  sumSucceededPaymentsBySource,
  isTestStripePayment,
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

describe('pickBillingPayments (encaissement réel)', () => {
  it('conserve tous les checkouts cs_ distincts + les mensualités in_', () => {
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

    expect(picked.map((p) => p.id).sort()).toEqual(
      ['p_invoice', 'p_old_cs', 'p_new_cs'].sort(),
    );
    expect(sumSucceededBillingPayments(picked)).toBeCloseTo(239.4);
  });

  it('déduplique uniquement la même stripe_session_id', () => {
    const picked = pickBillingPayments([
      {
        id: 'p1',
        etudiant_id: 'stu_1',
        stripe_session_id: 'cs_live_same',
        amount: 79.8,
        status: 'succeeded',
        created_at: '2026-09-01T10:00:00Z',
      },
      {
        id: 'p1_dup',
        etudiant_id: 'stu_1',
        stripe_session_id: 'cs_live_same',
        amount: 79.8,
        status: 'succeeded',
        created_at: '2026-09-01T10:00:01Z',
      },
    ]);
    expect(picked).toHaveLength(1);
    expect(sumSucceededBillingPayments(picked)).toBeCloseTo(79.8);
  });

  it('conserve deux checkouts pour deux formations du même élève', () => {
    const picked = pickBillingPayments([
      {
        id: 'p_arabe',
        etudiant_id: 'stu_ilyas',
        stripe_session_id: 'cs_live_arabe',
        amount: 79.8,
        status: 'succeeded',
        created_at: '2026-09-10T12:24:00Z',
      },
      {
        id: 'p_tajwid',
        etudiant_id: 'stu_ilyas',
        stripe_session_id: 'cs_live_tajwid',
        amount: 79.8,
        status: 'succeeded',
        created_at: '2026-09-10T12:28:00Z',
      },
    ]);
    expect(picked).toHaveLength(2);
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

describe('sumSucceededPaymentsBySource', () => {
  it('sépare Stripe live et saisie manuelle', () => {
    const { stripe, manual, total } = sumSucceededPaymentsBySource([
      { amount: 79.8, status: 'succeeded', stripe_session_id: 'cs_live_a' },
      { amount: 79.8, status: 'succeeded', stripe_session_id: 'in_live_b' },
      { amount: 50, status: 'succeeded', stripe_session_id: 'manual_virement_1' },
      { amount: 399, status: 'succeeded', stripe_session_id: 'manual_settle_liquide_2' },
      { amount: 100, status: 'failed', stripe_session_id: 'cs_live_fail' },
    ]);
    expect(stripe).toBeCloseTo(159.6);
    expect(manual).toBeCloseTo(449);
    expect(total).toBeCloseTo(608.6);
  });

  it('ignore les paiements Stripe test (local)', () => {
    const { stripe, manual, total } = sumSucceededPaymentsBySource([
      { amount: 79.8, status: 'succeeded', stripe_session_id: 'cs_live_real' },
      { amount: 200, status: 'succeeded', stripe_session_id: 'cs_test_local' },
      { amount: 50, status: 'succeeded', stripe_session_id: 'in_test_invoice' },
      { amount: 100, status: 'succeeded', stripe_session_id: 'manual_liquide_1' },
    ]);
    expect(stripe).toBeCloseTo(79.8);
    expect(manual).toBeCloseTo(100);
    expect(total).toBeCloseTo(179.8);
    expect(sumSucceededBillingPayments([
      { amount: 200, status: 'succeeded', stripe_session_id: 'cs_test_local' },
      { amount: 79.8, status: 'succeeded', stripe_session_id: 'cs_live_real' },
    ])).toBeCloseTo(79.8);
  });
});

describe('Régression Zohra — acompte Fiqh après checkout gratuit', () => {
  /**
   * Cas réel : 1er checkout Fatiha 0 € (cs_live), puis Fiqh 399 € avec acompte 133 €.
   * Bug : ne garder que le 1er cs_ → déjà payé 0 € + paid_status impaye → espace élève bloqué.
   */
  const zohraPayments = [
    {
      id: 'pay_fatiha_0',
      etudiant_id: 'stu_zohra',
      stripe_session_id: 'cs_live_fatiha_free',
      amount: 0,
      status: 'succeeded',
      created_at: '2026-09-19T09:35:23Z',
    },
    {
      id: 'pay_fiqh_133',
      etudiant_id: 'stu_zohra',
      stripe_session_id: 'cs_live_fiqh_acompte',
      amount: 133,
      status: 'succeeded',
      created_at: '2026-09-20T20:49:01Z',
    },
  ];

  it('compte les deux checkouts live (0 € + 133 €) et pas seulement le premier', () => {
    const picked = pickBillingPayments(zohraPayments, () => ({
      firstName: 'Zohra',
      lastName: 'Benahmed',
      email: 'zohra.benahmed51@gmail.com',
    }));
    expect(picked).toHaveLength(2);
    expect(sumSucceededBillingPayments(picked)).toBeCloseTo(133);
    expect(sumSucceededPaymentsBySource(picked).stripe).toBeCloseTo(133);
  });

  it('calcule attendu Fiqh 399, déjà payé 133, reste 266 → partiel', () => {
    const inscriptions = pickBillingInscriptions(
      [
        {
          id: 'ins_fatiha',
          etudiant_id: 'stu_zohra',
          formation_id: 'form_fatiha',
          formation_title: 'Correction al Fatiha',
          academic_year: '2026-2027',
          status: 'actif',
          created_at: '2026-09-19T09:35:22Z',
        },
        {
          id: 'ins_fiqh',
          etudiant_id: 'stu_zohra',
          formation_id: 'form_fiqh',
          formation_title: 'Fiqh Mâlikite',
          academic_year: '2026-2027',
          status: 'actif',
          created_at: '2026-09-20T20:49:01Z',
        },
      ],
      () => ({
        firstName: 'Zohra',
        lastName: 'Benahmed',
        email: 'zohra.benahmed51@gmail.com',
      }),
    );
    expect(inscriptions).toHaveLength(2);

    const totalExpected =
      resolveBillingExpectedAmount(0, 0) + resolveBillingExpectedAmount(399, 399);
    const totalPaid = sumSucceededBillingPayments(zohraPayments);
    const reste = Math.max(0, totalExpected - totalPaid);

    expect(totalExpected).toBeCloseTo(399);
    expect(totalPaid).toBeCloseTo(133);
    expect(reste).toBeCloseTo(266);
    expect(resolveInscriptionPaidStatus(totalPaid, reste)).toBe('partiel');
  });

  it('débloque l’espace élève dès que paid_status = partiel', () => {
    expect(inscriptionGrantsStudentAccess('impaye')).toBe(false);
    expect(inscriptionGrantsStudentAccess('partiel')).toBe(true);
    expect(inscriptionGrantsStudentAccess('paye')).toBe(true);
    expect(inscriptionGrantsStudentAccess('exonere')).toBe(true);
    expect(
      inscriptionGrantsStudentAccess('impaye', { isManualStudent: true }),
    ).toBe(true);
  });
});

describe('resolveInscriptionPaidStatus', () => {
  it('passe en paye si reste ≤ 0', () => {
    expect(resolveInscriptionPaidStatus(399, 0)).toBe('paye');
    expect(resolveInscriptionPaidStatus(0, 0)).toBe('paye'); // formation gratuite
  });

  it('passe en partiel dès qu’un acompte est encaissé', () => {
    expect(resolveInscriptionPaidStatus(133, 266)).toBe('partiel');
    expect(resolveInscriptionPaidStatus(0.02, 398.98)).toBe('partiel');
  });

  it('reste impaye si aucun encaissement réel', () => {
    expect(resolveInscriptionPaidStatus(0, 399)).toBe('impaye');
    expect(resolveInscriptionPaidStatus(0.005, 399)).toBe('impaye');
  });
});

describe('Double Stripe — facturation (pas de mélange test / live)', () => {
  it('compte un checkout présentiel LIVE dans le solde', () => {
    const payments = [
      {
        id: 'p1',
        amount: 480,
        status: 'succeeded',
        stripe_session_id: 'cs_live_presentiel_abc',
      },
    ];
    expect(sumSucceededBillingPayments(payments)).toBeCloseTo(480);
    expect(resolveInscriptionPaidStatus(480, 0)).toBe('paye');
  });

  it('exclut un checkout présentiel TEST du solde (cs_test_)', () => {
    const payments = [
      {
        id: 'p1',
        amount: 480,
        status: 'succeeded',
        stripe_session_id: 'cs_test_a1r8rsDGWeKdLhO86YAOWJmNK8GOCtfFcJZLdwPwlZNzJkuxTyMPaNWrig',
      },
    ];
    expect(isTestStripePayment(payments[0])).toBe(true);
    expect(sumSucceededBillingPayments(payments)).toBe(0);
    expect(resolveInscriptionPaidStatus(0, 480)).toBe('impaye');
  });

  it('cumule live distanciel + live présentiel sans double-compte', () => {
    const payments = pickBillingPayments(
      [
        {
          id: 'd1',
          etudiant_id: 'stu',
          amount: 399,
          status: 'succeeded',
          stripe_session_id: 'cs_live_fiqh',
          created_at: '2026-09-01T10:00:00Z',
        },
        {
          id: 'p1',
          etudiant_id: 'stu',
          amount: 480,
          status: 'succeeded',
          stripe_session_id: 'cs_live_presentiel',
          created_at: '2026-09-02T10:00:00Z',
        },
        {
          id: 'dup',
          etudiant_id: 'stu',
          amount: 480,
          status: 'succeeded',
          stripe_session_id: 'cs_live_presentiel',
          created_at: '2026-09-02T10:01:00Z',
        },
      ],
      () => ({ firstName: 'A', lastName: 'B', email: 'a@b.com' }),
    );
    expect(payments).toHaveLength(2);
    expect(sumSucceededBillingPayments(payments)).toBeCloseTo(879);
  });
});
