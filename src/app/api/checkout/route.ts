import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';

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

    const session = await stripe.checkout.sessions.create({
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
      metadata: {
        clerkUserId: userId || '',
        formationId,
        slot: body.slot || '',
        email: body.email || '', // Email de référence pour l'inscription
        type: 'inscription',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[STRIPE_ERROR]', error);
    return NextResponse.json({ error: 'Erreur interne Stripe' }, { status: 500 });
  }
}
