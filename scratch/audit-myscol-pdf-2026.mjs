import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

dotenv.config({ path: '.env.local' });
globalThis.WebSocket = ws;

const APPLY = process.argv.includes('--apply');
const YEAR = '2026-2027';

console.log('Connexion Supabase…');
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

function firstPhone(raw) {
  const m = String(raw || '').match(/(?:\+33\s*|0)[1-9](?:[\s.]?\d{2}){4}/);
  if (m) return m[0].replace(/\s+/g, ' ').trim();
  const loose = String(raw || '').match(/6\d{8,}/);
  return loose ? loose[0] : '';
}

function paidStatus(label) {
  const l = fold(label);
  if (l.includes('payer') || l.includes('paye')) return 'paye';
  return 'impaye';
}

function studentStatus(label) {
  const l = fold(label);
  if (l.includes('payer') || l.includes('paye')) return 'actif';
  return 'en_attente';
}

function mapPdfClass(label) {
  const t = fold(label).replace(/niveaut/g, 'niveau');

  let jour = null;
  let periode = null;
  if (t.includes('mercredi')) {
    jour = 'mercredi';
    periode = 'apres-midi';
  } else if (t.includes('samedi') && (t.includes('a-m') || t.includes('apres'))) {
    jour = 'samedi';
    periode = 'apres-midi';
  } else if (t.includes('samedi')) {
    jour = 'samedi';
    periode = 'matin';
  } else if (t.includes('dimanche') && (t.includes('a-m') || t.includes('apres'))) {
    jour = 'dimanche';
    periode = 'apres-midi';
  } else if (t.includes('dimanche')) {
    jour = 'dimanche';
    periode = 'matin';
  }

  const dayKey = jour === 'mercredi' ? 'mercredi' : `${jour}|${periode}`;

  if (/femme/.test(t) && /inter/.test(t)) {
    return {
      externalId: 25,
      exact: dayKey === 'samedi|matin',
      note: dayKey === 'samedi|matin' ? null : `femme intermédiaire « ${label} » → n°25 samedi matin`,
    };
  }
  if (/femme/.test(t)) {
    return {
      externalId: 24,
      exact: dayKey === 'dimanche|matin',
      note: dayKey === 'dimanche|matin' ? null : `femme débutante « ${label} » → n°24 dimanche matin (seul créneau débutante 2026-2027)`,
    };
  }

  const tables = {
    prepa1: { mercredi: 1, 'samedi|matin': 2, 'samedi|apres-midi': 3, 'dimanche|matin': 4 },
    prepa2: { mercredi: 5, 'samedi|matin': 6, 'dimanche|matin': 7 },
    deb1: { 'samedi|matin': 8, 'samedi|apres-midi': 9, 'dimanche|matin': 10, 'dimanche|apres-midi': 11 },
    elem1p: { mercredi: 12, 'samedi|matin': 13, 'samedi|apres-midi': 14, 'dimanche|matin': 15, 'dimanche|apres-midi': 16 },
    elem2: { mercredi: 17, 'samedi|matin': 19, 'dimanche|apres-midi': 20 },
    elem2p: { mercredi: 18, 'dimanche|apres-midi': 21 },
    elem3: { 'dimanche|apres-midi': 22 },
    elem4: { mercredi: 23 },
  };
  const fallback = {
    deb1: 8,
    elem3: 22,
    elem4: 23,
  };

  let key = null;
  if (/preparatoire\s*2/.test(t)) key = 'prepa2';
  else if (/preparatoire\s*1/.test(t)) key = 'prepa1';
  else if (/debutant/.test(t)) key = 'deb1';
  else if (/elementaire\s*(niveau\s*)?4/.test(t)) key = 'elem4';
  else if (/elementaire\s*(niveau\s*)?3/.test(t)) key = 'elem3';
  else if (/elementaire\s*(niveau\s*)?2\+/.test(t)) key = 'elem2p';
  else if (/elementaire\s*(niveau\s*)?2/.test(t)) key = 'elem2';
  else if (/elementaire\s*(niveaut?\s*)?1\+/.test(t)) key = 'elem1p';

  if (!key) return { externalId: null, note: `niveau inconnu: ${label}` };

  const exactId = tables[key]?.[dayKey];
  if (exactId) return { externalId: exactId, exact: true, note: null };
  if (fallback[key]) {
    return {
      externalId: fallback[key],
      exact: false,
      note: `créneau PDF « ${label} » n'existe pas en 2026-2027 → n°${fallback[key]}`,
    };
  }
  return { externalId: null, note: `pas de créneau 2026-2027 pour ${key} / ${dayKey}` };
}

