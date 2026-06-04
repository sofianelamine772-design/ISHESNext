-- MIGRATION: Ajout de ON DELETE CASCADE pour rendre la base de données 100% solide

-- 1. Table: inscriptions
ALTER TABLE public.inscriptions DROP CONSTRAINT IF EXISTS inscriptions_etudiant_id_fkey;
ALTER TABLE public.inscriptions 
  ADD CONSTRAINT inscriptions_etudiant_id_fkey 
  FOREIGN KEY (etudiant_id) 
  REFERENCES public.etudiants(id) 
  ON DELETE CASCADE;

ALTER TABLE public.inscriptions DROP CONSTRAINT IF EXISTS inscriptions_class_id_fkey;
ALTER TABLE public.inscriptions 
  ADD CONSTRAINT inscriptions_class_id_fkey 
  FOREIGN KEY (class_id) 
  REFERENCES public.classes(id) 
  ON DELETE CASCADE;

ALTER TABLE public.inscriptions DROP CONSTRAINT IF EXISTS inscriptions_formation_id_fkey;
ALTER TABLE public.inscriptions 
  ADD CONSTRAINT inscriptions_formation_id_fkey 
  FOREIGN KEY (formation_id) 
  REFERENCES public.formations(id) 
  ON DELETE CASCADE;

-- 2. Table: paiements
ALTER TABLE public.paiements DROP CONSTRAINT IF EXISTS paiements_etudiant_id_fkey;
ALTER TABLE public.paiements 
  ADD CONSTRAINT paiements_etudiant_id_fkey 
  FOREIGN KEY (etudiant_id) 
  REFERENCES public.etudiants(id) 
  ON DELETE CASCADE;

ALTER TABLE public.paiements DROP CONSTRAINT IF EXISTS paiements_inscription_id_fkey;
ALTER TABLE public.paiements 
  ADD CONSTRAINT paiements_inscription_id_fkey 
  FOREIGN KEY (inscription_id) 
  REFERENCES public.inscriptions(id) 
  ON DELETE CASCADE;

-- 3. Table: classes (liée à formation_id)
ALTER TABLE public.classes DROP CONSTRAINT IF EXISTS classes_formation_id_fkey;
ALTER TABLE public.classes 
  ADD CONSTRAINT classes_formation_id_fkey 
  FOREIGN KEY (formation_id) 
  REFERENCES public.formations(id) 
  ON DELETE CASCADE;

-- 4. Table: push_subscriptions
ALTER TABLE public.push_subscriptions DROP CONSTRAINT IF EXISTS push_subscriptions_etudiant_id_fkey;
ALTER TABLE public.push_subscriptions 
  ADD CONSTRAINT push_subscriptions_etudiant_id_fkey 
  FOREIGN KEY (etudiant_id) 
  REFERENCES public.etudiants(id) 
  ON DELETE CASCADE;

-- 5. Table: messages (liée à une classe)
ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS messages_target_class_id_fkey;
ALTER TABLE public.messages 
  ADD CONSTRAINT messages_target_class_id_fkey 
  FOREIGN KEY (target_class_id) 
  REFERENCES public.classes(id) 
  ON DELETE CASCADE;

-- 6. Table: etudiants (relation parent/enfant - fratrie)
ALTER TABLE public.etudiants DROP CONSTRAINT IF EXISTS etudiants_parent_id_fkey;
ALTER TABLE public.etudiants 
  ADD CONSTRAINT etudiants_parent_id_fkey 
  FOREIGN KEY (parent_id) 
  REFERENCES public.etudiants(id) 
  ON DELETE CASCADE;
