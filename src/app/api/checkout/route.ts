import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { planId, title, price, mode, email } = await req.json();

    if (!planId || !title || !price) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Convert price like "349 €" to cents (34900)
    const priceStr = String(price);
    const unitAmount = Math.round(parseFloat(priceStr.replace(' €', '').replace(',', '.')) * 100);

    if (isNaN(unitAmount)) {
      return NextResponse.json({ error: "Format de prix invalide" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sign-up?redirect_url=/app&success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/program?canceled=1`,
      metadata: {
        planId,
        mode: mode || "distanciel",
        email: email || "",
      },
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Formation: ${title}`,
              description: `Mode: ${mode === "presentiel" ? "Présentiel" : "Distanciel"}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT]", error);
    return NextResponse.json({ error: error.message || "Erreur interne" }, { status: 500 });
  }
}
