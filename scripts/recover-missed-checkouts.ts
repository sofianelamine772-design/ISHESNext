#!/usr/bin/env node
/**
 * Récupération locale des checkouts payés sans dossier élève.
 *
 * Usage (avec clés LIVE dans l'env) :
 *   STRIPE_PRESENTIEL_SECRET_KEY=sk_live_... \
 *   STRIPE_SECRET_KEY=sk_live_... \
 *   npx tsx scripts/recover-missed-checkouts.ts asmahamana@hotmail.fr nesrine.amar@gmail.com hajar.khelifa@gmail.com
 */
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function loadEnv() {
  const p = resolve('.env.local');
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}

async function main() {
  loadEnv();
  const emails = process.argv.slice(2).map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (emails.length === 0) {
    console.error('Usage: npx tsx scripts/recover-missed-checkouts.ts email1 email2 ...');
    process.exit(1);
  }

  const {
    getStripeClient,
    isPresentielStripeConfigured,
  } = await import('../src/lib/stripe-accounts.ts');
  const {
    findPaidCheckoutSessionsForEmail,
    fulfillCheckoutSession,
  } = await import('../src/lib/stripe-checkout-fulfillment.ts');
  const { supabaseAdmin } = await import('../src/lib/supabaseAdmin.ts');

  const accounts = isPresentielStripeConfigured()
    ? (['presentiel', 'distanciel'] as const)
    : (['distanciel'] as const);

  console.log('Accounts:', accounts.join(', '));
  console.log(
    'Presentiel key mode:',
    (process.env.STRIPE_PRESENTIEL_SECRET_KEY || '').slice(0, 8),
  );
  console.log(
    'Distance key mode:',
    (process.env.STRIPE_SECRET_KEY || '').slice(0, 8),
  );

  const since = Math.floor(Date.now() / 1000) - 14 * 24 * 3600;

  for (const email of emails) {
    console.log('\n===', email, '===');
    for (const account of accounts) {
      const stripe = getStripeClient(account, { legacyApi: true });
      const sessions = await findPaidCheckoutSessionsForEmail(stripe, email, {
        limit: 50,
        createdGte: since,
      });
      console.log(`  [${account}] sessions paid:`, sessions.length);

      for (const session of sessions) {
        const { data: existing } = await supabaseAdmin
          .from('paiements')
          .select('id')
          .eq('stripe_session_id', session.id)
          .maybeSingle();
        if (existing) {
          console.log('  skip (déjà en DB)', session.id);
          continue;
        }
        const result = await fulfillCheckoutSession({
          session,
          stripeAccount: account,
        });
        console.log('  fulfill', result);
      }
    }
  }

  console.log('\nDONE');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
