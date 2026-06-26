import { POST } from '@/app/api/webhooks/stripe/route';

// --- Mocks ---
jest.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn().mockResolvedValue({ data: null }),
    single: jest.fn().mockResolvedValue({ data: { id: 'temp_123', email: 'test@example.com' } }),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
  }
}));

jest.mock('@clerk/nextjs/server', () => ({
  clerkClient: jest.fn().mockResolvedValue({
    invitations: { createInvitation: jest.fn() }
  })
}));

const mockConstructEvent = jest.fn();
jest.mock('stripe', () => {
  const mStripe = {
    webhooks: {
      constructEvent: jest.fn()
    }
  };
  return jest.fn(() => mStripe);
});

jest.mock('next/headers', () => ({
  headers: jest.fn().mockResolvedValue({
    get: jest.fn().mockReturnValue('test_signature')
  })
}));

const DISTANCIEL_FORMATIONS = [
  'tajwid_intensif',
  'sciences_islamiques',
  'arabe_coran_junior',
  'sciences_du_coran',
  'sciences_hadith',
  'memoriser_coran',
  'as_sirah',
  'al_aqida',
  'fiqh_malikite',
  'arabe_adulte',
  'tarbiya_islamiya',
  'spiritualite_islam'
];

describe('Stripe Webhook - Auto-Assignation Toutes Formations Distanciel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { supabaseAdmin } = require('@/lib/supabaseAdmin');
    supabaseAdmin.maybeSingle.mockResolvedValue({ data: null });
  });

  test.each(DISTANCIEL_FORMATIONS)('devrait auto-assigner la classe par défaut pour la formation %s', async (formationSlug) => {
    const mockRequest = new Request('http://localhost/api/webhooks/stripe', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const Stripe = require('stripe');
    const stripe = new Stripe();

    // Simuler le paiement Stripe pour LA formation en cours
    stripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: `cs_test_${formationSlug}`,
          amount_total: 15000,
          currency: 'eur',
          mode: 'payment',
          metadata: {
            formationId: formationSlug,
            email: 'test@example.com',
          }
        }
      }
    });

    const { supabaseAdmin } = require('@/lib/supabaseAdmin');
    
    const mockFormationUuid = `uuid-${formationSlug}`;
    const mockDefaultClassUuid = `class-${formationSlug}-2026`;

    // Mock des appels base de données pour simuler l'assignation automatique
    let eqContext = '';
    supabaseAdmin.from.mockImplementation((table: string) => {
      eqContext = table;
      return supabaseAdmin;
    });

    supabaseAdmin.eq.mockImplementation((field: string, value: string) => {
      // 1. Recherche de la formation
      if (eqContext === 'formations' && field === 'slug' && value === formationSlug) {
        supabaseAdmin.maybeSingle.mockResolvedValueOnce({ data: { id: mockFormationUuid } });
      }
      // 2. Recherche de la classe par défaut
      if (eqContext === 'classes' && field === 'formation_id' && value === mockFormationUuid) {
        supabaseAdmin.maybeSingle.mockResolvedValueOnce({ data: { id: mockDefaultClassUuid } });
      }
      // 3. Recherche de l'inscription existante (on simule qu'elle n'existe pas pour forcer le INSERT)
      if (eqContext === 'inscriptions' && field === 'formation_id' && value === mockFormationUuid) {
        supabaseAdmin.maybeSingle.mockResolvedValueOnce({ data: null });
      }
      return supabaseAdmin;
    });

    supabaseAdmin.ilike.mockReturnThis();

    await POST(mockRequest);
    
    // VERIFICATION: on vérifie que le système a bien appelé "insert" sur "inscriptions" avec le class_id correct
    expect(supabaseAdmin.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        formation_id: mockFormationUuid,
        class_id: mockDefaultClassUuid,
      })
    );
  });

  it('devrait assigner l\'élève à la classe SPÉCIFIQUE qu\'il a choisie (Présentiel)', async () => {
    const mockRequest = new Request('http://localhost/api/webhooks/stripe', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const Stripe = require('stripe');
    const stripe = new Stripe();

    // Simuler le paiement Stripe pour une formation Présentiel (l'élève a choisi un horaire, donc un classId)
    stripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_presentiel',
          amount_total: 34900,
          currency: 'eur',
          mode: 'payment',
          metadata: {
            formationId: 'presentiel-global',
            email: 'test_presentiel@example.com',
            classId: 'uuid-classe-specifique-choisie', // L'élève a choisi sa classe !
          }
        }
      }
    });

    const { supabaseAdmin } = require('@/lib/supabaseAdmin');
    
    let eqContext = '';
    supabaseAdmin.from.mockImplementation((table: string) => {
      eqContext = table;
      return supabaseAdmin;
    });

    supabaseAdmin.eq.mockImplementation((field: string, value: string) => {
      if (eqContext === 'formations' && field === 'slug' && value === 'presentiel-global') {
        supabaseAdmin.maybeSingle.mockResolvedValueOnce({ data: { id: 'uuid-formation-presentiel' } });
      }
      if (eqContext === 'inscriptions' && field === 'formation_id' && value === 'uuid-formation-presentiel') {
        supabaseAdmin.maybeSingle.mockResolvedValueOnce({ data: null });
      }
      return supabaseAdmin;
    });

    supabaseAdmin.ilike.mockReturnThis();

    await POST(mockRequest);
    
    // VERIFICATION: on vérifie que le système a ignoré la classe par défaut et a bien utilisé la classe SPÉCIFIQUE !
    expect(supabaseAdmin.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        formation_id: 'uuid-formation-presentiel',
        class_id: 'uuid-classe-specifique-choisie', // La classe exacte choisie par l'élève
      })
    );
  });
});
