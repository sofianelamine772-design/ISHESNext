-- =====================================================================================
-- FICHIER : SETUP_CLASSES_PRESENTIEL.sql
-- UTILITÉ : Remplace les 5 classes génériques par les 31 classes EXACTES de l'Institut.
--           Ce script est IDEMPOTENT (safe à rejouer plusieurs fois).
-- À EXÉCUTER : Dans Supabase → SQL Editor
-- =====================================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- ÉTAPE 0 : Ajouter les colonnes manquantes si elles n'existent pas encore
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS day_of_week    text;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS start_time     time;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS end_time       time;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS capacity_limit integer DEFAULT 23;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS niveau         text;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS age_condition  text;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS periode        text;   -- matin | après-midi | soir
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS audience       text;   -- enfant | adulte
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS classe_type    text;   -- mixte | femme
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS niveau_key     text;   -- clé unique (ex: elementaire_1)
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS external_id    integer UNIQUE; -- ID numérique correspondant au frontend

-- ─────────────────────────────────────────────────────────────────────────────
-- ÉTAPE 1 : S'assurer que la formation présentielle existe
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.formations (title, slug, description, price, duration, type)
VALUES (
    'Scolarité Présentiel',
    'presentiel-global',
    'Accès global aux cursus enfants et adultes de l''Institut en présentiel à Toulouse.',
    150,
    'Annuel',
    'presentiel'
)
ON CONFLICT (slug) DO UPDATE SET
    title       = EXCLUDED.title,
    description = EXCLUDED.description,
    price       = EXCLUDED.price;

-- ─────────────────────────────────────────────────────────────────────────────
-- ÉTAPE 2 : Supprimer UNIQUEMENT les anciennes classes présentiel génériques
--           (celles sans external_id = données de test)
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM public.classes
WHERE type = 'presentiel'
  AND external_id IS NULL;

-- ─────────────────────────────────────────────────────────────────────────────
-- ÉTAPE 3 : Insérer/Mettre à jour les 31 classes (upsert sur external_id)
-- ─────────────────────────────────────────────────────────────────────────────
WITH formation AS (
    SELECT id FROM public.formations WHERE slug = 'presentiel-global'
)
INSERT INTO public.classes
    (formation_id, name, type, is_active,
     day_of_week, periode, niveau, age_condition, audience, classe_type,
     niveau_key, capacity_limit, external_id)
VALUES

-- ══════════════════════════════════════════════════════════════
-- BLOC 1 – PRÉPARATOIRE 1ère ANNÉE (4-6 ans)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Prépa 1 – Mercredi',       'presentiel', true, 'Mercredi',  'après-midi', 'Préparatoire 1ère année', '4-6 ans',     'enfant', 'mixte', 'maternel_1',         23, 1),
((SELECT id FROM formation), 'Prépa 1 – Samedi Matin',   'presentiel', true, 'Samedi',    'matin',       'Préparatoire 1ère année', '4-6 ans',     'enfant', 'mixte', 'maternel_1',         23, 2),
((SELECT id FROM formation), 'Prépa 1 – Samedi A-M',     'presentiel', true, 'Samedi',    'après-midi',  'Préparatoire 1ère année', '4-6 ans',     'enfant', 'mixte', 'maternel_1',         23, 3),
((SELECT id FROM formation), 'Prépa 1 – Dimanche Matin', 'presentiel', true, 'Dimanche',  'matin',       'Préparatoire 1ère année', '4-6 ans',     'enfant', 'mixte', 'maternel_1',         23, 4),

-- ══════════════════════════════════════════════════════════════
-- BLOC 2 – PRÉPARATOIRE 2ème ANNÉE (5-6 ans)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Prépa 2 – Mercredi',       'presentiel', true, 'Mercredi',  'après-midi', 'Préparatoire 2ème année', '5-6 ans',     'enfant', 'mixte', 'maternel_2',         23, 5),
((SELECT id FROM formation), 'Prépa 2 – Samedi Matin',   'presentiel', true, 'Samedi',    'matin',       'Préparatoire 2ème année', '5-6 ans',     'enfant', 'mixte', 'maternel_2',         23, 6),
((SELECT id FROM formation), 'Prépa 2 – Dimanche Matin', 'presentiel', true, 'Dimanche',  'matin',       'Préparatoire 2ème année', '5-6 ans',     'enfant', 'mixte', 'maternel_2',         23, 7),

