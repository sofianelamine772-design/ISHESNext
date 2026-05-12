-- =====================================================================================
-- FICHIER : UPDATE_MESSAGES_V2.sql
-- UTILITÉ : Améliore la table des messages pour supporter les envois groupés (broadcast)
--           par classe ou à tout l'institut, et rajoute des titres pour les mails.
-- =====================================================================================

-- 1. Ajout des colonnes nécessaires
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS type text DEFAULT 'private' CHECK (type IN ('private', 'class', 'global'));
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS target_class_id uuid REFERENCES public.classes(id) ON DELETE CASCADE;

-- 2. Rendre receiver_id optionnel (pour les messages globaux ou de classe)
ALTER TABLE public.messages ALTER COLUMN receiver_id DROP NOT EXISTS;

-- 3. Mise à jour de la politique de sécurité pour que les élèves voient aussi les messages globaux et de leur classe
DROP POLICY IF EXISTS "Voir ses propres messages" ON public.messages;

CREATE POLICY "Voir ses messages et annonces" ON public.messages 
FOR SELECT USING (
    auth.uid()::text = sender_id 
    OR auth.uid()::text = receiver_id 
    OR type = 'global'
    OR (type = 'class' AND target_class_id IN (
        SELECT class_id FROM inscriptions WHERE etudiant_id IN (
            SELECT id FROM etudiants WHERE clerk_id = auth.uid()::text
        )
    ))
);

-- 4. Index pour les performances
CREATE INDEX IF NOT EXISTS idx_messages_type ON public.messages(type);
CREATE INDEX IF NOT EXISTS idx_messages_class ON public.messages(target_class_id);