const NAME_FIXES = {
  'so ane': 'sofiane',
  'soane': 'sofiane',
};

function titleCase(s) {
  return (s || '')
    .split(/(\s+|-)/)
    .map((w) => {
      if (!w || w === ' ' || w === '-') return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join('');
}

function splitNames(left) {
  const parts = left.replace(/\s+/g, ' ').trim().split(' ');
  if (parts.length < 2) return { nom: left.trim(), prenom: '' };
  if (parts.length === 2) return { nom: parts[0], prenom: parts[1] };

  const multiLast = [
    'lakhloufi el boutaybib',
    'mansour el rouby',
    'yahia cherif',
    'el bechari',
    'el boutaybi',
    'saint felix',
    'nair benrokia',
    'ousset lakbaidi',
    'habib araita',
    'isse alwan',
    'si ahmed',
    'master youssouf',
    'chaulliac riallant',
    'el jari',
    'bou oudi',
  ];
  const folded = normName(left);
  for (const last of multiLast) {
    if (folded.startsWith(last + ' ')) {
      const nParts = last.split(' ').length;
      return { nom: parts.slice(0, nParts).join(' '), prenom: parts.slice(nParts).join(' ') };
    }
  }
  return { nom: parts[0], prenom: parts.slice(1).join(' ') };
}

function parsePdf() {
  const raw = fs.readFileSync(path.resolve('scratch/inscrit_myscol_3.txt'), 'utf8');
  const lines = raw.split('\n');
  const classRe = /(Préparatoire|Élémentaire|Elementaire|Femme|FEMME)\b.+$/i;
  const students = [];
  let pendingClass = null;
  let pendingLastName = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || /^fi+$/i.test(trimmed) || /Nom de l/i.test(trimmed) || /Prénom de/i.test(trimmed)) continue;
    if (/^l’élève$/i.test(trimmed) || /^l'eleve$/i.test(trimmed)) continue;

    const email = firstEmail(line);
    const classMatch = trimmed.match(classRe);
    let classLabel = classMatch ? classMatch[0].replace(/\s{2,}.*$/, (chunk) => {
      if (/@/.test(chunk) || /\+33/.test(chunk) || /20\d{2}-/.test(chunk) || /payer|ver/i.test(chunk)) return '';
      return chunk;
    }).replace(/\s+/g, ' ').trim() : null;

    if (classLabel) {
      classLabel = classLabel
        .replace(/\s+\+33.*$/i, '')
        .replace(/\s+0\d[\d\s/]+.*$/i, '')
        .replace(/\s+[A-Z0-9._%+-]+@.*$/i, '')
        .replace(/\s+20\d{2}-.*$/i, '')
        .replace(/\s+a\s+ver.*$/i, '')
        .replace(/\s+payer.*$/i, '')
        .replace(/\s+604535321.*$/i, '')
        .trim();
    }

    if (!email && classLabel && !/\b(MERCREDI|SAMEDI|DIMANCHE|matin)\b/i.test(line) === false && trimmed.match(/^[A-Za-zÀ-ÿ' -]+$/)) {
      pendingClass = classLabel;
      continue;
    }

    if (!email && classLabel && !firstEmail(line) && !/\d{2}/.test(line) && classLabel === trimmed) {
      pendingClass = classLabel;
      continue;
    }

    if (!email && classLabel && !/[A-Z0-9._%+-]+@/i.test(line) && /Préparatoire 1ère année \(4-6 ans\) SAMEDI MATIN/.test(trimmed) && !/Makrini/i.test(trimmed)) {
      pendingClass = classLabel;
      continue;
    }

    let left = trimmed;
    if (classMatch) left = trimmed.slice(0, classMatch.index).trim();
    else if (email) left = trimmed.slice(0, trimmed.toLowerCase().indexOf(email)).trim();

    left = left
      .replace(/\+33[\d\s/]+/g, '')
      .replace(/\b0\d(?:[\s.]?\d{2}){4}\b/g, '')
      .replace(/\b6\d{8,}\b/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!left && pendingClass) continue;
    if (!classLabel && pendingClass) {
      classLabel = pendingClass;
      pendingClass = null;
    }
    if (!left || (!classLabel && !email)) {
      if (left && !email && !classLabel && /^[A-Za-zÀ-ÿ' -]+$/.test(left)) {
        pendingLastName = left;
      }
      continue;
    }
    if (/^Préparatoire|^Élémentaire|^Femme|^FEMME/i.test(left) && !email) {
      pendingClass = classLabel || left;
      continue;
    }

    const names = splitNames(left);
    if (pendingLastName && !names.prenom) {
      names.prenom = names.nom;
      names.nom = pendingLastName;
      pendingLastName = null;
    } else if (pendingLastName) {
      pendingLastName = null;
    }
    if (NAME_FIXES[normName(names.prenom)]) names.prenom = NAME_FIXES[normName(names.prenom)];
    if (normName(names.prenom) === 'mohamed adam') names.prenom = 'Mohamed-Adam';
    if (normName(names.prenom) === 'sakina maryam') names.prenom = 'Sakina-Maryam';
    if (normName(names.prenom) === 'sarah kjhadij') names.prenom = 'Sarah Kjhadij';

    const fiab = /payer/i.test(line) ? 'payer' : /veri/i.test(line) ? 'a verifier' : '';

    students.push({
      nom: names.nom,
      prenom: names.prenom,
      classe: classLabel,
      email,
      phone: firstPhone(line),
      fiabilite: fiab,
      raw: trimmed,
    });
  }
  return students;
}

function nameKey(prenom, nom) {
  return `${normName(prenom)}|${normName(nom)}`;
}

async function main() {
  const parsed = parsePdf();
  const seenNames = new Set();
  const recs = [];
  const duplicates = [];
  for (const r of parsed) {
    const k = nameKey(r.prenom, r.nom);
    if (seenNames.has(k)) {
      duplicates.push(r);
      continue;
    }
    seenNames.add(k);
    recs.push(r);
  }

  console.log(`PDF parsés: ${parsed.length} lignes, ${recs.length} élèves uniques, ${duplicates.length} doublons ignorés`);
  duplicates.forEach((d) => console.log('  doublon', d.prenom, d.nom, d.email));

  const unmapped = recs.filter((r) => !mapPdfClass(r.classe).externalId);
  if (unmapped.length) {
    console.log('\nNON MAPPÉS:');
    unmapped.forEach((r) => console.log(' ', r.prenom, r.nom, '|', r.classe, '|', mapPdfClass(r.classe).note));
  }

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
  const classById = new Map((classes || []).map((c) => [c.id, c]));
  if (classByExt.size !== 25) {
    throw new Error(`Classes officielles incomplètes: ${[...classByExt.keys()].sort((a, b) => a - b)}`);
  }

  const { data: students, error: sErr } = await supabase
    .from('etudiants')
    .select('id, first_name, last_name, email, phone, status');
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
    if (sameName.length > 1 && r.email) {
      const byMail = sameName.find((s) => baseEmail(s.email) === baseEmail(r.email));
      if (byMail) return byMail;
    }
    const fuzzy = [...byName.entries()].filter(([k]) => {
      const [p, n] = k.split('|');
      if (!p || !n || p !== pn) return false;
      return n === ln || n.includes(ln) || ln.includes(n);
    });
    if (fuzzy.length === 1 && fuzzy[0][1].length === 1) return fuzzy[0][1][0];
    return null;
  }

  const ok = [];
  const wrongClass = [];
  const missingIns = [];
  const missingStudents = [];
  const wrongYear = [];
  const inexact = [];
  const notManual = [];

  for (const r of recs) {
    const mapped = mapPdfClass(r.classe);
    const student = findStudent(r);
    const classe = mapped.externalId ? classByExt.get(mapped.externalId) : null;
    if (mapped.note) inexact.push({ r, mapped, classe });
    if (!student) {
      missingStudents.push({ r, mapped, classe });
      continue;
    }
    if (!String(student.id).startsWith('manual_')) notManual.push(student);
    if (!classe) continue;
    const insAll = insByStudent.get(student.id) || [];
    const insYear = insAll.filter((i) => i.academic_year === YEAR);
    const insOtherYear = insAll.filter((i) => i.academic_year && i.academic_year !== YEAR);
    if (insOtherYear.length) wrongYear.push({ student, insOtherYear, r });
    const current = insYear[0] || insAll[0];
    if (!current) {
      missingIns.push({ student, r, mapped, classe });
      continue;
    }
    const currentClass = classById.get(current.class_id);
    const currentExt = currentClass?.external_id ?? null;
    if (current.academic_year !== YEAR || currentExt !== mapped.externalId) {
      wrongClass.push({ student, r, mapped, classe, current, currentExt, currentYear: current.academic_year, currentName: currentClass?.name });
    } else {
      ok.push({ student, r, classe });
    }
  }

  console.log('\n======== AUDIT PDF MyScol 2026-2027 ========');
  console.log(`OK (bonne classe + ${YEAR}): ${ok.length}`);
  console.log(`Mauvaise classe / année: ${wrongClass.length}`);
  console.log(`Élève en base sans inscription: ${missingIns.length}`);
  console.log(`Élève du PDF absent de la base: ${missingStudents.length}`);
  console.log(`Inscriptions sur une autre année: ${wrongYear.length}`);
  console.log(`Créneau PDF recalé (créneau officiel unique): ${inexact.length}`);
  console.log(`Déjà en base mais PAS saisie manuelle: ${notManual.length}`);

  if (notManual.length) {
    console.log('\nNON MANUEL:');
    notManual.forEach((s) => console.log(`  ${s.first_name} ${s.last_name} id=${s.id}`));
  }
  if (missingStudents.length) {
    console.log('\nÀ CRÉER (saisie manuelle):');
    missingStudents.forEach(({ r, mapped }) => console.log(`  ${r.prenom} ${r.nom} <${r.email}> → n°${mapped.externalId} | ${r.classe}`));
  }
  if (missingIns.length) {
    console.log('\nSANS INSCRIPTION:');
    missingIns.forEach(({ student, mapped }) => console.log(`  ${student.first_name} ${student.last_name} → n°${mapped.externalId}`));
  }
  if (wrongClass.length) {
    console.log('\nÀ CORRIGER:');
    wrongClass.forEach((w) => {
      console.log(`  ${w.student.first_name} ${w.student.last_name}: n°${w.currentExt ?? '?'} (${w.currentYear}) ${w.currentName || ''} → n°${w.mapped.externalId} ${w.classe.name}`);
    });
  }
  if (inexact.length) {
    console.log('\nNOTES CRÉNEAU:');
    inexact.forEach(({ r, mapped }) => console.log(`  ${r.prenom} ${r.nom}: ${mapped.note}`));
  }

  const byClass = new Map();
  for (const r of recs) {
    const id = mapPdfClass(r.classe).externalId;
    if (!byClass.has(id)) byClass.set(id, []);
    byClass.get(id).push(`${r.prenom} ${r.nom}`);
  }
  console.log('\nRépartition PDF:');
  for (const [id, names] of [...byClass.entries()].sort((a, b) => (a[0] || 99) - (b[0] || 99))) {
    const c = classByExt.get(id);
    console.log(`  n°${id} (${names.length}) ${c?.name || '??'}`);
  }

  fs.writeFileSync(path.resolve('scratch/myscol3_parsed.json'), JSON.stringify({ recs, duplicates }, null, 2));

  if (!APPLY) {
    console.log('\nDry-run seulement. Relancer avec --apply pour corriger.');
    return;
  }

  const backupPath = path.resolve('scratch/backup_before_myscol3_fix.json');
  fs.writeFileSync(backupPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    etudiants: students,
    inscriptions,
  }, null, 2));
  console.log(`\nBackup → ${backupPath}`);

  const createdStudents = [];
  const createdIns = [];
  const updatedIns = [];
  const failed = [];
  const clerkEmails = new Set();

  async function ensureInscription(student, classe, r, mapped) {
    const insAll = insByStudent.get(student.id) || [];
    const existing = insAll.find((i) => i.academic_year === YEAR) || insAll[0];
    const payload = {
      class_id: classe.id,
      formation_id: classe.formation_id,
      status: 'actif',
      academic_year: YEAR,
    };
    if (!existing) payload.paid_status = paidStatus(r.fiabilite);
    if (existing) {
      const { error } = await supabase.from('inscriptions').update(payload).eq('id', existing.id);
      if (error) failed.push({ who: `${student.first_name} ${student.last_name}`, error: error.message, op: 'update' });
      else {
        updatedIns.push(existing.id);
        Object.assign(existing, payload);
      }
    } else {
      const { data, error } = await supabase.from('inscriptions').insert({
        etudiant_id: student.id,
        ...payload,
      }).select('id').single();
      if (error) failed.push({ who: `${student.first_name} ${student.last_name}`, error: error.message, op: 'insert' });
      else {
        createdIns.push(data.id);
        const list = insByStudent.get(student.id) || [];
        list.push({ id: data.id, etudiant_id: student.id, ...payload });
        insByStudent.set(student.id, list);
      }
    }
  }

  for (const { student, r, mapped, classe } of [...wrongClass, ...missingIns]) {
    await ensureInscription(student, classe, r, mapped);
  }

  for (const { r, mapped, classe } of missingStudents) {
    if (!classe) {
      failed.push({ who: `${r.prenom} ${r.nom}`, error: 'classe non mappable', op: 'create' });
      continue;
    }
    const studentId = `manual_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
    const payload = {
      id: studentId,
      first_name: titleCase(r.prenom),
      last_name: titleCase(r.nom),
      email: r.email,
      phone: r.phone || '',
      status: studentStatus(r.fiabilite),
      role: 'eleve',
    };
    let { data, error } = await supabase.from('etudiants').insert(payload).select().single();
    if (error && /duplicate|unique/i.test(`${error.message} ${error.code}`)) {
      const [local, domain] = r.email.split('@');
      payload.email = `${local.split('+')[0]}+${normName(r.prenom).replace(/\s+/g, '.')}@${domain}`;
      ({ data, error } = await supabase.from('etudiants').insert(payload).select().single());
    }
    if (error) {
      failed.push({ who: `${r.prenom} ${r.nom}`, error: error.message, op: 'create-student' });
      continue;
    }
    createdStudents.push(data);
    clerkEmails.add(data.email);
    byName.set(nameKey(data.first_name, data.last_name), [data]);
    await ensureInscription(data, classe, r, mapped);
    await new Promise((resolve) => setTimeout(resolve, 5));
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ishees.vercel.app';
  const clerkKey = process.env.CLERK_SECRET_KEY;
  let clerkOk = 0;
  let clerkFail = 0;
  const existingEmails = new Set((students || []).map((s) => baseEmail(s.email)));
  if (clerkKey) {
    for (const email of clerkEmails) {
      if (existingEmails.has(baseEmail(email))) continue;
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
        if (res.ok) clerkOk++;
        else clerkFail++;
      } catch {
        clerkFail++;
      }
    }
  }

  const statePath = path.resolve('scratch/myscol3_fix_state.json');
  fs.writeFileSync(statePath, JSON.stringify({
    timestamp: new Date().toISOString(),
    createdStudentIds: createdStudents.map((s) => s.id),
    createdInscriptionIds: createdIns,
    updatedInscriptionIds: updatedIns,
    failed,
    clerkOk,
    clerkFail,
  }, null, 2));

  console.log(`\nCréés (manuel): ${createdStudents.length}`);
  createdStudents.forEach((s) => console.log(`  ${s.first_name} ${s.last_name} ${s.id}`));
  console.log(`Inscriptions créées: ${createdIns.length}`);
  console.log(`Inscriptions corrigées: ${updatedIns.length}`);
  console.log(`Échecs: ${failed.length}`);
  if (failed.length) console.log(JSON.stringify(failed, null, 2));
  console.log(`Clerk (nouveaux emails seulement): ${clerkOk} ok / ${clerkFail} ignorées`);
  console.log('État:', statePath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
