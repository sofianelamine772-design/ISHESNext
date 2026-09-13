import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });
globalThis.WebSocket = ws;

const APPLY = process.argv.includes('--apply');
const YEAR = '2026-2027';
const APP_URL = 'https://ishees.vercel.app';
const CLERK_KEY = process.env.CLERK_SECRET_KEY_LIVE || process.env.CLERK_SECRET_KEY;
const ADMIN_EMAILS = (process.env.ADMIN_EMAIL || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: ws },
});

function baseEmail(raw) {
  const email = String(raw || '').trim().toLowerCase();
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  return `${parts[0].split('+')[0]}@${parts[1]}`;
}

function isValidEmail(raw) {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(String(raw || '').trim());
}

async function clerkGetAll(pathname) {
  const out = [];
  let offset = 0;
  while (true) {
    const url = new URL(`https://api.clerk.com/v1${pathname}`);
    url.searchParams.set('limit', '100');
    url.searchParams.set('offset', String(offset));
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${CLERK_KEY}` },
    });
    if (!res.ok) throw new Error(`Clerk ${pathname} ${res.status} ${await res.text()}`);
    const data = await res.json();
    const rows = Array.isArray(data) ? data : data.data || [];
    out.push(...rows);
    if (rows.length < 100) break;
    offset += rows.length;
  }
  return out;
}

async function main() {
  if (!CLERK_KEY) throw new Error('CLERK_SECRET_KEY manquante');
  if (CLERK_KEY.startsWith('sk_test_')) {
    throw new Error(
      'Refus : clé Clerk TEST (locale). Il faut la clé PRODUCTION (sk_live_…). Mets-la dans CLERK_SECRET_KEY_LIVE ou passe-la une fois, sinon les élèves recevront encore un lien Clerk local.',
    );
  }
  if (!CLERK_KEY.startsWith('sk_live_')) {
    throw new Error('Clé Clerk inattendue : elle doit commencer par sk_live_ pour la production.');
  }
  console.log('Clerk: PRODUCTION (sk_live)  lien:', `${APP_URL}/app/eleve`);

  const { data: students, error: sErr } = await supabase
    .from('etudiants')
    .select('id, first_name, last_name, email, status, role, clerk_user_id');
  if (sErr) throw sErr;

  const { data: inscriptions, error: iErr } = await supabase
    .from('inscriptions')
    .select('etudiant_id, academic_year, class_id, status')
    .eq('academic_year', YEAR);
  if (iErr) throw iErr;

  const hasYear = new Set((inscriptions || []).map((i) => i.etudiant_id));

  const pupils = (students || []).filter((s) => {
    const role = String(s.role || 'eleve').toLowerCase();
    if (role === 'admin') return false;
    if (ADMIN_EMAILS.includes(String(s.email || '').toLowerCase())) return false;
    return true;
  });

  const byEmail = new Map();
  const noEmail = [];
  const badEmail = [];

  for (const s of pupils) {
    const email = String(s.email || '').trim().toLowerCase();
    if (!email) {
      noEmail.push(s);
      continue;
    }
    if (!isValidEmail(email)) {
      badEmail.push({ ...s, email });
      continue;
    }
    const key = email;
    if (!byEmail.has(key)) byEmail.set(key, []);
    byEmail.get(key).push(s);
  }

  console.log('Lecture Clerk (comptes + invitations en attente)…');
  const [clerkUsers, invitations] = await Promise.all([
    clerkGetAll('/users'),
    clerkGetAll('/invitations'),
  ]);

  const clerkByEmail = new Map();
  for (const u of clerkUsers) {
    for (const addr of u.email_addresses || []) {
      const e = String(addr.email_address || '').toLowerCase();
      if (e) clerkByEmail.set(e, u);
    }
  }
  const pendingByEmail = new Map();
  for (const inv of invitations) {
    const e = String(inv.email_address || '').toLowerCase();
    const status = String(inv.status || '').toLowerCase();
    if (e && (status === 'pending' || status === 'expired')) pendingByEmail.set(e, inv);
  }

  const invites = [];
  const alreadyAccount = [];
  const alreadyPending = [];

  for (const [email, members] of [...byEmail.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const children = members.map((m) => ({
      id: m.id,
      name: `${m.first_name || ''} ${m.last_name || ''}`.trim(),
      status: m.status,
      has2026: hasYear.has(m.id),
      clerk_user_id: m.clerk_user_id || null,
    }));
    const row = {
      email,
      baseEmail: baseEmail(email),
      children,
      childCount: children.length,
      has2026Count: children.filter((c) => c.has2026).length,
    };
    if (clerkByEmail.has(email)) {
      alreadyAccount.push({ ...row, clerkUserId: clerkByEmail.get(email).id });
    } else if (children.some((c) => c.clerk_user_id)) {
      alreadyAccount.push({ ...row, clerkUserId: children.find((c) => c.clerk_user_id)?.clerk_user_id, linkedInDbOnly: true });
    } else if (pendingByEmail.has(email) && pendingByEmail.get(email).status === 'pending') {
      alreadyPending.push(row);
    } else {
      invites.push(row);
    }
  }

  const plan = {
    timestamp: new Date().toISOString(),
    apply: APPLY,
    redirectUrl: `${APP_URL}/app/eleve`,
    note: [
      'Clerk = 1 compte par adresse e-mail.',
      'Une fratrie qui partage le même e-mail parent reçoit UNE invitation.',
      'Après connexion, l’espace élève affiche TOUS les enfants de cet e-mail (liaison automatique).',
      'On n’envoie PAS un mail par enfant si l’e-mail est identique : ça mélangerait ou échouerait chez Clerk.',
    ],
    counts: {
      eleves: pupils.length,
      emailsUniques: byEmail.size,
      aInviter: invites.length,
      dejaCompteClerk: alreadyAccount.length,
      invitationDejaEnAttente: alreadyPending.length,
      sansEmail: noEmail.length,
      emailInvalide: badEmail.length,
    },
    invites,
    alreadyAccount,
    alreadyPending,
    noEmail: noEmail.map((s) => `${s.first_name} ${s.last_name} (${s.id})`),
    badEmail: badEmail.map((s) => `${s.first_name} ${s.last_name} <${s.email}>`),
  };

  const outPath = path.resolve('scratch/clerk-invite-all-plan.json');
  fs.writeFileSync(outPath, JSON.stringify(plan, null, 2));

  console.log('\n======== PLAN INVITATIONS CLERK (PAS ENVOYÉ) ========');
  console.log(`Élèves (hors admin): ${pupils.length}`);
  console.log(`E-mails uniques: ${byEmail.size}`);
  console.log(`À INVITER: ${invites.length}`);
  console.log(`Déjà un compte Clerk: ${alreadyAccount.length}`);
  console.log(`Invitation déjà en attente: ${alreadyPending.length}`);
  console.log(`Sans e-mail: ${noEmail.length}`);
  console.log(`E-mail invalide: ${badEmail.length}`);
  console.log(`Lien: ${plan.redirectUrl}`);

  const families = invites.filter((i) => i.childCount > 1);
  console.log(`\nFratries (1 mail → ${families.reduce((n, f) => n + f.childCount, 0)} enfants, ${families.length} e-mails):`);
  families.slice(0, 15).forEach((f) => {
    console.log(`  ${f.email} → ${f.children.map((c) => c.name).join(' · ')}`);
  });
  if (families.length > 15) console.log(`  … +${families.length - 15} fratries`);

  if (noEmail.length) {
    console.log('\nSANS E-MAIL (pas d’invitation possible):');
    noEmail.forEach((s) => console.log(`  ${s.first_name} ${s.last_name}`));
  }
  if (badEmail.length) {
    console.log('\nE-MAIL INVALIDE:');
    badEmail.forEach((s) => console.log(`  ${s.first_name} ${s.last_name} <${s.email}>`));
  }

  console.log(`\nPlan écrit: ${outPath}`);

  if (!APPLY) {
    console.log('\nAucun e-mail envoyé. Pour envoyer: node scratch/prepare-clerk-invites-all.mjs --apply');
    return;
  }

  console.log('\nENVOI…');
  let ok = 0;
  let fail = 0;
  const errors = [];
  for (const row of invites) {
    try {
      const res = await fetch('https://api.clerk.com/v1/invitations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CLERK_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: row.email,
          public_metadata: { role: 'etudiant' },
          ignore_existing: true,
          redirect_url: `${APP_URL}/app/eleve`,
        }),
      });
      if (res.ok) ok++;
      else {
        const body = await res.text();
        if (/already exists|identifier_exists|already been invited/i.test(body)) ok++;
        else {
          fail++;
          errors.push({ email: row.email, status: res.status, body: body.slice(0, 200) });
        }
      }
    } catch (err) {
      fail++;
      errors.push({ email: row.email, error: err.message });
    }
    await new Promise((r) => setTimeout(r, 80));
  }
  console.log(`Envoyées: ${ok}  échecs: ${fail}`);
  if (errors.length) console.log(JSON.stringify(errors, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
