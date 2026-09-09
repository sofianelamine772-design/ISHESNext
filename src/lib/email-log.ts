import { supabaseAdmin } from './supabaseAdmin';
import { htmlToPlainText } from './email-html';

export const EMAIL_ARCHIVE_ID = 'email_archive';
export const SYSTEM_LOGGER_ID = 'system_logger';

export type EmailLogStatus = 'sent' | 'failed';

export type EmailLogEntry = {
  id?: string;
  created_at?: string;
  campaign_id?: string | null;
  recipient_email: string;
  recipient_name?: string | null;
  student_id?: string | null;
  subject: string;
  content_html?: string | null;
  content_text?: string | null;
  type?: string | null;
  status: EmailLogStatus;
  smtp_message_id?: string | null;
  error?: string | null;
};

function normalizeEmail(email: string): string {
  return (email || '').trim().toLowerCase();
}

async function ensureArchiveProfile() {
  await supabaseAdmin.from('etudiants').upsert({
    id: EMAIL_ARCHIVE_ID,
    email: 'email_archive@ishes.local',
    first_name: 'Archive',
    last_name: 'E-mails',
    role: 'admin',
    status: 'suspendu',
  }, { onConflict: 'id' });
}

function parseArchiveMessage(row: any): EmailLogEntry | null {
  if (!row) return null;
  try {
    const parsed = JSON.parse(row.content || '{}');
    if (!parsed?.recipient_email && !parsed?.subject) return null;
    return {
      id: row.id,
      created_at: parsed.created_at || row.created_at,
      campaign_id: parsed.campaign_id || null,
      recipient_email: parsed.recipient_email,
      recipient_name: parsed.recipient_name || null,
      student_id: parsed.student_id || null,
      subject: parsed.subject || row.title || '',
      content_html: parsed.content_html || null,
      content_text: parsed.content_text || null,
      type: parsed.type || null,
      status: parsed.status === 'failed' ? 'failed' : 'sent',
      smtp_message_id: parsed.smtp_message_id || null,
      error: parsed.error || null,
    };
  } catch {
    return null;
  }
}

export async function hasSentEmail(params: {
  recipientEmail: string;
  type: string;
  status?: EmailLogStatus;
}): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('email_logs')
    .select('id')
    .eq('recipient_email', normalizeEmail(params.recipientEmail))
    .eq('type', params.type)
    .eq('status', params.status || 'sent')
    .limit(1)
    .maybeSingle();

  return !error && !!data;
}

export async function recordEmailLog(entry: EmailLogEntry) {
  const payload: EmailLogEntry = {
    ...entry,
    recipient_email: normalizeEmail(entry.recipient_email),
    content_text: entry.content_text || htmlToPlainText(entry.content_html || ''),
    created_at: entry.created_at || new Date().toISOString(),
  };

  const { error: tableError } = await supabaseAdmin.from('email_logs').insert({
    campaign_id: payload.campaign_id || null,
    recipient_email: payload.recipient_email,
    recipient_name: payload.recipient_name || null,
    student_id: payload.student_id || null,
    subject: payload.subject,
    content_html: payload.content_html || null,
    content_text: payload.content_text || null,
    type: payload.type || 'system',
    status: payload.status,
    smtp_message_id: payload.smtp_message_id || null,
    error: payload.error ? String(payload.error).slice(0, 2000) : null,
  });

  if (!tableError) return;

  try {
    await ensureArchiveProfile();
    const { error: archiveError } = await supabaseAdmin.from('messages').insert({
      sender_id: EMAIL_ARCHIVE_ID,
      receiver_id: EMAIL_ARCHIVE_ID,
      type: 'private',
      title: payload.subject,
      content: JSON.stringify(payload),
    });
    if (archiveError) {
      console.error('[EMAIL_LOG] Impossible d\'archiver l\'e-mail:', tableError, archiveError);
    }
  } catch (fallbackError) {
    console.error('[EMAIL_LOG] Impossible d\'archiver l\'e-mail:', tableError, fallbackError);
  }
}

export async function fetchEmailLogs(params?: { query?: string; limit?: number }) {
  const limit = Math.min(Math.max(params?.limit || 400, 1), 1000);
  const query = (params?.query || '').trim().toLowerCase();

  const { data: tableRows, error: tableError } = await supabaseAdmin
    .from('email_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  let entries: EmailLogEntry[] = [];

  if (!tableError && tableRows) {
    entries = tableRows as EmailLogEntry[];
  } else {
    const { data: archiveRows } = await supabaseAdmin
      .from('messages')
      .select('id, title, content, created_at')
      .eq('sender_id', EMAIL_ARCHIVE_ID)
      .eq('receiver_id', EMAIL_ARCHIVE_ID)
      .eq('type', 'private')
      .order('created_at', { ascending: false })
      .limit(limit);

    entries = (archiveRows || []).map(parseArchiveMessage).filter(Boolean) as EmailLogEntry[];
  }

  if (!query) return entries;

  return entries.filter((entry) => {
    const haystack = [
      entry.recipient_email,
      entry.recipient_name,
      entry.subject,
      entry.content_text,
      entry.smtp_message_id,
      entry.type,
    ].join(' ').toLowerCase();
    return haystack.includes(query);
  });
}
