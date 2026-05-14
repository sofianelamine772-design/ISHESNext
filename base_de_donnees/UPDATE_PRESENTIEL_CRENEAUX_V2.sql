-- =====================================================================================
-- FICHIER : UPDATE_PRESENTIEL_CRENEAUX_V2.sql
-- UTILITÉ : Architecture Expert - Liaison Vitrine/Logiciel avec limite à 23.
-- =====================================================================================

-- 1. Mise à jour de la structure (au cas où)
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS day_of_week text;
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS capacity_limit integer DEFAULT 23; -- Nouvelle limite à 23

-- 2. Nettoyage des anciennes classes de test présentiel
DELETE FROM public.classes WHERE type = 'presentiel';

-- 3. Formation Unique
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

-- 4. Création des 5 Classes/Créneaux (Logiciel & Vitrine)
-- Ces IDs seront utilisés pour l'affectation automatique
INSERT INTO public.classes (id, name, formation_id, type, day_of_week, capacity_limit)
VALUES 
(gen_random_uuid(), 'Tajwid - Lundi', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Lundi', 23),
(gen_random_uuid(), 'Arabe - Mardi', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Mardi', 23),
(gen_random_uuid(), 'Enfants - Mercredi', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Mercredi', 23),
(gen_random_uuid(), 'Enfants - Samedi', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Samedi', 23),
(gen_random_uuid(), 'Enfants - Dimanche', (SELECT id FROM formations WHERE slug = 'presentiel-global'), 'presentiel', 'Dimanche', 23);

-- 5. Vue de monitoring pour le Logiciel et la Vitrine
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
