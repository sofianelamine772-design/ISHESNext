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

  it('should use fallback price of 649 for presentiel if database fetch fails or returns null', async () => {
    // Mock Supabase to return nothing (simulating an error or missing row)
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

    // Verify it didn't return a 404 error but proceeded with Stripe
    expect(res.status).toBe(200);
    expect(json.url).toBe('https://checkout.stripe.com/test');

    // Verify Stripe was called with the fallback amount (649 EUR = 64900 cents)
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;
    expect(mockCreate).toHaveBeenCalled();
    const createArgs = mockCreate.mock.calls[0][0];
    
    expect(createArgs.line_items[0].price_data.unit_amount).toBe(64900);
    expect(createArgs.line_items[0].price_data.product_data.name).toContain('Cours en Présentiel');
  });

  it('should return 404 for unknown formation IDs not in fallback list', async () => {
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
        formationId: 'unknown_course_xyz',
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
