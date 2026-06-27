import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAdminEmail } from '@/lib/auth-utils';
import { sendWelcomeEmail } from '@/lib/mail';

function getBaseEmail(email: string): string {
  if (!email) return '';
  const [local, domain] = email.toLowerCase().split('@');
  if (!domain) return email.toLowerCase();
  return `${local.split('+')[0]}@${domain}`;
}

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

    if (!email) {
      return new Response('Error: No email provided', { status: 400 });
    }

    const baseEmail = getBaseEmail(email);
    const isAdmin = isAdminEmail(email);

    // 1. Chercher tous les étudiants avec cet email de base
    const { data: existingStudents, error: fetchError } = await supabaseAdmin
      .from('etudiants')
      .select('*')
      .eq('email', baseEmail);

    if (fetchError) {
      console.error('Fetch Error:', fetchError);
      return new Response('Error: DB Fetch Error', { status: 500 });
    }

    // 2. Restriction de sécurité : Si ce n'est pas un admin et qu'aucune inscription n'existe
    if (!isAdmin && (!existingStudents || existingStudents.length === 0)) {
      console.warn(`Tentative d'inscription non autorisée : ${email}`);
      return new Response('Unauthorized email', { status: 403 });
    }

    // 3. Liaison par clerk_user_id
    if (existingStudents && existingStudents.length > 0) {
      for (const student of existingStudents) {
        await supabaseAdmin
          .from('etudiants')
          .update({ clerk_user_id: id })
          .eq('id', student.id);
      }
      console.log(`[CLERK_WEBHOOK] Linked ${existingStudents.length} student(s) to ${id} for email ${baseEmail}`);
    } else if (isAdmin) {
      // Créer un profil admin minimal
      await supabaseAdmin
        .from('etudiants')
        .insert({
          id: crypto.randomUUID(),
          email: baseEmail,
          first_name: first_name || '',
          last_name: last_name || '',
          phone: phone || '',
          role: 'admin',
          status: 'actif',
          clerk_user_id: id,
        });
      console.log(`[CLERK_WEBHOOK] Created admin profile for ${baseEmail} (${id})`);
    }

    // Envoyer l'email de bienvenue
    try {
      await sendWelcomeEmail(email, first_name || 'Élève');
      console.log(`Email de bienvenue envoyé à : ${email}`);
    } catch (err) {
      console.error(`Erreur envoi email bienvenue à ${email}:`, err);
    }
  }

  if (eventType === 'user.updated') {
    const { id, phone_numbers } = evt.data;
    const phone = phone_numbers[0]?.phone_number;

    if (phone) {
      // Mettre à jour uniquement le numéro de téléphone pour tous les profils de la famille
      await supabaseAdmin
        .from('etudiants')
        .update({ phone })
        .eq('clerk_user_id', id);
      console.log(`[CLERK_WEBHOOK] Updated phone for clerk_user_id: ${id}`);
    }
  }

  return new Response('Webhook received', { status: 200 });
}
