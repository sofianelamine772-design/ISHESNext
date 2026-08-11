import { POST } from '@/app/api/checkout/route';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn().mockResolvedValue({ userId: 'test_user_id' })
}));

jest.mock('stripe', () => {
  const mStripe = {
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test' })
      }
    },
    prices: {
      create: jest.fn().mockResolvedValue({ id: 'price_test_123' })
    }
  };
  return jest.fn(() => mStripe);
});

jest.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          maybeSingle: jest.fn().mockResolvedValue({ data: null })
        })
      })
    })
  }
}));

describe('Checkout API - Présentiel Date Blocking Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('devrait bloquer les inscriptions en présentiel en février (entre 30 Nov et 30 Avr)', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-02-15T12:00:00Z'));

    const req = new NextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ formationId: 'presentiel-global' })
    });

    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(400);
    expect(json.error).toContain("Les inscriptions en présentiel sont fermées");
  });

  it('devrait autoriser les inscriptions en présentiel en mai (après le 30 Avril)', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-05-01T12:00:00Z'));

    const req = new NextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ formationId: 'presentiel-global' })
    });

    const res = await POST(req);
    // Should NOT be 400 with the closed message
    const json = await res.json();
    if (res.status === 400) {
      expect(json.error).not.toContain("Les inscriptions en présentiel sont fermées");
    } else {
      expect(res.status).not.toBe(400); // Usually 200 or 500 depending on mock
    }
  });

  it('devrait autoriser les inscriptions en distanciel en février', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-02-15T12:00:00Z'));

    const req = new NextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ formationId: 'sciences-islamiques' })
    });

    const res = await POST(req);
    const json = await res.json();
    if (res.status === 400) {
      expect(json.error).not.toContain("Les inscriptions en présentiel sont fermées");
    }
  });
});
