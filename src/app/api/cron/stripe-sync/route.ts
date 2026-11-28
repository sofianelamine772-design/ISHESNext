import { NextResponse } from 'next/server';
import { syncStripeInvoices } from '@/lib/stripe-invoice-sync';
import { syncStudentPaidStatus } from '@/app/actions/students';
import { logSystemError } from '@/lib/error-logger';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Tâche planifiée (Vercel Cron, voir vercel.json) : relit les factures Stripe
 * des deux comptes et comble les mensualités manquantes en base (webhook raté,
 * panne réseau…), puis recalcule le statut « payé / partiel » des élèves touchés.
 *
 * Même logique que le bouton admin « Récupérer depuis Stripe », sans clic.
 * Protégée par CRON_SECRET (en-tête Vercel `Authorization: Bearer …` ou `?secret=`).
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const secret = process.env.CRON_SECRET;
  const isValidCron = Boolean(secret) && authHeader === `Bearer ${secret}`;
  const isValidSecret = Boolean(secret) && url.searchParams.get('secret') === secret;
  const isDev = process.env.NODE_ENV === 'development';

  if (!isValidCron && !isValidSecret && !isDev) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const daysParam = parseInt(url.searchParams.get('days') || '', 10);
  const days = Number.isFinite(daysParam) && daysParam > 0 ? Math.min(daysParam, 365) : 60;

  try {
    const report = await syncStripeInvoices(days);
    const paidStatusErrors: string[] = [];
    for (const studentId of report.touchedStudents) {
      try {
        await syncStudentPaidStatus(studentId);
      } catch (e) {
        paidStatusErrors.push(studentId);
        console.error('[cron stripe-sync] paid status', studentId, e);
      }
    }
    if (report.errors.length) {
      await logSystemError('Stripe Invoice Sync (cron)', new Error(JSON.stringify(report.errors).slice(0, 2000)));
    }
    console.log(
      `[cron stripe-sync] ${days} j : ${report.scanned} factures lues, ${report.inserted} ajoutées, ${report.updated} mises à jour, ${report.skipped.length} ignorées, ${report.errors.length} erreurs, ${report.touchedStudents.length} élèves recalculés.`,
    );
    return NextResponse.json({
      ok: true,
      days,
      scanned: report.scanned,
      inserted: report.inserted,
      updated: report.updated,
      skipped: report.skipped.length,
      errors: report.errors.length,
      touchedStudents: report.touchedStudents.length,
      paidStatusErrors,
    });
  } catch (err) {
    console.error('[cron stripe-sync] échec', err);
    await logSystemError('Stripe Invoice Sync (cron)', err instanceof Error ? err : new Error(String(err)));
    return NextResponse.json({ ok: false, error: 'Synchronisation Stripe impossible' }, { status: 500 });
  }
}
