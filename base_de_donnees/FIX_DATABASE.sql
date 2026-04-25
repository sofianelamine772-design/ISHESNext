-- =====================================================================================
-- FICHIER : FIX_DATABASE.sql
-- UTILITÉ : C'est un fichier de "Mise à Jour" (Patch). Il vient modifier le schéma 
--           principal pour rajouter des fonctionnalités (comme les noms des parents,
--           la création de toutes les classes présentielles "Maternel, Élémentaire",
--           et la gestion des étudiants "en attente d'affectation").
-- À UTILISER QUAND : Seulement si vous avez déjà exécuté SCHEMA.sql et que vous voulez
--                    appliquer les dernières mises à jour du système d'administration.
-- =====================================================================================
-- 1. Ajout de la colonne formation_id à la table inscriptions
-- Utile pour les élèves qui ne sont pas encore affectés à une classe
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS formation_id uuid REFERENCES public.formations(id) ON DELETE SET NULL;

-- 2. Mise à jour de la contrainte de statut pour inclure les nouveaux états
ALTER TABLE public.inscriptions DROP CONSTRAINT IF EXISTS inscriptions_status_check;
ALTER TABLE public.inscriptions ADD CONSTRAINT inscriptions_status_check 
CHECK (status IN ('en_attente', 'valide', 'actif', 'annule', 'termine', 'en_attente_daffectation'));

-- 3. Ajout des colonnes pour les parents dans la table etudiants
ALTER TABLE public.etudiants ADD COLUMN IF NOT EXISTS parent_first_name text;
ALTER TABLE public.etudiants ADD COLUMN IF NOT EXISTS parent_last_name text;

-- 5. CRÉATION DES CLASSES PRÉSENTIELLES (ENFANTS & ADULTES)
-- On crée d'abord une formation générique pour le présentiel si elle n'existe pas
INSERT INTO public.formations (id, title, slug, price, type) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Scolarité Présentiel', 'presentiel-global', 150, 'presentiel')
ON CONFLICT (slug) DO NOTHING;

-- Insertion des classes Enfants
INSERT INTO public.classes (name, type, formation_id) VALUES 
('Maternel 1', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Maternel 2', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 1', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 1+', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 2', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 2+', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 3', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 3+', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 4', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 5', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 6', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Elémentaire 7', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global'));

-- Insertion des classes Adultes
INSERT INTO public.classes (name, type, formation_id) VALUES 
('Femmes Débutantes - Groupe A', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Femmes Débutantes - Groupe B', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global')),
('Femmes Intermédiaires', 'presentiel', (SELECT id FROM formations WHERE slug = 'presentiel-global'));

-- 6. UNIQUE CONSTRAINTS (POUR L'AFFECTATION MANUELLE)
ALTER TABLE public.inscriptions DROP CONSTRAINT IF EXISTS inscriptions_etudiant_id_class_id_key;
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_inscription_formation ON public.inscriptions (etudiant_id, formation_id) WHERE class_id IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_inscription_class ON public.inscriptions (etudiant_id, class_id) WHERE class_id IS NOT NULL;
