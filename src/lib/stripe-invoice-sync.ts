import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { insertPaiementWithStripeAccount } from '@/lib/paiements-insert';
import { getBaseEmail } from '@/lib/stripe-checkout-fulfillment';
import {
  getStripeClient,
  isPresentielStripeConfigured,
  type StripeAccountId,
} from '@/lib/stripe-accounts';

const ACTIVE_INSCRIPTION_STATUSES = ['valide', 'en_attente', 'actif', 'en_attente_daffectation'];

export type InvoiceRecordStatus = 'succeeded' | 'failed';

export type RecordInvoiceResult =
  | { action: 'inserted' | 'updated'; paymentId: string; etudiantId: string }
  | { action: 'unchanged'; paymentId: string; etudiantId: string }
  | { action: 'skipped'; reason: string };

function idOf(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value;
  return (value as { id?: string }).id || null;
}

/**
 * Retrouve l'élève (payeur) d'une facture Stripe.
 * 1. Email de la facture  2. Email du client Stripe  3. Paiement initial (checkout) de l'abonnement
 */
export async function resolveStudentForInvoice(
  stripe: Stripe,
  invoice: Stripe.Invoice,
): Promise<string | null> {
  const emails = new Set<string>();
  if (invoice.customer_email) emails.add(getBaseEmail(invoice.customer_email));

  const customerId = idOf(invoice.customer);
  if (customerId) {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      if (!('deleted' in customer && customer.deleted) && (customer as Stripe.Customer).email) {
        emails.add(getBaseEmail((customer as Stripe.Customer).email!));
      }
    } catch {}
  }

  for (const email of emails) {
    if (!email) continue;
    const { data } = await supabaseAdmin
      .from('etudiants')
      .select('id')
      .ilike('email', email)
      .order('created_at', { ascending: true })
      .limit(1);
    if (data?.[0]?.id) return data[0].id;
  }

  // Fallback : l'abonnement vient d'une session checkout déjà enregistrée en base
  const subscriptionId = idOf((invoice as any).subscription);
  if (subscriptionId) {
    try {
      const sessions = await stripe.checkout.sessions.list({ subscription: subscriptionId, limit: 5 });
      const ids = sessions.data.map((s) => s.id);
      if (ids.length) {
        const { data } = await supabaseAdmin
          .from('paiements')
          .select('etudiant_id')
          .in('stripe_session_id', ids)
          .not('etudiant_id', 'is', null)
          .limit(1);
        if (data?.[0]?.etudiant_id) return data[0].etudiant_id;
      }
    } catch {}
  }

  return null;
}

/**
 * Enregistre (ou met à jour) une facture d'abonnement dans `paiements`.
 * Idempotent : la clé est l'ID de facture `in_…`. Un échec suivi d'un succès
 * (nouvelle tentative) met à jour la même ligne.
 */
export async function recordInvoicePayment(params: {
  stripe: Stripe;
  invoice: Stripe.Invoice;
  status: InvoiceRecordStatus;
  stripeAccount: StripeAccountId;
}): Promise<RecordInvoiceResult> {
  const { stripe, invoice, status, stripeAccount } = params;

  if (invoice.billing_reason === 'subscription_create') {
    return { action: 'skipped', reason: 'subscription_create (géré par checkout)' };
  }

  const amountInCents = invoice.amount_paid > 0 ? invoice.amount_paid : invoice.amount_due;
  if (!amountInCents) return { action: 'skipped', reason: 'montant nul' };

  const errorMessage =
    status === 'failed'
      ? (invoice as any).last_finalization_error?.message ||
        (invoice as any).last_payment_error?.message ||
        'Prélèvement refusé par la banque'
      : null;

  const { data: existing } = await supabaseAdmin
    .from('paiements')
    .select('id, status, etudiant_id')
    .eq('stripe_session_id', invoice.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (existing) {
    if (existing.status === status || existing.status === 'succeeded') {
      return { action: 'unchanged', paymentId: existing.id, etudiantId: existing.etudiant_id };
    }
    const { error } = await supabaseAdmin
      .from('paiements')
      .update({ status, error_message: errorMessage, amount: amountInCents / 100 })
      .eq('id', existing.id);
    if (error) throw error;
    return { action: 'updated', paymentId: existing.id, etudiantId: existing.etudiant_id };
  }

  const etudiantId = await resolveStudentForInvoice(stripe, invoice);
  if (!etudiantId) {
    return { action: 'skipped', reason: `aucun élève trouvé pour ${invoice.customer_email || idOf(invoice.customer)}` };
  }

  const { data: inscription } = await supabaseAdmin
    .from('inscriptions')
    .select('id')
    .eq('etudiant_id', etudiantId)
    .in('status', ACTIVE_INSCRIPTION_STATUSES)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: inserted, error } = await insertPaiementWithStripeAccount({
    inscription_id: inscription?.id || null,
    etudiant_id: etudiantId,
    stripe_session_id: invoice.id,
    amount: amountInCents / 100,
    currency: (invoice.currency || 'eur').toUpperCase(),
    status,
    error_message: errorMessage,
    stripe_account: stripeAccount,
    created_at: new Date(
      ((invoice as any).status_transitions?.paid_at || invoice.created) * 1000,
    ).toISOString(),
  });
  if (error || !inserted?.id) throw error || new Error('Insert paiement échoué');

  return { action: 'inserted', paymentId: inserted.id, etudiantId };
}

/** Statut à enregistrer pour une facture, ou null si rien à enregistrer. */
export function invoiceRecordStatus(invoice: Stripe.Invoice): InvoiceRecordStatus | null {
  if (invoice.status === 'paid') return 'succeeded';
  if (
    (invoice.status === 'open' || invoice.status === 'uncollectible') &&
    (invoice.attempt_count || 0) > 0
  ) {
    return 'failed';
  }
  return null;
}

export type StripeSyncReport = {
  scanned: number;
  inserted: number;
  updated: number;
  skipped: { invoiceId: string; account: StripeAccountId; reason: string }[];
  errors: { invoiceId: string; account: StripeAccountId; message: string }[];
  touchedStudents: string[];
};

/** Relit les factures Stripe récentes (tous comptes) et comble les paiements manquants en base. */
export async function syncStripeInvoices(days = 60): Promise<StripeSyncReport> {
  const report: StripeSyncReport = {
    scanned: 0, inserted: 0, updated: 0, skipped: [], errors: [], touchedStudents: [],
  };
  const touched = new Set<string>();
  const accounts: StripeAccountId[] = isPresentielStripeConfigured()
    ? ['distanciel', 'presentiel']
    : ['distanciel'];
  const since = Math.floor(Date.now() / 1000) - days * 86400;

  for (const account of accounts) {
    const stripe = getStripeClient(account, { legacyApi: true });
    for await (const invoice of stripe.invoices.list({ created: { gte: since }, limit: 100 })) {
      report.scanned++;
      const status = invoiceRecordStatus(invoice);
      if (!status || invoice.billing_reason === 'subscription_create') continue;
      try {
        const res = await recordInvoicePayment({ stripe, invoice, status, stripeAccount: account });
        if (res.action === 'inserted') report.inserted++;
        if (res.action === 'updated') report.updated++;
        if (res.action === 'skipped') {
          report.skipped.push({ invoiceId: invoice.id!, account, reason: res.reason });
        } else if (res.action !== 'unchanged') {
          touched.add(res.etudiantId);
        }
      } catch (err: any) {
        report.errors.push({ invoiceId: invoice.id!, account, message: err?.message || String(err) });
      }
    }
  }

  report.touchedStudents = [...touched];
  return report;
}
