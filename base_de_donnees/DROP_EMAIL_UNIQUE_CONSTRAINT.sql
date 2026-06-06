-- =====================================================================================
-- FICHIER : DROP_EMAIL_UNIQUE_CONSTRAINT.sql
-- UTILITÉ : Supprime la contrainte UNIQUE sur l'adresse email de la table etudiants.
--           Cela permet d'inscrire plusieurs enfants (fratrie) avec la même adresse email
--           sans conflit de base de données.
-- À EXÉCUTER : Dans le SQL Editor de votre tableau de bord Supabase.
-- =====================================================================================

-- 1. Supprimer la contrainte unique sur l'e-mail de la table etudiants
ALTER TABLE public.etudiants DROP CONSTRAINT IF EXISTS etudiants_email_key CASCADE;

-- 2. Supprimer l'index unique sur l'email s'il a été créé de manière autonome
DROP INDEX IF EXISTS public.etudiants_email_key;

-- 3. Mettre à jour l'e-mail de Zakaria pour enlever le suffixe temporaire si nécessaire
-- (Optionnel, au cas où Zakaria s'était inscrit avec le suffixe '+zakaria')
UPDATE public.etudiants 
SET email = 'benilias757@gmail.com' 
WHERE email = 'benilias757+zakaria@gmail.com';

-- 4. Vérifier les contraintes actuelles sur la table etudiants
SELECT conname, contype 
FROM pg_constraint 
WHERE conrelid = 'public.etudiants'::regclass;
