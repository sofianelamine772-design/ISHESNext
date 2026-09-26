import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { StripeAccountId } from '@/lib/stripe-accounts';

type PaymentInsert = Record<string, unknown> & {
  stripe_account?: StripeAccountId;
};

/**
 * Insert paiement avec stripe_account si la colonne existe.
 * Fallback sans la colonne (migration pas encore jouée) pour ne pas casser les webhooks.
 */
export async function insertPaiementWithStripeAccount(payload: PaymentInsert) {
  const withAccount = { ...payload };
  const { data, error } = await supabaseAdmin
    .from('paiements')
    .insert(withAccount)
    .select('id')
    .maybeSingle();

  if (!error) return { data, error: null };

  const msg = String(error.message || error.code || '');
  const missingColumn =
    msg.includes('stripe_account') ||
    msg.includes('schema cache') ||
    error.code === 'PGRST204' ||
    error.code === '42703';

  if (!missingColumn) return { data: null, error };

  const { stripe_account: _drop, ...withoutAccount } = withAccount;
  console.warn(
    '[paiements] Colonne stripe_account absente — insert sans tag. Exécuter scripts/add_paiements_stripe_account.sql',
  );
  const retry = await supabaseAdmin
    .from('paiements')
    .insert(withoutAccount)
    .select('id')
    .maybeSingle();
  return { data: retry.data, error: retry.error };
}
