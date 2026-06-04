import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription = await req.json();

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 });
    }

    // Insert or update subscription
    const { error } = await supabaseAdmin
      .from('push_subscriptions')
      .upsert({
        etudiant_id: userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth
      }, { onConflict: 'endpoint' });

    if (error) {
      console.error('[PUSH_SUBSCRIBE_ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[PUSH_SUBSCRIBE_CRASH]', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
