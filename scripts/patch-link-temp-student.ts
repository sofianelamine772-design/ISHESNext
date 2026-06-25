// File: /Users/elamine/Desktop/ISHES/scripts/patch-link-temp-student.ts
import { createClient } from '@supabase/supabase-js';
import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY ||
  !process.env.CLERK_SECRET_KEY) {
  console.error('⚠️  Missing required environment variables.');
  process.exit(1);
}

// Initialise Supabase admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function main() {
  const targetEmail = 'sofianelamine31@icloud.com';

  // 1️⃣ Find temporary student (id starts with "temp_")
  const { data: tempStudent, error: fetchErr } = await supabase
    .from('etudiants')
    .select('id,email')
    .eq('email', targetEmail)
    .like('id', 'temp_%')
    .single();

  if (fetchErr) {
    console.error('❌  Error fetching temporary student:', fetchErr);
    return;
  }

  console.log('🔎  Temporary student found →', tempStudent);

  // 2️⃣ Create Clerk invitation frfrfuser
  let clerkUser;
  try {
    const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY! });
    const tempPassword = crypto.randomBytes(12).toString('hex');
    clerkUser = await clerk.users.createUser({
      emailAddress: [targetEmail],
      password: tempPassword,
    });
    console.log('🪪  Clerk user created →', clerkUser.id);
  } catch (e) {
    console.error('❌  Clerk creation error:', e);
    return;
  }

  // 3️⃣ Update etudiants row with real Clerk ID
  const { error: updateErr } = await supabase
    .from('etudiants')
    .update({ id: clerkUser.id })
    .eq('id', tempStudent.id);

  if (updateErr) {
    console.error('❌  Error updating student record:', updateErr);
    return;
  }

  console.log('✅  Student record updated – temp ID replaced with', clerkUser.id);
  console.log('🔔  Clerk has already sent the invitation email to', targetEmail);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('⚠️  Unexpected error:', err);
    process.exit(1);
  });
