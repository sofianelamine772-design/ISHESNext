require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function getBaseEmail(email) {
  if (!email) return '';
  const [local, domain] = email.toLowerCase().split('@');
  if (!domain) return email.toLowerCase();
  return `${local.split('+')[0]}@${domain}`;
}

async function migrate() {
  console.log('=== MIGRATION STARTED ===\n');

  // STEP 1: Delete orphan temp records (no paid inscriptions, not admin, not manual)
  console.log('STEP 1: Deleting orphan temp records...');
  const orphanIds = [
    'temp_child1_1782561754017',
    'temp_child2_1782561754017',
    'temp_1782498893264',
    'temp_1782319738153',
  ];
  
  // Also find any remaining parent_ or temp_ records without paid inscriptions
  const { data: allStudents } = await supabaseAdmin.from('etudiants').select('id, email');
  const { data: paidInscriptions } = await supabaseAdmin.from('inscriptions').select('etudiant_id').eq('paid_status', 'paye');
  const paidIds = new Set((paidInscriptions || []).map(i => i.etudiant_id));
  
  const toDelete = (allStudents || []).filter(s => 
    !paidIds.has(s.id) && 
    !s.id.startsWith('user_') && 
    !s.id.startsWith('manual_')
  ).map(s => s.id);
  
  if (toDelete.length > 0) {
    // First delete their inscriptions (impaye)
    const { error: insDelError } = await supabaseAdmin.from('inscriptions').delete().in('etudiant_id', toDelete);
    if (insDelError) console.warn('Inscription delete error:', insDelError.message);
    
    const { error: delError } = await supabaseAdmin.from('etudiants').delete().in('id', toDelete);
    if (delError) console.error('Delete error:', delError.message);
    else console.log(`  Deleted ${toDelete.length} orphan records:`, toDelete);
  } else {
    console.log('  No orphan records found.');
  }

  // STEP 2: Normalize emails to base email (remove +child0, +migrated, etc.)
  console.log('\nSTEP 2: Normalizing emails...');
  const { data: students } = await supabaseAdmin.from('etudiants').select('id, email');
  let normalizedCount = 0;
  
  for (const s of (students || [])) {
    const baseEmail = getBaseEmail(s.email);
    if (baseEmail !== s.email) {
      // Check for email conflict first
      const { data: conflict } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .eq('email', baseEmail)
        .neq('id', s.id)
        .maybeSingle();
      
      if (conflict) {
        console.log(`  SKIP (conflict): ${s.id} | ${s.email} → ${baseEmail} (conflict with ${conflict.id})`);
      } else {
        await supabaseAdmin.from('etudiants').update({ email: baseEmail }).eq('id', s.id);
        console.log(`  Normalized: ${s.email} → ${baseEmail}`);
        normalizedCount++;
      }
    }
  }
  console.log(`  Normalized ${normalizedCount} emails.`);

  // STEP 3: Add clerk_user_id column via SQL via RPC
  // We'll do this via a direct SQL call through supabase
  console.log('\nSTEP 3: Adding clerk_user_id column (if not exists)...');
  const { error: alterError } = await supabaseAdmin.rpc('exec_sql', {
    query: `ALTER TABLE etudiants ADD COLUMN IF NOT EXISTS clerk_user_id text;`
  }).catch(e => ({ error: e }));
  
  if (alterError) {
    console.log('  Note: RPC exec_sql not available. Will use direct approach.');
    // Try a workaround: insert and check if column exists
    const { data: colCheck } = await supabaseAdmin
      .from('etudiants')
      .select('clerk_user_id')
      .limit(1)
      .maybeSingle();
    
    if (colCheck === null || 'clerk_user_id' in (colCheck || {})) {
      console.log('  clerk_user_id column already exists!');
    } else {
      console.log('  clerk_user_id column does NOT exist yet. Need to run SQL manually.');
      console.log('\n  ⚠️  RUN THIS SQL IN SUPABASE DASHBOARD:');
      console.log('  ALTER TABLE etudiants ADD COLUMN IF NOT EXISTS clerk_user_id text;');
      console.log('  ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_id;');
      console.log('  ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_first_name;');
      console.log('  ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_last_name;');
      console.log('  ALTER TABLE etudiants DROP COLUMN IF EXISTS photo_url;');
    }
  } else {
    console.log('  Column added via RPC.');
  }

  // STEP 4: Set clerk_user_id for existing user_ rows
  console.log('\nSTEP 4: Setting clerk_user_id for existing Clerk users...');
  const { data: clerkStudents } = await supabaseAdmin
    .from('etudiants')
    .select('id')
    .like('id', 'user_%');
  
  if (clerkStudents && clerkStudents.length > 0) {
    for (const s of clerkStudents) {
      try {
        await supabaseAdmin
          .from('etudiants')
          .update({ clerk_user_id: s.id })
          .eq('id', s.id);
        console.log(`  Set clerk_user_id=${s.id} for ${s.id}`);
      } catch (e) {
        console.log(`  Skipped (column may not exist yet): ${s.id}`);
      }
    }
  }

  console.log('\n=== MIGRATION SCRIPT COMPLETE ===');
  console.log('\n⚠️  IMPORTANT: Run the following SQL in your Supabase Dashboard SQL Editor:');
  console.log(`
-- Add clerk_user_id column
ALTER TABLE etudiants ADD COLUMN IF NOT EXISTS clerk_user_id text;

-- Populate clerk_user_id for existing Clerk users
UPDATE etudiants SET clerk_user_id = id WHERE id LIKE 'user_%';

-- Remove legacy columns
ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_id;
ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_first_name;
ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_last_name;
ALTER TABLE etudiants DROP COLUMN IF EXISTS photo_url;
  `);
}

migrate();
