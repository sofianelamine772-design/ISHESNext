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

      if (result.action === 'skipped' && invoice.billing_reason !== 'subscription_create') {
        const { logSystemError } = await import('@/lib/error-logger');
        await logSystemError(
          'Stripe Webhook Invoice',
          new Error(`Facture ${invoice.id} (${status}, ${stripeAccount}) non enregistrée : ${result.reason}`),
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

      if (event.type === 'invoice.payment_succeeded' && (invoice as any).subscription) {
        try {
          const subscription = await stripe.subscriptions.retrieve(
            (invoice as any).subscription as string,
          );
          const installmentsTotal = subscription.metadata?.installments_total;
          if (installmentsTotal) {
            const total = parseInt(installmentsTotal, 10);
            const invoices = await stripe.invoices.list({
              subscription: subscription.id,
              status: 'paid',
              limit: 100,
            });
            if (invoices.data.length >= total) {
              await stripe.subscriptions.update(subscription.id, {
                cancel_at_period_end: true,
              });
              console.log(
                `[WEBHOOK] Abonnement ${subscription.id} terminé (${total} mensualités).`,
              );
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
