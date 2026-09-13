import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const key = process.env.CLERK_SECRET_KEY_LIVE || process.env.CLERK_SECRET_KEY;
if (!key) {
  console.error('CLERK_SECRET_KEY manquante.');
  process.exit(1);
}

const body = fs.readFileSync(
  path.join(process.cwd(), 'src/lib/clerk-invitation-email.html'),
  'utf8',
);

const res = await fetch('https://api.clerk.com/v1/templates/email/invitation', {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Invitation',
    subject: '{{app.name}} — Créez votre espace élève',
    body,
    delivered_by_clerk: true,
  }),
});

const data = await res.json();
if (!res.ok) {
  console.error('Échec mise à jour du modèle Clerk:', data.errors || data);
  process.exit(1);
}

console.log('Modèle invitation mis à jour.');
console.log('instance:', key.startsWith('sk_live_') ? 'PRODUCTION' : 'TEST');
console.log('objet:', data.subject);