-- ══════════════════════════════════════════════════════════════
-- BLOC 3 – ÉLÉMENTAIRE DÉBUTANT 1 (7-14 ans)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Élémentaire Déb.1 – Mercredi',       'presentiel', true, 'Mercredi', 'après-midi', 'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 8),
((SELECT id FROM formation), 'Élémentaire Déb.1 – Samedi Matin',   'presentiel', true, 'Samedi',   'matin',       'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 9),
((SELECT id FROM formation), 'Élémentaire Déb.1 – Samedi A-M',     'presentiel', true, 'Samedi',   'après-midi',  'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 10),
((SELECT id FROM formation), 'Élémentaire Déb.1 – Dimanche Matin', 'presentiel', true, 'Dimanche', 'matin',       'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 11),
((SELECT id FROM formation), 'Élémentaire Déb.1 – Dimanche A-M',   'presentiel', true, 'Dimanche', 'après-midi',  'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 12),

-- ══════════════════════════════════════════════════════════════
-- BLOC 4 – ÉLÉMENTAIRE 1+ (NON débutant)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Élémentaire 1+ – Mercredi',       'presentiel', true, 'Mercredi', 'après-midi', 'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 13),
((SELECT id FROM formation), 'Élémentaire 1+ – Samedi Matin',   'presentiel', true, 'Samedi',   'matin',       'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 14),
((SELECT id FROM formation), 'Élémentaire 1+ – Samedi A-M',     'presentiel', true, 'Samedi',   'après-midi',  'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 15),
((SELECT id FROM formation), 'Élémentaire 1+ – Dimanche Matin', 'presentiel', true, 'Dimanche', 'matin',       'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 16),
((SELECT id FROM formation), 'Élémentaire 1+ – Dimanche A-M',   'presentiel', true, 'Dimanche', 'après-midi',  'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 17),

-- ══════════════════════════════════════════════════════════════
-- BLOC 5 – ÉLÉMENTAIRE 2 et 2+ (7-14 ans)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Élémentaire 2 et 2+ – Mercredi',    'presentiel', true, 'Mercredi', 'après-midi', 'Élémentaire 2 et 2+', '7-14 ans', 'enfant', 'mixte', 'elementaire_2', 23, 18),
((SELECT id FROM formation), 'Élémentaire 2 – Dimanche Matin',    'presentiel', true, 'Dimanche', 'matin',       'Élémentaire 2',       '7-14 ans', 'enfant', 'mixte', 'elementaire_2', 23, 19),
((SELECT id FROM formation), 'Élémentaire 2 – Dimanche A-M',      'presentiel', true, 'Dimanche', 'après-midi',  'Élémentaire 2',       '7-14 ans', 'enfant', 'mixte', 'elementaire_2', 23, 20),

-- ══════════════════════════════════════════════════════════════
-- BLOC 6 – ÉLÉMENTAIRE 2+ (7-14 ans)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Élémentaire 2+ – Dimanche A-M', 'presentiel', true, 'Dimanche', 'après-midi', 'Élémentaire 2+', '7-14 ans', 'enfant', 'mixte', 'elementaire_2_plus', 23, 21),

-- ══════════════════════════════════════════════════════════════
-- BLOC 7 – ÉLÉMENTAIRE 3 (7-14 ans)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Élémentaire 3 – Dimanche A-M',   'presentiel', true, 'Dimanche', 'après-midi', 'Élémentaire 3',       '7-14 ans', 'enfant', 'mixte', 'elementaire_3', 23, 22),
((SELECT id FROM formation), 'Élémentaire 3 et 3+ – Mercredi', 'presentiel', true, 'Mercredi', 'après-midi', 'Élémentaire 3 et 3+', '7-12 ans', 'enfant', 'mixte', 'elementaire_3', 23, 23),

-- ══════════════════════════════════════════════════════════════
-- BLOC 8 – ÉLÉMENTAIRE 4 & 5 (7-15 ans)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Élémentaire 4 – Dimanche A-M', 'presentiel', true, 'Dimanche', 'après-midi', 'Élémentaire 4', '7-14 ans', 'enfant', 'mixte', 'elementaire_4', 23, 24),
((SELECT id FROM formation), 'Élémentaire 5 – Dimanche A-M', 'presentiel', true, 'Dimanche', 'après-midi', 'Élémentaire 5', '7-15 ans', 'enfant', 'mixte', 'elementaire_5', 23, 25),

-- ══════════════════════════════════════════════════════════════
-- BLOC 9 – FEMMES (26-31)
-- ══════════════════════════════════════════════════════════════
((SELECT id FROM formation), 'Femme Débutante – Arabe + Tajwid',   'presentiel', true, 'Dimanche', 'matin',       'Femme débutante ARABE + TAJWID', 'Femme', 'adulte', 'femme', 'femme_debutante',     23, 26),
((SELECT id FROM formation), 'Femme Débutante – Tajwid Seul',      'presentiel', true, 'Dimanche', 'matin',       'Femme débutante TAJWID SEUL',    'Femme', 'adulte', 'femme', 'femme_debutante',     23, 27),
((SELECT id FROM formation), 'Femme Débutante – Arabe Seul',       'presentiel', true, 'Dimanche', 'matin',       'Femme débutante ARABE SEUL',     'Femme', 'adulte', 'femme', 'femme_debutante',     23, 28),
((SELECT id FROM formation), 'Femme Intermédiaire – Arabe',        'presentiel', true, 'Samedi',   'matin',       'Femme intermédiaire ARABE',      'Femme', 'adulte', 'femme', 'femme_intermediaire', 23, 29),
((SELECT id FROM formation), 'Femme Intermédiaire – Tajwid',       'presentiel', true, 'Samedi',   'matin',       'Femme intermédiaire TAJWID',     'Femme', 'adulte', 'femme', 'femme_intermediaire', 23, 30),
((SELECT id FROM formation), 'Femme Intermédiaire – Arabe + Taj.', 'presentiel', true, 'Samedi',   'après-midi',  'Femme intermédiaire ARABE + TAJ','Femme', 'adulte', 'femme', 'femme_intermediaire', 23, 31)

ON CONFLICT (external_id) DO UPDATE SET
    name          = EXCLUDED.name,
    day_of_week   = EXCLUDED.day_of_week,
    periode       = EXCLUDED.periode,
    niveau        = EXCLUDED.niveau,
    age_condition = EXCLUDED.age_condition,
    audience      = EXCLUDED.audience,
    classe_type   = EXCLUDED.classe_type,
    niveau_key    = EXCLUDED.niveau_key,
    capacity_limit= EXCLUDED.capacity_limit,
    is_active     = EXCLUDED.is_active;

-- ─────────────────────────────────────────────────────────────────────────────
-- ÉTAPE 4 : Recréer la vue admin (etat des créneaux)
-- ─────────────────────────────────────────────────────────────────────────────
DROP VIEW IF EXISTS public.vue_etat_creneaux;
CREATE OR REPLACE VIEW public.vue_etat_creneaux AS
SELECT
    c.external_id                                       AS classe_numero,
    c.id                                                AS class_id,
    c.name                                              AS class_name,
    c.niveau,
    c.age_condition,
    c.day_of_week,
    c.periode,
    c.audience,
    c.classe_type,
    c.niveau_key,
    c.capacity_limit,
    COUNT(i.id)                                         AS inscrits_count,
    (c.capacity_limit - COUNT(i.id))                    AS places_restantes,
    CASE
        WHEN COUNT(i.id) >= c.capacity_limit THEN true
        ELSE false
    END                                                 AS est_plein
FROM public.classes c
LEFT JOIN public.inscriptions i
    ON c.id = i.class_id
    AND i.status IN ('valide', 'actif')
WHERE c.type = 'presentiel'
GROUP BY
    c.external_id, c.id, c.name, c.niveau, c.age_condition,
    c.day_of_week, c.periode, c.audience, c.classe_type,
    c.niveau_key, c.capacity_limit
ORDER BY c.external_id;

-- ─────────────────────────────────────────────────────────────────────────────
-- VÉRIFICATION FINALE : Doit retourner 31 lignes
-- ─────────────────────────────────────────────────────────────────────────────
SELECT classe_numero, class_name, niveau, day_of_week, periode, audience, capacity_limit
FROM vue_etat_creneaux
ORDER BY classe_numero;
