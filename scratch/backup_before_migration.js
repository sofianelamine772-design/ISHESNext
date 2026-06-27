require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function backup() {
  console.log('=== BACKUP STARTED ===');
  
  const { data: etudiants } = await supabaseAdmin.from('etudiants').select('*');
  const { data: inscriptions } = await supabaseAdmin.from('inscriptions').select('*');
  const { data: paiements } = await supabaseAdmin.from('paiements').select('*');
  
  const backup = {
    timestamp: new Date().toISOString(),
    etudiants: etudiants || [],
    inscriptions: inscriptions || [],
    paiements: paiements || []
  };
  
  fs.writeFileSync('./scratch/backup_before_migration.json', JSON.stringify(backup, null, 2));
  
  console.log(`Backed up ${backup.etudiants.length} etudiants`);
  console.log(`Backed up ${backup.inscriptions.length} inscriptions`);
  console.log(`Backed up ${backup.paiements.length} paiements`);
  console.log('Backup saved to scratch/backup_before_migration.json');
  
  // Also print the current state to understand what to keep
  console.log('\n=== ÉTAT ACTUEL ===');
  const paidStudents = backup.inscriptions
    .filter(i => i.paid_status === 'paye')
    .map(i => i.etudiant_id);
  
  const uniquePaidIds = [...new Set(paidStudents)];
  
  for (const id of uniquePaidIds) {
    const student = backup.etudiants.find(e => e.id === id);
    if (student) {
      console.log(`KEEP (paid inscription): ${student.id} | ${student.first_name} ${student.last_name} | ${student.email}`);
    }
  }
  
  const toDelete = backup.etudiants.filter(e => 
    !uniquePaidIds.includes(e.id) && 
    !e.id.startsWith('user_') && 
    !e.id.startsWith('manual_')
  );
  
  console.log('\n=== À SUPPRIMER (pas de paiement, pas admin, pas manuel) ===');
  for (const e of toDelete) {
    console.log(`DELETE: ${e.id} | ${e.first_name} ${e.last_name} | ${e.email}`);
  }
}

backup();
