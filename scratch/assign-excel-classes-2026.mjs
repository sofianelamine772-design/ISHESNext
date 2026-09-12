import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });
globalThis.WebSocket = ws;

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  realtime: { transport: ws },
});

const YEAR = '2026-2027';

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
  return (raw || '').split(/[;,]/)[0].trim().toLowerCase();
}

function baseEmail(raw) {
  const first = firstEmail(raw);
  const parts = first.split('@');
  if (parts.length !== 2) return first;
  return `${parts[0].split('+')[0]}@${parts[1]}`;
}

function paidStatus(label) {
  const l = fold(label);
  if (l === 'paye' || l === 'payé') return 'paye';
  if (l.includes('partiel') || l.includes('solde')) return 'partiel';
  return 'impaye';
}

function mapExcelClass(label) {
  const t = fold(label);
  let jour = null;
  let periode = null;
  if (t.includes('mercredi')) {
    jour = 'mercredi';
    periode = 'après-midi';
  } else if (t.includes('samedi') && (t.includes('a-m') || t.includes('apres'))) {
    jour = 'samedi';
    periode = 'après-midi';
  } else if (t.includes('samedi')) {
    jour = 'samedi';
    periode = 'matin';
  } else if (t.includes('dimanche') && (t.includes('a-m') || t.includes('apres'))) {
    jour = 'dimanche';
    periode = 'après-midi';
  } else if (t.includes('dimanche')) {
    jour = 'dimanche';
    periode = 'matin';
  }

  let niveauKey = null;
  if (/femme/.test(t) && /inter/.test(t)) niveauKey = 'femme_intermediaire';
  else if (/femme/.test(t) && /debut/.test(t)) niveauKey = 'femme_debutante';
  else if (/preparatoire 2|prepa 2/.test(t)) niveauKey = 'maternel_2';
  else if (/preparatoire 1|prepa 1/.test(t)) niveauKey = 'maternel_1';
  else if (/elementaire debutant/.test(t)) niveauKey = 'elementaire_1';
  else if (/elementaire 1\+|elementaire 1 \+/.test(t)) niveauKey = 'elementaire_1_plus';
  else if (/elementaire 2\+|elementaire 2 \+|elementaire 2 et 2/.test(t)) niveauKey = 'elementaire_2_plus';
  else if (/elementaire 2/.test(t)) niveauKey = 'elementaire_2';
  else if (/elementaire 3/.test(t)) niveauKey = 'elementaire_3';
  else if (/elementaire 4/.test(t)) niveauKey = 'elementaire_4';

  const exact = {
    maternel_1: { mercredi: 1, 'samedi|matin': 2, 'samedi|après-midi': 3, 'dimanche|matin': 4 },
    maternel_2: { mercredi: 5, 'samedi|matin': 6, 'dimanche|matin': 7 },
    elementaire_1: { 'samedi|matin': 8, 'samedi|après-midi': 9, 'dimanche|matin': 10, 'dimanche|après-midi': 11 },
    elementaire_1_plus: { mercredi: 12, 'samedi|matin': 13, 'samedi|après-midi': 14, 'dimanche|matin': 15, 'dimanche|après-midi': 16 },
    elementaire_2: { mercredi: 17, 'samedi|matin': 19, 'dimanche|après-midi': 20 },
    elementaire_2_plus: { mercredi: 18, 'dimanche|après-midi': 21 },
    elementaire_3: { 'dimanche|après-midi': 22 },
    elementaire_4: { mercredi: 23 },
    femme_debutante: { 'dimanche|matin': 24 },
    femme_intermediaire: { 'samedi|matin': 25 },
  };

  const uniqueFallback = {
    elementaire_3: 22,
    elementaire_4: 23,
    femme_debutante: 24,
    femme_intermediaire: 25,
  };

  if (!niveauKey) return { externalId: null, note: 'niveau inconnu' };
  const table = exact[niveauKey] || {};
  const dayKey = jour === 'mercredi' ? 'mercredi' : `${jour}|${periode}`;
  if (table[dayKey]) return { externalId: table[dayKey], note: null };
  if (uniqueFallback[niveauKey]) {
    return {
      externalId: uniqueFallback[niveauKey],
      note: `créneau Excel « ${label} » n'existe plus en 2026-2027 → classe officielle n°${uniqueFallback[niveauKey]}`,
    };
  }
  return { externalId: null, note: `pas de créneau 2026-2027 pour ${niveauKey} / ${jour} ${periode}` };
}

