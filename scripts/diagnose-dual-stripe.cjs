/**
 * Diagnostic double Stripe — version CommonJS sans tsx (fiable).
 * Usage: node scripts/diagnose-dual-stripe.mjs [email...]
 */
const { readFileSync, existsSync } = require('fs');
const { resolve } = require('path');
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

function loadEnv() {
  const p = resolve('.env.local');
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    if (!line || line.trim().startsWith('#')) continue;
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}

function modeOf(key) {
  const k = String(key || '');
  if (!k) return 'EMPTY';
  if (k.startsWith('sk_live') || k.startsWith('pk_live')) return 'LIVE';
  if (k.startsWith('sk_test') || k.startsWith('pk_test')) return 'TEST';
  return 'OTHER';
}

function mask(key) {
  const k = String(key || '');
  if (!k) return '(absent)';
  return `${k.slice(0, 12)}… (len=${k.length})`;
}

function ok(b) {
  return b ? 'OK  ' : 'FAIL';
}

const REQUIRED_EVENTS = [
  'checkout.session.completed',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
];

async function inspectAccount(label, secret, whsec) {
  console.log(`\n──────── ${label} ────────`);
  console.log(`  secret: ${mask(secret)} mode=${modeOf(secret)}`);
  console.log(
    `  whsec:  ${whsec ? mask(whsec) : '(absent)'} format=${whsec && whsec.startsWith('whsec_') ? 'ok' : 'BAD/EMPTY'}`,
  );

  if (!secret) {
    console.log(`  [${ok(false)}] pas de secret key`);
    return { accountId: null, webhooksOk: false };
  }

  const stripe = new Stripe(secret, { apiVersion: '2023-10-16' });
  let accountId = null;
  try {
    const acct = await stripe.accounts.retrieve();
    accountId = acct.id;
    console.log(`  compte id=${acct.id}`);
    console.log(`  [${ok(true)}] API reachable`);
  } catch (err) {
    console.log(`  [${ok(false)}] API: ${err.message}`);
    return { accountId: null, webhooksOk: false };
  }

  let webhooksOk = false;
  try {
    const hooks = await stripe.webhookEndpoints.list({ limit: 20 });
    console.log(`  webhooks: ${hooks.data.length}`);
    if (hooks.data.length === 0) {
      console.log(`  [${ok(false)}] AUCUN webhook sur ce compte`);
    }
    for (const h of hooks.data) {
      const urlMatch = h.url.includes('/api/webhooks/stripe');
      const enabled = h.enabled_events || [];
      const hasAll =
        enabled.includes('*') || REQUIRED_EVENTS.every((e) => enabled.includes(e));
      const missing = REQUIRED_EVENTS.filter(
        (e) => !enabled.includes('*') && !enabled.includes(e),
      );
      console.log(`    • ${h.id} status=${h.status}`);
      console.log(`      url=${h.url}`);
      console.log(`      url_ok=${urlMatch} events_ok=${hasAll}`);
      if (missing.length) console.log(`      manquants: ${missing.join(', ')}`);
      if (urlMatch && h.status === 'enabled' && hasAll) webhooksOk = true;
    }
    console.log(`  [${ok(webhooksOk)}] webhook /api/webhooks/stripe + events`);
  } catch (err) {
    console.log(`  [${ok(false)}] list webhooks: ${err.message}`);
  }

  return { accountId, webhooksOk, stripe };
}

