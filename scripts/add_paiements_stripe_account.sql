-- Double Stripe ISHES : taguer le compte d'encaissement sur chaque paiement.
-- À exécuter UNE FOIS dans Supabase → SQL Editor.
--
-- Facturation / impayés / partiel / payé : AUCUN autre changement DB.
-- Ces statuts restent calculés via amount + expected_amount (déjà en place).

alter table public.paiements
  add column if not exists stripe_account text;

comment on column public.paiements.stripe_account is
  'Compte Stripe: distanciel | presentiel. NULL = historique distanciel (avant split).';

-- Historique existant = tout était sur Stripe Distance
update public.paiements
set stripe_account = 'distanciel'
where stripe_account is null
  and stripe_session_id is not null
  and stripe_session_id not like 'manual_%';

create index if not exists idx_paiements_stripe_account
  on public.paiements (stripe_account);
