import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });
globalThis.WebSocket = ws;

const APPLY = process.argv.includes('--apply');
const YEAR = '2026-2027';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: ws },
});

function fold(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/œ/g, 'oe');
}
function normName(s) {
  return fold(s).replace(/[^a-z0-9]+/g, ' ').trim();
}
function firstEmail(raw) {
  const m = String(raw || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return m ? m[0].toLowerCase() : '';
}
function baseEmail(raw) {
  const first = firstEmail(raw);
  const parts = first.split('@');
  if (parts.length !== 2) return first;
  return `${parts[0].split('+')[0]}@${parts[1]}`;
}
function nameKey(prenom, nom) {
  return `${normName(prenom)}|${normName(nom)}`;
}

async function main() {
  const { recs } = JSON.parse(fs.readFileSync(path.resolve('scratch/myscol3_parsed.json'), 'utf8'));

  const { data: classes, error: cErr } = await supabase
    .from('classes')
    .select('id, name, external_id, academic_year, is_active, type')
    .eq('type', 'presentiel')
    .eq('is_active', true)
    .eq('academic_year', YEAR)
    .gte('external_id', 1)
    .lte('external_id', 25);
  if (cErr) throw cErr;
  const classById = new Map((classes || []).map((c) => [c.id, c]));
  const officialIds = new Set((classes || []).map((c) => c.id));
  console.log(`Classes officielles 2026-2027 déjà créées: ${officialIds.size} (aucune nouvelle classe ne sera créée)`);

  const { data: students, error: sErr } = await supabase
    .from('etudiants')
    .select('id, first_name, last_name, email, status');
  if (sErr) throw sErr;

  const { data: inscriptions, error: iErr } = await supabase
    .from('inscriptions')
    .select('id, etudiant_id, class_id, formation_id, academic_year, status, paid_status');
  if (iErr) throw iErr;

  const insByStudent = new Map();
  for (const ins of inscriptions || []) {
    if (!insByStudent.has(ins.etudiant_id)) insByStudent.set(ins.etudiant_id, []);
    insByStudent.get(ins.etudiant_id).push(ins);
  }

  const byName = new Map();
  const byNameEmail = new Map();
  for (const s of students || []) {
    const nk = nameKey(s.first_name, s.last_name);
    if (!byName.has(nk)) byName.set(nk, []);
    byName.get(nk).push(s);
    byNameEmail.set(`${nk}|${baseEmail(s.email)}`, s);
  }

  function findStudent(r) {
    const pn = normName(r.prenom);
    const ln = normName(r.nom);
    if (!pn || !ln) return null;
    const nk = nameKey(r.prenom, r.nom);
    const exact = byNameEmail.get(`${nk}|${baseEmail(r.email)}`);
    if (exact) return exact;
    const sameName = byName.get(nk) || [];
    if (sameName.length === 1) return sameName[0];
    const fuzzy = [...byName.entries()].filter(([k]) => {
      const [p, n] = k.split('|');
      if (!p || !n || p !== pn) return false;
      return n === ln || n.includes(ln) || ln.includes(n);
    });
    if (fuzzy.length === 1 && fuzzy[0][1].length === 1) return fuzzy[0][1][0];
    return null;
  }

  const noStudent = [];
  const noClass = [];
  const wrongClass = [];
  const hiddenInClass = [];
  const toActivate = [];
  const toMarkPaid = [];
  const alreadyOk = [];
  const visibleByClass = new Map();

  for (const r of recs) {
    const student = findStudent(r);
    if (!student) {
      noStudent.push(`${r.prenom} ${r.nom}`);
      continue;
    }
    const insAll = insByStudent.get(student.id) || [];
    const ins = insAll.find((i) => i.academic_year === YEAR) || insAll[0];
    if (!ins || !ins.class_id) {
      noClass.push(`${student.first_name} ${student.last_name}`);
      continue;
    }
    const classe = classById.get(ins.class_id);
    if (!classe || !officialIds.has(ins.class_id)) {
      wrongClass.push(`${student.first_name} ${student.last_name} class=${ins.class_id}`);
      continue;
    }

    const wouldShow = ins.status !== 'en_attente' && student.status !== 'en_attente';
    if (!wouldShow) hiddenInClass.push({ student, ins, classe, r });

    if (student.status !== 'actif' || ins.status !== 'actif') {
      toActivate.push({ student, ins });
    }
    if (r.fiabilite === 'payer' && ins.paid_status !== 'paye') {
      toMarkPaid.push({ student, ins, r });
    }
    if (wouldShow) {
      if (!visibleByClass.has(classe.external_id)) visibleByClass.set(classe.external_id, []);
      visibleByClass.get(classe.external_id).push(`${student.first_name} ${student.last_name}`);
    }
    alreadyOk.push(student.id);
  }

  const payerCount = recs.filter((r) => r.fiabilite === 'payer').length;

  console.log('\n======== VISIBILITÉ / PAIEMENT PDF ========');
  console.log(`Élèves PDF: ${recs.length}`);
  console.log(`Introuvables: ${noStudent.length}`);
  console.log(`SANS CLASSE: ${noClass.length}`);
  console.log(`Classe hors catalogue 1-25: ${wrongClass.length}`);
  console.log(`Cachés dans la fiche classe (statut en_attente): ${hiddenInClass.length}`);
  console.log(`À activer (pour qu'ils apparaissent): ${toActivate.length}`);
  console.log(`PDF « payer » à marquer payé: ${toMarkPaid.length} / ${payerCount} marqués payer`);
  console.log(`Actuellement visibles dans une classe officielle: ${[...visibleByClass.values()].reduce((n, a) => n + a.length, 0)}`);

  if (noStudent.length) noStudent.forEach((s) => console.log('  MANQUANT', s));
  if (noClass.length) {
    console.log('\nÉLÈVES SANS CLASSE:');
    noClass.forEach((s) => console.log(' ', s));
  }
  if (wrongClass.length) wrongClass.forEach((s) => console.log('  HORS CATALOGUE', s));
  if (hiddenInClass.length) {
    console.log('\nCACHÉS (en_attente) — ne s’affichent pas dans Admin → Classes:');
    hiddenInClass.forEach(({ student, classe }) => {
      console.log(`  ${student.first_name} ${student.last_name} — ${classe.name} (élève=${student.status})`);
    });
  }
  if (toMarkPaid.length) {
    console.log('\nÀ MARQUER PAYÉ (case payer du PDF):');
    toMarkPaid.forEach(({ student }) => console.log(`  ${student.first_name} ${student.last_name}`));
  }

  if (!APPLY) {
    console.log('\nDry-run. Relancer avec --apply.');
    return;
  }

  const studentIdsActivate = [...new Set(toActivate.map((x) => x.student.id))];
  const insIdsActivate = [...new Set(toActivate.map((x) => x.ins.id))];
  const insIdsPaid = [...new Set(toMarkPaid.map((x) => x.ins.id))];
  const studentIdsPaid = [...new Set(toMarkPaid.map((x) => x.student.id))];

  if (studentIdsActivate.length) {
    const { error } = await supabase.from('etudiants').update({ status: 'actif' }).in('id', studentIdsActivate);
    if (error) throw error;
  }
  if (insIdsActivate.length) {
    const { error } = await supabase.from('inscriptions').update({ status: 'actif' }).in('id', insIdsActivate);
    if (error) throw error;
  }
  if (insIdsPaid.length) {
    const { error } = await supabase.from('inscriptions').update({ paid_status: 'paye', status: 'actif' }).in('id', insIdsPaid);
    if (error) throw error;
  }
  if (studentIdsPaid.length) {
    const { error } = await supabase.from('etudiants').update({ status: 'actif' }).in('id', studentIdsPaid);
    if (error) throw error;
  }

  console.log(`\nActivés (visibles en classe): ${studentIdsActivate.length} élèves / ${insIdsActivate.length} inscriptions`);
  console.log(`Marqués payés (PDF payer): ${studentIdsPaid.length}`);
  console.log('Aucune classe créée.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
