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

const statePath = path.resolve('scratch/manual_import_2026_state.json');

async function rollback() {
  if (!fs.existsSync(statePath)) {
    console.error('Aucun fichier de rollback:', statePath);
    process.exit(1);
  }
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const ids = state.createdStudentIds || [];
  if (ids.length === 0) {
    console.log('Rien à supprimer.');
    return;
  }

  console.log(`Rollback de ${ids.length} élèves importés...`);
  const { error: pErr } = await supabase.from('paiements').delete().in('etudiant_id', ids);
  if (pErr) console.error('paiements', pErr.message);
  const { error: iErr } = await supabase.from('inscriptions').delete().in('etudiant_id', ids);
  if (iErr) console.error('inscriptions', iErr.message);
  const { error: eErr } = await supabase.from('etudiants').delete().in('id', ids);
  if (eErr) {
    console.error('etudiants', eErr.message);
    process.exit(1);
  }
  console.log('Rollback terminé. Les élèves importés ont été supprimés.');
}

rollback().catch((err) => {
  console.error(err);
  process.exit(1);
});
