import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendBackupReportEmail } from '@/lib/mail';

function generateSqlInserts(tableName: string, records: any[]): string {
  if (!records || records.length === 0) return `-- Table ${tableName} is empty\n\n`;

  const columns = Object.keys(records[0]);
  const sqlLines: string[] = [];
  
  for (const record of records) {
    const values = columns.map(col => {
      const val = record[col];
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'number') return String(val);
      if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
      if (typeof val === 'object') {
        return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
      }
      return `'${String(val).replace(/'/g, "''")}'`;
    });
    
    sqlLines.push(`(${values.join(', ')})`);
  }

  const chunkSize = 250;
  let sqlText = `-- Data for public.${tableName}\n`;
  for (let i = 0; i < sqlLines.length; i += chunkSize) {
    const chunk = sqlLines.slice(i, i + chunkSize);
    sqlText += `INSERT INTO public.${tableName} (${columns.map(c => `"${c}"`).join(', ')}) VALUES\n${chunk.join(',\n')};\n\n`;
  }
  
  return sqlText;
}

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

    console.log('[BACKUP] Starting automated database backup (JSON + SQL)...');

    // 1. Fetch data from all tables
    const { data: etudiants } = await supabaseAdmin.from('etudiants').select('*');
    const { data: formations } = await supabaseAdmin.from('formations').select('*');
    const { data: classes } = await supabaseAdmin.from('classes').select('*');
    const { data: inscriptions } = await supabaseAdmin.from('inscriptions').select('*');
    const { data: paiements } = await supabaseAdmin.from('paiements').select('*');
    const { data: messages } = await supabaseAdmin.from('messages').select('*');
    const { data: pushSubscriptions } = await supabaseAdmin.from('push_subscriptions').select('*');

    const backupData = {
      backup_version: '1.1',
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
    const fileNameJson = `db_backup_${fileDateStr}.json`;
    const fileNameSql = `db_backup_${fileDateStr}.sql`;
    
    // Generate JSON string
    const jsonString = JSON.stringify(backupData, null, 2);

    // Generate SQL dump string
    let sqlDump = `-- ISHES DATABASE DUMP RESTORE\n`;
    sqlDump += `-- Date: ${dateStr}\n\n`;
    sqlDump += `TRUNCATE TABLE public.push_subscriptions, public.messages, public.paiements, public.inscriptions, public.classes, public.formations, public.etudiants CASCADE;\n\n`;

    sqlDump += generateSqlInserts('etudiants', backupData.etudiants);
    sqlDump += generateSqlInserts('formations', backupData.formations);
    sqlDump += generateSqlInserts('classes', backupData.classes);
    sqlDump += generateSqlInserts('inscriptions', backupData.inscriptions);
    sqlDump += generateSqlInserts('paiements', backupData.paiements);
    sqlDump += generateSqlInserts('messages', backupData.messages);
    sqlDump += generateSqlInserts('push_subscriptions', backupData.push_subscriptions);

    // 2. Ensure bucket exists and upload files to Supabase Storage
    try {
      await supabaseAdmin.storage.createBucket('backups', { public: false });
    } catch (e) {
      // Ignored if already exists
    }

    // Upload JSON
    const { error: uploadErrorJson } = await supabaseAdmin.storage
      .from('backups')
      .upload(fileNameJson, jsonString, {
        contentType: 'application/json',
        upsert: true
      });

    if (uploadErrorJson) {
      console.error('[BACKUP] Supabase JSON upload failed:', uploadErrorJson);
      return NextResponse.json({ success: false, error: uploadErrorJson.message }, { status: 500 });
    }

    // Upload SQL
    const { error: uploadErrorSql } = await supabaseAdmin.storage
      .from('backups')
      .upload(fileNameSql, sqlDump, {
        contentType: 'application/sql',
        upsert: true
      });

    if (uploadErrorSql) {
      console.error('[BACKUP] Supabase SQL upload failed:', uploadErrorSql);
      return NextResponse.json({ success: false, error: uploadErrorSql.message }, { status: 500 });
    }

    // 3. Generate signed URLs for downloads (valid for 7 days)
    const { data: signedUrlDataJson, error: signErrorJson } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameJson, 60 * 60 * 24 * 7);

    const { data: signedUrlDataSql, error: signErrorSql } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameSql, 60 * 60 * 24 * 7);

    if (signErrorJson || !signedUrlDataJson || signErrorSql || !signedUrlDataSql) {
      console.error('[BACKUP] Failed to generate signed URLs:', { signErrorJson, signErrorSql });
      return NextResponse.json({ success: false, error: 'Failed to generate signed URLs' }, { status: 500 });
    }

    // 4. Send report email with download links and attachments
    // Attach files directly if combined size is reasonable (< 10MB)
    const totalSize = jsonString.length + sqlDump.length;
    const attachJson = totalSize < 10 * 1024 * 1024 ? jsonString : undefined;
    const attachSql = totalSize < 10 * 1024 * 1024 ? sqlDump : undefined;

    const emailRes = await sendBackupReportEmail({
      date: dateStr,
      signedUrl: signedUrlDataJson.signedUrl,
      signedUrlSql: signedUrlDataSql.signedUrl,
      stats,
      backupJsonString: attachJson,
      backupSqlString: attachSql
    });

    console.log('[BACKUP] Database backup completed successfully (JSON + SQL). Email sent status:', emailRes.success);
    return NextResponse.json({
      success: true,
      message: 'Backup completed successfully',
      stats,
      fileNameJson,
      fileNameSql
    });
  } catch (error: any) {
    console.error('[BACKUP_ERROR] Unexpected error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
