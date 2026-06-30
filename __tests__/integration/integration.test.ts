import { POST as messagesPost } from '@/app/api/messages/route';
import { POST as stripePost } from '@/app/api/webhooks/stripe/route';
import {
  fetchStudentBillingDataAction,
  linkTypoRegistrationAction,
  syncStudentStateOnLogin
} from '@/app/actions/students';

// Mock DB InMemory
const mockDb = {
  etudiants: [] as any[],
  inscriptions: [] as any[],
  paiements: [] as any[],
  messages: [] as any[],
  classes: [] as any[],
  formations: [] as any[],
};

// Mock next/headers
jest.mock('next/headers', () => {
  const mHeaders = {
    get: jest.fn().mockReturnValue('test_signature')
  };
  return {
    headers: jest.fn().mockResolvedValue(mHeaders)
  };
});

// Mocks
jest.mock('@/lib/supabaseAdmin', () => {
  return {
    supabaseAdmin: {
      from: jest.fn().mockImplementation((table: string) => {
        const tableData = mockDb[table as keyof typeof mockDb] || [];

        const chain: any = {
          select: jest.fn().mockImplementation((fields: string = '') => {
            let currentData = [...tableData];
              
            // JOIN relations globally for any select
            if (table === 'paiements' && fields.includes('etudiants')) {
              currentData = currentData.map(p => {
                const student = mockDb.etudiants.find(e => e.id === p.etudiant_id);
                return { ...p, etudiants: student || null };
              });
            }
            if (table === 'etudiants' && fields.includes('inscriptions')) {
              currentData = currentData.map(e => {
                const studentInscriptions = mockDb.inscriptions.filter(i => i.etudiant_id === e.id).map(ins => {
                  const formation = mockDb.formations.find(f => f.id === ins.formation_id);
                  const classe = mockDb.classes.find(c => c.id === ins.class_id);
                  return {
                    ...ins,
                    formations: formation || null,
                    classes: classe || null
                  };
                });
                return { ...e, inscriptions: studentInscriptions };
              });
            }

            return {
              eq: jest.fn().mockImplementation((field: string, value: any) => {
                let filtered = currentData.filter((r: any) => r[field] === value);
                const queryObj: any = {
                  maybeSingle: jest.fn().mockResolvedValue({ data: filtered[0] || null }),
                  single: jest.fn().mockResolvedValue({ data: filtered[0] || null }),
                  order: jest.fn().mockImplementation(() => queryObj),
                  limit: jest.fn().mockImplementation(() => queryObj),
                  in: jest.fn().mockImplementation(() => queryObj),
                  eq: jest.fn().mockImplementation((f: string, v: any) => {
                    filtered = filtered.filter((r: any) => r[f] === v);
                    queryObj.maybeSingle = jest.fn().mockResolvedValue({ data: filtered[0] || null });
                    queryObj.single = jest.fn().mockResolvedValue({ data: filtered[0] || null });
                    return queryObj;
                  }),
                  ilike: jest.fn().mockImplementation((f: string, v: any) => {
                    const cleanVal = String(v).toLowerCase();
                    filtered = filtered.filter((r: any) => String(r[f]).toLowerCase() === cleanVal);
                    queryObj.maybeSingle = jest.fn().mockResolvedValue({ data: filtered[0] || null });
                    queryObj.single = jest.fn().mockResolvedValue({ data: filtered[0] || null });
                    return queryObj;
                  }),
                  then: (cb: any) => cb({ data: filtered })
                };
                return queryObj;
              }),
              in: jest.fn().mockImplementation((field: string, values: any[]) => {
                const filtered = currentData.filter((r: any) => values.includes(r[field]));
                const queryObj: any = {
                  in: jest.fn().mockImplementation(() => queryObj),
                  order: jest.fn().mockImplementation(() => queryObj),
                  limit: jest.fn().mockImplementation(() => queryObj),
                  eq: jest.fn().mockImplementation(() => queryObj),
                  maybeSingle: jest.fn().mockResolvedValue({ data: filtered[0] || null }),
                  single: jest.fn().mockResolvedValue({ data: filtered[0] || null }),
                  then: (cb: any) => cb({ data: filtered })
                };
                return queryObj;
              }),
              order: jest.fn().mockImplementation(() => {
                const queryObj: any = {
                  limit: jest.fn().mockImplementation(() => queryObj),
                  then: (cb: any) => cb({ data: currentData })
                };
                return queryObj;
              }),
              then: (cb: any) => cb({ data: currentData })
            };
          }),
          eq: jest.fn().mockImplementation((field: string, value: any) => {
            const filtered = tableData.filter((r: any) => r[field] === value);
            return {
              maybeSingle: jest.fn().mockResolvedValue({ data: filtered[0] || null }),
              single: jest.fn().mockResolvedValue({ data: filtered[0] || null }),
              order: jest.fn().mockImplementation(() => Promise.resolve({ data: filtered }))
            };
          }),
          insert: jest.fn().mockImplementation((data: any) => {
            const rows = Array.isArray(data) ? data : [data];
            const inserted = rows.map(r => {
              const row = { id: r.id || `mock_${Math.random()}`, ...r, created_at: new Date().toISOString() };
              tableData.push(row);
              return row;
            });
            return {
              select: jest.fn().mockImplementation(() => {
                return {
                  single: jest.fn().mockResolvedValue({ data: inserted[0] }),
                  maybeSingle: jest.fn().mockResolvedValue({ data: inserted[0] }),
                  then: (cb: any) => cb({ data: inserted })
                };
              }),
              then: (cb: any) => cb({ data: inserted })
            };
          }),
          update: jest.fn().mockImplementation((data: any) => {
            const queryObj: any = {
              eq: jest.fn().mockImplementation((field: string, value: any) => {
                tableData.forEach((r: any) => {
                  if (r[field] === value) {
                    Object.assign(r, data);
                  }
                });
                return Promise.resolve({ error: null });
              }),
              in: jest.fn().mockImplementation((field: string, values: any[]) => {
                tableData.forEach((r: any) => {
                  if (values.includes(r[field])) {
                    Object.assign(r, data);
                  }
                });
                return queryObj;
              })
            };
            return queryObj;
          })
        };
        return chain;
      }),
      storage: {
        from: jest.fn().mockReturnValue({
          upload: jest.fn().mockResolvedValue({ error: null }),
          createSignedUrl: jest.fn().mockResolvedValue({ data: { signedUrl: 'https://mock.download/backup.json' }, error: null }),
        }),
        createBucket: jest.fn().mockResolvedValue({ error: null }),
      }
    }
  };
});

