import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { fetchEmailLogs } from '@/lib/email-log';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const logs = await fetchEmailLogs({ query, limit: 500 });
    return NextResponse.json(logs);
  } catch (error: any) {
    console.error('[EMAIL_LOGS_GET]', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}
