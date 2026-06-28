import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendBackupReportEmail } from '@/lib/mail';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const url = new URL(request.url);
    const secretParam = url.searchParams.get('secret');

    const isValidCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
    const isValidSecret = secretParam === process.env.CRON_SECRET;
    const isDev = process.env.NODE_ENV === 'development';

    if (!isValidCron && !isValidSecret && !isDev) {
      return new Response('Unauthorized', { status: 401 });
    }

    console.log('[BACKUP] Starting automated database backup...');

    // 1. Fetch data from all tables
    const { data: etudiants } = await supabaseAdmin.from('etudiants').select('*');
    const { data: formations } = await supabaseAdmin.from('formations').select('*');
    const { data: classes } = await supabaseAdmin.from('classes').select('*');
    const { data: inscriptions } = await supabaseAdmin.from('inscriptions').select('*');
    const { data: paiements } = await supabaseAdmin.from('paiements').select('*');
    const { data: messages } = await supabaseAdmin.from('messages').select('*');
    const { data: pushSubscriptions } = await supabaseAdmin.from('push_subscriptions').select('*');

    const backupData = {
      backup_version: '1.0',
      backup_date: new Date().toISOString(),
      etudiants: etudiants || [],
      formations: formations || [],
      classes: classes || [],
      inscriptions: inscriptions || [],
      paiements: paiements || [],
      messages: messages || [],
      push_subscriptions: pushSubscriptions || [],
    };

    const stats = {
      etudiants: backupData.etudiants.length,
      inscriptions: backupData.inscriptions.length,
      paiements: backupData.paiements.length,
      classes: backupData.classes.length,
      messages: backupData.messages.length,
    };

    const dateStr = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const fileDateStr = new Date().toISOString().split('T')[0] + '_' + Date.now();
    const fileName = `db_backup_${fileDateStr}.json`;
    const jsonString = JSON.stringify(backupData, null, 2);

    // 2. Ensure bucket exists and upload to Supabase Storage
    try {
      await supabaseAdmin.storage.createBucket('backups', { public: false });
    } catch (e) {
      // Ignored if already exists
    }

    const { error: uploadError } = await supabaseAdmin.storage
      .from('backups')
      .upload(fileName, jsonString, {
        contentType: 'application/json',
        upsert: true
      });

    if (uploadError) {
      console.error('[BACKUP] Supabase Storage upload failed:', uploadError);
      return NextResponse.json({ success: false, error: uploadError.message }, { status: 500 });
    }

    // 3. Generate a signed URL for download (valid for 7 days)
    const { data: signedUrlData, error: signError } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileName, 60 * 60 * 24 * 7);

    if (signError || !signedUrlData) {
      console.error('[BACKUP] Failed to generate signed URL:', signError);
      return NextResponse.json({ success: false, error: 'Failed to generate signed URL' }, { status: 500 });
    }

    // 4. Send report email with download link and JSON attachment
    // Attach the file directly if size is reasonable (< 10MB)
    const attachString = jsonString.length < 10 * 1024 * 1024 ? jsonString : undefined;

    const emailRes = await sendBackupReportEmail({
      date: dateStr,
      signedUrl: signedUrlData.signedUrl,
      stats,
      backupJsonString: attachString
    });

    console.log('[BACKUP] Database backup completed successfully. Email sent status:', emailRes.success);
    return NextResponse.json({
      success: true,
      message: 'Backup completed successfully',
      stats,
      fileName
    });
  } catch (error: any) {
    console.error('[BACKUP_ERROR] Unexpected error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
