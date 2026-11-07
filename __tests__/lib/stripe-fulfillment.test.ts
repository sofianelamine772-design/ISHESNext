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
});
