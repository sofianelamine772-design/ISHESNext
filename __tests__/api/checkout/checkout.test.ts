import { POST } from '@/app/api/checkout/route';
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Stripe from 'stripe';

// Mock dependencies
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn().mockResolvedValue({ userId: 'test_user_id' })
}));

jest.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: jest.fn()
  }
}));

// Setup a basic mock for Stripe
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

describe('Checkout API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 for any formation if database fetch fails or returns null', async () => {
    // Mock Supabase to return nothing
    const mockSelect = jest.fn().mockReturnValue({
      eq: jest.fn().mockReturnValue({
        maybeSingle: jest.fn().mockResolvedValue({ data: null }) // No data found
      })
    });
    (supabaseAdmin.from as jest.Mock).mockReturnValue({ select: mockSelect });

    const req = new NextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        formationId: 'presentiel_femme_debutante',
        registrationType: 'adult',
        email: 'test@example.com'
      })
    });

    const res = await POST(req);
    const json = await res.json();

    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;
    
    // Verify it blocked the checkout
    expect(res.status).toBe(404);
    expect(json.error).toBe('Formation introuvable en base de données');
    expect(mockCreate).not.toHaveBeenCalled();
  });
});
