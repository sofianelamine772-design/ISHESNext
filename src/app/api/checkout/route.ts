import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { CLASS_ID_TO_UUID } from '@/lib/presentiel-data';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(req: Request) {
  try {
    // userId optionnel — le checkout est accessible aux non-connectés (page inscription publique)
    let userId: string | null = null;
    try {
      const authResult = await auth();
      userId = authResult.userId;
    } catch {
      // Pas connecté — autorisé pour l'inscription publique
    }

    const body = await req.json();
    const formationId = body.formationId || body.planId || '';
    const registrationType = body.registrationType || 'adult';

    // 1. Charger la formation depuis la base de données (Source unique de vérité)
    const { data: formation } = await supabaseAdmin
      .from('formations')
      .select('price, title')
      .eq('slug', formationId)
      .maybeSingle();

    let formationData = formation;

    // Fallback sécurisé pour les cours en présentiel non trouvés dans Supabase
    if (!formationData) {
      if (formationId.includes('presentiel') || formationId === 'femme_debutante' || formationId === 'femme_intermediaire') {
        formationData = {
          title: "Cours en Présentiel",
          price: 480
        };
      } else {
        return NextResponse.json({ error: 'Formation introuvable en base de données' }, { status: 404 });
      }
    }

    const formationTitle = formationData.title || 'Formation ISHES';
    const basePrice = Number(formationData.price);

    // 2. Calculer le montant total (multiplié par le nombre d'enfants si inscription famille)
    let totalAmount = basePrice;
    if (registrationType === 'child' && body.childrenList && Array.isArray(body.childrenList)) {
      totalAmount = basePrice * body.childrenList.length;
    }

    const unitAmount = Math.round(totalAmount * 100);

    const installments = body.installments ? parseInt(String(body.installments), 10) : 1;

    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // En local, on s'adapte dynamiquement au port (ex: 3005) pour éviter les erreurs de redirection
    const origin = req.headers.get('origin');
    if (origin && origin.includes('localhost')) {
      baseUrl = origin;
    }
    
    const isLocal = baseUrl.includes('localhost');

    let sessionParams: Stripe.Checkout.SessionCreateParams;

    const metadata: Record<string, string> = {
      clerkUserId: userId || '',
      formationId,
      studentId: body.studentId || '',
      slot: body.slot || '',
      email: body.email || '', // Email de référence pour l'inscription
      telephone: body.telephone || '',
      type: 'inscription',
      // Paramètres de réinscription
      isRenewal: body.isRenewal ? 'true' : 'false',
      renewalYear: body.year || '',
      nextLevelTitle: body.nextLevelTitle || '',
      registrationType,
      expected_amount: String(basePrice), // Le prix de base par inscription
    };

    if (registrationType === 'child' && body.childrenList && Array.isArray(body.childrenList)) {
      metadata.parent_first_name = body.parentPrenom || '';
      metadata.parent_last_name = body.parentNom || '';
      metadata.childrenCount = String(body.childrenList.length);
      
      body.childrenList.forEach((child: any, idx: number) => {
        metadata[`child_${idx}_first`] = child.prenom || '';
        metadata[`child_${idx}_last`] = child.nom || '';
        metadata[`child_${idx}_classId`] = child.classId 
          ? CLASS_ID_TO_UUID[parseInt(child.classId)] || child.classId 
          : '';
        metadata[`child_${idx}_niveau`] = child.niveau || '';
      });
    } else {
      // Adult
      metadata.first_name = body.prenom || '';
      metadata.last_name = body.nom || '';
      metadata.classId = body.classId ? CLASS_ID_TO_UUID[parseInt(body.classId)] || body.classId : '';
      metadata.niveau = body.niveau || '';
    }

    if (installments === 3 || installments === 5) {
      const installmentAmount = Math.round(unitAmount / installments);

      // Création dynamique du tarif Stripe récurrent
      const dynamicPrice = await stripe.prices.create({
        currency: 'eur',
        unit_amount: installmentAmount,
        recurring: {
          interval: 'month',
        },
        product_data: {
          name: `Paiement en ${installments}x - ${formationTitle}`,
        },
      });

      sessionParams = {
        payment_method_types: ['card'],
        line_items: [
          {
            price: dynamicPrice.id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: isLocal 
          ? `${baseUrl}/api/checkout/local-success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(body.email || '')}`
          : `${baseUrl}/sign-up?email_address=${encodeURIComponent(body.email || '')}`,
        cancel_url: `${baseUrl}/inscription?canceled=true`,
        metadata: {
          ...metadata,
          installments_total: String(installments),
        },
        subscription_data: {
          metadata: {
            ...metadata,
            installments_total: String(installments),
          },
        },
      };
    } else {
      sessionParams = {
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Inscription : ${formationTitle}`,
                description: 'Inscription — Institut ISHES',
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: isLocal 
          ? `${baseUrl}/api/checkout/local-success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(body.email || '')}`
          : `${baseUrl}/sign-up?email_address=${encodeURIComponent(body.email || '')}`,
        cancel_url: `${baseUrl}/inscription?canceled=true`,
        metadata,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[STRIPE_ERROR]', error);
    return NextResponse.json({ error: 'Erreur interne Stripe' }, { status: 500 });
  }
}
