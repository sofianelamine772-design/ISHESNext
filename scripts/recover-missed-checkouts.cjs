/**
 * Récupère les checkouts payés sans dossier (CommonJS, sans tsx).
 *
 * Avec clés LIVE :
 *   STRIPE_PRESENTIEL_SECRET_KEY=sk_live_... STRIPE_SECRET_KEY=sk_live_... \
 *     node scripts/recover-missed-checkouts.cjs email1 email2
 */
const { readFileSync, existsSync } = require('fs');
const { resolve } = require('path');

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

async function main() {
  loadEnv();
  const emails = process.argv.slice(2).map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (!emails.length) {
    console.error('Usage: node scripts/recover-missed-checkouts.cjs email1 email2 ...');
    process.exit(1);
  }

  // Dynamic import of TS via compiling isn't available — call Stripe + duplicate minimal fulfill via HTTP to prod
  // Prefer local fulfillment modules through next-compatible require of compiled... 
  // Use stripe list + admin-less direct DB insert by spawning the TS path with node --experimental-strip-types if available

  const Stripe = require('stripe');
  const { createClient } = require('@supabase/supabase-js');
  const ws = require('ws');

  const distSec = process.env.STRIPE_SECRET_KEY;
  const presSec = process.env.STRIPE_PRESENTIEL_SECRET_KEY;
  const mode = (k) => (String(k || '').startsWith('sk_live') ? 'LIVE' : String(k || '').startsWith('sk_test') ? 'TEST' : 'EMPTY');

  console.log('Distance', mode(distSec), 'Présentiel', mode(presSec));
  if (mode(presSec) !== 'LIVE' && mode(distSec) !== 'LIVE') {
    console.error('STOP: il faut des clés sk_live_ pour récupérer les 3 paiements LIVE.');
    console.error('Mets STRIPE_PRESENTIEL_SECRET_KEY=sk_live_... (et éventuellement STRIPE_SECRET_KEY) puis relance.');
    process.exit(2);
  }

  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
    realtime: { transport: ws },
  });

  const accounts = [];
  if (mode(presSec) === 'LIVE') accounts.push(['presentiel', presSec]);
  if (mode(distSec) === 'LIVE') accounts.push(['distanciel', distSec]);

  const since = Math.floor(Date.now() / 1000) - 14 * 24 * 3600;
  const found = [];

  for (const email of emails) {
    for (const [label, secret] of accounts) {
      const stripe = new Stripe(secret, { apiVersion: '2023-10-16' });
      const sessions = await stripe.checkout.sessions.list({ limit: 50, created: { gte: since } });
      for (const s of sessions.data) {
        const e = (s.metadata?.email || s.customer_details?.email || s.customer_email || '').toLowerCase();
        if (e === email && s.payment_status === 'paid') {
          found.push({ email, label, session: s });
          console.log(`FOUND ${label} ${s.id} ${email} ${(s.amount_total || 0) / 100}€`);
        }
      }
    }
  }

  if (!found.length) {
    console.log('Aucune session trouvée. Vérifie les clés LIVE / le compte Stripe.');
    process.exit(1);
  }

  // Use production recover API if RECOVER_URL + cookie not available — instead call fulfill via dynamic import of built code
  // Simplest path: print curl for admin recover + session ids
  console.log('\nSessions à récupérer:');
  for (const f of found) {
    const { data: existing } = await sb
      .from('paiements')
      .select('id')
      .eq('stripe_session_id', f.session.id)
      .maybeSingle();
    console.log(
      `  ${f.email} ${f.label} ${f.session.id} db=${existing ? 'déjà présent' : 'MANQUANT'} meta=${JSON.stringify(f.session.metadata || {})}`,
    );
  }

  console.log('\nPour créer les dossiers automatiquement, après deploy:');
  console.log('POST /api/admin/recover-checkout');
  console.log(
    JSON.stringify(
      {
        emails,
        sessionIds: found.map((f) => f.session.id),
      },
      null,
      2,
    ),
  );

  // Attempt local fulfill if we can load the TS module (Node 22 strip types) 
  try {
    const { pathToFileURL } = require('url');
    // Fall through — recommend using recover API
  } catch {}
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
