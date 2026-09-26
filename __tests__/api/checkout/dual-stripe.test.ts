/**
 * Tests double Stripe : nouveaux checkouts présentiel vs distanciel.
 * Pas d'import ES du SUT : le transformer TS n'hoiste pas jest.mock.
 */

const mockResolveStripeAccount = jest.fn();
const mockGetStripeClient = jest.fn();
const mockDistCreate = jest.fn();
const mockPresCreate = jest.fn();
const fromMock = jest.fn();

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn().mockResolvedValue({ userId: null }),
}));

jest.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: (...args: unknown[]) => fromMock(...args),
  },
}));

jest.mock('@/lib/stripe-accounts', () => ({
  resolveStripeAccount: (...args: unknown[]) => mockResolveStripeAccount(...args),
  getStripeClient: (...args: unknown[]) => mockGetStripeClient(...args),
  isPresentielStripeConfigured: () => true,
  normalizeStoredStripeAccount: (v: string | null | undefined) =>
    String(v || '').trim().toLowerCase() === 'presentiel' ? 'presentiel' : 'distanciel',
  constructStripeWebhookEvent: jest.fn(),
}));

const { NextRequest } = require('next/server') as typeof import('next/server');
const { POST } = require('@/app/api/checkout/route') as typeof import('@/app/api/checkout/route');

function mockFormation(price: number, title: string, type: string) {
  fromMock.mockReturnValue({
    select: jest.fn().mockReturnValue({
      eq: jest.fn().mockReturnValue({
        maybeSingle: jest.fn().mockResolvedValue({ data: { price, title, type } }),
      }),
    }),
  });
}

async function postCheckout(body: Record<string, unknown>) {
  return POST(
    new NextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  );
}

describe('Double Stripe — nouveaux checkouts', () => {
  beforeEach(() => {
    fromMock.mockReset();
    mockResolveStripeAccount.mockReset();
    mockGetStripeClient.mockReset();
    mockDistCreate.mockReset();
    mockPresCreate.mockReset();
    mockDistCreate.mockResolvedValue({
      id: 'cs_test_dist',
      url: 'https://checkout.stripe.com/dist',
    });
    mockPresCreate.mockResolvedValue({
      id: 'cs_test_pres',
      url: 'https://checkout.stripe.com/pres',
    });
    mockGetStripeClient.mockImplementation((account: string) => {
      if (account === 'presentiel') {
        return {
          checkout: { sessions: { create: mockPresCreate } },
          prices: { create: jest.fn().mockResolvedValue({ id: 'price_pres' }) },
        };
      }
      return {
        checkout: { sessions: { create: mockDistCreate } },
        prices: { create: jest.fn().mockResolvedValue({ id: 'price_dist' }) },
      };
    });
  });

  it('présentiel-global → Stripe présentiel + metadata', async () => {
    mockResolveStripeAccount.mockReturnValue('presentiel');
    mockFormation(480, 'Scolarité Présentiel', 'presentiel');

    const res = await postCheckout({
      formationId: 'presentiel-global',
      registrationType: 'adult',
      email: 'parent@example.com',
      prenom: 'Amir',
      nom: 'Test',
    });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.url).toContain('checkout.stripe.com/pres');
    expect(mockGetStripeClient).toHaveBeenCalledWith('presentiel');
    expect(mockPresCreate).toHaveBeenCalledTimes(1);
    expect(mockDistCreate).not.toHaveBeenCalled();
    expect(mockPresCreate.mock.calls[0][0].metadata.stripe_account).toBe('presentiel');
  });

  it('femme_debutante → Stripe présentiel', async () => {
    mockResolveStripeAccount.mockReturnValue('presentiel');
    mockFormation(649, 'Femme débutante', 'presentiel');

    const res = await postCheckout({
      formationId: 'femme_debutante',
      registrationType: 'adult',
      email: 'femme@example.com',
      prenom: 'Amina',
      nom: 'Test',
    });

    expect(res.status).toBe(200);
    expect(mockGetStripeClient).toHaveBeenCalledWith('presentiel');
    expect(mockPresCreate).toHaveBeenCalled();
    expect(mockDistCreate).not.toHaveBeenCalled();
  });

  it('fiqh distanciel → Stripe distanciel + metadata', async () => {
    mockResolveStripeAccount.mockReturnValue('distanciel');
    mockFormation(399, 'Fiqh Mâlikite', 'distanciel');

    const res = await postCheckout({
      formationId: 'fiqh_malikite',
      registrationType: 'adult',
      email: 'eleve@example.com',
      prenom: 'Omar',
      nom: 'Test',
    });

    expect(res.status).toBe(200);
    expect(mockGetStripeClient).toHaveBeenCalledWith('distanciel');
    expect(mockDistCreate).toHaveBeenCalledTimes(1);
    expect(mockPresCreate).not.toHaveBeenCalled();
    expect(mockDistCreate.mock.calls[0][0].metadata.stripe_account).toBe('distanciel');
  });
});
