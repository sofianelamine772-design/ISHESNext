import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;
  const metadata = session.metadata;
  let studentId = metadata?.studentId;

  // Si on n'a pas d'ID mais qu'on a l'email (cas de l'inscription), on cherche l'étudiant par email
  if (!studentId && metadata?.email) {
    const { data: student } = await supabaseAdmin
      .from('etudiants')
      .select('id')
      .eq('email', metadata.email)
      .maybeSingle();
    if (student) studentId = student.id;
  }

  if (event.type === "checkout.session.completed") {
    const subscription = session.subscription;
    const customerId = session.customer;
    const metadata = session.metadata;

    console.log("Payment Succeeded for session:", session.id);

    // Update payment in database
    const { error: pError } = await supabaseAdmin
      .from('paiements')
      .insert({
        stripe_session_id: session.id,
        amount: session.amount_total / 100,
        currency: session.currency,
        status: 'succeeded',
        etudiant_id: studentId || null,
      });

    if (pError) console.error("Database Payment Error:", pError);

    // Update inscription status if needed
    if (metadata?.planId && metadata?.email) {
       // Logic to activate account or update inscription
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    console.log("Payment Failed for intent:", session.id);
    
    const { error: pError } = await supabaseAdmin
      .from('paiements')
      .insert({
        stripe_session_id: session.id,
        amount: session.amount_received / 100,
        currency: session.currency,
        status: 'failed',
        error_message: session.last_payment_error?.message || "Payment refused",
        etudiant_id: studentId || null,
      });

    if (pError) console.error("Database Payment Failure Error:", pError);
  }

  return new NextResponse(null, { status: 200 });
}