// Mock auth-utils
jest.mock('@/lib/auth-utils', () => ({
  isAdminEmail: (email: string) => email === 'sofianelamine772@gmail.com'
}));

const mockAuth = jest.fn();
jest.mock('@clerk/nextjs/server', () => ({
  auth: () => mockAuth(),
  currentUser: jest.fn(),
  clerkClient: jest.fn().mockResolvedValue({
    invitations: {
      createInvitation: jest.fn().mockResolvedValue({})
    }
  }),
}));

const mockSendAdminNewMessageEmail = jest.fn();
jest.mock('@/lib/mail', () => ({
  sendAdminNewMessageEmail: (params: any) => mockSendAdminNewMessageEmail(params),
  sendWelcomeEmail: jest.fn(),
  sendPaymentReminderEmail: jest.fn().mockResolvedValue({ success: true }),
  sendClassAssignmentEmail: jest.fn(),
  sendEmail: jest.fn(),
}));

// Stripe Mock
jest.mock('stripe', () => {
  const mStripe = {
    webhooks: {
      constructEvent: jest.fn()
    },
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ url: 'https://mock.stripe.url' })
      }
    }
  };
  return jest.fn(() => mStripe);
});

describe('ISHES - Scénarios de tests d\'intégration fonctionnels', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuth.mockReset();
    mockSendAdminNewMessageEmail.mockReset();

    // Reset Db
    mockDb.etudiants = [];
    mockDb.inscriptions = [];
    mockDb.paiements = [];
    mockDb.messages = [];
    mockDb.classes = [];
    mockDb.formations = [];
  });

  describe('Scénario 1 : Messagerie Élève ➔ Alerte Email Admin', () => {
    it('devrait envoyer une alerte email à l\'admin quand un élève envoie un message privé à system_admin', async () => {
      // 1. Configurer l'utilisateur Clerk connecté
      mockAuth.mockResolvedValue({ userId: 'clerk_student_123' });

      // 2. Ajouter l'élève dans notre DB mockée
      mockDb.etudiants.push({
        id: 'clerk_student_123',
        clerk_user_id: 'clerk_student_123',
        first_name: 'Samy',
        last_name: 'Fauve',
        email: 'samy.fauve@example.com'
      });

      // 3. Simuler la requête POST vers le endpoint de messagerie
      const reqPayload = {
        sender_id: 'clerk_student_123',
        receiver_id: 'admin_system', // Envoi à l'administration
        content: 'Bonjour, j\'ai une question sur les horaires du cours d\'Arabe.',
        type: 'private'
      };

      const mockRequest = new Request('http://localhost/api/messages', {
        method: 'POST',
        body: JSON.stringify(reqPayload)
      });

      // 4. Déclencher le handler API
      const response = await messagesPost(mockRequest);
      const resData = await response.json();

      expect(response.status).toBe(200);
      expect(resData.success).toBe(true);

      // 5. Vérifier que le message a été inséré en base de données
      const savedMessage = mockDb.messages.find(m => m.sender_id === 'clerk_student_123');
      expect(savedMessage).toBeDefined();
      expect(savedMessage.content).toBe(reqPayload.content);

      // 6. Vérifier que la fonction d'envoi d'e-mail à l'administrateur a été appelée avec les bons détails
      expect(mockSendAdminNewMessageEmail).toHaveBeenCalledWith({
        studentName: 'Samy Fauve',
        studentEmail: 'samy.fauve@example.com',
        messageContent: reqPayload.content
      });
    });
  });

  describe('Scénario 2 : Paiement Stripe ➔ Affectation de classe automatique', () => {
    it('devrait créer une inscription et assigner la classe par défaut pour un paiement de formation', async () => {
      // 1. Ajouter les données de départ (la formation Tajwid Intensif et sa classe par défaut)
      mockDb.formations.push({
        id: 'uuid-tajwid-intensif',
        slug: 'tajwid-intensif',
        title: 'Tajwid Intensif'
      });

      mockDb.classes.push({
        id: 'class-tajwid-intensif-default',
        name: 'Tajwid Intensif - Standard',
        formation_id: 'uuid-tajwid-intensif',
        type: 'distanciel',
        is_active: true
      });

      // 2. Simuler la notification de webhook de Stripe
      const Stripe = require('stripe');
      const stripe = new Stripe();
      stripe.webhooks.constructEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_session_123',
            payment_status: 'paid',
            amount_total: 64900,
            currency: 'eur',
            mode: 'payment',
            metadata: {
              formationId: 'tajwid-intensif',
              email: 'eleve.test@example.com',
              first_name: 'Jean',
              last_name: 'Dupont'
            }
          }
        }
      });

      const mockRequest = new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        body: JSON.stringify({})
      });

      // 3. Déclencher le webhook
      const response = await stripePost(mockRequest);
      expect(response.status).toBe(200);

      // 4. Vérifier que l'étudiant a été créé
      const createdStudent = mockDb.etudiants.find(e => e.email === 'eleve.test@example.com');
      expect(createdStudent).toBeDefined();

      // 5. Vérifier que l'inscription a été créée et assignée à la classe par défaut
      const createdInscription = mockDb.inscriptions.find(i => i.etudiant_id === createdStudent.id);
      expect(createdInscription).toBeDefined();
      expect(createdInscription.formation_id).toBe('uuid-tajwid-intensif');
      expect(createdInscription.class_id).toBe('class-tajwid-intensif-default');
    });
  });

  describe('Scénario 3 : Calcul de l\'échéancier de facturation', () => {
    it('devrait calculer correctement l\'échéancier familial à partir des inscriptions et des paiements', async () => {
      // 1. Ajouter l'étudiant
      mockDb.etudiants.push({
        id: 'student_456',
        email: 'parent.test@example.com',
        first_name: 'Sofiane',
        last_name: 'Lamine'
      });

      // 2. Ajouter les inscriptions actives (Tajwid Intensif à 649 €)
      mockDb.inscriptions.push({
        id: 'ins_456',
        etudiant_id: 'student_456',
        status: 'valide',
        paid_status: 'paye',
        formations: { title: 'Tajwid Intensif' },
        classes: { name: 'Classe A' }
      });

      // 3. Ajouter un paiement réussi de 160 € (échéance 1 d'un plan 5x)
      mockDb.paiements.push({
        id: 'pay_456_1',
        etudiant_id: 'student_456',
        amount: 160,
        status: 'succeeded',
        created_at: new Date('2026-06-01T10:00:00Z').toISOString()
      });

      // 4. Ajouter une mensualité rejetée de 160 € (échéance 2)
      mockDb.paiements.push({
        id: 'pay_456_2',
        etudiant_id: 'student_456',
        amount: 160,
        status: 'failed',
        error_message: 'Solde insuffisant',
        created_at: new Date('2026-07-01T10:00:00Z').toISOString()
      });

      // 5. Exécuter la server action de récupération de la facturation
      const res = await fetchStudentBillingDataAction('student_456');

      expect(res.success).toBe(true);
      if (!res.data) throw new Error('res.data is undefined');
      expect(res.data.inscriptions).toHaveLength(1);
      expect(res.data.payments).toHaveLength(2);

      // Vérifier la présence du paiement réussi et de l'échec
      const succeededPay = res.data.payments.find((p: any) => p.status === 'succeeded');
      const failedPay = res.data.payments.find((p: any) => p.status === 'failed');

      expect(succeededPay).toBeDefined();
      expect(failedPay).toBeDefined();
      expect(failedPay.error_message).toBe('Solde insuffisant');
    });
  });

  describe('Scénario 4 : Correction d\'erreur de saisie d\'email lors de l\'inscription', () => {
    it('devrait lier le compte et corriger l\'email si un étudiant s\'est trompé d\'email à l\'inscription', async () => {
      // 1. Configurer Clerk connecté
      mockAuth.mockResolvedValue({ userId: 'clerk_linked_789' });
      const { currentUser } = require('@clerk/nextjs/server');
      currentUser.mockResolvedValue({
        primaryEmailAddress: {
          emailAddress: 'eleve.correct@example.com'
        }
      });

      // 2. Ajouter l'étudiant avec l'email contenant la faute de frappe
      mockDb.etudiants.push({
        id: 'student_typo',
        email: 'eleve.correec@example.com',
        clerk_user_id: null
      });

      // 3. Exécuter l'action de liaison
      const res = await linkTypoRegistrationAction('eleve.correec@example.com');

      expect(res.success).toBe(true);

      // 4. Vérifier que l'email a été corrigé et lié au Clerk ID
      const updatedStudent = mockDb.etudiants.find(e => e.id === 'student_typo');
      expect(updatedStudent).toBeDefined();
      expect(updatedStudent.email).toBe('eleve.correct@example.com');
      expect(updatedStudent.clerk_user_id).toBe('clerk_linked_789');
    });
  });

  describe('Scénario 5 : Protection des accès et rôles', () => {
    it('devrait bloquer la connexion et lever une erreur si un étudiant non admin n\'a aucun dossier', async () => {
      // Configurer un email non admin
      const email = 'non_admin@example.com';
      mockAuth.mockResolvedValue({ userId: 'clerk_unrelated_111' });

      // Exécuter l'action de connexion
      const res = await syncStudentStateOnLogin({
        clerkUserId: 'clerk_unrelated_111',
        email,
        firstName: 'Paul',
        lastName: 'Dupont'
      });

      // Devrait refuser la connexion car l'email n'est pas admin et n'existe pas en BDD
      expect(res.success).toBe(false);
      expect(res.error).toContain('aucun élève associé');
    });

    it('devrait créer automatiquement un profil admin si l\'email est dans la liste des admins autorisés', async () => {
      // Configurer un email admin (dans la liste de .env.local / emailHeader)
      const email = 'sofianelamine772@gmail.com';
      mockAuth.mockResolvedValue({ userId: 'clerk_admin_999' });

      // Exécuter la connexion
      const res = await syncStudentStateOnLogin({
        clerkUserId: 'clerk_admin_999',
        email,
        firstName: 'Sofiane',
        lastName: 'Lamine'
      });

      expect(res.success).toBe(true);

      // Vérifier que le profil admin a été inséré
      const adminProfile = mockDb.etudiants.find(e => e.email === email);
      expect(adminProfile).toBeDefined();
      expect(adminProfile.role).toBe('admin');
      expect(adminProfile.clerk_user_id).toBe('clerk_admin_999');
    });
  });

  describe('Scénario 6 : Traitement d\'un échec de paiement Stripe (Mensualité rejetée)', () => {
    it('devrait enregistrer le paiement échoué et basculer l\'inscription en refusé', async () => {
      // 1. Configurer un étudiant et son inscription valide
      mockDb.etudiants.push({
        id: 'student_failed_pay',
        email: 'failed_card@example.com',
        first_name: 'Karim',
        last_name: 'Benn'
      });

      mockDb.inscriptions.push({
        id: 'ins_failed_pay',
        etudiant_id: 'student_failed_pay',
        status: 'valide',
        paid_status: 'paye'
      });

      // 2. Simuler le webhook Stripe invoice.payment_failed
      const Stripe = require('stripe');
      const stripe = new Stripe();
      stripe.webhooks.constructEvent.mockReturnValue({
        type: 'invoice.payment_failed',
        data: {
          object: {
            id: 'in_failed_invoice_123',
            customer_email: 'failed_card@example.com',
            amount_due: 15000,
            amount_paid: 0,
            currency: 'eur',
            last_payment_error: {
              message: 'La carte a été déclinée'
            }
          }
        }
      });

      const mockRequest = new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        body: JSON.stringify({})
      });

      // 3. Déclencher le webhook
      const response = await stripePost(mockRequest);
      expect(response.status).toBe(200);

      // 4. Vérifier qu'une ligne de paiement failed a été enregistrée avec le bon prix
      const loggedPayment = mockDb.paiements.find(p => p.etudiant_id === 'student_failed_pay');
      expect(loggedPayment).toBeDefined();
      expect(loggedPayment.status).toBe('failed');
      expect(loggedPayment.amount).toBe(150); // Le prix exact du prélèvement (15000 cents / 100)
      expect(loggedPayment.error_message).toBe('La carte a été déclinée');

      // 5. Vérifier que le statut de l'inscription est passé à 'refuse' (badge rouge IMPAYÉ)
      const updatedInscription = mockDb.inscriptions.find(i => i.id === 'ins_failed_pay');
      expect(updatedInscription).toBeDefined();
      expect(updatedInscription.paid_status).toBe('refuse');

      // 6. Vérifier que l'e-mail de relance automatique a été expédié à l'élève avec le lien de paiement
      const { sendPaymentReminderEmail } = require('@/lib/mail');
      expect(sendPaymentReminderEmail).toHaveBeenCalledWith(
        'failed_card@example.com',
        'Karim',
        'https://mock.stripe.url' // Le lien Stripe de régularisation mocké
      );
    });
  });

  describe('Scénario 7 : Inscription Famille (Plusieurs enfants avec chacun sa classe)', () => {
    it('devrait créer plusieurs profils étudiants et inscriptions distinctes, chacun dans sa bonne classe', async () => {
      // 1. Configurer la formation Tajwid Intensif et ses classes spécifiques
      mockDb.formations.push({
        id: 'uuid-tajwid-intensif',
        slug: 'tajwid-intensif',
        title: 'Tajwid Intensif'
      });

      mockDb.classes.push({
        id: 'class-tajwid-groupe-a',
        name: 'Tajwid Groupe A',
        formation_id: 'uuid-tajwid-intensif',
        type: 'distanciel',
        is_active: true
      });

      mockDb.classes.push({
        id: 'class-tajwid-groupe-b',
        name: 'Tajwid Groupe B',
        formation_id: 'uuid-tajwid-intensif',
        type: 'distanciel',
        is_active: true
      });

      // 2. Simuler un Stripe session checkout avec childrenCount = 2 et deux classes différentes
      const Stripe = require('stripe');
      const stripe = new Stripe();
      stripe.webhooks.constructEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_family_session_999',
            payment_status: 'paid',
            amount_total: 129800, // 2 x Scolarité
            currency: 'eur',
            mode: 'payment',
            metadata: {
              email: 'parent.family@example.com',
              formationId: 'tajwid-intensif',
              childrenCount: '2',
              child_0_first: 'Ali',
              child_0_last: 'Lamine',
              child_0_classId: 'class-tajwid-groupe-a',
              child_1_first: 'Sara',
              child_1_last: 'Lamine',
              child_1_classId: 'class-tajwid-groupe-b'
            }
          }
        }
      });

      const mockRequest = new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        body: JSON.stringify({})
      });

      // 3. Déclencher le webhook
      const response = await stripePost(mockRequest);
      expect(response.status).toBe(200);

      // 4. Vérifier la création des 2 élèves en base
      const studentAli = mockDb.etudiants.find(e => e.first_name === 'Ali' && e.last_name === 'Lamine');
      const studentSara = mockDb.etudiants.find(e => e.first_name === 'Sara' && e.last_name === 'Lamine');

      expect(studentAli).toBeDefined();
      expect(studentSara).toBeDefined();

      // 5. Vérifier que chacun des enfants a bien été inscrit dans sa classe spécifique choisie
      const insAli = mockDb.inscriptions.find(i => i.etudiant_id === studentAli.id);
      expect(insAli).toBeDefined();
      expect(insAli.class_id).toBe('class-tajwid-groupe-a');

      const insSara = mockDb.inscriptions.find(i => i.etudiant_id === studentSara.id);
      expect(insSara).toBeDefined();
      expect(insSara.class_id).toBe('class-tajwid-groupe-b');
    });
  });

  describe('Scénario 8 : Intégrité des sommes et jointures de paiements Stripe (Paiements Réussis & Facturations)', () => {
    it('devrait ingérer le paiement Stripe réussi au centime près et calculer l\'état de facturation exact', async () => {
      // 1. Configurer un étudiant avec une scolarité totale de 900 €
      const studentId = 'student_billing_exact';
      mockDb.etudiants.push({
        id: studentId,
        email: 'billing.exact@example.com',
        first_name: 'Omar',
        last_name: 'Sy'
      });

      mockDb.inscriptions.push({
        id: 'ins_billing_exact',
        etudiant_id: studentId,
        status: 'valide',
        paid_status: 'refuse', // Initiale impayé / refusé
        academic_year: '2026-2027',
        formation_id: 'uuid-tajwid-intensif'
      });

      // 2. Simuler l'événement Stripe invoice.payment_succeeded de 180 € (18000 centimes)
      const Stripe = require('stripe');
      const stripe = new Stripe();
      stripe.webhooks.constructEvent.mockReturnValue({
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            id: 'in_success_invoice_777',
            customer_email: 'billing.exact@example.com',
            amount_paid: 18000, // 180.00 €
            currency: 'eur'
          }
        }
      });

      const mockRequest = new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        body: JSON.stringify({})
      });

      // 3. Déclencher le webhook
      const response = await stripePost(mockRequest);
      expect(response.status).toBe(200);

      // 4. Vérifier que le paiement de 180 € a été enregistré
      const loggedPayment = mockDb.paiements.find(p => p.stripe_session_id === 'in_success_invoice_777');
      expect(loggedPayment).toBeDefined();
      expect(loggedPayment.amount).toBe(180);
      expect(loggedPayment.status).toBe('succeeded');
      expect(loggedPayment.etudiant_id).toBe(studentId);

      // 5. Vérifier que le paid_status de l'inscription est mis à jour à 'paye'
      const updatedInscription = mockDb.inscriptions.find(i => i.id === 'ins_billing_exact');
      expect(updatedInscription).toBeDefined();
      expect(updatedInscription.paid_status).toBe('paye');

      // 6. Récupérer l'état financier via la server action et valider la somme
      const res = await fetchStudentBillingDataAction(studentId);
      expect(res.success).toBe(true);
      expect(res.data).toBeDefined();
      expect(res.data?.payments).toHaveLength(1);

      const paymentSum = res.data?.payments.reduce((sum: number, p: any) => sum + p.amount, 0);
      expect(paymentSum).toBe(180); // La somme calculée doit être exactement de 180 €
    });
  });

  describe('Scénario 9 : Parcours Extrême (Paiement Multi-mois avec Échec) -> Interface Étudiant', () => {
    it('devrait garantir que la bonne formation s\'affiche sur le dashboard ET que le statut financier bascule en impayé après un échec', async () => {
      // 1. Initialiser une formation Fiqh Malikite et sa classe
      const formationId = 'uuid-formation-fiqh-malikite-123';
      const classId = 'uuid-classe-fiqh-malikite-active-456';
      
      mockDb.formations.push({
        id: formationId,
        slug: 'fiqh_malikite',
        title: 'FIQH MALIKITE',
        type: 'distanciel'
      });

      mockDb.classes.push({
        id: classId,
        name: 'Session Fiqh Malikite 2026',
        formation_id: formationId,
        type: 'distanciel',
        is_active: true
      });

      // 2. Simuler l'inscription réussie (1er mois payé)
      const Stripe = require('stripe');
      const stripe = new Stripe();
      stripe.webhooks.constructEvent.mockReturnValueOnce({
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_fiqh_malikite_multi',
            payment_status: 'paid',
            amount_total: 15000, // 1ère mensualité payée
            currency: 'eur',
            mode: 'subscription', // Mode abonnement (plusieurs fois)
            metadata: {
              formationId: 'fiqh_malikite',
              email: 'eleve.multi@example.com',
              first_name: 'Imam',
              last_name: 'Malik',
            }
          }
        }
      });

      const mockRequest1 = new Request('http://localhost/api/webhooks/stripe', { method: 'POST', body: JSON.stringify({}) });
      await stripePost(mockRequest1);

      // 3. Vérifier que l'UI affiche bien l'élève COMME "À JOUR" et dans la BONNE CLASSE !
      const { fetchStudentsAction } = require('@/app/actions/students');
      
      let uiResult = await fetchStudentsAction();
      expect(uiResult.success).toBe(true);
      
      let uiStudent = uiResult.data.find((s: any) => s.email === 'eleve.multi@example.com');
      expect(uiStudent).toBeDefined();
      
      // L'inscription doit exister et pointer vers la bonne formation et classe
      expect(uiStudent.inscriptions[0].formations.title).toBe('FIQH MALIKITE');
      expect(uiStudent.inscriptions[0].classes.name).toBe('Session Fiqh Malikite 2026');
      expect(uiStudent.inscriptions[0].paid_status).toBe('paye');

      // 4. LE MOIS SUIVANT: Le prélèvement Stripe ÉCHOUE
      stripe.webhooks.constructEvent.mockReturnValueOnce({
        type: 'invoice.payment_failed',
        data: {
          object: {
            id: 'in_failed_invoice_multi',
            customer_email: 'eleve.multi@example.com',
            amount_due: 15000,
            amount_paid: 0,
            currency: 'eur',
            last_payment_error: {
              message: 'Fonds insuffisants'
            }
          }
        }
      });

      const mockRequest2 = new Request('http://localhost/api/webhooks/stripe', { method: 'POST', body: JSON.stringify({}) });
      await stripePost(mockRequest2);

      // 5. Revérifier l'Interface UI (Le logiciel) !
      uiResult = await fetchStudentsAction();
      uiStudent = uiResult.data.find((s: any) => s.email === 'eleve.multi@example.com');
      
      // La formation est TOUJOURS la bonne (ne doit pas avoir disparu)
      expect(uiStudent.inscriptions[0].formations.title).toBe('FIQH MALIKITE');
      
      // MAIS le statut financier a impérativement basculé sur REFUSÉ / IMPAYÉ
      expect(uiStudent.inscriptions[0].paid_status).toBe('refuse');

      // 6. Vérifier que la relance a été expédiée avec le lien de régularisation
      const { sendPaymentReminderEmail } = require('@/lib/mail');
      expect(sendPaymentReminderEmail).toHaveBeenCalledWith(
        'eleve.multi@example.com',
        'Imam',
        expect.any(String)
      );
    });
  });
});
