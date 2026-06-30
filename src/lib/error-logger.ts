import { supabaseAdmin } from './supabaseAdmin';

export async function logSystemError(moduleName: string, error: any) {
  try {
    // 1. S'assurer que le profil 'system_logger' existe
    await supabaseAdmin.from('etudiants').upsert({
      id: 'system_logger',
      email: 'system_logger@ishees.com',
      first_name: 'Système',
      last_name: 'Logs',
      role: 'admin',
      status: 'actif'
    }, { onConflict: 'id' });

    // Extraire le message et la stack trace
    const message = error instanceof Error ? error.message : (typeof error === 'object' ? JSON.stringify(error) : String(error));
    const stack = error instanceof Error ? error.stack : null;

    // 2. Insérer le log dans la table messages
    await supabaseAdmin.from('messages').insert({
      sender_id: 'system_logger',
      type: 'global',
      title: 'system_error',
      content: JSON.stringify({
        module: moduleName,
        message,
        stack,
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    // En cas d'erreur de journalisation, on log dans la console
    console.error('[CRITICAL_LOG_ERROR] Échec de l\'écriture du log d\'erreur en base:', err);
  }
}
