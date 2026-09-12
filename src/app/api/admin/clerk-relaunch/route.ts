import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { ADMIN_EMAILS, isAdminEmail } from '@/lib/auth-utils';
import { groupStudentsByInviteEmail, resolveProductionAppUrl } from '@/lib/clerk-invite-families';
import { logSystemError } from '@/lib/error-logger';

export const maxDuration = 120;

async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) return { ok: false as const, error: 'Non autorisé.', status: 401 };

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress
    || user.emailAddresses[0]?.emailAddress
    || '';

  const { data: adminRow } = await supabaseAdmin
    .from('etudiants')
    .select('role')
    .eq('clerk_user_id', userId)
    .maybeSingle();

  if (adminRow?.role === 'admin' || isAdminEmail(email)) {
    return { ok: true as const };
  }
  return { ok: false as const, error: 'Droits administrateur requis.', status: 403 };
}

function productionGuard() {
  const clerkKey = process.env.CLERK_SECRET_KEY || '';
  if (clerkKey.startsWith('sk_test_')) {
    return {
      ok: false as const,
      error: 'Relance bloquée : Clerk est en mode TEST. Clique ce bouton uniquement sur le site en ligne (production).',
    };
  }
  const app = resolveProductionAppUrl(process.env.NEXT_PUBLIC_APP_URL);
  if (!app.ok) return app;
  return { ok: true as const, appUrl: app.url };
}

async function buildPlan() {
  const { data: students, error } = await supabaseAdmin
    .from('etudiants')
    .select('id, first_name, last_name, email, role, status');
  if (error) throw error;
  return groupStudentsByInviteEmail(students || [], ADMIN_EMAILS);
}

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin.ok) return NextResponse.json({ error: admin.error }, { status: admin.status });

    const guard = productionGuard();
    const { families, skipped } = await buildPlan();
    return NextResponse.json({
      productionReady: guard.ok,
      productionError: guard.ok ? null : guard.error,
      redirectUrl: guard.ok ? `${guard.appUrl}/app/eleve` : null,
      emailCount: families.length,
      studentCount: families.reduce((n, f) => n + f.children.length, 0),
      families: families.map((f) => ({
        email: f.email,
        children: f.children.map((c) => c.name),
      })),
      skipped,
    });
  } catch (err) {
    await logSystemError('clerk-relaunch', err);
    return NextResponse.json({ error: 'Impossible de préparer la relance.' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const admin = await requireAdmin();
    if (!admin.ok) return NextResponse.json({ error: admin.error }, { status: admin.status });

    const guard = productionGuard();
    if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: 409 });

    const { families } = await buildPlan();
    const client = await clerkClient();
    const redirectUrl = `${guard.appUrl}/app/eleve`;

    const sent: string[] = [];
    const already: string[] = [];
    const failed: { email: string; error: string }[] = [];

    for (const family of families) {
      try {
        await client.invitations.createInvitation({
          emailAddress: family.email,
          publicMetadata: { role: 'etudiant' },
          ignoreExisting: true,
          redirectUrl,
        });
        sent.push(family.email);
      } catch (err: any) {
        const code = String(err?.errors?.[0]?.code || '');
        const message = String(err?.errors?.[0]?.message || err?.message || err);
        if (/already exists|identifier_exists|already been invited|already_exists/i.test(`${code} ${message}`)) {
          already.push(family.email);
        } else {
          failed.push({ email: family.email, error: message.slice(0, 220) });
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    if (failed.length) {
      await logSystemError('clerk-relaunch', {
        message: `${failed.length} invitation(s) Clerk en échec`,
        errors: failed.slice(0, 20),
      });
    }

    return NextResponse.json({
      success: true,
      redirectUrl,
      sent: sent.length,
      already: already.length,
      failed: failed.length,
      errors: failed,
    });
  } catch (err) {
    await logSystemError('clerk-relaunch', err);
    return NextResponse.json({ error: 'Impossible d’envoyer les invitations.' }, { status: 500 });
  }
}
