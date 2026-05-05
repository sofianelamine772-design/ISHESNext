import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAdminEmail } from '@/lib/auth-utils';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(SIGNING_SECRET);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // Handle the webhook event
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, first_name, last_name, email_addresses, phone_numbers } = evt.data;
    const email = email_addresses[0]?.email_address;
    const phone = phone_numbers[0]?.phone_number;

    // 1. Vérifie si l'utilisateur est l'admin
    const isAdmin = isAdminEmail(email);

    // 2. Vérifie si l'e-mail existe déjà dans notre table 'etudiants' (inscrit via vitrine)
    const { data: existingStudent, error: fetchError } = await supabaseAdmin
      .from('etudiants')
      .select('id, status')
      .eq('email', email)
      .maybeSingle();

    if (fetchError) {
      console.error('Fetch Error:', fetchError);
      return new Response('Error: DB Fetch Error', { status: 500 });
    }

    // 3. Restriction : Si ce n'est pas l'admin ET qu'il n'est pas dans notre base vitrine -> Bloquer
    // Note: Pour bloquer proprement, on devrait supprimer le user Clerk ici.
    // Pour l'instant, on se contente de NE PAS l'ajouter en actif s'il n'existe pas.
    if (!isAdmin && !existingStudent) {
      console.warn(`Tentative d'inscription non autorisée : ${email}`);
      // Optionnel: On pourrait supprimer le compte Clerk ici via l'API Admin de Clerk
      return new Response('Unauthorized email', { status: 403 });
    }

    // 4. Synchronisation : Mise à jour de l'étudiant existant avec son ID Clerk réel
    const { error: syncError } = await supabaseAdmin
      .from('etudiants')
      .upsert({
        id: id, // On remplace l'ID temporaire par le vrai ID Clerk
        email: email,
        first_name: first_name || '',
        last_name: last_name || '',
        phone: phone || '',
        role: isAdmin ? 'admin' : 'eleve',
        status: existingStudent?.status || 'actif'
      }, { onConflict: 'email' });

    if (syncError) {
      console.error('Sync Error:', syncError);
      return new Response('Error: Internal Server Error', { status: 500 });
    }

    console.log(`Utilisateur synchronisé : ${email} (Role: ${isAdmin ? 'admin' : 'eleve'})`);
  }

  if (eventType === 'user.updated') {
    const { id, first_name, last_name, email_addresses, phone_numbers } = evt.data;
    const email = email_addresses[0]?.email_address;
    const phone = phone_numbers[0]?.phone_number;

    await supabaseAdmin
      .from('etudiants')
      .update({
        first_name: first_name || '',
        last_name: last_name || '',
        phone: phone || ''
      })
      .eq('id', id);
  }

  return new Response('Webhook received', { status: 200 });
}
