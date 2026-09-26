import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendBackupReportEmail } from '@/lib/mail';
import {
  pickBillingInscriptions,
  pickBillingPayments,
  resolveBillingExpectedAmount,
  sumSucceededBillingPayments,
  sumSucceededPaymentsBySource,
} from '@/lib/pricing';
import { getCurrentAcademicYear } from '@/lib/utils';

const ACTIVE_INSCRIPTION_STATUSES = new Set([
  'valide',
  'actif',
  'en_attente',
  'en_attente_daffectation',
]);

function isPresentielFormation(formation?: { type?: string | null; title?: string | null } | null): boolean {
  if (!formation) return false;
  const title = String(formation.title || '').toLowerCase();
  return (
    formation.type === 'presentiel' ||
    title.includes('présentiel') ||
    title.includes('presentiel')
  );
}

async function fetchAllRows<T>(table: string): Promise<T[]> {
  const pageSize = 1000;
  const rows: T[] = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .range(from, from + pageSize - 1);
    if (error) throw error;
    const chunk = (data || []) as T[];
    rows.push(...chunk);
    if (chunk.length < pageSize) break;
  }
  return rows;
}

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

    // 1. Fetch data from all tables (paginated — Supabase cap 1000/requête)
    const [
      etudiants,
      formations,
      classes,
      inscriptions,
      paiements,
      messages,
      pushSubscriptions,
    ] = await Promise.all([
      fetchAllRows<any>('etudiants'),
      fetchAllRows<any>('formations'),
      fetchAllRows<any>('classes'),
      fetchAllRows<any>('inscriptions'),
      fetchAllRows<any>('paiements'),
      fetchAllRows<any>('messages'),
      fetchAllRows<any>('push_subscriptions'),
    ]);

    const backupData = {
      backup_version: '1.2',
      backup_date: new Date().toISOString(),
      etudiants,
      formations,
      classes,
      inscriptions,
      paiements,
      messages,
      push_subscriptions: pushSubscriptions,
    };

    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const oneDayAgoUnix = Math.floor(oneDayAgo / 1000);
    
    let totalCollectedDistance = 0;
    let totalExpectedDistance = 0;
    let totalCollectedPresentiel = 0;
    let totalExpectedPresentiel = 0;
    let totalCollectedStripeDistance = 0;
    let totalCollectedManualDistance = 0;
    let totalCollectedStripePresentiel = 0;
    let totalCollectedManualPresentiel = 0;
    
    // We will compute the exact financials later after filtering students
    let newStudents24h = 0;
    
    let abandonedCheckouts24h = 0;
    try {
      const { getStripeClient, isPresentielStripeConfigured } = await import('@/lib/stripe-accounts');
      const accounts = isPresentielStripeConfigured()
        ? (['distanciel', 'presentiel'] as const)
        : (['distanciel'] as const);
      for (const account of accounts) {
        const stripe = getStripeClient(account, { legacyApi: true });
        const sessions = await stripe.checkout.sessions.list({
          created: { gte: oneDayAgoUnix },
          limit: 100,
        });
        abandonedCheckouts24h += sessions.data.filter(s => s.status === 'open' || s.status === 'expired').length;
      }
    } catch (err) {
      console.error('[BACKUP] Error fetching Stripe sessions:', err);
    }

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
    const studentsById = new Map((backupData.etudiants || []).map((e: any) => [e.id, e]));
    const formationsById = new Map((backupData.formations || []).map((f: any) => [f.id, f]));
    const classesById = new Map((backupData.classes || []).map((c: any) => [c.id, c]));
    const currentYear = getCurrentAcademicYear();

    const enrichedEtudiants = backupData.etudiants.map((etudiant: any) => {
      const getBillingStudent = (id: string) => {
        const s = studentsById.get(id) || etudiant;
        return { firstName: s.first_name, lastName: s.last_name, email: s.email };
      };

      const etudiantInscriptions = pickBillingInscriptions(
        (backupData.inscriptions || [])
          .filter((i: any) => i.etudiant_id === etudiant.id)
          .map((i: any) => {
            const formation = formationsById.get(i.formation_id);
            return {
              ...i,
              formation_title: formation?.title || null,
              academic_year: i.academic_year || currentYear,
            };
          }),
        getBillingStudent,
      );
      const etudiantPaiements = pickBillingPayments(
        (backupData.paiements || []).filter((p: any) => p.etudiant_id === etudiant.id),
        getBillingStudent,
      );

      const total_encaisse = sumSucceededBillingPayments(etudiantPaiements);
      const bySource = sumSucceededPaymentsBySource(etudiantPaiements);
      const montant_attendu = etudiantInscriptions.reduce((sum: number, i: any) => {
        const formation = formationsById.get(i.formation_id);
        return sum + resolveBillingExpectedAmount(i.expected_amount, formation?.price);
      }, 0);
      const reste_a_payer = Math.max(0, montant_attendu - total_encaisse);

      const stripeSessions = etudiantPaiements.map((p: any) => p.stripe_session_id).filter(Boolean);
      const stripe_session_id = stripeSessions.length > 0 ? stripeSessions[0] : '';

      const activeInscriptions = (backupData.inscriptions || []).filter(
        (i: any) =>
          i.etudiant_id === etudiant.id &&
          ACTIVE_INSCRIPTION_STATUSES.has(String(i.status || '')),
      );
      const isPresentiel = activeInscriptions.some((i: any) =>
        isPresentielFormation(formationsById.get(i.formation_id)),
      );
      const isDistanciel = activeInscriptions.some((i: any) => {
        const formation = formationsById.get(i.formation_id);
        return formation && !isPresentielFormation(formation);
      });

      const labelInscription =
        activeInscriptions.find((i: any) =>
          isPresentiel
            ? isPresentielFormation(formationsById.get(i.formation_id))
            : formationsById.get(i.formation_id),
        ) || activeInscriptions[0];
      let formationName = 'Aucune formation';
      if (labelInscription?.formation_id) {
        formationName =
          formationsById.get(labelInscription.formation_id)?.title || formationName;
      }
      if (labelInscription?.class_id) {
        formationName = classesById.get(labelInscription.class_id)?.name || formationName;
      }

      return {
        ...etudiant,
        total_encaisse,
        encaisse_stripe: bySource.stripe,
        encaisse_manuel: bySource.manual,
        reste_a_payer,
        montant_attendu,
        stripe_session_id,
        formation_ou_classe: formationName,
        _billingBucket:
          isPresentiel ? 'presentiel' : isDistanciel ? 'distanciel' : null,
      };
    });

    const jsonBackupData = {
      ...backupData,
      etudiants: enrichedEtudiants.map(({ _billingBucket, ...rest }) => rest),
    };

    // Generate JSON string with enriched data
    const jsonString = JSON.stringify(jsonBackupData, null, 2);

    // Filter out tests and admins and deleted
    const realEtudiants = enrichedEtudiants.filter(e => {
      if (e.role === 'admin') return false;
      if (e.status === 'deleted') return false; // Ignorer les supprimés
      const em = (e.email || '').toLowerCase();
      const fn = (e.first_name || '').toLowerCase();
      const ln = (e.last_name || '').toLowerCase();
      if (em.includes('test') || fn.includes('test') || ln.includes('test') || em.includes('system_')) return false;
      if (em.includes('email_archive') || e.id === 'email_archive') return false;
      return true;
    });

    newStudents24h = realEtudiants.filter(e => new Date(e.created_at).getTime() > oneDayAgo).length;

    const distanceEtudiants: any[] = [];
    const presentielEtudiants: any[] = [];

    for (const e of realEtudiants) {
      // Uniquement les élèves avec une inscription active (évite de gonfler « distance » avec les fiches vides)
      if (e._billingBucket === 'presentiel') {
        presentielEtudiants.push(e);
        totalCollectedPresentiel += (e.total_encaisse || 0);
        totalExpectedPresentiel += (e.montant_attendu || 0);
        totalCollectedStripePresentiel += (e.encaisse_stripe || 0);
        totalCollectedManualPresentiel += (e.encaisse_manuel || 0);
      } else if (e._billingBucket === 'distanciel') {
        distanceEtudiants.push(e);
        totalCollectedDistance += (e.total_encaisse || 0);
        totalExpectedDistance += (e.montant_attendu || 0);
        totalCollectedStripeDistance += (e.encaisse_stripe || 0);
        totalCollectedManualDistance += (e.encaisse_manuel || 0);
      }
    }

    const totalRemainingDistance = totalExpectedDistance > totalCollectedDistance ? totalExpectedDistance - totalCollectedDistance : 0;
    const totalRemainingPresentiel = totalExpectedPresentiel > totalCollectedPresentiel ? totalExpectedPresentiel - totalCollectedPresentiel : 0;

    const stats = {
      etudiants: realEtudiants.length, // Only count real students in stats
      etudiantsDistance: distanceEtudiants.length,
      etudiantsPresentiel: presentielEtudiants.length,
      inscriptions: backupData.inscriptions.length,
      paiements: backupData.paiements.length,
      classes: backupData.classes.length,
      messages: backupData.messages.length,
      newStudents24h,
      totalCollectedDistance,
      totalCollectedStripeDistance,
      totalCollectedManualDistance,
      totalRemainingDistance,
      totalExpectedDistance,
      totalCollectedPresentiel,
      totalCollectedStripePresentiel,
      totalCollectedManualPresentiel,
      totalRemainingPresentiel,
      totalExpectedPresentiel,
      abandonedCheckouts24h,
    };

    const csvHeader = "ID,Nom,Prénom,Email,Téléphone,Formation / Classe,Status,Montant Attendu,Encaissé Stripe,Encaissé Manuel,Total Encaissé,Reste à Payer,Stripe Session ID\n";
    
    const escapeCsv = (str: string) => {
        if (!str) return '""';
        return `"${str.replace(/"/g, '""')}"`;
    };

    const distanceRows = distanceEtudiants.map(e => 
      `"${e.id}",${escapeCsv(e.last_name)},${escapeCsv(e.first_name)},${escapeCsv(e.email)},${escapeCsv(e.phone)},${escapeCsv(e.formation_ou_classe)},"${e.status || ''}",${e.montant_attendu || 0},${e.encaisse_stripe || 0},${e.encaisse_manuel || 0},${e.total_encaisse || 0},${e.reste_a_payer || 0},${escapeCsv(e.stripe_session_id)}`
    );
    const csvStringDistance = csvHeader + distanceRows.join('\n');
    const fileNameCsvDistance = `db_backup_${fileDateStr}_etudiants_distance.csv`;

    const presentielRows = presentielEtudiants.map(e => 
      `"${e.id}",${escapeCsv(e.last_name)},${escapeCsv(e.first_name)},${escapeCsv(e.email)},${escapeCsv(e.phone)},${escapeCsv(e.formation_ou_classe)},"${e.status || ''}",${e.montant_attendu || 0},${e.encaisse_stripe || 0},${e.encaisse_manuel || 0},${e.total_encaisse || 0},${e.reste_a_payer || 0},${escapeCsv(e.stripe_session_id)}`
    );
    const csvStringPresentiel = csvHeader + presentielRows.join('\n');
    const fileNameCsvPresentiel = `db_backup_${fileDateStr}_etudiants_presentiel.csv`;

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

    // Upload CSV Distance
    const { error: uploadErrorCsvDistance } = await supabaseAdmin.storage
      .from('backups')
      .upload(fileNameCsvDistance, csvStringDistance, {
        contentType: 'text/csv',
        upsert: true
      });

    if (uploadErrorCsvDistance) {
      console.error('[BACKUP] Supabase CSV Distance upload failed:', uploadErrorCsvDistance);
    }

    // Upload CSV Presentiel
    const { error: uploadErrorCsvPresentiel } = await supabaseAdmin.storage
      .from('backups')
      .upload(fileNameCsvPresentiel, csvStringPresentiel, {
        contentType: 'text/csv',
        upsert: true
      });

    if (uploadErrorCsvPresentiel) {
      console.error('[BACKUP] Supabase CSV Presentiel upload failed:', uploadErrorCsvPresentiel);
    }

    // 3. Generate signed URLs for downloads (valid for 7 days)
    const { data: signedUrlDataJson, error: signErrorJson } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameJson, 60 * 60 * 24 * 7);

    const { data: signedUrlDataSql, error: signErrorSql } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameSql, 60 * 60 * 24 * 7);

    const { data: signedUrlDataCsvDistance } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameCsvDistance, 60 * 60 * 24 * 7);

    const { data: signedUrlDataCsvPresentiel } = await supabaseAdmin.storage
      .from('backups')
      .createSignedUrl(fileNameCsvPresentiel, 60 * 60 * 24 * 7);

    if (signErrorJson || !signedUrlDataJson || signErrorSql || !signedUrlDataSql) {
      console.error('[BACKUP] Failed to generate signed URLs:', { signErrorJson, signErrorSql });
      return NextResponse.json({ success: false, error: 'Failed to generate signed URLs' }, { status: 500 });
    }

    // 4. Send report email with download links and attachments
    // Attach files directly if combined size is reasonable (< 10MB)
    const totalSize = jsonString.length + sqlDump.length + csvStringDistance.length + csvStringPresentiel.length;
    const attachJson = totalSize < 10 * 1024 * 1024 ? jsonString : undefined;
    const attachSql = totalSize < 10 * 1024 * 1024 ? sqlDump : undefined;
    const attachCsvDistance = totalSize < 10 * 1024 * 1024 ? csvStringDistance : undefined;
    const attachCsvPresentiel = totalSize < 10 * 1024 * 1024 ? csvStringPresentiel : undefined;

    const emailRes = await sendBackupReportEmail({
      date: dateStr,
      signedUrl: signedUrlDataJson.signedUrl,
      signedUrlSql: signedUrlDataSql.signedUrl,
      signedUrlCsvDistance: signedUrlDataCsvDistance?.signedUrl,
      signedUrlCsvPresentiel: signedUrlDataCsvPresentiel?.signedUrl,
      stats,
      backupJsonString: attachJson,
      backupSqlString: attachSql,
      backupCsvStringDistance: attachCsvDistance,
      backupCsvStringPresentiel: attachCsvPresentiel
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
