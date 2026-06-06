const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function main() {
  console.log("Dropping unique constraint on etudiants(email)...");
  
  // We can execute SQL via Supabase RPC if one exists, or via a direct postgres client.
  // Wait, does Supabase JS client allow running raw SQL?
  // No, but we can check if there's any RPC defined or if we can run it.
  // Wait, let's check if we have postgres package installed in node_modules, or if we can install it.
  // Wait! We can check package.json dependencies: it has no pg driver in dependencies.
  // But wait! Is there a pg driver installed globally or in node_modules?
  // Let's check node_modules/pg.
  const hasPg = fs.existsSync(path.join(__dirname, '..', 'node_modules', 'pg'));
  console.log("Has pg driver in node_modules:", hasPg);
  
  // Wait, is there a postgres connection string in .env.local?
  const dbUrl = env.DATABASE_URL;
  console.log("Database URL present:", !!dbUrl);

  if (dbUrl) {
    try {
      const { Client } = require('pg');
      const client = new Client({
        connectionString: dbUrl,
      });
      await client.connect();
      console.log("Connected to PostgreSQL database.");
      
      const res = await client.query(`
        ALTER TABLE public.etudiants DROP CONSTRAINT IF EXISTS etudiants_email_key CASCADE;
      `);
      console.log("Constraint dropped successfully:", res);
      
      // Let's also drop any unique indexes on email if they exist
      try {
        await client.query(`DROP INDEX IF EXISTS public.etudiants_email_key;`);
        console.log("Index public.etudiants_email_key dropped.");
      } catch (idxErr) {
        console.warn("Failed to drop index:", idxErr.message);
      }
      
      await client.end();
    } catch (err) {
      console.error("Error executing SQL via pg:", err);
    }
  } else {
    console.error("No DATABASE_URL found in .env.local to run migrations.");
  }
}

main();
