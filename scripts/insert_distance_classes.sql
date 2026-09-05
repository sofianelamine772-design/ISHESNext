-- Script SQL pour insérer les nouvelles classes à distance pour les enfants
-- Copiez-collez ce script dans l'éditeur SQL de votre tableau de bord Supabase et exécutez-le.

INSERT INTO public.classes (id, formation_id, name, type, capacity_limit, niveau, audience, classe_type, academic_year, is_active)
VALUES 
-- Arabe Enfant
('e0a12345-0001-4000-8000-111111111111', (SELECT id FROM formations WHERE slug = 'arabe_enfant_distance' LIMIT 1), 'Arabe Enfant - Niveau 1', 'distanciel', 15, 'Niveau 1', 'enfant', 'mixte', '2026-2027', true),
('e0a12345-0002-4000-8000-222222222222', (SELECT id FROM formations WHERE slug = 'arabe_enfant_distance' LIMIT 1), 'Arabe Enfant - Niveau 2', 'distanciel', 15, 'Niveau 2', 'enfant', 'mixte', '2026-2027', true),
('e0a12345-0003-4000-8000-333333333333', (SELECT id FROM formations WHERE slug = 'arabe_enfant_distance' LIMIT 1), 'Arabe Enfant - Niveau 3', 'distanciel', 15, 'Niveau 3', 'enfant', 'mixte', '2026-2027', true),

-- Tajwid Enfant
('e0a12345-0004-4000-8000-444444444444', (SELECT id FROM formations WHERE slug = 'tajwid_enfant_distance' LIMIT 1), 'Tajwid Enfant - Niveau 1', 'distanciel', 15, 'Niveau 1', 'enfant', 'mixte', '2026-2027', true),
('e0a12345-0005-4000-8000-555555555555', (SELECT id FROM formations WHERE slug = 'tajwid_enfant_distance' LIMIT 1), 'Tajwid Enfant - Niveau 2', 'distanciel', 15, 'Niveau 2', 'enfant', 'mixte', '2026-2027', true),
('e0a12345-0006-4000-8000-666666666666', (SELECT id FROM formations WHERE slug = 'tajwid_enfant_distance' LIMIT 1), 'Tajwid Enfant - Niveau 3', 'distanciel', 15, 'Niveau 3', 'enfant', 'mixte', '2026-2027', true),

-- Tarbya Islamya
('e0a12345-0007-4000-8000-777777777777', (SELECT id FROM formations WHERE slug = 'tarbiya_islamiya' LIMIT 1), 'Tarbya Islamya - 1ère année', 'distanciel', 15, '1ère année', 'enfant', 'mixte', '2026-2027', true),
('e0a12345-0008-4000-8000-888888888888', (SELECT id FROM formations WHERE slug = 'tarbiya_islamiya' LIMIT 1), 'Tarbya Islamya - 2ème année', 'distanciel', 15, '2ème année', 'enfant', 'mixte', '2026-2027', true)
ON CONFLICT (id) DO NOTHING;
