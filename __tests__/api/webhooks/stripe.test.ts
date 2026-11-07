/**
 * Webhook Stripe : signature, routage des événements, codes de retour.
 * (La logique d'inscription est testée dans __tests__/lib/stripe-fulfillment.test.ts.)
 * Pas d'import ES du SUT avant les mocks : on utilise require() après jest.mock().
 */

const mockConstruct = jest.fn();
const mockFulfill = jest.fn();
const mockRecordInvoice = jest.fn();
const mockLogSystemError = jest.fn().mockResolvedValue(undefined);

jest.mock('next/headers', () => ({
  headers: jest.fn().mockResolvedValue({ get: jest.fn().mockReturnValue('sig_test') }),
}));

jest.mock('@/lib/stripe-accounts', () => ({
  constructStripeWebhookEvent: (...args: unknown[]) => mockConstruct(...args),
  getStripeClient: jest.fn(() => ({
    subscriptions: { retrieve: jest.fn(), update: jest.fn(), cancel: jest.fn() },
    invoices: { list: jest.fn() },
  })),
  normalizeStoredStripeAccount: (v: string | null | undefined) =>
    String(v || '').trim().toLowerCase() === 'presentiel' ? 'presentiel' : 'distanciel',
}));

jest.mock('@/lib/stripe-checkout-fulfillment', () => ({
  fulfillCheckoutSession: (...args: unknown[]) => mockFulfill(...args),
}));

jest.mock('@/lib/stripe-invoice-sync', () => ({
  recordInvoicePayment: (...args: unknown[]) => mockRecordInvoice(...args),
}));

jest.mock('@/lib/error-logger', () => ({
  logSystemError: (...args: unknown[]) => mockLogSystemError(...args),
}));

jest.mock('@/app/actions/students', () => ({
  syncStudentPaidStatus: jest.fn().mockResolvedValue(undefined),
  sendPaymentReminderWithLinkAction: jest.fn().mockResolvedValue(undefined),
}));

const { POST } = require('@/app/api/webhooks/stripe/route') as typeof import('@/app/api/webhooks/stripe/route');

const req = () => new Request('http://localhost/api/webhooks/stripe', { method: 'POST', body: '{}' });

beforeEach(() => {
  jest.clearAllMocks();
  mockLogSystemError.mockResolvedValue(undefined);
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

describe('Webhook Stripe', () => {
  it('rejette une signature invalide avec 400 et journalise (logSystemError)', async () => {
    mockConstruct.mockImplementation(() => {
      throw new Error('No signatures found matching the expected signature');
    });
    const res = await POST(req());
    expect(res.status).toBe(400);
    expect(mockFulfill).not.toHaveBeenCalled();
    expect(mockLogSystemError).toHaveBeenCalledWith('Stripe Webhook Signature', expect.any(Error));
  });

  it('checkout.session.completed → fulfillCheckoutSession avec le bon compte Stripe', async () => {
    const session = { id: 'cs_live_1', metadata: {} };
    mockConstruct.mockReturnValue({
      event: { type: 'checkout.session.completed', data: { object: session } },
      account: 'presentiel',
    });
    mockFulfill.mockResolvedValue({ ok: true, studentIds: ['s1'], payerEmail: 'a@b.fr' });

    const res = await POST(req());
    expect(res.status).toBe(200);
    expect(mockFulfill).toHaveBeenCalledTimes(1);
    expect(mockFulfill).toHaveBeenCalledWith({ session, stripeAccount: 'presentiel' });
  });

  it('metadata.stripe_account prime sur le compte détecté par la signature', async () => {
    const session = { id: 'cs_live_2', metadata: { stripe_account: 'distanciel' } };
    mockConstruct.mockReturnValue({
      event: { type: 'checkout.session.completed', data: { object: session } },
      account: 'presentiel',
    });
    mockFulfill.mockResolvedValue({ ok: true, studentIds: ['s1'], payerEmail: '' });

    await POST(req());
    expect(mockFulfill).toHaveBeenCalledWith({ session, stripeAccount: 'distanciel' });
  });

  it('renvoie 500 (Stripe réessaiera) et journalise si le traitement échoue', async () => {
    mockConstruct.mockReturnValue({
      event: { type: 'checkout.session.completed', data: { object: { id: 'cs_live_3', metadata: {} } } },
      account: 'distanciel',
    });
    mockFulfill.mockRejectedValue(new Error('db down'));

    const res = await POST(req());
    expect(res.status).toBe(500);
    expect(mockLogSystemError).toHaveBeenCalledWith('Stripe Webhook Handler', expect.any(Error));
  });

  it('ignore les événements non gérés avec 200 (pas de retry inutile)', async () => {
    mockConstruct.mockReturnValue({
      event: { type: 'customer.created', data: { object: {} } },
      account: 'distanciel',
    });
    const res = await POST(req());
    expect(res.status).toBe(200);
    expect(mockFulfill).not.toHaveBeenCalled();
    expect(mockRecordInvoice).not.toHaveBeenCalled();
  });

  it('invoice.payment_succeeded → recordInvoicePayment', async () => {
    const invoice = { id: 'in_1', billing_reason: 'subscription_cycle', subscription: null };
    mockConstruct.mockReturnValue({
      event: { type: 'invoice.payment_succeeded', data: { object: invoice } },
      account: 'presentiel',
    });
    mockRecordInvoice.mockResolvedValue({ action: 'inserted', paymentId: 'p1', etudiantId: 'e1' });

    const res = await POST(req());
    expect(res.status).toBe(200);
    expect(mockRecordInvoice).toHaveBeenCalledWith(
      expect.objectContaining({ invoice, status: 'succeeded', stripeAccount: 'presentiel' }),
    );
  });

  it('alerte (logSystemError) quand une facture réelle ne peut pas être enregistrée', async () => {
    const invoice = { id: 'in_2', billing_reason: 'subscription_cycle', subscription: null };
    mockConstruct.mockReturnValue({
      event: { type: 'invoice.payment_succeeded', data: { object: invoice } },
      account: 'distanciel',
    });
    mockRecordInvoice.mockResolvedValue({ action: 'skipped', reason: 'aucun élève trouvé pour x@y.fr' });

    const res = await POST(req());
    expect(res.status).toBe(200);
    expect(mockLogSystemError).toHaveBeenCalledWith('Stripe Webhook Invoice', expect.any(Error));
  });

  it("n'alerte pas pour un skip volontaire (1er mois d'abonnement)", async () => {
    const invoice = { id: 'in_3', billing_reason: 'subscription_create', subscription: null };
    mockConstruct.mockReturnValue({
      event: { type: 'invoice.payment_succeeded', data: { object: invoice } },
      account: 'distanciel',
    });
    mockRecordInvoice.mockResolvedValue({ action: 'skipped', reason: 'subscription_create' });

    await POST(req());
    expect(mockLogSystemError).not.toHaveBeenCalled();
  });
});
