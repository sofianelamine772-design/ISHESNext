import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { isAdminEmail } from '@/lib/auth-utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

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
      'SUPABASE_SERVICE_ROLE_KEY'
    ];
    const missingEnv = requiredEnv.filter(key => !process.env[key]);
    diagnostics['env'] = {
      success: missingEnv.length === 0,
      message: missingEnv.length === 0 
        ? 'Toutes les variables requises sont bien configurées.' 
        : `Variables manquantes : ${missingEnv.join(', ')}`
    };

    // 3. Test Stripe API Connection
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
          message: `Erreur de connexion API : ${err.message || err}`
        };
      }
    } else {
      diagnostics['api'] = {
        success: false,
        message: 'Clé secrète Stripe absente des variables d\'environnement.'
      };
    }

    // 4. Test Supabase Database Connection
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

    // 5. Test Stripe Webhook Configuration
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        const webhooks = await stripe.webhookEndpoints.list();
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        
        // Cherche s'il y a un webhook pointant vers notre URL de webhook
        const match = webhooks.data.find(w => w.url.includes('/api/webhooks/stripe'));

        if (match) {
          diagnostics['webhooks'] = {
            success: true,
            message: `Webhook actif trouvé pour l'adresse : ${match.url} (${match.enabled_events.length} événements écoutés)`
          };
        } else if (appUrl.includes('localhost')) {
          diagnostics['webhooks'] = {
            success: true,
            message: 'Mode développement local détecté. Utilisez Stripe CLI (stripe listen --forward-to localhost:3000/api/webhooks/stripe).'
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

    return NextResponse.json(diagnostics);
  } catch (error: any) {
    console.error('[DIAGNOSTIC_ERROR]', error);
    return NextResponse.json({ error: 'Erreur interne de diagnostic' }, { status: 500 });
  }
}
