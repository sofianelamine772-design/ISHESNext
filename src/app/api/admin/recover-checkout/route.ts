import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { isAdminEmail } from '@/lib/auth-utils';
import {
  getStripeClient,
  isPresentielStripeConfigured,
  type StripeAccountId,
} from '@/lib/stripe-accounts';
import {
  findPaidCheckoutSessionsForEmail,
  fulfillCheckoutSession,
  getBaseEmail,
} from '@/lib/stripe-checkout-fulfillment';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * POST /api/admin/recover-checkout
 * Body: { emails: string[] } ou { sessionIds: string[], account?: 'presentiel'|'distanciel' }
 *
 * Récupère les checkouts Stripe payés sans dossier élève (webhook manqué).
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userEmail = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId,
    )?.emailAddress;
    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }

    const body = await req.json();
    const emails: string[] = Array.isArray(body.emails)
      ? body.emails.map((e: string) => getBaseEmail(String(e)))
      : [];
    const sessionIds: string[] = Array.isArray(body.sessionIds)
      ? body.sessionIds.map((s: string) => String(s).trim()).filter(Boolean)
      : [];
    const forceAccount = body.account as StripeAccountId | undefined;

    if (emails.length === 0 && sessionIds.length === 0) {
      return NextResponse.json(
        { error: 'Fournir emails[] ou sessionIds[]' },
        { status: 400 },
      );
    }

    const accounts: StripeAccountId[] = forceAccount
      ? [forceAccount]
      : isPresentielStripeConfigured()
        ? ['presentiel', 'distanciel']
        : ['distanciel'];

    const results: Array<Record<string, unknown>> = [];
    const since = Math.floor(Date.now() / 1000) - 14 * 24 * 3600; // 14 jours

    for (const account of accounts) {
      const stripe = getStripeClient(account, { legacyApi: true });

      if (sessionIds.length > 0) {
        for (const sid of sessionIds) {
          try {
            const session = await stripe.checkout.sessions.retrieve(sid);
            const existing = await supabaseAdmin
              .from('paiements')
              .select('id')
              .eq('stripe_session_id', sid)
              .maybeSingle();
            if (existing.data) {
              results.push({
                account,
                sessionId: sid,
                skipped: true,
                reason: 'paiement déjà en base',
              });
              continue;
            }
            const fulfill = await fulfillCheckoutSession({
              session,
              stripeAccount: account,
            });
            results.push({ account, ...fulfill });
          } catch (err: any) {
            results.push({
              account,
              sessionId: sid,
              ok: false,
              reason: err?.message || String(err),
            });
          }
        }
      }

      for (const email of emails) {
        const sessions = await findPaidCheckoutSessionsForEmail(stripe, email, {
          limit: 50,
          createdGte: since,
        });

        if (sessions.length === 0) {
          results.push({
            account,
            email,
            skipped: true,
            reason: 'aucune session payée trouvée sur ce compte',
          });
          continue;
        }

        for (const session of sessions) {
          const existing = await supabaseAdmin
            .from('paiements')
            .select('id')
            .eq('stripe_session_id', session.id)
            .maybeSingle();
          if (existing.data) {
            results.push({
              account,
              email,
              sessionId: session.id,
              skipped: true,
              reason: 'paiement déjà en base',
            });
            continue;
          }

          const fulfill = await fulfillCheckoutSession({
            session,
            stripeAccount: account,
          });
          results.push({ account, email, ...fulfill });
        }
      }
    }

    const recovered = results.filter((r) => r.ok === true && !r.skipped).length;
    return NextResponse.json({
      success: true,
      recovered,
      results,
      hint:
        recovered === 0
          ? 'Rien récupéré — vérifier que STRIPE_PRESENTIEL_SECRET_KEY (LIVE) est bien sur Vercel et que le webhook Présentiel pointe vers /api/webhooks/stripe.'
          : 'Dossiers créés. Les élèves doivent recevoir l’invitation Clerk / mail rentrée.',
    });
  } catch (err: any) {
    console.error('[recover-checkout]', err);
    return NextResponse.json(
      { error: err?.message || 'Erreur récupération' },
      { status: 500 },
    );
  }
}
