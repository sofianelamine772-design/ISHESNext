import { NextRequest } from 'next/server';

const mockSync = jest.fn();
const mockPaid = jest.fn();
jest.mock('@/lib/stripe-invoice-sync', () => ({ syncStripeInvoices: (...a: unknown[]) => mockSync(...a) }));
jest.mock('@/app/actions/students', () => ({ syncStudentPaidStatus: (...a: unknown[]) => mockPaid(...a) }));
jest.mock('@/lib/error-logger', () => ({ logSystemError: jest.fn().mockResolvedValue(undefined) }));

import { GET } from '@/app/api/cron/stripe-sync/route';

describe('cron /api/cron/stripe-sync', () => {
  const prevSecret = process.env.CRON_SECRET;
  const prevEnv = process.env.NODE_ENV;
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.CRON_SECRET = 'top-secret';
    (process.env as Record<string, string>).NODE_ENV = 'production';
    mockSync.mockResolvedValue({ scanned: 12, inserted: 2, updated: 0, skipped: [], errors: [], touchedStudents: ['e1', 'e2'] });
    mockPaid.mockResolvedValue(undefined);
  });
  afterAll(() => {
    process.env.CRON_SECRET = prevSecret;
    (process.env as Record<string, string>).NODE_ENV = prevEnv as string;
  });

  it('refuse sans secret', async () => {
    const res = await GET(new NextRequest('http://localhost/api/cron/stripe-sync'));
    expect(res.status).toBe(401);
    expect(mockSync).not.toHaveBeenCalled();
  });

  it('relit Stripe (60 jours par défaut) et recalcule le statut des élèves touchés', async () => {
    const res = await GET(new NextRequest('http://localhost/api/cron/stripe-sync', { headers: { authorization: 'Bearer top-secret' } }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(mockSync).toHaveBeenCalledWith(60);
    expect(mockPaid).toHaveBeenCalledTimes(2);
    expect(json).toMatchObject({ ok: true, inserted: 2, touchedStudents: 2 });
  });

  it('accepte ?secret= et ?days= (plafonné à 365)', async () => {
    const res = await GET(new NextRequest('http://localhost/api/cron/stripe-sync?secret=top-secret&days=90'));
    expect(res.status).toBe(200);
    expect(mockSync).toHaveBeenCalledWith(90);
  });
});
