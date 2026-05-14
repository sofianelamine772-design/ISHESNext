-- =====================================================================================
-- FICHIER : UPDATE_PRESENTIEL_CRENEAUX.sql
-- UTILITÉ : Mise en place de la formation UNIQUE présentielle avec 5 créneaux.
-- =====================================================================================

-- 1. Ajout des colonnes de gestion si pas présentes
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS day_of_week text;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS start_time time;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS end_time time;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS capacity_limit integer DEFAULT 20;

-- 2. Nettoyage
DELETE FROM public.classes WHERE type = 'presentiel';

-- 3. Création/Mise à jour de la formation UNIQUE
INSERT INTO public.formations (id, title, slug, price, duration, type) 
VALUES (
    '00000000-0000-0000-0000-000000000001', 
    'Scolarité Présentiel', 
    'presentiel-global', 
    349, 
    'Annuel', 
    'presentiel'
)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, price = EXCLUDED.price;

-- 4. Création des 5 Créneaux (Classes)
INSERT INTO public.classes (name, formation_id, type, day_of_week, capacity_limit)
VALUES 
('Tajwid (Standard)', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Lundi', 20),
('Arabe Adulte', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Mardi', 20),
('Enfants Mercredi', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Mercredi', 20),
('Enfants Samedi', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Samedi', 20),
('Enfants Dimanche', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Dimanche', 20);

-- 5. Recréation de la VUE
DROP VIEW IF EXISTS public.vue_etat_creneaux;
CREATE OR REPLACE VIEW public.vue_etat_creneaux AS
SELECT 
    c.id as class_id,
    c.name as class_name,
    c.day_of_week,
    c.capacity_limit,
    COUNT(i.id) as inscrits_count,
    (c.capacity_limit - COUNT(i.id)) as places_restantes,
    CASE 
        WHEN COUNT(i.id) >= c.capacity_limit THEN true 
        ELSE false 
    END as est_plein
FROM public.classes c
LEFT JOIN public.inscriptions i ON c.id = i.class_id AND i.status IN ('valide', 'actif')
WHERE c.type = 'presentiel'
GROUP BY c.id, c.name, c.day_of_week, c.capacity_limit;
