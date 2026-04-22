
-- TABLE DES MESSAGES POUR LA COMMUNICATION ADMIN/ÉLÈVES
CREATE TABLE IF NOT EXISTS public.messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id text NOT NULL, -- ID Clerk de l'expéditeur
    receiver_id text NOT NULL, -- ID Clerk du destinataire
    content text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp WITH time zone DEFAULT now()
);

-- Index pour accélérer la récupération des conversations
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);

-- RLS (Security)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir les messages qu'ils ont envoyés ou reçus
CREATE POLICY "Voir ses propres messages" ON public.messages 
FOR SELECT USING (auth.uid()::text = sender_id OR auth.uid()::text = receiver_id);

-- L'admin (via service role) peut tout faire.