async function main() {
  loadEnv();
  const targets = process.argv.slice(2).length
    ? process.argv.slice(2).map((e) => e.trim().toLowerCase())
    : [
        'asmahamana@hotmail.fr',
        'nesrine.amar@gmail.com',
        'hajar.khelifa@gmail.com',
      ];

  console.log('=== DIAGNOSTIC DOUBLE STRIPE + WEBHOOKS ===\n');

  const distSec = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_DISTANCIEL_SECRET_KEY;
  const distWh = process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_DISTANCIEL_WEBHOOK_SECRET;
  const distPk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const presSec = process.env.STRIPE_PRESENTIEL_SECRET_KEY;
  const presWh = process.env.STRIPE_PRESENTIEL_WEBHOOK_SECRET;
  const presPk = process.env.NEXT_PUBLIC_STRIPE_PRESENTIEL_PUBLISHABLE_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';

  console.log('──────── ENV ────────');
  const keys = [
    'NEXT_PUBLIC_APP_URL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_PRESENTIEL_SECRET_KEY',
    'STRIPE_PRESENTIEL_WEBHOOK_SECRET',
    'NEXT_PUBLIC_STRIPE_PRESENTIEL_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'CLERK_SECRET_KEY',
    'SMTP_USER',
    'SMTP_PASS',
  ];
  for (const k of keys) {
    const v = process.env[k];
    console.log(`  [${ok(!!v)}] ${k} mode=${modeOf(v)}`);
  }
  console.log(`  APP_URL=${appUrl || '(absent)'}`);

  console.log('\n──────── ALIGNEMENT ────────');
  console.log(
    `  [${ok(modeOf(distSec) === modeOf(distPk) && modeOf(distSec) !== 'EMPTY')}] Distance secret/pk (${modeOf(distSec)}/${modeOf(distPk)})`,
  );
  console.log(
    `  [${ok(modeOf(presSec) === 'EMPTY' || modeOf(presSec) === modeOf(presPk))}] Présentiel secret/pk (${modeOf(presSec)}/${modeOf(presPk)})`,
  );
  if (modeOf(distSec) === 'TEST' || modeOf(presSec) === 'TEST') {
    console.log('  WARN: .env.local en TEST — les 3 paiements LIVE sont invisibles ici.');
    console.log('  Pour un vrai diagnostic prod, mets sk_live + whsec LIVE temporairement.');
  }
  if (distSec && presSec && distSec === presSec) {
    console.log('  [FAIL] Même secret Distance et Présentiel');
  }

  const dist = await inspectAccount('DISTANCE', distSec, distWh);
  const pres = await inspectAccount('PRESENTIEL', presSec, presWh);

  if (dist.accountId && pres.accountId) {
    console.log(
      dist.accountId === pres.accountId
        ? `\n  [FAIL] Même compte Stripe (${dist.accountId})`
        : `\n  [OK] Comptes distincts Distance=${dist.accountId} Présentiel=${pres.accountId}`,
    );
  }

  console.log('\n──────── SUPABASE (3 emails) ────────');
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (sbUrl && sbKey) {
    const sb = createClient(sbUrl, sbKey, {
      auth: { persistSession: false },
      realtime: { transport: ws },
    });
    for (const email of targets) {
      const { data: students } = await sb
        .from('etudiants')
        .select('id,email,first_name,last_name,clerk_user_id')
        .ilike('email', email);
      console.log(
        `  ${email} → élèves=${students?.length || 0}${students?.length ? '' : ' ABSENT'}`,
      );
    }
  } else {
    console.log('  [FAIL] Supabase env manquant');
  }

  console.log('\n──────── STRIPE sessions (si LIVE) ────────');
  const since = Math.floor(Date.now() / 1000) - 14 * 24 * 3600;
  for (const email of targets) {
    console.log(`\n  ▸ ${email}`);
    for (const [label, secret] of [
      ['presentiel', presSec],
      ['distanciel', distSec],
    ]) {
      if (!secret) {
        console.log(`    [${label}] pas de clé`);
        continue;
      }
      if (modeOf(secret) === 'TEST') {
        console.log(`    [${label}] clé TEST → skip (paiements LIVE invisibles)`);
        continue;
      }
      const stripe = new Stripe(secret, { apiVersion: '2023-10-16' });
      try {
        const sessions = await stripe.checkout.sessions.list({
          limit: 40,
          created: { gte: since },
        });
        const hits = sessions.data.filter((s) => {
          const e = (
            s.metadata?.email ||
            s.customer_details?.email ||
            s.customer_email ||
            ''
          ).toLowerCase();
          return e === email && s.payment_status === 'paid';
        });
        if (!hits.length) console.log(`    [${label}] aucune session paid`);
        for (const s of hits) {
          console.log(
            `    [${label}] ${s.id} ${(s.amount_total || 0) / 100}€ formation=${s.metadata?.formationId || '?'} meta.account=${s.metadata?.stripe_account || '?'}`,
          );
        }
      } catch (err) {
        console.log(`    [${label}] err ${err.message}`);
      }
    }
  }

  console.log('\n=== VERDICT ===');
  const problems = [];
  if (modeOf(presSec) === 'EMPTY') problems.push('STRIPE_PRESENTIEL_SECRET_KEY absente');
  if (!presWh || !presWh.startsWith('whsec_')) {
    problems.push('STRIPE_PRESENTIEL_WEBHOOK_SECRET absente/invalide');
  }
  if (modeOf(presSec) === 'TEST' || modeOf(distSec) === 'TEST') {
    problems.push('Clés locales TEST — pas de vue sur les paiements LIVE des 3 élèves');
  }
  if (modeOf(presSec) === 'LIVE' && !pres.webhooksOk) {
    problems.push('Webhook Présentiel LIVE manquant ou events incomplets');
  }
  if (modeOf(distSec) === 'LIVE' && !dist.webhooksOk) {
    problems.push('Webhook Distance LIVE manquant ou events incomplets');
  }
  if (appUrl.includes('localhost')) {
    problems.push('NEXT_PUBLIC_APP_URL = localhost (sur Vercel doit être https://www.ishes.fr)');
  }

  if (!problems.length) {
    console.log('Config OK sur cet env.');
  } else {
    for (const p of problems) console.log(' • ' + p);
  }

  console.log('\nPour récupérer les 3 (après clés LIVE) :');
  console.log('  node scripts/recover-missed-checkouts will need LIVE keys');
  console.log('  ou POST /api/admin/recover-checkout sur la prod');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
