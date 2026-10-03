/**
 * Diagnostic double Stripe + webhooks + paiements manqués.
 *
 * Usage:
 *   npx tsx scripts/diagnose-dual-stripe.ts
 *   npx tsx scripts/diagnose-dual-stripe.ts asmahamana@hotmail.fr nesrine.amar@gmail.com
 *
 * Charge `.env.local` puis affiche ce qui bloque réellement (clés test/live, webhooks, DB).
 */
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

(globalThis as any).WebSocket = ws;

function loadEnv() {
  const p = resolve('.env.local');
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    if (!line || line.trim().startsWith('#')) continue;
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}

function modeOf(key?: string | null): 'LIVE' | 'TEST' | 'EMPTY' | 'OTHER' {
  const k = String(key || '');
  if (!k) return 'EMPTY';
  if (k.startsWith('sk_live') || k.startsWith('pk_live')) return 'LIVE';
  if (k.startsWith('sk_test') || k.startsWith('pk_test')) return 'TEST';
  if (k.startsWith('whsec_')) return 'OTHER';
  return 'OTHER';
}

function mask(key?: string | null): string {
  const k = String(key || '');
  if (!k) return '(absent)';
  return `${k.slice(0, 12)}… (len=${k.length})`;
}

function ok(b: boolean): string {
  return b ? 'OK' : 'FAIL';
}

const REQUIRED_EVENTS = [
  'checkout.session.completed',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
] as const;

async function inspectAccount(
  label: string,
  secret: string | undefined,
  whsec: string | undefined,
  expectedUrlPart: string,
) {
  console.log(`\n──────── ${label} ────────`);
  const secretMode = modeOf(secret);
  console.log(`  secret: ${mask(secret)} mode=${secretMode}`);
  console.log(`  whsec:  ${whsec ? mask(whsec) : '(absent)'} format=${whsec?.startsWith('whsec_') ? 'ok' : 'BAD/EMPTY'}`);

  if (!secret) {
    console.log(`  [${ok(false)}] pas de secret key → impossible de vérifier API/webhooks`);
    return { accountId: null as string | null, webhooksOk: false, sessions: [] as any[] };
  }

  const stripe = new Stripe(secret, { apiVersion: '2023-10-16' as any });

  let accountId: string | null = null;
  try {
    const acct = await stripe.accounts.retrieve();
    accountId = acct.id;
    console.log(`  compte Stripe id=${acct.id} email=${(acct as any).email || '?'}`);
    console.log(`  [${ok(true)}] API reachable`);
  } catch (err: any) {
    console.log(`  [${ok(false)}] API: ${err.message}`);
    return { accountId: null, webhooksOk: false, sessions: [] };
  }

  let webhooksOk = false;
  try {
    const hooks = await stripe.webhookEndpoints.list({ limit: 20 });
    console.log(`  webhooks configurés: ${hooks.data.length}`);
    if (hooks.data.length === 0) {
      console.log(`  [${ok(false)}] AUCUN webhook endpoint sur ce compte`);
    }
    for (const h of hooks.data) {
      const urlMatch = h.url.includes(expectedUrlPart);
      const status = h.status;
      const enabled = h.enabled_events;
      const hasAll =
        enabled.includes('*') ||
        REQUIRED_EVENTS.every((e) => enabled.includes(e));
      const missing = REQUIRED_EVENTS.filter(
        (e) => !enabled.includes('*') && !enabled.includes(e),
      );
      console.log(`    • ${h.id}`);
      console.log(`      url=${h.url}`);
      console.log(`      status=${status} url_ok=${urlMatch} events_ok=${hasAll}`);
      if (missing.length) console.log(`      events manquants: ${missing.join(', ')}`);
      if (urlMatch && status === 'enabled' && hasAll) webhooksOk = true;
    }
    console.log(
      `  [${ok(webhooksOk)}] webhook /api/webhooks/stripe + events requis`,
    );
  } catch (err: any) {
    console.log(`  [${ok(false)}] list webhooks: ${err.message}`);
  }

  return { accountId, webhooksOk, stripe };
}

