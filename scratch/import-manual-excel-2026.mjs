import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

dotenv.config({ path: '.env.local' });
globalThis.WebSocket = ws;

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  realtime: { transport: ws },
});

function norm(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function firstEmail(raw) {
  return (raw || '').split(/[;,]/)[0].trim().toLowerCase();
}

function baseEmail(raw) {
  const first = firstEmail(raw);
  const parts = first.split('@');
  if (parts.length !== 2) return first;
  return `${parts[0].split('+')[0]}@${parts[1]}`;
}

function firstPhone(raw) {
  return ((raw || '').split('/')[0].trim()) || '';
}

function isPaid(label) {
  const l = (label || '').toLowerCase();
  return l === 'payé' || l === 'paye';
}

async function main() {
  const recs = JSON.parse(fs.readFileSync('/tmp/liste_etudiants.json', 'utf8'));

  const { data: etudiants, error: eErr } = await supabase.from('etudiants').select('*');
  if (eErr) throw eErr;
  const { data: inscriptions, error: iErr } = await supabase.from('inscriptions').select('*');
  if (iErr) throw iErr;
  const { data: paiements, error: pErr } = await supabase.from('paiements').select('*');
  if (pErr) throw pErr;

  const backupPath = path.resolve('scratch/backup_before_manual_excel_2026.json');
  fs.writeFileSync(backupPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    etudiants,
    inscriptions,
    paiements,
  }, null, 2));
  console.log(`Backup: ${etudiants.length} élèves, ${inscriptions.length} inscriptions, ${paiements.length} paiements → ${backupPath}`);

  const existingKeys = new Set(
    (etudiants || []).map((s) => `${norm(s.first_name)}|${norm(s.last_name)}|${baseEmail(s.email)}`)
  );

  const skipped = [];
  const created = [];
  const failed = [];
  const clerkEmails = new Set();

  for (const r of recs) {
    const email = firstEmail(r.email);
    const key = `${norm(r.prenom)}|${norm(r.nom)}|${baseEmail(email)}`;
    if (existingKeys.has(key)) {
      skipped.push(`${r.prenom} ${r.nom} <${email}>`);
      continue;
    }
    existingKeys.add(key);

    const studentId = `manual_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
    const payload = {
      id: studentId,
      first_name: r.prenom,
      last_name: r.nom,
      email,
      phone: firstPhone(r.tel),
      status: isPaid(r.paiement) ? 'actif' : 'en_attente',
      role: 'eleve',
    };

    let { data, error } = await supabase.from('etudiants').insert(payload).select().single();
    if (error && /duplicate|unique/i.test(`${error.message} ${error.code}`)) {
      const [local, domain] = email.split('@');
      payload.email = `${local.split('+')[0]}+${norm(r.prenom).replace(/\s+/g, '.') }@${domain}`;
      ({ data, error } = await supabase.from('etudiants').insert(payload).select().single());
    }
    if (error) {
      failed.push({ name: `${r.prenom} ${r.nom}`, error: error.message });
      continue;
    }
    created.push(data);
    clerkEmails.add(data.email);
    await new Promise((resolve) => setTimeout(resolve, 5));
  }

  const statePath = path.resolve('scratch/manual_import_2026_state.json');
  fs.writeFileSync(statePath, JSON.stringify({
    timestamp: new Date().toISOString(),
    createdStudentIds: created.map((s) => s.id),
    created: created.map((s) => ({ id: s.id, first_name: s.first_name, last_name: s.last_name, email: s.email, status: s.status })),
    skipped,
    failed,
  }, null, 2));

  console.log(`Créés: ${created.length}`);
  console.log(`Déjà en base (ignorés): ${skipped.length}`);
  skipped.forEach((s) => console.log('  skip', s));
  console.log(`Échecs: ${failed.length}`);
  if (failed.length) console.log(JSON.stringify(failed, null, 2));

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ishees.vercel.app';
  const clerkKey = process.env.CLERK_SECRET_KEY;
  let clerkOk = 0;
  let clerkFail = 0;
  if (!clerkKey) {
    console.log('CLERK_SECRET_KEY manquante: invitations non envoyées');
  } else {
    for (const email of clerkEmails) {
      try {
        const res = await fetch('https://api.clerk.com/v1/invitations', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${clerkKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: email,
            public_metadata: { role: 'etudiant' },
            ignore_existing: true,
            redirect_url: `${appUrl}/app/eleve`,
          }),
        });
        if (!res.ok) {
          const body = await res.text();
          clerkFail++;
          if (!/already exists|identifier_exists|already been invited/i.test(body)) {
            console.log('Clerk invite fail', email, res.status, body.slice(0, 200));
          }
        } else {
          clerkOk++;
        }
      } catch (err) {
        clerkFail++;
        console.log('Clerk invite fail', email, err.message);
      }
    }
  }
  console.log(`Invitations Clerk: ${clerkOk} ok / ${clerkFail} ignorées ou en erreur`);
  console.log(`Rollback: node scratch/rollback-manual-excel-2026.mjs`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
