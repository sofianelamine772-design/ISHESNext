import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { auth } from '@clerk/nextjs/server';
import { sendNewMessageEmail } from '@/lib/mail';

import webPush from 'web-push';


// Configuration web-push
if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:contact@ishes.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

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

    // Envoi de Notification (Push & E-mail)
    if (sender_id === 'admin_system') {
      try {
        let pushSubs: any[] = [];
        let emailsToSend: { email: string; first_name: string; subject?: string }[] = [];

        if (type === 'private' && receiver_id && receiver_id !== 'admin_system') {
          // Message privé : un seul élève
          const { data: pushData } = await supabaseAdmin
            .from('push_subscriptions')
            .select('*')
            .eq('etudiant_id', receiver_id);
          if (pushData) pushSubs = pushData;

          const { data: student } = await supabaseAdmin
            .from('etudiants')
            .select('email, first_name')
            .eq('id', receiver_id)
            .maybeSingle();
          if (student && student.email) {
            emailsToSend.push({
              email: student.email,
              first_name: student.first_name || 'Élève',
              subject: title || undefined
            });
          }
        }
        else if (type === 'global') {
          // Message global : tout le monde
          const { data: pushData } = await supabaseAdmin
            .from('push_subscriptions')
            .select('*');
          if (pushData) pushSubs = pushData;

          // Tous les élèves actifs
          const { data: students } = await supabaseAdmin
            .from('etudiants')
            .select('email, first_name')
            .eq('status', 'actif');
          if (students && students.length > 0) {
            students.forEach((s) => {
              if (s.email) {
                emailsToSend.push({
                  email: s.email,
                  first_name: s.first_name || 'Élève',
                  subject: title || undefined
                });
              }
            });
          }
        }
        else if (type === 'class' && target_class_id) {
          // Message par classe : récupérer d'abord les élèves de la classe
          const { data: inscriptions } = await supabaseAdmin
            .from('inscriptions')
            .select('etudiant_id')
            .eq('class_id', target_class_id);

          if (inscriptions && inscriptions.length > 0) {
            const studentIds = inscriptions.map((i: any) => i.etudiant_id).filter(Boolean);
            
            if (studentIds.length > 0) {
              // Push subscriptions
              const { data: pushData } = await supabaseAdmin
                .from('push_subscriptions')
                .select('*')
                .in('etudiant_id', studentIds);
              if (pushData) pushSubs = pushData;

              // Élèves de la classe
              const { data: students } = await supabaseAdmin
                .from('etudiants')
                .select('email, first_name')
                .in('id', studentIds);
              
              if (students && students.length > 0) {
                let displayTitle = title;
                if (!displayTitle) {
                  const { data: classe } = await supabaseAdmin
                    .from('classes')
                    .select('name')
                    .eq('id', target_class_id)
                    .maybeSingle();
                  if (classe) {
                    displayTitle = `Annonce pour la classe ${classe.name}`;
                  }
                }

                students.forEach((s) => {
                  if (s.email) {
                    emailsToSend.push({
                      email: s.email,
                      first_name: s.first_name || 'Élève',
                      subject: displayTitle || undefined
                    });
                  }
                });
              }
            }
          }
        }

        // 1. Envoyer les Notifications Push
        if (pushSubs && pushSubs.length > 0) {
          const payload = JSON.stringify({
            title: title || 'ISHES',
            body: content.length > 50 ? content.substring(0, 50) + '...' : content,
            url: type === 'private' ? '/app/eleve/messagerie' : '/app/eleve'
          });

          await Promise.all(pushSubs.map(async (sub) => {
            const pushSubscription = {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth }
            };
            try {
              await webPush.sendNotification(pushSubscription, payload);
            } catch (e: any) {
              if (e.statusCode === 410 || e.statusCode === 404) {
                await supabaseAdmin.from('push_subscriptions').delete().eq('id', sub.id);
              } else {
                console.error('[PUSH_SEND_ERROR]', e);
              }
            }
          }));
        }

        // 2. Envoyer les E-mails (de manière synchrone pour vérifier le succès)
        if (emailsToSend.length > 0) {
          console.log(`[MESSAGES_POST] Envoi de ${emailsToSend.length} e-mails de notification...`);
          const results = await Promise.all(
            emailsToSend.map(async (item) => {
              try {
                const res = await sendNewMessageEmail({
                  email: item.email,
                  firstName: item.first_name,
                  messageContent: content,
                  title: item.subject
                });
                return { email: item.email, success: res.success, error: res.error };
              } catch (mailErr: any) {
                console.error(`[MESSAGES_MAIL_ERROR] Échec de l'envoi d'e-mail à ${item.email}:`, mailErr);
                return { email: item.email, success: false, error: mailErr?.message || mailErr };
              }
            })
          );
          
          const failed = results.filter(r => !r.success);
          if (failed.length > 0) {
            console.error(`[MESSAGES_POST] Échec de l'envoi pour ${failed.length} e-mails.`);
            const firstError = failed[0].error;
            let errorMessage = "Échec de l'envoi des e-mails.";
            if (firstError && typeof firstError === 'object') {
              errorMessage = (firstError as any).message || JSON.stringify(firstError);
            } else if (typeof firstError === 'string') {
              errorMessage = firstError;
            }
            return NextResponse.json({ 
              error: `Erreur d'envoi d'e-mail : ${errorMessage}`,
              details: failed
            }, { status: 400 });
          }
          console.log(`[MESSAGES_POST] Tous les e-mails ont été traités avec succès.`);
        }

      } catch (notifyError) {
        console.error('[NOTIFICATION_ERROR]', notifyError);
      }
    }

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

    // Conversations admin : liste des élèves ayant échangé
    if (type === 'conversations') {
      // Récupérer tous les messages privés envoyés ou reçus par l'admin
      const { data: messages, error: msgError } = await supabaseAdmin
        .from('messages')
        .select('sender_id, receiver_id, created_at, is_read')
        .eq('type', 'private')
        .order('created_at', { ascending: false });

      if (msgError) {
        console.error('[CONVERSATIONS_ERROR]', msgError);
        return NextResponse.json({ error: msgError.message }, { status: 500 });
      }

      // Map pour garder la trace du dernier message et des non-lus
      const studentInfo = new Map<string, { last_message_at: string, unread_count: number, has_unread: boolean }>();

      messages?.forEach(m => {
        const studentId = m.sender_id === 'admin_system' ? m.receiver_id : m.sender_id;
        if (!studentId || studentId === 'admin_system') return;

        const isUnreadToAdmin = m.sender_id === studentId && m.receiver_id === 'admin_system' && !m.is_read;

        if (!studentInfo.has(studentId)) {
          studentInfo.set(studentId, {
            last_message_at: m.created_at,
            unread_count: isUnreadToAdmin ? 1 : 0,
            has_unread: isUnreadToAdmin
          });
        } else {
          // On additionne les messages non lus
          if (isUnreadToAdmin) {
            const info = studentInfo.get(studentId)!;
            info.unread_count += 1;
            info.has_unread = true;
          }
        }
      });

      if (studentInfo.size === 0) return NextResponse.json([]);

      const { data: stds, error: stdError } = await supabaseAdmin
        .from('etudiants')
        .select('id, first_name, last_name, email')
        .in('id', Array.from(studentInfo.keys()));

      if (stdError) {
        console.error('[STUDENTS_ERROR]', stdError);
        return NextResponse.json({ error: stdError.message }, { status: 500 });
      }

      // Attacher les infos et trier (non lus en premier, puis par date)
      const enrichedStds = (stds || []).map(std => ({
        ...std,
        ...studentInfo.get(std.id)
      })).sort((a, b) => {
        const aHasUnread = (a.unread_count || 0) > 0 || a.has_unread;
        const bHasUnread = (b.unread_count || 0) > 0 || b.has_unread;
        if (aHasUnread && !bHasUnread) return -1;
        if (!aHasUnread && bHasUnread) return 1;
        return new Date(b.last_message_at || 0).getTime() - new Date(a.last_message_at || 0).getTime();
      });

      return NextResponse.json(enrichedStds);
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
      // 1. Marquer comme lus les messages envoyés par l'élève à l'admin
      await supabaseAdmin
        .from('messages')
        .update({ is_read: true })
        .eq('sender_id', clerkId)
        .eq('receiver_id', 'admin_system');

      // 2. Récupérer la conversation
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
