import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { isAdminEmail } from '@/lib/auth-utils';
import { Resend } from 'resend';
import webPush from 'web-push';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

// Helper pour valider si une clé Supabase est bien une service_role key
function checkSupabaseServiceRoleKey(key: string): { success: boolean; message: string } {
  if (!key) return { success: false, message: "Clé absente." };

  if (key.startsWith('sb_secret_')) {
    return { success: true, message: "Format de clé secrète (service_role) correct." };
  }
  if (key.startsWith('sb_publishable_')) {
    return {
      success: false,
      message: "ATTENTION : Vous avez configuré une clé publique anonyme (anon) à la place de la clé secrète service_role !"
    };
  }

  try {
    const parts = key.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
      if (payload.role === 'service_role') {
        return { success: true, message: "Format JWT de rôle de service (service_role) correct." };
      } else if (payload.role === 'anon') {
        return {
          success: false,
          message: "ATTENTION : Vous avez configuré la clé anonyme (anon) à la place de la clé service_role."
        };
      }
    }
  } catch { }

  return { success: true, message: "Format de clé inconnu, mais semble être une clé secrète (pas de préfixe public détecté)." };
}

export async function GET() {
  try {
    // 1. Authentification & Rôle Admin
    let userId: string | null = null;
    try {
      const authResult = await auth();
      userId = authResult.userId;
    } catch {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }

    const diagnostics: Record<string, { success: boolean; message: string }> = {};

    // 2. Test Variables d'environnement
    const requiredEnv = [
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'NEXT_PUBLIC_APP_URL',
      'NEXT_PUBLIC_SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'CLERK_SECRET_KEY',
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'RESEND_API_KEY',
      'NEXT_PUBLIC_VAPID_PUBLIC_KEY',
      'VAPID_PRIVATE_KEY',
      'ADMIN_EMAIL'
    ];
    const missingEnv = requiredEnv.filter(key => !process.env[key]);
    diagnostics['env'] = {
      success: missingEnv.length === 0,
      message: missingEnv.length === 0
        ? 'Toutes les variables d\'environnement requises sont bien configurées.'
        : `Variables manquantes : ${missingEnv.join(', ')}`
    };

    // 3. Alignement des clés Clerk (Test vs Production)
    const clerkPub = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
    const clerkSec = process.env.CLERK_SECRET_KEY || '';
    if (clerkPub && clerkSec) {
      const pubIsTest = clerkPub.startsWith('pk_test_');
      const secIsTest = clerkSec.startsWith('sk_test_');
      if (pubIsTest !== secIsTest) {
        diagnostics['clerk_alignment'] = {
          success: false,
          message: `Incohérence Clerk : Clé publique (${pubIsTest ? 'TEST' : 'PROD'}) et clé secrète (${secIsTest ? 'TEST' : 'PROD'}) appartiennent à des environnements différents.`
        };
      } else {
        diagnostics['clerk_alignment'] = {
          success: true,
          message: `Alignement Clerk correct (Mode : ${pubIsTest ? 'TEST / DEV' : 'PRODUCTION'}).`
        };
      }
    } else {
      diagnostics['clerk_alignment'] = {
        success: false,
        message: 'Impossible de vérifier l\'alignement : clé Clerk manquante.'
      };
    }

    // 4. Alignement des clés Stripe (Test vs Production)
    const stripePub = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    const stripeSec = process.env.STRIPE_SECRET_KEY || '';
    if (stripePub && stripeSec) {
      const pubIsTest = stripePub.startsWith('pk_test_');
      const secIsTest = stripeSec.startsWith('sk_test_');
      if (pubIsTest !== secIsTest) {
        diagnostics['stripe_alignment'] = {
          success: false,
          message: `Incohérence Stripe : Clé publique (${pubIsTest ? 'TEST' : 'PROD'}) et clé secrète (${secIsTest ? 'TEST' : 'PROD'}) appartiennent à des environnements différents.`
        };
      } else {
        diagnostics['stripe_alignment'] = {
          success: true,
          message: `Alignement Stripe correct (Mode : ${pubIsTest ? 'TEST / DEV' : 'PRODUCTION'}).`
        };
      }
    } else {
      diagnostics['stripe_alignment'] = {
        success: false,
        message: 'Impossible de vérifier l\'alignement : clé Stripe manquante.'
      };
    }

    // 5. Test de la clé Supabase Service Role
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const serviceRoleCheck = checkSupabaseServiceRoleKey(process.env.SUPABASE_SERVICE_ROLE_KEY);
      diagnostics['supabase_key_role'] = {
        success: serviceRoleCheck.success,
        message: serviceRoleCheck.message
      };
    } else {
      diagnostics['supabase_key_role'] = {
        success: false,
        message: 'Clé secrète Supabase service_role manquante.'
      };
    }

    // 6. Test Stripe API Connection
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        const balance = await stripe.balance.retrieve();
        diagnostics['api'] = {
          success: true,
          message: `Connexion établie. Devise principale : ${(balance.pending[0]?.currency || 'EUR').toUpperCase()}`
        };
      } catch (err: any) {
        diagnostics['api'] = {
          success: false,
          message: `Erreur de connexion API Stripe : ${err.message || err}`
        };
      }
    } else {
      diagnostics['api'] = {
        success: false,
        message: 'Clé secrète Stripe absente des variables d\'environnement.'
      };
    }

    // 7. Test Stripe Webhook Configuration
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        const webhooks = await stripe.webhookEndpoints.list();
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

        // Cherche s'il y a un webhook pointant vers notre URL de webhook
        const match = webhooks.data.find(w => w.url.includes('/api/webhooks/stripe'));

        if (match) {
          if (!webhookSecret.startsWith('whsec_')) {
            diagnostics['webhooks'] = {
              success: false,
              message: `Webhook trouvé (${match.url}) mais STRIPE_WEBHOOK_SECRET n'a pas le format valide (doit commencer par 'whsec_').`
            };
          } else {
            diagnostics['webhooks'] = {
              success: true,
              message: `Webhook actif trouvé pour l'adresse : ${match.url} (${match.enabled_events.length} événements écoutés)`
            };
          }
        } else if (appUrl.includes('localhost')) {
          diagnostics['webhooks'] = {
            success: true,
            message: 'Mode dev local. Utilisez Stripe CLI (stripe listen --forward-to localhost:3000/api/webhooks/stripe) et copiez la clé whsec_... dans votre .env.local.'
          };
        } else {
          diagnostics['webhooks'] = {
            success: false,
            message: `Aucun webhook actif configuré sur Stripe pointant vers /api/webhooks/stripe.`
          };
        }
      } catch (err: any) {
        diagnostics['webhooks'] = {
          success: false,
          message: `Impossible de lister les webhooks Stripe : ${err.message || err}`
        };
      }
    } else {
      diagnostics['webhooks'] = {
        success: false,
        message: 'Clé secrète Stripe absente pour vérifier les webhooks.'
      };
    }

    // 8. Test Supabase Database Connection
    try {
      const { data, error } = await supabaseAdmin
        .from('formations')
        .select('id, title')
        .limit(1);

      if (error) throw error;

      diagnostics['products'] = {
        success: true,
        message: `Base de données accessible. ${data.length > 0 ? 'Catalogue de formations chargé.' : 'Aucune formation en base.'}`
      };
    } catch (err: any) {
      diagnostics['products'] = {
        success: false,
        message: `Erreur de connexion base de données : ${err.message || err}`
      };
    }

    // 9. Test Supabase Tables Access
    try {
      const tables = ['formations', 'etudiants', 'inscriptions', 'messages', 'push_subscriptions'];
      const missingTables: string[] = [];

      for (const table of tables) {
        const { error } = await supabaseAdmin
          .from(table)
          .select('id')
          .limit(1);

        if (error) {
          missingTables.push(table);
        }
      }

      if (missingTables.length === 0) {
        diagnostics['database_schema'] = {
          success: true,
          message: `Toutes les tables requises (${tables.join(', ')}) sont accessibles.`
        };
      } else {
        diagnostics['database_schema'] = {
          success: false,
          message: `Tables de la base inaccessibles ou manquantes : ${missingTables.join(', ')}`
        };
      }
    } catch (err: any) {
      diagnostics['database_schema'] = {
        success: false,
        message: `Erreur de vérification du schéma de base : ${err.message || err}`
      };
    }

    // 10. Test Clerk Auth API
    if (process.env.CLERK_SECRET_KEY) {
      try {
        const client = await clerkClient();
        const usersCount = await client.users.getCount();
        diagnostics['clerk'] = {
          success: true,
          message: `Connexion Clerk établie. ${usersCount} utilisateur(s) inscrit(s).`
        };
      } catch (err: any) {
        diagnostics['clerk'] = {
          success: false,
          message: `Erreur de connexion Clerk : ${err.message || err}`
        };
      }
    } else {
      diagnostics['clerk'] = {
        success: false,
        message: 'Clé secrète Clerk absente.'
      };
    }

    // 11. Test Resend Email
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const domains = await resend.domains.list();
        if (domains.error) {
          diagnostics['resend'] = {
            success: false,
            message: `Erreur Resend : ${domains.error.message}`
          };
        } else {
          // Récupérer le nombre d'emails envoyés aujourd'hui (00h00 - 24h00)
          const emails = await resend.emails.list();
          let sentToday = 0;
          if (!emails.error && emails.data && emails.data.data) {
            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

            sentToday = emails.data.data.filter((e: any) => {
              if (!e.created_at) return false;
              const d = new Date(e.created_at);
              return d >= startOfDay && d <= endOfDay;
            }).length;
          }

          diagnostics['resend'] = {
            success: true,
            message: `Connexion établie. ${domains.data?.data?.length || 0} domaine(s) configuré(s). ${sentToday}/500 e-mail(s) envoyé(s) aujourd'hui.`
          };
        }
      } catch (err: any) {
        diagnostics['resend'] = {
          success: false,
          message: `Erreur de connexion Resend : ${err.message || err}`
        };
      }
    } else {
      diagnostics['resend'] = {
        success: false,
        message: 'Clé API Resend absente.'
      };
    }

    // 12. Test Web Push VAPID
    if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
      try {
        webPush.setVapidDetails(
          process.env.VAPID_SUBJECT || 'mailto:contact@ishes.com',
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          process.env.VAPID_PRIVATE_KEY
        );
        diagnostics['webpush'] = {
          success: true,
          message: 'Détails VAPID Web Push valides et configurés.'
        };
      } catch (err: any) {
        diagnostics['webpush'] = {
          success: false,
          message: `Configuration VAPID Web Push invalide : ${err.message || err}`
        };
      }
    } else {
      diagnostics['webpush'] = {
        success: false,
        message: 'Clés VAPID (Publique ou Privée) Web Push manquantes.'
      };
    }

    // 13. Test Intégrité Formations & Classes (Assignation automatique garantie)
    try {
      const { data: formations, error: formErr } = await supabaseAdmin
        .from('formations')
        .select('id, slug, title')
        .eq('is_active', true);

      if (formErr) throw formErr;

      if (formations && formations.length > 0) {
        const slugs = formations.map(f => f.slug);
        const duplicateSlugs = slugs.filter((item, index) => slugs.indexOf(item) !== index);

        if (duplicateSlugs.length > 0) {
          diagnostics['formations_classes'] = {
            success: false,
            message: `DANGER : Doublons détectés pour les formations suivantes (slugs identiques) : ${duplicateSlugs.join(', ')}. Cela bloquera l'assignation.`
          };
        } else {
          const formationIds = formations.map(f => f.id);
          const { data: classes, error: classErr } = await supabaseAdmin
            .from('classes')
            .select('id, formation_id')
            .in('formation_id', formationIds);

          if (classErr) throw classErr;

          const formationsSansClasse = formations.filter(f => !classes.some(c => c.formation_id === f.id));

          if (formationsSansClasse.length > 0) {
            diagnostics['formations_classes'] = {
              success: false,
              message: `ATTENTION : ${formationsSansClasse.length} formation(s) sans classe détectée(s) : ${formationsSansClasse.map(f => f.title).join(', ')}. Les élèves n'y seront pas assignés.`
            };
          } else {
            diagnostics['formations_classes'] = {
              success: true,
              message: `Intégrité parfaite : ${formations.length} formations actives, toutes liées à au moins une classe et sans aucun doublon. L'assignation automatique est garantie à 100%.`
            };
          }
        }
      } else {
        diagnostics['formations_classes'] = {
          success: true,
          message: `Aucune formation active à vérifier pour le moment.`
        };
      }
    } catch (err: any) {
      diagnostics['formations_classes'] = {
        success: false,
        message: `Erreur de vérification d'intégrité des formations : ${err.message || err}`
      };
    }

    // 14. Test Inscriptions sans classe ou avec des incohérences (Formation / Classe)
    try {
      const presentielFormationIds = [
        '00000000-0000-0000-0000-000000000001', // Scolarité Présentiel
        'f0000000-0000-0000-0000-000000000002', // Scolarité Enfants
      ];

      // 14.a Inscriptions sans classe
      const { data: inscriptionsNoClass, error: errNoClass } = await supabaseAdmin
        .from('inscriptions')
        .select('id, etudiant_id, formation_id')
        .is('class_id', null)
        .in('formation_id', presentielFormationIds);

      if (errNoClass) throw errNoClass;

      let anomalyMessage = "";
      let hasError = false;

      if (inscriptionsNoClass && inscriptionsNoClass.length > 0) {
        anomalyMessage += `⚠️ ${inscriptionsNoClass.length} inscription(s) "Présentiel" sans classe assignée. `;
        hasError = true;
      }

      // 14.b Incohérence Formation vs Classe
      const { data: inscriptionsWithClass, error: errWithClass } = await supabaseAdmin
        .from('inscriptions')
        .select('id, etudiant_id, formation_id, class_id')
        .not('class_id', 'is', null);

      if (errWithClass) throw errWithClass;

      if (inscriptionsWithClass && inscriptionsWithClass.length > 0) {
        const classIds = [...new Set(inscriptionsWithClass.map((i: any) => i.class_id))];
        const { data: classesList } = await supabaseAdmin
          .from('classes')
          .select('id, formation_id')
          .in('id', classIds);

        const classToFormation: Record<string, string> = {};
        (classesList || []).forEach((c: any) => { classToFormation[c.id] = c.formation_id; });

        let mismatchCount = 0;
        inscriptionsWithClass.forEach((ins: any) => {
          const expectedFormation = classToFormation[ins.class_id];
          if (expectedFormation && expectedFormation !== ins.formation_id) {
            mismatchCount++;
          }
        });

        if (mismatchCount > 0) {
          anomalyMessage += `⚠️ ${mismatchCount} incohérence(s) détectée(s) entre la formation assignée et la formation de la classe. `;
          hasError = true;
        }
      }

      if (hasError) {
        diagnostics['inscriptions_integrity'] = {
          success: false,
          message: anomalyMessage
        };
      } else {
        diagnostics['inscriptions_integrity'] = {
          success: true,
          message: 'Parfait : Toutes les inscriptions en présentiel ont une classe, et aucune incohérence entre la formation et la classe n\'a été détectée.'
        };
      }
    } catch (err: any) {
      diagnostics['inscriptions_integrity'] = {
        success: false,
        message: `Erreur de vérification des inscriptions : ${err.message || err}`
      };
    }

    // 15. Récupération des erreurs système récentes
    let systemErrors: any[] = [];
    try {
      const { data: errorLogs } = await supabaseAdmin
        .from('messages')
        .select('id, content, created_at')
        .eq('sender_id', 'system_logger')
        .eq('title', 'system_error')
        .order('created_at', { ascending: false })
        .limit(10);

      if (errorLogs) {
        systemErrors = errorLogs.map((log: any) => {
          try {
            const parsed = JSON.parse(log.content);
            return {
              id: log.id,
              module: parsed.module || 'Inconnu',
              message: parsed.message || '',
              stack: parsed.stack || null,
              createdAt: log.created_at
            };
          } catch {
            return {
              id: log.id,
              module: 'Raw Error',
              message: log.content,
              createdAt: log.created_at
            };
          }
        });
      }
    } catch (err) {
      console.error('Failed to load system errors:', err);
    }

    return NextResponse.json({
      ...diagnostics,
      systemErrors
    });
  } catch (error: any) {
    console.error('[DIAGNOSTIC_ERROR]', error);
    return NextResponse.json({ error: 'Erreur interne de diagnostic' }, { status: 500 });
  }
}
