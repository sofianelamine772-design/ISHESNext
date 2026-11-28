/**
 * fulfillCheckoutSession : création élève / inscription / paiement + idempotence.
 * Base Supabase simulée en mémoire (pas de réseau, pas de prod).
 */

type Row = Record<string, any>;
const db: Record<string, Row[]> = {};
let idSeq = 0;

function table(name: string): Row[] {
  return (db[name] ||= []);
}

function builder(name: string) {
  const filters: Array<(r: Row) => boolean> = [];
  let op: 'select' | 'insert' | 'update' | 'upsert' = 'select';
  let payload: Row = {};
  let inserted: Row | null = null;

  const exec = () => {
    const rows = table(name);
    if (op === 'insert') {
      inserted = { id: payload.id ?? `${name}_${++idSeq}`, ...payload };
      rows.push(inserted);
      return [inserted];
    }
    if (op === 'upsert') {
      const existing = rows.find((r) => r.id === payload.id);
      if (existing) Object.assign(existing, payload);
      else rows.push({ ...payload });
      return [];
    }
    const matched = rows.filter((r) => filters.every((f) => f(r)));
    if (op === 'update') matched.forEach((r) => Object.assign(r, payload));
    return matched;
  };

  const api: any = {
    select: () => api,
    order: () => api,
    limit: () => api,
    eq: (c: string, v: unknown) => (filters.push((r) => r[c] === v), api),
    is: (c: string, v: unknown) => (filters.push((r) => (r[c] ?? null) === v), api),
    in: (c: string, vs: unknown[]) => (filters.push((r) => vs.includes(r[c])), api),
    ilike: (c: string, v: string) => (
      filters.push((r) => String(r[c] ?? '').toLowerCase() === String(v).toLowerCase()),
      api
    ),
    insert: (p: Row) => ((op = 'insert'), (payload = p), api),
    update: (p: Row) => ((op = 'update'), (payload = p), api),
    upsert: (p: Row) => ((op = 'upsert'), (payload = p), api),
    maybeSingle: async () => ({ data: exec()[0] ?? null, error: null }),
    single: async () => ({ data: exec()[0] ?? null, error: null }),
    then: (resolve: (v: unknown) => unknown) => resolve({ data: exec(), error: null }),
  };
  return api;
}

jest.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: { from: (name: string) => builder(name) },
}));

const mockCreateInvitation = jest.fn().mockResolvedValue({});
jest.mock('@clerk/nextjs/server', () => ({
  clerkClient: jest.fn().mockResolvedValue({
    invitations: { createInvitation: (...a: unknown[]) => mockCreateInvitation(...a) },
  }),
}));

jest.mock('@/app/actions/students', () => ({
  syncStudentPaidStatus: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/lib/mail', () => ({
  maybeSendPresentielRentreeEmail: jest.fn().mockResolvedValue({ success: true, skipped: true }),
  maybeSendDistancielRentreeEmail: jest.fn().mockResolvedValue({ success: true, skipped: true }),
  maybeSendPresentielFournituresEmail: jest.fn().mockResolvedValue({ success: true, skipped: true }),
  sendAdminNewStudentNotificationEmail: jest.fn().mockResolvedValue({ success: true }),
  sendClassAssignmentEmail: jest.fn().mockResolvedValue({ success: true }),
}));

const { fulfillCheckoutSession } = require('@/lib/stripe-checkout-fulfillment') as typeof import('@/lib/stripe-checkout-fulfillment');

function resetDb() {
  for (const k of Object.keys(db)) delete db[k];
  idSeq = 0;
  table('formations').push({ id: 'f_tajwid', slug: 'tajwid_intensif', price: 649, type: 'distanciel', title: 'Tajwid Intensif' });
  table('formations').push({ id: 'f_arabe_enfant', slug: 'arabe_enfant_distance', price: 480, type: 'distanciel', title: 'Arabe enfant' });
  table('formations').push({ id: 'f_memo', slug: 'memoriser_coran', price: 399, type: 'distanciel', title: 'Mémorisation du Coran' });
  table('classes').push({ id: 'c_memo', formation_id: 'f_memo', is_active: true, name: 'Session Mémorisation du Coran (2026-2027)', external_id: null });
  table('classes').push({ id: 'c_tajwid', formation_id: 'f_tajwid', is_active: true, name: 'Tajwid intensif', external_id: null });
  table('classes').push({ id: 'c_101', formation_id: 'f_arabe_enfant', is_active: true, name: 'Niveau 1', external_id: 101 });
}

