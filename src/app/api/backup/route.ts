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

    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const oneDayAgoUnix = Math.floor(oneDayAgo / 1000);

    const newStudents24h = (etudiants || []).filter(e => new Date(e.created_at).getTime() > oneDayAgo).length;
    
    // Financials
    const paiementsSucceeded = (paiements || []).filter(p => p.status === 'succeeded' || p.status === 'paye' || p.status === 'payé' || p.status === 'paid');
    const totalCollected = paiementsSucceeded.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const totalExpected = (inscriptions || []).reduce((sum, i) => sum + (Number(i.expected_amount) || 0), 0);
    const totalRemaining = totalExpected > totalCollected ? totalExpected - totalCollected : 0;

    let abandonedCheckouts24h = 0;
    try {
      if (process.env.STRIPE_SECRET_KEY) {
        const stripeModule = await import('stripe');
        const stripe = new stripeModule.default(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' as any });
        
        const sessions = await stripe.checkout.sessions.list({
          created: { gte: oneDayAgoUnix },
          limit: 100,
        });
        abandonedCheckouts24h = sessions.data.filter(s => s.status === 'open' || s.status === 'expired').length;
      }
    } catch (err) {
      console.error('[BACKUP] Error fetching Stripe sessions:', err);
    }

    const stats = {
      etudiants: backupData.etudiants.length,
      inscriptions: backupData.inscriptions.length,
      paiements: backupData.paiements.length,
      classes: backupData.classes.length,
      messages: backupData.messages.length,
      newStudents24h,
      totalCollected,
      totalRemaining,
      abandonedCheckouts24h,
    };

    const dateStr = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const fileDateStr = new Date().toISOString().split('T')[0] + '_' + Date.now();
    const fileNameJson = `db_backup_${fileDateStr}.json`;
    const fileNameSql = `db_backup_${fileDateStr}.sql`;
    
    // Generate SQL dump string (using raw data to avoid schema mismatch)
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

    // Enrich etudiants with financial data just for JSON output
    const enrichedEtudiants = backupData.etudiants.map(etudiant => {
      const etudiantPaiements = backupData.paiements.filter((p: any) => p.etudiant_id === etudiant.id && p.status === 'succeeded');
      const etudiantInscriptions = backupData.inscriptions.filter((i: any) => i.etudiant_id === etudiant.id);
      
      const total_encaisse = etudiantPaiements.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
      const montant_attendu = etudiantInscriptions.reduce((sum, i) => sum + (Number(i.expected_amount) || 0), 0);
      const reste_a_payer = montant_attendu > total_encaisse ? montant_attendu - total_encaisse : 0;
      
      return {
        ...etudiant,
        total_encaisse,
        reste_a_payer,
        montant_attendu
      };
    });

    const jsonBackupData = {
      ...backupData,
      etudiants: enrichedEtudiants
    };

    // Generate JSON string with enriched data
    const jsonString = JSON.stringify(jsonBackupData, null, 2);

    // Generate CSV for students only (easy import/recreation)
    const csvHeader = "ID,Nom,Prénom,Email,Téléphone,Role,Status,Montant Attendu,Total Encaissé,Reste à Payer\n";
    const csvRows = enrichedEtudiants.map(e => 
      `"${e.id}","${e.last_name || ''}","${e.first_name || ''}","${e.email || ''}","${e.phone || ''}","${e.role || ''}","${e.status || ''}",${e.montant_attendu || 0},${e.total_encaisse || 0},${e.reste_a_payer || 0}`
    );
    const csvString = csvHeader + csvRows.join('\n');
    const fileNameCsv = `db_backup_${fileDateStr}_etudiants.csv`;

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

    // Upload CSV
    const { error: uploadErrorCsv } = await supabaseAdmin.storage
      .from('backups')
      .upload(fileNameCsv, csvString, {
        contentType: 'text/csv',
        upsert: true
      });

    if (uploadErrorCsv) {
      console.error('[BACKUP] Supabase CSV upload failed:', uploadErrorCsv);
    }

    // 3. Generate signed URLs for downloads (valid for 7 days)
    const { data: signedUrlDataJson, error: signErrorJson } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameJson, 60 * 60 * 24 * 7);

    const { data: signedUrlDataSql, error: signErrorSql } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameSql, 60 * 60 * 24 * 7);

    const { data: signedUrlDataCsv } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameCsv, 60 * 60 * 24 * 7);

    if (signErrorJson || !signedUrlDataJson || signErrorSql || !signedUrlDataSql) {
      console.error('[BACKUP] Failed to generate signed URLs:', { signErrorJson, signErrorSql });
      return NextResponse.json({ success: false, error: 'Failed to generate signed URLs' }, { status: 500 });
    }

    // 4. Send report email with download links and attachments
    // Attach files directly if combined size is reasonable (< 10MB)
    const totalSize = jsonString.length + sqlDump.length + csvString.length;
    const attachJson = totalSize < 10 * 1024 * 1024 ? jsonString : undefined;
    const attachSql = totalSize < 10 * 1024 * 1024 ? sqlDump : undefined;
    const attachCsv = totalSize < 10 * 1024 * 1024 ? csvString : undefined;

    const emailRes = await sendBackupReportEmail({
      date: dateStr,
      signedUrl: signedUrlDataJson.signedUrl,
      signedUrlSql: signedUrlDataSql.signedUrl,
      signedUrlCsv: signedUrlDataCsv?.signedUrl,
      stats,
      backupJsonString: attachJson,
      backupSqlString: attachSql,
      backupCsvString: attachCsv
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
