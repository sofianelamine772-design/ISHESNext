import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { sender_id, receiver_id, content, type, title, target_class_id } = body;

    if (!content) {
      return NextResponse.json({ error: 'content est requis' }, { status: 400 });
    }

    // Insert minimal — sans contraintes strictes
    const insertData: Record<string, any> = {
      sender_id: sender_id || userId,
      content: content,
    };
    if (receiver_id !== undefined) insertData.receiver_id = receiver_id;
    if (type !== undefined) insertData.type = type;
    if (title !== undefined) insertData.title = title;
    if (target_class_id !== undefined) insertData.target_class_id = target_class_id;

    console.log('[MESSAGES_POST] Inserting:', JSON.stringify(insertData));

    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert(insertData)
      .select('id, sender_id, receiver_id, content, created_at');

    if (error) {
      console.error('[MESSAGES_POST_ERROR]', JSON.stringify(error));
      return NextResponse.json({
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      }, { status: 500 });
    }

    console.log('[MESSAGES_POST_OK]', JSON.stringify(data));
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('[MESSAGES_POST_CRASH]', err?.message);
    return NextResponse.json({ error: err?.message || 'Erreur inconnue' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const clerkId = searchParams.get('clerkId');
    const queryUserId = searchParams.get('userId');

    // Conversations admin : liste des élèves ayant écrit
    if (type === 'conversations') {
      const { data: messages, error: msgError } = await supabaseAdmin
        .from('messages')
        .select('sender_id, created_at')
        .eq('receiver_id', 'admin_system')
        .order('created_at', { ascending: false });
      
      if (msgError) {
        console.error('[CONVERSATIONS_ERROR]', msgError);
        return NextResponse.json({ error: msgError.message }, { status: 500 });
      }

      const senderIds = Array.from(new Set(messages?.map(m => m.sender_id) || []));
      if (senderIds.length === 0) return NextResponse.json([]);

      const { data: stds, error: stdError } = await supabaseAdmin
        .from('etudiants')
        .select('id, first_name, last_name')
        .in('id', senderIds);

      if (stdError) {
        console.error('[STUDENTS_ERROR]', stdError);
        return NextResponse.json({ error: stdError.message }, { status: 500 });
      }

      return NextResponse.json(stds || []);
    }

    // Annonces pour un élève spécifique
    if (type === 'announcements') {
      const { data: inscriptions } = await supabaseAdmin
        .from('inscriptions')
        .select('class_id')
        .eq('etudiant_id', queryUserId || '')
        .limit(1);
      
      const classId = inscriptions?.[0]?.class_id;

      const { data: anns, error: annError } = await supabaseAdmin
        .from('messages')
        .select('*')
        .in('type', ['global', 'class'])
        .order('created_at', { ascending: false });

      if (annError) {
        console.error('[ANNOUNCEMENTS_ERROR]', annError);
        return NextResponse.json({ error: annError.message }, { status: 500 });
      }

      const filtered = (anns || []).filter(
        (m: any) => m.type === 'global' || (m.type === 'class' && m.target_class_id === classId)
      );

      return NextResponse.json(filtered);
    }

    // Chat entre admin et un élève spécifique
    if (type === 'chat' && clerkId) {
      const { data, error } = await supabaseAdmin
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${clerkId},receiver_id.eq.admin_system),and(sender_id.eq.admin_system,receiver_id.eq.${clerkId})`)
        .eq('type', 'private')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('[CHAT_ERROR]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data || []);
    }

    // Fallback : tous les messages
    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data || []);

  } catch (error: any) {
    console.error('[MESSAGES_GET_CATCH]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