async function main() {
  const recs = JSON.parse(fs.readFileSync('scratch/liste_etudiants_paiements2.json', 'utf8'));

  const { data: classes, error: cErr } = await supabase
    .from('classes')
    .select('id, name, external_id, formation_id, academic_year, is_active, type')
    .eq('type', 'presentiel')
    .eq('is_active', true)
    .eq('academic_year', YEAR)
    .gte('external_id', 1)
    .lte('external_id', 25);
  if (cErr) throw cErr;
  const classByExt = new Map((classes || []).map((c) => [c.external_id, c]));
  if (classByExt.size !== 25) {
    throw new Error(`Classes officielles incomplètes: ${[...classByExt.keys()].sort((a,b)=>a-b)}`);
  }

  const { data: students, error: sErr } = await supabase
    .from('etudiants')
    .select('id, first_name, last_name, email, status');
  if (sErr) throw sErr;

  const byKey = new Map();
  for (const s of students || []) {
    byKey.set(`${normName(s.first_name)}|${normName(s.last_name)}|${baseEmail(s.email)}`, s);
  }

  const { data: inscriptions, error: iErr } = await supabase
    .from('inscriptions')
    .select('id, etudiant_id, class_id, formation_id, academic_year, status, paid_status');
  if (iErr) throw iErr;
  const insByStudent = new Map();
  for (const ins of inscriptions || []) {
    if (!insByStudent.has(ins.etudiant_id)) insByStudent.set(ins.etudiant_id, []);
    insByStudent.get(ins.etudiant_id).push(ins);
  }

  const plan = [];
  const missingStudents = [];
  const unmatchedClass = [];
  const mappingNotes = [];

  for (const r of recs) {
    const mapped = mapExcelClass(r.classe);
    const student = byKey.get(`${normName(r.prenom)}|${normName(r.nom)}|${baseEmail(r.email)}`);
    if (!student) {
      missingStudents.push(`${r.prenom} ${r.nom} <${firstEmail(r.email)}>`);
      continue;
    }
    if (!mapped.externalId) {
      unmatchedClass.push({ student: `${student.first_name} ${student.last_name}`, excel: r.classe, note: mapped.note });
      continue;
    }
    if (mapped.note) mappingNotes.push({ student: `${student.first_name} ${student.last_name}`, excel: r.classe, note: mapped.note, n: mapped.externalId });
    const classe = classByExt.get(mapped.externalId);
    plan.push({
      student,
      excelClass: r.classe,
      externalId: mapped.externalId,
      classId: classe.id,
      formationId: classe.formation_id,
      className: classe.name,
      paid_status: paidStatus(r.paiement),
      note: mapped.note,
    });
  }

  console.log('À affecter:', plan.length);
  console.log('Élèves introuvables:', missingStudents.length);
  missingStudents.forEach((s) => console.log('  MISSING', s));
  console.log('Classe non mappable:', unmatchedClass.length);
  unmatchedClass.forEach((s) => console.log('  UNMAPPED', s));
  console.log('Recalés sur le créneau officiel du niveau:', mappingNotes.length);
  mappingNotes.forEach((s) => console.log('  NOTE', s.student, '→ n°' + s.n, '|', s.excel));

  const byClass = new Map();
  for (const p of plan) {
    if (!byClass.has(p.externalId)) byClass.set(p.externalId, []);
    byClass.get(p.externalId).push(`${p.student.first_name} ${p.student.last_name}`);
  }
  console.log('\nRépartition:');
  for (const [id, names] of [...byClass.entries()].sort((a, b) => a[0] - b[0])) {
    const c = classByExt.get(id);
    console.log(`  n°${id} (${names.length}) ${c.name}`);
  }

  const createdIns = [];
  const updatedIns = [];
  const failed = [];

  for (const p of plan) {
    const existing = (insByStudent.get(p.student.id) || []).find((i) => i.academic_year === YEAR);
    const payload = {
      class_id: p.classId,
      formation_id: p.formationId,
      status: 'actif',
      paid_status: p.paid_status,
      academic_year: YEAR,
    };
    if (existing) {
      const { error } = await supabase.from('inscriptions').update(payload).eq('id', existing.id);
      if (error) failed.push({ who: `${p.student.first_name} ${p.student.last_name}`, error: error.message, op: 'update' });
      else updatedIns.push(existing.id);
    } else {
      const { data, error } = await supabase.from('inscriptions').insert({
        etudiant_id: p.student.id,
        ...payload,
      }).select('id').single();
      if (error) failed.push({ who: `${p.student.first_name} ${p.student.last_name}`, error: error.message, op: 'insert' });
      else createdIns.push(data.id);
    }
  }

  const statePath = path.resolve('scratch/manual_class_assign_2026_state.json');
  fs.writeFileSync(statePath, JSON.stringify({
    timestamp: new Date().toISOString(),
    createdInscriptionIds: createdIns,
    updatedInscriptionIds: updatedIns,
    unmatchedClass,
    mappingNotes,
    failed,
  }, null, 2));

  console.log(`\nInscriptions créées: ${createdIns.length}`);
  console.log(`Inscriptions mises à jour: ${updatedIns.length}`);
  console.log(`Échecs: ${failed.length}`);
  if (failed.length) console.log(JSON.stringify(failed, null, 2));
  console.log('État rollback:', statePath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
