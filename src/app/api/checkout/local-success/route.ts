import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getCurrentAcademicYear } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  const email = searchParams.get('email');

  if (!sessionId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const planId = session.metadata?.formationId || session.metadata?.planId;
      const classIdMetadata = session.metadata?.classId;
      
      const { data: membre } = await supabaseAdmin
        .from('etudiants')
        .select('id')
        .eq('email', email || session.customer_details?.email)
        .maybeSingle();

      if (membre && planId) {
        const { data: formation } = await supabaseAdmin
          .from('formations')
          .select('id')
          .eq('slug', planId)
          .maybeSingle();

        const formationUuid = formation?.id;

        if (formationUuid) {
          const { data: existingIns } = await supabaseAdmin
            .from('inscriptions')
            .select('id, class_id')
            .eq('etudiant_id', membre.id)
            .eq('formation_id', formationUuid)
            .maybeSingle();

          let finalClassId = classIdMetadata || existingIns?.class_id;

          if (!finalClassId) {
            const { data: defaultClass } = await supabaseAdmin
              .from('classes')
              .select('id')
              .eq('formation_id', formationUuid)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();
            if (defaultClass) finalClassId = defaultClass.id;
          }

          if (existingIns) {
            await supabaseAdmin
              .from('inscriptions')
              .update({
                class_id: finalClassId || undefined,
                status: 'valide',
                paid_status: 'paye'
              })
              .eq('id', existingIns.id);
          } else {
            await supabaseAdmin
              .from('inscriptions')
              .insert({
                etudiant_id: membre.id,
                formation_id: formationUuid,
                class_id: finalClassId,
                status: 'valide',
                paid_status: 'paye',
                academic_year: getCurrentAcademicYear()
              });
          }

          // Paiement
          const { data: existingPayment } = await supabaseAdmin
            .from('paiements')
            .select('id')
            .eq('stripe_session_id', session.id)
            .maybeSingle();

          if (!existingPayment) {
            await supabaseAdmin.from('paiements').insert({
              etudiant_id: membre.id,
              amount: session.amount_total ? session.amount_total / 100 : 0,
              status: 'succeeded',
              currency: session.currency || 'eur',
              stripe_session_id: session.id
            });
          }
        }
      }
    }

    return NextResponse.redirect(new URL(`/sign-up?email_address=${encodeURIComponent(email || '')}`, req.url));
  } catch (error) {
    console.error('[LOCAL_SYNC_ERROR]', error);
    return NextResponse.redirect(new URL(`/sign-up?email_address=${encodeURIComponent(email || '')}`, req.url));
  }
}