async function main() {
  loadEnv();

  const emails = process.argv.slice(2).map((e) => e.trim().toLowerCase()).filter(Boolean);
  const defaultEmails = [
    'asmahamana@hotmail.fr',
    'nesrine.amar@gmail.com',
    'hajar.khelifa@gmail.com',
  ];
  const targets = emails.length ? emails : defaultEmails;

  console.log('═══════════════════════════════════════════════');
  console.log(' DIAGNOSTIC DOUBLE STRIPE + WEBHOOKS + DOSSIERS');
  console.log('═══════════════════════════════════════════════');

  // ── Env presence ──
  console.log('\n──────── Variables d\'environnement ────────');
  const envChecks: Array<{ key: string; need: string; value?: string }> = [
    { key: 'NEXT_PUBLIC_APP_URL', need: 'prod https://www.ishes.fr' },
    { key: 'STRIPE_SECRET_KEY', need: 'Distance sk_live_' },
    { key: 'STRIPE_WEBHOOK_SECRET', need: 'Distance whsec_' },
    { key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', need: 'Distance pk_live_' },
    { key: 'STRIPE_PRESENTIEL_SECRET_KEY', need: 'Présentiel sk_live_' },
    { key: 'STRIPE_PRESENTIEL_WEBHOOK_SECRET', need: 'Présentiel whsec_' },
    { key: 'NEXT_PUBLIC_STRIPE_PRESENTIEL_PUBLISHABLE_KEY', need: 'Présentiel pk_live_' },
    { key: 'NEXT_PUBLIC_SUPABASE_URL', need: 'Supabase URL' },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', need: 'service_role' },
    { key: 'CLERK_SECRET_KEY', need: 'Clerk' },
    { key: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', need: 'Clerk pub' },
    { key: 'SMTP_USER', need: 'mails' },
    { key: 'SMTP_PASS', need: 'mails' },
  ];

  for (const c of envChecks) {
    const v = process.env[c.key];
    const present = Boolean(v?.trim());
    const m = modeOf(v);
    console.log(
      `  [${ok(present)}] ${c.key}  present=${present} mode=${m}  (${c.need})`,
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  const distSec = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_DISTANCIEL_SECRET_KEY;
  const distWh = process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_DISTANCIEL_WEBHOOK_SECRET;
  const distPk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const presSec = process.env.STRIPE_PRESENTIEL_SECRET_KEY;
  const presWh = process.env.STRIPE_PRESENTIEL_WEBHOOK_SECRET;
  const presPk = process.env.NEXT_PUBLIC_STRIPE_PRESENTIEL_PUBLISHABLE_KEY;

  console.log('\n──────── Alignement TEST / LIVE ────────');
  const distAligned =
    modeOf(distSec) !== 'EMPTY' &&
    modeOf(distSec) === modeOf(distPk) &&
    modeOf(distSec) !== 'OTHER';
  const presAligned =
    modeOf(presSec) === 'EMPTY' ||
    (modeOf(presSec) === modeOf(presPk) && modeOf(presSec) !== 'OTHER');
  console.log(
    `  [${ok(distAligned)}] Distance secret/pk même mode (${modeOf(distSec)} / ${modeOf(distPk)})`,
  );
  console.log(
    `  [${ok(presAligned)}] Présentiel secret/pk même mode (${modeOf(presSec)} / ${modeOf(presPk)})`,
  );
  if (modeOf(distSec) === 'TEST' || modeOf(presSec) === 'TEST') {
    console.log(
      '  ⚠ Ce .env.local est en TEST. La prod Vercel doit avoir des clés LIVE.',
    );
    console.log(
      '  ⚠ Les 3 élèves ont payé en LIVE → ce script ne les verra PAS avec des clés TEST.',
    );
  }
  if (modeOf(distSec) === 'LIVE' && modeOf(presSec) === 'LIVE' && distSec === presSec) {
    console.log('  [FAIL] Distance et Présentiel ont la MÊME secret key — comptes pas séparés');
  }

  const expectedUrlPart = '/api/webhooks/stripe';
  console.log(`\n  NEXT_PUBLIC_APP_URL=${appUrl || '(absent)'}`);
  if (appUrl.includes('localhost')) {
    console.log('  ⚠ APP_URL localhost — sur Vercel il faut https://www.ishes.fr');
  }

  const dist = await inspectAccount('DISTANCE', distSec, distWh, expectedUrlPart);
  const pres = await inspectAccount('PRESENTIEL', presSec, presWh, expectedUrlPart);

  if (dist.accountId && pres.accountId && dist.accountId === pres.accountId) {
    console.log(
      '\n  [FAIL] Distance et Présentiel pointent vers le MÊME compte Stripe (même acct_…).',
    );
  } else if (dist.accountId && pres.accountId) {
    console.log(
      `\n  [OK] Deux comptes distincts: Distance=${dist.accountId} Présentiel=${pres.accountId}`,
    );
  }

  // ── Supabase dossiers ──
  console.log('\n──────── Dossiers Supabase ────────');
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbUrl || !sbKey) {
    console.log('  [FAIL] Supabase env manquant');
  } else {
    const sb = createClient(sbUrl, sbKey, {
      auth: { persistSession: false },
      realtime: { transport: ws as any },
    });

    for (const email of targets) {
      const { data: students } = await sb
        .from('etudiants')
        .select('id, email, first_name, last_name, clerk_user_id, created_at')
        .ilike('email', email);
      const { data: pays } = await sb
        .from('paiements')
        .select('id, amount, status, stripe_account, stripe_session_id, created_at, etudiants!inner(email)')
        .ilike('etudiants.email', email)
        .limit(5)
        .order('created_at', { ascending: false });

      console.log(`  ${email}`);
      console.log(
        `    élèves=${students?.length || 0}  paiements=${pays?.length || 0}`,
      );
      if (!students?.length) {
        console.log('    → ABSENT en base (webhook n’a jamais créé le dossier)');
      }
    }
  }

  // ── Stripe search for emails ──
  console.log('\n──────── Recherche paiements Stripe (14 j) ────────');
  const since = Math.floor(Date.now() / 1000) - 14 * 24 * 3600;
  const accounts: Array<{ label: string; secret?: string }> = [
    { label: 'presentiel', secret: presSec },
    { label: 'distanciel', secret: distSec },
  ];

  for (const email of targets) {
    console.log(`\n  ▸ ${email}`);
    for (const acc of accounts) {
      if (!acc.secret) {
        console.log(`    [${acc.label}] skip (pas de clé)`);
        continue;
      }
      if (modeOf(acc.secret) === 'TEST') {
        console.log(
          `    [${acc.label}] clé TEST — ne peut pas voir les paiements LIVE`,
        );
        continue;
      }
      const stripe = new Stripe(acc.secret, { apiVersion: '2023-10-16' as any });
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
        if (hits.length === 0) {
          console.log(`    [${acc.label}] aucune session paid trouvée (liste récente)`);
        }
        for (const s of hits) {
          console.log(
            `    [${acc.label}] FOUND ${s.id} amount=${(s.amount_total || 0) / 100}€ meta.formationId=${s.metadata?.formationId || '?'} stripe_account=${s.metadata?.stripe_account || '?'}`,
          );
        }
      } catch (err: any) {
        console.log(`    [${acc.label}] erreur: ${err.message}`);
      }
    }
  }

  // ── Verdict ──
  console.log('\n═══════════════════════════════════════════════');
  console.log(' VERDICT');
  console.log('═══════════════════════════════════════════════');

  const problems: string[] = [];
  if (modeOf(presSec) === 'EMPTY') {
    problems.push('STRIPE_PRESENTIEL_SECRET_KEY absente → checkout présentiel retombe sur Distance OU prod sans split');
  }
  if (modeOf(presWh) === 'EMPTY' || !presWh?.startsWith('whsec_')) {
    problems.push('STRIPE_PRESENTIEL_WEBHOOK_SECRET absente/invalide → events Présentiel non vérifiés');
  }
  if (modeOf(presSec) === 'TEST' || modeOf(distSec) === 'TEST') {
    problems.push(
      'Clés locales en TEST : pour diagnostiquer/récupérer les 3 élèves LIVE, mets temporairement les sk_live + whsec LIVE (ou lance depuis Vercel)',
    );
  }
  if (!pres.webhooksOk && modeOf(presSec) === 'LIVE') {
    problems.push(
      'Webhook Présentiel LIVE manquant ou events incomplets sur /api/webhooks/stripe',
    );
  }
  if (!dist.webhooksOk && modeOf(distSec) === 'LIVE') {
    problems.push('Webhook Distance LIVE manquant ou events incomplets');
  }
  if (appUrl.includes('localhost')) {
    problems.push('NEXT_PUBLIC_APP_URL encore en localhost dans ce fichier env');
  }

  if (problems.length === 0) {
    console.log('Aucun problème de config détecté sur CET env.');
    console.log('Si les dossiers manquent encore → webhook n’a pas été reçu au moment du paiement (redeploy / secret incorrect).');
  } else {
    for (const p of problems) console.log(`  • ${p}`);
  }

  console.log('\nProchaine étape récupération (avec clés LIVE) :');
  console.log(
    '  npx tsx scripts/recover-missed-checkouts.ts ' + targets.join(' '),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
