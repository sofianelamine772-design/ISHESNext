import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { CLASS_ID_TO_UUID } from '@/lib/presentiel-data';

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
    // Support les deux formats envoyés (page inscription vs page réinscription)
    const formationTitle = body.formationTitle || body.title || 'Formation ISHES';
    const formationId = body.formationId || body.planId || '';
    const rawPrice = body.price;
    // Robuste : gère "150 €", "150€" ou le nombre 150
    const priceNumber = typeof rawPrice === 'number' 
      ? rawPrice 
      : parseFloat(String(rawPrice).replace(/[€\s]/g, ''));
    const unitAmount = Math.round(priceNumber * 100);

    const installments = body.installments ? parseInt(String(body.installments), 10) : 1;

    let sessionParams: Stripe.Checkout.SessionCreateParams;

    const metadata = {
      clerkUserId: userId || '',
      formationId,
      slot: body.slot || '',
      email: body.email || '', // Email de référence pour l'inscription
      type: 'inscription',
      // Mapping des IDs de la vitrine vers les UUIDs de la base de données
      classId: body.classId ? CLASS_ID_TO_UUID[parseInt(body.classId)] || body.classId : '',
      classId_0: body.classIds && body.classIds.length > 0 ? CLASS_ID_TO_UUID[parseInt(body.classIds[0])] || body.classIds[0] : '',
      classId_1: body.classIds && body.classIds.length > 1 ? CLASS_ID_TO_UUID[parseInt(body.classIds[1])] || body.classIds[1] : '',
      classId_2: body.classIds && body.classIds.length > 2 ? CLASS_ID_TO_UUID[parseInt(body.classIds[2])] || body.classIds[2] : '',
      classId_3: body.classIds && body.classIds.length > 3 ? CLASS_ID_TO_UUID[parseInt(body.classIds[3])] || body.classIds[3] : '',
      classId_4: body.classIds && body.classIds.length > 4 ? CLASS_ID_TO_UUID[parseInt(body.classIds[4])] || body.classIds[4] : '',
      registrationType: body.registrationType || 'adult', // 'child' or 'adult'
    };

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
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sign-up?email_address=${encodeURIComponent(body.email || '')}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/inscription?canceled=true`,
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
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sign-up?email_address=${encodeURIComponent(body.email || '')}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/inscription?canceled=true`,
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
