require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function migrate() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const oldId = 'temp_1782479830492';
  // I need to know the clerk user ID. Let's just find any user starting with "user_" for yaniseldaya
  const { rows: clerkRows } = await client.query(`SELECT id FROM etudiants WHERE email ilike 'yaniseldaya@outlook.fr' AND id LIKE 'user_%'`);
  if (clerkRows.length === 0) {
    console.log("No Clerk user found for yaniseldaya@outlook.fr");
    // Actually, when the user logs in, app/page.tsx creates the user_... if they didn't exist!
    // But wait, it crashed! So maybe user_... doesn't exist?
    // Wait, the Clerk user is the one logging in. We don't know the exact ID here unless we look it up.
  }

  // Let's create the RPC!
  try {
    await client.query(`
      CREATE OR REPLACE FUNCTION migrate_student_id(old_id TEXT, new_id TEXT)
      RETURNS void AS $$
      DECLARE
        user_row RECORD;
      BEGIN
        -- 1. Copy the etudiants row
        SELECT * INTO user_row FROM etudiants WHERE id = old_id;
        IF NOT FOUND THEN
          RETURN;
        END IF;

        -- Insert the new row, but first check if it already exists
        IF NOT EXISTS (SELECT 1 FROM etudiants WHERE id = new_id) THEN
          INSERT INTO etudiants (id, email, first_name, last_name, phone, parent_first_name, parent_last_name, role, status, created_at, parent_id)
          VALUES (new_id, user_row.email, user_row.first_name, user_row.last_name, user_row.phone, user_row.parent_first_name, user_row.parent_last_name, user_row.role, user_row.status, user_row.created_at, user_row.parent_id);
        ELSE
          -- If it exists, update it with the old info if needed, but we probably just want to keep the new row
          -- So we do nothing to the etudiants table
        END IF;

        -- 2. Update foreign keys
        UPDATE inscriptions SET etudiant_id = new_id WHERE etudiant_id = old_id;
        UPDATE paiements SET etudiant_id = new_id WHERE etudiant_id = old_id;
        UPDATE etudiants SET parent_id = new_id WHERE parent_id = old_id;

        -- 3. Delete the old row
        DELETE FROM etudiants WHERE id = old_id;
      END;
      $$ LANGUAGE plpgsql;
    `);
    console.log("RPC created successfully!");
  } catch (err) {
    console.error("Error creating RPC:", err);
  }
  
  await client.end();
}
migrate();
