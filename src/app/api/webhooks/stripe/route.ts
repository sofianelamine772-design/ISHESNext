import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  constructStripeWebhookEvent,
  getStripeClient,
  normalizeStoredStripeAccount,
  type StripeAccountId,
} from '@/lib/stripe-accounts';
import { fulfillCheckoutSession } from '@/lib/stripe-checkout-fulfillment';

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get('stripe-signature') as string;

  let event: Stripe.Event;
  let stripeAccount: StripeAccountId = 'distanciel';

  try {
    const verified = constructStripeWebhookEvent(body, signature);
    event = verified.event;
    stripeAccount = verified.account;
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    try {
      const { logSystemError } = await import('@/lib/error-logger');
      await logSystemError('Stripe Webhook Signature', err);
    } catch {}
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const metaAccount = (event.data.object as any)?.metadata?.stripe_account;
  if (metaAccount === 'presentiel' || metaAccount === 'distanciel') {
    stripeAccount = normalizeStoredStripeAccount(metaAccount);
  }
  const stripe = getStripeClient(stripeAccount, { legacyApi: true });

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const result = await fulfillCheckoutSession({ session, stripeAccount });
      console.log(
        `[WEBHOOK] fulfill ${session.id}: ok=${result.ok} students=${result.studentIds.length} email=${result.payerEmail} reason=${result.reason || ''}`,
      );
    }

    if (event.type === 'invoice.payment_succeeded' || event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      const status = event.type === 'invoice.payment_succeeded' ? 'succeeded' : 'failed';
      const { recordInvoicePayment } = await import('@/lib/stripe-invoice-sync');

      const result = await recordInvoicePayment({ stripe, invoice, status, stripeAccount });
      console.log(`[WEBHOOK] invoice ${invoice.id} ${status} → ${result.action}${'reason' in result ? ` (${result.reason})` : ''}`);

      // Ne pas alerter pour les skips volontaires (1× Checkout, 1er mois abo).
      const intentionalSkip =
        result.action === 'skipped' &&
        (invoice.billing_reason === 'subscription_create' ||
          String('reason' in result ? result.reason : '').includes('hors abonnement') ||
          String('reason' in result ? result.reason : '').includes('subscription_create'));
      if (result.action === 'skipped' && !intentionalSkip) {
        const { logSystemError } = await import('@/lib/error-logger');
        await logSystemError(
          'Stripe Webhook Invoice',
          new Error(`Facture ${invoice.id} (${status}, ${stripeAccount}) non enregistrée : ${'reason' in result ? result.reason : ''}`),
        );
      }

      if (result.action === 'inserted' || result.action === 'updated') {
        if (status === 'failed') {
          try {
            const { sendPaymentReminderWithLinkAction } = await import('@/app/actions/students');
            await sendPaymentReminderWithLinkAction(result.paymentId);
          } catch (mailErr) {
            console.error('[WEBHOOK reminder error]', mailErr);
          }
        }
        const { syncStudentPaidStatus } = await import('@/app/actions/students');
        await syncStudentPaidStatus(result.etudiantId);
      }

      const rawSub = (invoice as any).subscription;
      const subscriptionId =
        typeof rawSub === 'string' ? rawSub : rawSub?.id || null;

      if (event.type === 'invoice.payment_succeeded' && subscriptionId) {
        try {
          const {
            computeInstallmentCancelAt,
            shouldCancelSubscriptionNow,
          } = await import('@/lib/stripe-subscription-stop');
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const total = parseInt(String(subscription.metadata?.installments_total || ''), 10);
          if (Number.isFinite(total) && total > 0) {
            const invoices = await stripe.invoices.list({
              subscription: subscription.id,
              status: 'paid',
              limit: 100,
            });
            const paidCount = invoices.data.length;

            if (shouldCancelSubscriptionNow({ installmentsTotal: total, paidInvoiceCount: paidCount })) {
              // Dernière mensualité encaissée → plus aucun prélèvement suivant
              // (y compris après une promo qui a baissé le montant mensuel).
              if (subscription.status === 'active' || subscription.status === 'trialing') {
                await stripe.subscriptions.cancel(subscription.id);
              } else {
                await stripe.subscriptions.update(subscription.id, {
                  cancel_at_period_end: true,
                });
              }
              console.log(
                `[WEBHOOK] Abonnement ${subscription.id} annulé après ${paidCount}/${total} mensualités.`,
              );
            } else if (subscription.status === 'active' || subscription.status === 'trialing') {
              // Filet natif Stripe : même si un webhook futur rate, l'abo s'arrête.
              const cancelAt = computeInstallmentCancelAt({
                installmentsTotal: total,
                paidInvoiceCount: paidCount,
                currentPeriodStart: (subscription as any).current_period_start,
                currentPeriodEnd: (subscription as any).current_period_end,
              });
              if (
                cancelAt &&
                (!subscription.cancel_at || Math.abs((subscription.cancel_at || 0) - cancelAt) > 60)
              ) {
                await stripe.subscriptions.update(subscription.id, { cancel_at: cancelAt });
                console.log(
                  `[WEBHOOK] Abonnement ${subscription.id} cancel_at=${cancelAt} (${paidCount}/${total}).`,
                );
              }
            }
          }
        } catch (subErr) {
          console.error('[WEBHOOK sub cancel error]', subErr);
        }
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.error('[WEBHOOK] Unhandled error:', err);
    try {
      const { logSystemError } = await import('@/lib/error-logger');
      await logSystemError('Stripe Webhook Handler', err);
    } catch {}
    return new NextResponse('Webhook handler error', { status: 500 });
  }
}