function session(overrides: Record<string, unknown> = {}, metadata: Record<string, string> = {}): any {
  return {
    id: 'cs_live_test_1',
    payment_status: 'paid',
    amount_total: 64900,
    currency: 'eur',
    customer_details: { email: 'parent@example.com' },
    metadata: {
      email: 'Parent+test@Example.com',
      formationId: 'tajwid_intensif',
      expected_amount: '649',
      first_name: 'Amina',
      last_name: 'Benali',
      ...metadata,
    },
    ...overrides,
  };
}

beforeEach(() => {
  resetDb();
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

describe('fulfillCheckoutSession', () => {
  it('ignore une session non payée (aucune écriture en base)', async () => {
    const res = await fulfillCheckoutSession({
      session: session({ payment_status: 'unpaid' }),
      stripeAccount: 'distanciel',
    });
    expect(res.ok).toBe(false);
    expect(res.skipped).toBe(true);
    expect(table('etudiants')).toHaveLength(0);
    expect(table('paiements')).toHaveLength(0);
  });

  it('crée élève + inscription + paiement au bon montant (adulte)', async () => {
    const res = await fulfillCheckoutSession({
      session: session(),
      stripeAccount: 'distanciel',
      skipSideEffects: true,
    });
    expect(res.ok).toBe(true);
    expect(table('etudiants')).toHaveLength(1);
    expect(table('etudiants')[0].email).toBe('parent@example.com'); // suffixe +test retiré
    expect(table('inscriptions')).toHaveLength(1);
    expect(table('inscriptions')[0]).toMatchObject({ formation_id: 'f_tajwid', expected_amount: 649 });
    expect(table('paiements')).toHaveLength(1);
    expect(table('paiements')[0]).toMatchObject({
      stripe_session_id: 'cs_live_test_1',
      amount: 649,
      status: 'succeeded',
    });
  });

  it('offre distanciel : la dette enregistrée est le prix payé (349 €), pas le prix catalogue (399 €), et le pack offert vaut 0 €', async () => {
    table('formations').push({ id: 'f_fiqh', slug: 'fiqh_malikite', price: 399, type: 'distanciel', title: 'Fiqh' });
    table('formations').push({ id: 'f_pack', slug: 'pack_accompagnement', price: 49, type: 'distanciel', title: 'Pack' });
    table('classes').push({ id: 'c_fiqh', formation_id: 'f_fiqh', is_active: true, name: 'Session Fiqh', external_id: null });
    table('classes').push({ id: 'c_pack', formation_id: 'f_pack', is_active: true, name: 'Pack', external_id: null });

    // L'inscription « en attente » créée AVANT le paiement porte encore le prix catalogue (399 €).
    table('etudiants').push({ id: 'e_1', email: 'amina@example.com', first_name: 'Amina', last_name: 'Benali' });
    const year = (await import('@/lib/utils')).getCurrentAcademicYear();
    table('inscriptions').push({ id: 'ins_old', etudiant_id: 'e_1', formation_id: 'f_fiqh', class_id: null, status: 'en_attente', paid_status: 'impaye', academic_year: year, expected_amount: 399 });

    const s = session(
      { id: 'cs_live_offre', amount_total: 34900, customer_details: { email: 'amina@example.com' } },
      {
        email: 'amina@example.com',
        formationId: 'fiqh_malikite',
        expected_amount: '349', // prix au moment du paiement (399 − 50)
        distanciel_offer_euros: '99',
        pack_offert: 'true',
        order_bump: 'pack_accompagnement',
        price_pack_accompagnement: '0',
      },
    );
    const res = await fulfillCheckoutSession({ session: s, stripeAccount: 'distanciel', skipSideEffects: true });
    expect(res.ok).toBe(true);

    const fiqh = table('inscriptions').find((i) => i.formation_id === 'f_fiqh');
    const pack = table('inscriptions').find((i) => i.formation_id === 'f_pack');
    expect(fiqh).toMatchObject({ id: 'ins_old', expected_amount: 349, paid_status: 'paye' });
    expect(pack).toMatchObject({ expected_amount: 0, paid_status: 'paye' });
    expect(table('paiements')).toHaveLength(1);
    expect(table('paiements')[0]).toMatchObject({ amount: 349, status: 'succeeded' });
  });

  it('inscription offerte (free_…, 0 €) : élève + inscription à 0 € « payé », sans ligne de paiement', async () => {
    table('formations').push({ id: 'f_pack', slug: 'pack_accompagnement', price: 49, type: 'distanciel', title: 'Pack' });
    table('classes').push({ id: 'c_pack', formation_id: 'f_pack', is_active: true, name: 'Pack', external_id: null });
    const s = session(
      { id: 'free_123_abc', amount_total: 0, customer_details: { email: 'libre@example.com' } },
      { email: 'libre@example.com', formationId: 'pack_accompagnement', expected_amount: '0', distanciel_offer_euros: '49' },
    );
    const res = await fulfillCheckoutSession({ session: s, stripeAccount: 'distanciel', skipSideEffects: true });
    expect(res.ok).toBe(true);
    expect(table('etudiants')).toHaveLength(1);
    expect(table('inscriptions')).toHaveLength(1);
    expect(table('inscriptions')[0]).toMatchObject({ formation_id: 'f_pack', expected_amount: 0, paid_status: 'paye', status: 'actif' });
    expect(table('paiements')).toHaveLength(0);
  });

  it('est idempotent : rejouer la même session ne crée aucun doublon', async () => {
    const s = session();
    await fulfillCheckoutSession({ session: s, stripeAccount: 'distanciel', skipSideEffects: true });
    await fulfillCheckoutSession({ session: s, stripeAccount: 'distanciel', skipSideEffects: true });
    await fulfillCheckoutSession({ session: s, stripeAccount: 'distanciel', skipSideEffects: true });

    expect(table('etudiants')).toHaveLength(1);
    expect(table('inscriptions')).toHaveLength(1);
    expect(table('paiements')).toHaveLength(1);
  });

  it('refuse (ok=false) et ne facture rien si les metadata sont incomplètes', async () => {
    const res = await fulfillCheckoutSession({
      session: session({}, { first_name: '', last_name: '' }),
      stripeAccount: 'distanciel',
      skipSideEffects: true,
    });
    expect(res.ok).toBe(false);
    expect(table('paiements')).toHaveLength(0);
  });

  it('famille : un seul paiement, une inscription par enfant, réduction fratrie (480 puis 430)', async () => {
    const family = session(
      { id: 'cs_live_family', amount_total: 91000 },
      {
        formationId: 'arabe_enfant_distance',
        expected_amount: '480',
        sibling_discount: '50',
        registrationType: 'child',
        childrenCount: '2',
        child_0_first: 'Riad',
        child_0_last: 'Oggadi',
        child_0_classId: 'c_101',
        child_1_first: 'Mohamed',
        child_1_last: 'Oggadi',
        child_1_classId: 'c_101',
        first_name: '',
        last_name: '',
      },
    );
    const res = await fulfillCheckoutSession({ session: family, stripeAccount: 'presentiel', skipSideEffects: true });
    expect(res.ok).toBe(true);
    expect(res.studentIds).toHaveLength(2);
    const amounts = table('inscriptions').map((i) => i.expected_amount).sort();
    expect(amounts).toEqual([430, 480]);
    expect(table('paiements')).toHaveLength(1);
    expect(table('paiements')[0].amount).toBe(910);

    // rejeu : toujours 2 inscriptions, 1 paiement
    await fulfillCheckoutSession({ session: family, stripeAccount: 'presentiel', skipSideEffects: true });
    expect(table('inscriptions')).toHaveLength(2);
    expect(table('paiements')).toHaveLength(1);
  });

  it("invite le payeur dans Clerk (une fois) quand il n'a pas de compte", async () => {
    await fulfillCheckoutSession({ session: session(), stripeAccount: 'distanciel' });
    expect(mockCreateInvitation).toHaveBeenCalledTimes(1);
    expect(mockCreateInvitation).toHaveBeenCalledWith(
      expect.objectContaining({ emailAddress: 'parent@example.com', ignoreExisting: true }),
    );
  });

  it('une session « tilawa » (ancien slug) est inscrite à Mémorisation du Coran, une seule fois', async () => {
    const s = session(
      { id: 'cs_live_tilawa', amount_total: 39900 },
      { formationId: 'tilawa', expected_amount: '399', order_bump: 'memoriser_coran' },
    );
    await fulfillCheckoutSession({ session: s, stripeAccount: 'distanciel', skipSideEffects: true });
    expect(table('inscriptions')).toHaveLength(1);
    expect(table('inscriptions')[0]).toMatchObject({ formation_id: 'f_memo', expected_amount: 399 });
  });

  it('Mémorisation du Coran : inscrit dans l’unique classe de la formation, statut actif (pas en attente)', async () => {
    const s = session(
      { id: 'cs_live_memo', amount_total: 39900 },
      { formationId: 'memoriser_coran', expected_amount: '399' },
    );
    await fulfillCheckoutSession({ session: s, stripeAccount: 'distanciel', skipSideEffects: true });
    expect(table('inscriptions')).toHaveLength(1);
    expect(table('inscriptions')[0]).toMatchObject({
      formation_id: 'f_memo',
      class_id: 'c_memo',
      status: 'actif',
      paid_status: 'paye',
    });
    // aucune classe « Session » supplémentaire créée au passage
    expect(table('classes').filter((c) => c.formation_id === 'f_memo')).toHaveLength(1);
  });
});
