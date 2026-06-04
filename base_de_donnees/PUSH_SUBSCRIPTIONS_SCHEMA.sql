CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    etudiant_id text NOT NULL REFERENCES public.etudiants(id) ON DELETE CASCADE,
    endpoint text NOT NULL,
    p256dh text NOT NULL,
    auth text NOT NULL,
    created_at timestamp WITH time zone DEFAULT now(),
    UNIQUE(endpoint)
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Les élèves peuvent gérer leurs abonnements" ON public.push_subscriptions 
FOR ALL USING (auth.uid()::text = etudiant_id) WITH CHECK (auth.uid()::text = etudiant_id);
