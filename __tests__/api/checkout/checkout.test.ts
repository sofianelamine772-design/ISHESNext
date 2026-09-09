import { POST } from '@/app/api/checkout/route';
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { DISTANCE_CLASS_ID_TO_UUID } from '@/lib/distance-data';
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

function mockFormation(price = 480, title = 'Cours enfants') {
  const mockSelect = jest.fn().mockReturnValue({
    eq: jest.fn().mockReturnValue({
      maybeSingle: jest.fn().mockResolvedValue({ data: { price, title } })
    })
  });
  (supabaseAdmin.from as jest.Mock).mockReturnValue({ select: mockSelect });
}

async function postCheckout(body: Record<string, unknown>) {
  return POST(new NextRequest('http://localhost:3000/api/checkout', {
    method: 'POST',
    body: JSON.stringify(body)
  }));
}

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

  it('ne réduit pas un seul enfant', async () => {
    mockFormation(480);
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    const res = await postCheckout({
      formationId: 'arabe_enfant_distance',
      registrationType: 'child',
      email: 'parent@example.com',
      childrenList: [{ prenom: 'Amina', nom: 'Benali' }]
    });

    expect(res.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    const session = mockCreate.mock.calls[0][0];
    expect(session.line_items[0].price_data.unit_amount).toBe(48000);
    expect(session.metadata.sibling_discount).toBe('0');
  });

  it('applique 50 € de réduction pour 2 enfants inscrits en même temps (960 → 910)', async () => {
    mockFormation(480);
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    const res = await postCheckout({
      formationId: 'arabe_enfant_distance',
      registrationType: 'child',
      email: 'parent@example.com',
      childrenList: [
        { prenom: 'Amina', nom: 'Benali' },
        { prenom: 'Youssef', nom: 'Benali' }
      ]
    });

    expect(res.status).toBe(200);
    const session = mockCreate.mock.calls[0][0];
    expect(session.line_items[0].price_data.unit_amount).toBe(91000);
    expect(session.metadata.sibling_discount).toBe('50');
    expect(session.metadata.childrenCount).toBe('2');
    expect(session.line_items[0].price_data.product_data.description).toContain('50');
  });

  it('en plusieurs fois, applique −50 € sur le total (910 €) puis le découpe — pas −50 € par mois', async () => {
    mockFormation(480);
    const stripeInstance = new Stripe('fake', {} as any);
    const mockSessionCreate = stripeInstance.checkout.sessions.create as jest.Mock;
    const mockPriceCreate = stripeInstance.prices.create as jest.Mock;

    await postCheckout({
      formationId: 'arabe_enfant_distance',
      registrationType: 'child',
      installments: 10,
      email: 'parent@example.com',
      childrenList: [
        { prenom: 'Amina', nom: 'Benali' },
        { prenom: 'Youssef', nom: 'Benali' }
      ]
    });

    expect(mockPriceCreate).toHaveBeenCalledWith(expect.objectContaining({
      unit_amount: 9100, // 910 € / 10 = 91 €/mois — pas 41 € (91 − 50)
    }));
    expect(mockSessionCreate.mock.calls[0][0].metadata.sibling_discount).toBe('50');

    mockPriceCreate.mockClear();
    mockSessionCreate.mockClear();

    await postCheckout({
      formationId: 'arabe_enfant_distance',
      registrationType: 'child',
      installments: 3,
      email: 'parent@example.com',
      childrenList: [
        { prenom: 'Amina', nom: 'Benali' },
        { prenom: 'Youssef', nom: 'Benali' }
      ]
    });

    expect(mockPriceCreate).toHaveBeenCalledWith(expect.objectContaining({
      unit_amount: Math.round(91000 / 3), // 303,33 €/mois — pas 270 € (320 − 50)
    }));
  });

  it('applique 100 € de réduction pour 3 enfants inscrits en même temps', async () => {
    mockFormation(480);
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    await postCheckout({
      formationId: 'arabe_enfant_distance',
      registrationType: 'child',
      email: 'parent@example.com',
      childrenList: [
        { prenom: 'Amina', nom: 'Benali' },
        { prenom: 'Youssef', nom: 'Benali' },
        { prenom: 'Sara', nom: 'Benali' }
      ]
    });

    const session = mockCreate.mock.calls[0][0];
    expect(session.line_items[0].price_data.unit_amount).toBe(134000);
    expect(session.metadata.sibling_discount).toBe('100');
  });

  it('ne réduit pas une inscription adulte', async () => {
    mockFormation(480);
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    await postCheckout({
      formationId: 'arabe_enfant_distance',
      registrationType: 'adult',
      email: 'adulte@example.com',
      prenom: 'Fatima',
      nom: 'Benali'
    });

    const session = mockCreate.mock.calls[0][0];
    expect(session.line_items[0].price_data.unit_amount).toBe(48000);
    expect(session.metadata.sibling_discount).toBe('0');
  });

  it('refuse une inscription enfant sans enfant nommé (évite un paiement à 0 €)', async () => {
    mockFormation(480);
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    const res = await postCheckout({
      formationId: 'arabe_enfant_distance',
      registrationType: 'child',
      email: 'parent@example.com',
      childrenList: [{ prenom: '', nom: '' }]
    });

    expect(res.status).toBe(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('ignore un enfant vide et ne réduit pas si un seul enfant est vraiment nommé', async () => {
    mockFormation(480);
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    const res = await postCheckout({
      formationId: 'arabe_enfant_distance',
      registrationType: 'child',
      email: 'parent@example.com',
      childrenList: [
        { prenom: 'Amina', nom: 'Benali' },
        { prenom: '', nom: '' }
      ]
    });

    expect(res.status).toBe(200);
    const session = mockCreate.mock.calls[0][0];
    expect(session.line_items[0].price_data.unit_amount).toBe(48000);
    expect(session.metadata.sibling_discount).toBe('0');
    expect(session.metadata.childrenCount).toBe('1');
  });

  it('facture le Tajwid Intensif à 799 € depuis la base, pas 649 €', async () => {
    mockFormation(799, 'Tajwid Intensif');
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    const res = await postCheckout({
      formationId: 'tajwid_intensif',
      registrationType: 'adult',
      email: 'eleve@example.com',
      prenom: 'Amina',
      nom: 'Benali',
    });

    expect(res.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    const session = mockCreate.mock.calls[0][0];
    expect(session.line_items[0].price_data.unit_amount).toBe(79900);
    expect(session.metadata.formationId).toBe('tajwid_intensif');
  });

  it('facture la femme débutante présentiel à 649 € sans la remapper vers presentiel-global (480 €)', async () => {
    mockFormation(649, 'Arabe & Tajwid Femme Débutante (Présentiel)');
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    const res = await postCheckout({
      formationId: 'femme-debutante-presentiel',
      registrationType: 'adult',
      email: 'eleve@example.com',
      prenom: 'Fatima',
      nom: 'Benali',
    });

    expect(res.status).toBe(200);
    const session = mockCreate.mock.calls[0][0];
    expect(session.line_items[0].price_data.unit_amount).toBe(64900);
    expect(session.metadata.formationId).toBe('femme-debutante-presentiel');
  });

  it('autorise Tarbiya distanciel (classe 107) sans la traiter comme un créneau présentiel', async () => {
    mockFormation(399, 'Tarbiya Islamiya');
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;

    const res = await postCheckout({
      formationId: 'tarbiya_islamiya',
      registrationType: 'child',
      email: 'parent@example.com',
      childrenList: [{ prenom: 'Amina', nom: 'Benali', classId: '107', niveau: 'tarbiya_1' }],
    });

    expect(res.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    const session = mockCreate.mock.calls[0][0];
    expect(session.line_items[0].price_data.unit_amount).toBe(39900);
    expect(session.metadata.formationId).toBe('tarbiya_islamiya');
    expect(session.metadata.child_0_classId).toBe('e0a12345-0007-4000-8000-777777777777');
  });

  it('autorise toutes les classes distanciel enfant (101–108)', async () => {
    mockFormation(399, 'Cours enfant distanciel');
    const stripeInstance = new Stripe('fake', {} as any);
    const mockCreate = stripeInstance.checkout.sessions.create as jest.Mock;
    for (const classId of Object.keys(DISTANCE_CLASS_ID_TO_UUID).map(Number)) {
      mockCreate.mockClear();
      const res = await postCheckout({
        formationId: 'tarbiya_islamiya',
        registrationType: 'child',
        email: 'parent@example.com',
        childrenList: [{ prenom: 'Amina', nom: 'Benali', classId: String(classId), niveau: 'n1' }],
      });
      expect(res.status).toBe(200);
      expect(mockCreate).toHaveBeenCalledTimes(1);
    }
  });
});
