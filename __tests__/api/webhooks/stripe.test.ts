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
          payment_status: 'paid',
          amount_total: 15000,
          currency: 'eur',
          mode: 'payment',
          metadata: {
            formationId: formationSlug,
            email: 'test@example.com',
            first_name: 'Jean',
            last_name: 'Dupont',
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
          payment_status: 'paid',
          amount_total: 34900,
          currency: 'eur',
          mode: 'payment',
          metadata: {
            formationId: 'presentiel-global',
            email: 'test_presentiel@example.com',
            classId: 'uuid-classe-specifique-choisie', // L'élève a choisi sa classe !
            first_name: 'Jean',
            last_name: 'Dupont',
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

describe('Parcours Fiqh Malikite - Test Solide et Intégral', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait garantir que l\'étudiant est inscrit dans la bonne formation Fiqh Malikite ET la bonne classe', async () => {
    const mockRequest = new Request('http://localhost/api/webhooks/stripe', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const Stripe = require('stripe');
    const stripe = new Stripe();

    // 1. L'élève achète la formation "Fiqh Malikite"
    stripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_fiqh_malikite_solid',
          payment_status: 'paid',
          amount_total: 15000,
          currency: 'eur',
          mode: 'payment',
          metadata: {
            formationId: 'fiqh_malikite',
            email: 'eleve.fiqh@example.com',
            first_name: 'Imam',
            last_name: 'Malik',
          }
        }
      }
    });

    const { supabaseAdmin } = require('@/lib/supabaseAdmin');

    const FORMATION_UUID = 'uuid-formation-fiqh-malikite-123';
    const CLASSE_UUID = 'uuid-classe-fiqh-malikite-active-456';
    const STUDENT_UUID = 'uuid-student-imam-malik';

    // 2. On configure la base de données pour ce scénario précis
    let eqContext = '';
    supabaseAdmin.from.mockImplementation((table: string) => {
      eqContext = table;
      return supabaseAdmin;
    });

    supabaseAdmin.ilike.mockReturnThis();

    // Simuler que l'étudiant n'existe pas encore (ilike renvoie null, maybeSingle renvoie null)
    supabaseAdmin.maybeSingle.mockImplementation(() => {
      if (eqContext === 'etudiants') return Promise.resolve({ data: null });
      if (eqContext === 'inscriptions') return Promise.resolve({ data: null });
      return Promise.resolve({ data: null });
    });

    supabaseAdmin.eq.mockImplementation((field: string, value: string) => {
      // Trouver la formation exacte "fiqh_malikite"
      if (eqContext === 'formations' && field === 'slug' && value === 'fiqh_malikite') {
        supabaseAdmin.maybeSingle.mockResolvedValueOnce({ data: { id: FORMATION_UUID, title: 'FIQH MALIKITE' } });
      }
      // Trouver la classe active pour cette formation
      if (eqContext === 'classes' && field === 'formation_id' && value === FORMATION_UUID) {
        supabaseAdmin.maybeSingle.mockResolvedValueOnce({ data: { id: CLASSE_UUID, name: 'Session Fiqh Malikite 2026' } });
      }
      return supabaseAdmin;
    });

    // 3. Exécuter le Webhook
    await POST(mockRequest);

    // 4. VÉRIFICATIONS SOLIDES
    // Vérifier la création de l'étudiant
    expect(supabaseAdmin.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'eleve.fiqh@example.com',
        first_name: 'Imam',
        last_name: 'Malik',
        status: 'actif'
      })
    );

    // Vérifier L'AFFECTATION EXACTE dans la table des inscriptions
    expect(supabaseAdmin.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        formation_id: FORMATION_UUID,
        class_id: CLASSE_UUID,
        status: 'valide',
        paid_status: 'paye'
      })
    );

    // Si ces vérifications passent, l'élève s'affichera parfaitement dans l'interface Admin !
  });
});

