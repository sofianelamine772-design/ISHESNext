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
  } catch {}

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
          diagnostics['resend'] = {
            success: true,
            message: `Connexion Resend établie. ${domains.data?.data?.length || 0} domaine(s) configuré(s).`
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

    return NextResponse.json(diagnostics);
  } catch (error: any) {
    console.error('[DIAGNOSTIC_ERROR]', error);
    return NextResponse.json({ error: 'Erreur interne de diagnostic' }, { status: 500 });
  }
}
