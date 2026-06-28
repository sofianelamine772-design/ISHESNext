-- =====================================================================================
-- SCHEMA DE LA BASE DE DONNEES ISHES (V3 - CLÉ EN MAIN ET PRÊT À L'EMPLOI)
-- =====================================================================================
-- Ce script est 100 % autonome. Il peut être copié-collé directement dans le
-- SQL Editor d'un nouveau projet Supabase pour recréer l'ensemble de la base
-- de données nécessaire au fonctionnement du logiciel.
-- =====================================================================================

-- ─────────────────────────────────────────────────────────────────────────────────────
-- 1. EXTENSIONS REQUISES
-- ─────────────────────────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────────────────
-- 2. CRÉATION DES TABLES APPLICATIVES (ORDRE RESPECTANT LES CONTRAINTES)
-- ─────────────────────────────────────────────────────────────────────────────────────

-- Table : etudiants
CREATE TABLE IF NOT EXISTS public.etudiants (
    id text NOT NULL,
    email text NOT NULL,
    first_name text,
    last_name text,
    phone text,
    role text DEFAULT 'eleve'::text CHECK (role = ANY (ARRAY['admin'::text, 'eleve'::text, 'prof'::text])),
    status text DEFAULT 'actif'::text CHECK (status = ANY (ARRAY['actif'::text, 'suspendu'::text, 'en_attente'::text])),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    clerk_user_id text UNIQUE,
    CONSTRAINT etudiants_pkey PRIMARY KEY (id),
    CONSTRAINT etudiants_email_unique UNIQUE (email)
);

-- Table : formations
CREATE TABLE IF NOT EXISTS public.formations (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    description text,
    price numeric NOT NULL,
    duration text,
    type text CHECK (type = ANY (ARRAY['presentiel'::text, 'distanciel'::text])),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT formations_pkey PRIMARY KEY (id)
);

-- Table : classes
CREATE TABLE IF NOT EXISTS public.classes (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    formation_id uuid,
    name text NOT NULL,
    type text CHECK (type = ANY (ARRAY['presentiel'::text, 'distanciel'::text])),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    day_of_week text,
    start_time time without time zone,
    end_time time without time zone,
    capacity_limit integer DEFAULT 20,
    niveau text,
    age_condition text,
    periode text,
    audience text,
    classe_type text,
    niveau_key text,
    external_id integer UNIQUE,
    whatsapp_link text,
    academic_year text DEFAULT '2023-2024'::text,
    CONSTRAINT classes_pkey PRIMARY KEY (id),
    CONSTRAINT classes_formation_id_fkey FOREIGN KEY (formation_id) REFERENCES public.formations(id) ON DELETE CASCADE
);

-- Table : inscriptions
CREATE TABLE IF NOT EXISTS public.inscriptions (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    etudiant_id text,
    class_id uuid,
    status text DEFAULT 'en_attente'::text CHECK (status = ANY (ARRAY['en_attente'::text, 'valide'::text, 'actif'::text, 'annule'::text, 'termine'::text, 'en_attente_daffectation'::text])),
    paid_status text DEFAULT 'impaye'::text CHECK (paid_status = ANY (ARRAY['impaye'::text, 'partiel'::text, 'paye'::text, 'refuse'::text])),
    created_at timestamp with time zone DEFAULT now(),
    formation_id uuid,
    academic_year text DEFAULT '2023-2024'::text,
    CONSTRAINT inscriptions_pkey PRIMARY KEY (id),
    CONSTRAINT inscriptions_etudiant_id_fkey FOREIGN KEY (etudiant_id) REFERENCES public.etudiants(id) ON DELETE CASCADE,
    CONSTRAINT inscriptions_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE SET NULL,
    CONSTRAINT inscriptions_formation_id_fkey FOREIGN KEY (formation_id) REFERENCES public.formations(id) ON DELETE CASCADE
);

-- Table : paiements
CREATE TABLE IF NOT EXISTS public.paiements (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    inscription_id uuid,
    etudiant_id text,
    stripe_session_id text UNIQUE,
    stripe_payout_id text,
    amount numeric(10, 2) NOT NULL,
    currency text DEFAULT 'EUR'::text,
    status text NOT NULL,
    error_message text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT paiements_pkey PRIMARY KEY (id),
    CONSTRAINT paiements_etudiant_id_fkey FOREIGN KEY (etudiant_id) REFERENCES public.etudiants(id) ON DELETE CASCADE,
    CONSTRAINT paiements_inscription_id_fkey FOREIGN KEY (inscription_id) REFERENCES public.inscriptions(id) ON DELETE CASCADE
);

-- Table : messages
CREATE TABLE IF NOT EXISTS public.messages (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    sender_id text NOT NULL,
    receiver_id text,
    content text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    type text DEFAULT 'private'::text CHECK (type = ANY (ARRAY['private'::text, 'class'::text, 'global'::text])),
    title text,
    target_class_id uuid,
    CONSTRAINT messages_pkey PRIMARY KEY (id),
    CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.etudiants(id) ON DELETE CASCADE,
    CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.etudiants(id) ON DELETE CASCADE,
    CONSTRAINT messages_target_class_id_fkey FOREIGN KEY (target_class_id) REFERENCES public.classes(id) ON DELETE CASCADE
);

-- Table : push_subscriptions
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    etudiant_id text NOT NULL,
    endpoint text NOT NULL UNIQUE,
    p256dh text NOT NULL,
    auth text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id),
    CONSTRAINT push_subscriptions_etudiant_id_fkey FOREIGN KEY (etudiant_id) REFERENCES public.etudiants(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────────────────
-- 3. INDEXATION (OPTIMISATION DES LECTURES ET REQUÊTES RELATIONNELLES)
-- ─────────────────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_etudiants_email ON public.etudiants(email);
CREATE INDEX IF NOT EXISTS idx_etudiants_clerk ON public.etudiants(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_classes_formation ON public.classes(formation_id);
CREATE INDEX IF NOT EXISTS idx_inscriptions_etudiant ON public.inscriptions(etudiant_id);
CREATE INDEX IF NOT EXISTS idx_inscriptions_class ON public.inscriptions(class_id);
CREATE INDEX IF NOT EXISTS idx_inscriptions_status ON public.inscriptions(status);
CREATE INDEX IF NOT EXISTS idx_paiements_stripe_id ON public.paiements(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_paiements_etudiant ON public.paiements(etudiant_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_type ON public.messages(type);
CREATE INDEX IF NOT EXISTS idx_messages_class ON public.messages(target_class_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_inscription_formation ON public.inscriptions (etudiant_id, formation_id) WHERE class_id IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_inscription_class ON public.inscriptions (etudiant_id, class_id) WHERE class_id IS NOT NULL;

-- ─────────────────────────────────────────────────────────────────────────────────────
-- 4. POLITIQUES DE SECURITE (Row Level Security - RLS)
-- ─────────────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.etudiants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paiements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Politiques Formations
CREATE POLICY "Les formations sont visibles par tous" ON public.formations FOR SELECT USING (true);

-- Politiques Étudiants
CREATE POLICY "Élèves : Voir son propre profil" ON public.etudiants FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Élèves : Gérer son propre profil" ON public.etudiants FOR ALL USING (auth.uid()::text = id) WITH CHECK (auth.uid()::text = id);

-- Politiques Inscriptions
CREATE POLICY "Élèves : Voir ses inscriptions" ON public.inscriptions FOR SELECT USING (auth.uid()::text = etudiant_id);

-- Politiques Paiements
CREATE POLICY "Élèves : Voir ses paiements" ON public.paiements FOR SELECT USING (auth.uid()::text = etudiant_id);

-- Politiques Messages (Annonces et Chats privés)
CREATE POLICY "Voir ses messages et annonces" ON public.messages 
FOR SELECT USING (
    auth.uid()::text = sender_id 
    OR auth.uid()::text = receiver_id 
    OR type = 'global'
    OR (type = 'class' AND target_class_id IN (
        SELECT class_id FROM inscriptions WHERE etudiant_id = auth.uid()::text
    ))
);
CREATE POLICY "Envoi de messages" ON public.messages FOR INSERT WITH CHECK (auth.uid()::text = sender_id);

-- Politiques Push Subscriptions
CREATE POLICY "Les élèves peuvent gérer leurs abonnements" ON public.push_subscriptions 
FOR ALL USING (auth.uid()::text = etudiant_id) WITH CHECK (auth.uid()::text = etudiant_id);

-- ─────────────────────────────────────────────────────────────────────────────────────
-- 5. VUES DE MONITORING ET DE STATISTIQUES
-- ─────────────────────────────────────────────────────────────────────────────────────
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
    c.niveau_key, c.capacity_limit;

-- ─────────────────────────────────────────────────────────────────────────────────────
-- 6. SEEDING / RENSEIGNEMENT DU CATALOGUE INITIAL DES FORMATIONS
-- ─────────────────────────────────────────────────────────────────────────────────────
INSERT INTO public.formations (title, slug, description, price, duration, type) VALUES
('Cours Particuliers', 'cours_particuliers', 'Accompagnement individuel pour adultes et enfants.', 0, 'À la carte', 'distanciel'),
('Correction al Fatiha', 'correction_fatiha', 'Maîtrisez la récitation de la Fatiha et des 3 dernières sourates.', 0, 'Session', 'distanciel'),
('Spiritualité Musulmane', 'spiritualite_islam', 'Éducation de l''âme et préceptes profonds de l''Islam.', 399, '4 mois', 'distanciel'),
('Sîrah An-Nabawiyya', 'as_sirah', 'La vie de la meilleure des créatures.', 250, 'Annuel', 'distanciel'),
('Al-Aqîda', 'al_aqida', 'Étude de la foi sunnite à travers la Tahawiya.', 399, '4 mois', 'distanciel'),
('Mémorisation du Coran', 'memoriser_coran', 'Accompagnement personnalisé pour le Hifz.', 399, 'Annuel', 'distanciel'),
('Sciences du Hadith', 'sciences_hadith', 'Étude de l''authenticité et de la transmission prophétique.', 349, '10 mois', 'distanciel'),
('Tarbiya Islamiya', 'tarbiya_islamiya', 'Éducation spirituelle pour les enfants (6-15 ans).', 399, 'Annuel', 'distanciel'),
('Arabe Littéraire (Adulte)', 'arabe_adulte', 'Maîtrisez la langue arabe moderne et littéraire.', 649, '9 mois', 'distanciel'),
('Tajwid (Standard)', 'tajwid_standard', 'Apprendre à lire le Coran avec les règles de Tajwid.', 349, '8 mois', 'distanciel'),
('Tajwid Intensif', 'tajwid_intensif', '3 mois pour transformer votre lecture du Coran.', 799, '3 mois', 'distanciel'),
('Fiqh Mâlikite', 'fiqh_malikite', 'Étude approfondie du rite malikite (Matn Ibn Achir).', 399, '9 mois', 'distanciel'),
('Sciences Islamiques', 'sciences_islamiques', 'Socle de connaissances solide (Fiqh, Sîrah, Coran).', 349, '8 mois', 'distanciel'),
('Sciences du Coran', 'sciences_du_coran', 'Histoire, compilation et transmission du Livre Saint.', 399, '5 mois', 'distanciel'),
('Cours d''arabe enfant', 'arabe_coran_junior', 'Méthode immersive pour les 4-15 ans.', 480, 'Annuel', 'distanciel'),
('Scolarité Présentiel', 'presentiel-global', 'Accès global aux cursus de l''Institut en présentiel.', 480, 'Annuel', 'presentiel'),
('Présentiel Enfant', 'presentiel-enfant', 'Cursus présentiel pour enfants.', 480, 'Annuel', 'presentiel'),
('Arabe Coran Junior (Présentiel)', 'arabe-coran-junior', 'Méthode immersive présentiel pour les 4-15 ans.', 480, 'Annuel', 'presentiel')
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    duration = EXCLUDED.duration,
    type = EXCLUDED.type;

-- ─────────────────────────────────────────────────────────────────────────────────────
-- 7. SEEDING / RENSEIGNEMENT DES 31 CLASSES PRÉSENTIELLES AVEC LIENS WHATSAPP
-- ─────────────────────────────────────────────────────────────────────────────────────
WITH formation AS (
    SELECT id FROM public.formations WHERE slug = 'presentiel-global'
)
INSERT INTO public.classes
    (formation_id, name, type, is_active,
     day_of_week, periode, niveau, age_condition, audience, classe_type,
     niveau_key, capacity_limit, external_id, whatsapp_link)
VALUES
-- BLOC 1 – PRÉPARATOIRE 1ère ANNÉE (4-6 ans)
((SELECT id FROM formation), 'Prépa 1 – Mercredi',       'presentiel', true, 'Mercredi',  'après-midi', 'Préparatoire 1ère année', '4-6 ans',     'enfant', 'mixte', 'maternel_1',         23, 1,  'https://chat.whatsapp.com/GROUPE_CLASSE_01'),
((SELECT id FROM formation), 'Prépa 1 – Samedi Matin',   'presentiel', true, 'Samedi',    'matin',       'Préparatoire 1ère année', '4-6 ans',     'enfant', 'mixte', 'maternel_1',         23, 2,  'https://chat.whatsapp.com/GROUPE_CLASSE_02'),
((SELECT id FROM formation), 'Prépa 1 – Samedi A-M',     'presentiel', true, 'Samedi',    'après-midi',  'Préparatoire 1ère année', '4-6 ans',     'enfant', 'mixte', 'maternel_1',         23, 3,  'https://chat.whatsapp.com/GROUPE_CLASSE_03'),
((SELECT id FROM formation), 'Prépa 1 – Dimanche Matin', 'presentiel', true, 'Dimanche',  'matin',       'Préparatoire 1ère année', '4-6 ans',     'enfant', 'mixte', 'maternel_1',         23, 4,  'https://chat.whatsapp.com/GROUPE_CLASSE_04'),

-- BLOC 2 – PRÉPARATOIRE 2ème ANNÉE (5-6 ans)
((SELECT id FROM formation), 'Prépa 2 – Mercredi',       'presentiel', true, 'Mercredi',  'après-midi', 'Préparatoire 2ème année', '5-6 ans',     'enfant', 'mixte', 'maternel_2',         23, 5,  'https://chat.whatsapp.com/GROUPE_CLASSE_05'),
((SELECT id FROM formation), 'Prépa 2 – Samedi Matin',   'presentiel', true, 'Samedi',    'matin',       'Préparatoire 2ème année', '5-6 ans',     'enfant', 'mixte', 'maternel_2',         23, 6,  'https://chat.whatsapp.com/GROUPE_CLASSE_06'),
((SELECT id FROM formation), 'Prépa 2 – Dimanche Matin', 'presentiel', true, 'Dimanche',  'matin',       'Préparatoire 2ème année', '5-6 ans',     'enfant', 'mixte', 'maternel_2',         23, 7,  'https://chat.whatsapp.com/GROUPE_CLASSE_07'),

-- BLOC 3 – ÉLÉMENTAIRE DÉBUTANT 1 (7-14 ans)
((SELECT id FROM formation), 'Élémentaire Déb.1 – Mercredi',       'presentiel', true, 'Mercredi', 'après-midi', 'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 8,  'https://chat.whatsapp.com/GROUPE_CLASSE_08'),
((SELECT id FROM formation), 'Élémentaire Déb.1 – Samedi Matin',   'presentiel', true, 'Samedi',   'matin',       'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 9,  'https://chat.whatsapp.com/GROUPE_CLASSE_09'),
((SELECT id FROM formation), 'Élémentaire Déb.1 – Samedi A-M',     'presentiel', true, 'Samedi',   'après-midi',  'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 10, 'https://chat.whatsapp.com/GROUPE_CLASSE_10'),
((SELECT id FROM formation), 'Élémentaire Déb.1 – Dimanche Matin', 'presentiel', true, 'Dimanche', 'matin',       'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 11, 'https://chat.whatsapp.com/GROUPE_CLASSE_11'),
((SELECT id FROM formation), 'Élémentaire Déb.1 – Dimanche A-M',   'presentiel', true, 'Dimanche', 'après-midi',  'Élémentaire Débutant 1', '7-14 ans', 'enfant', 'mixte', 'elementaire_1', 23, 12, 'https://chat.whatsapp.com/GROUPE_CLASSE_12'),

-- BLOC 4 – ÉLÉMENTAIRE 1+ (NON débutant)
((SELECT id FROM formation), 'Élémentaire 1+ – Mercredi',       'presentiel', true, 'Mercredi', 'après-midi', 'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 13, 'https://chat.whatsapp.com/GROUPE_CLASSE_13'),
((SELECT id FROM formation), 'Élémentaire 1+ – Samedi Matin',   'presentiel', true, 'Samedi',   'matin',       'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 14, 'https://chat.whatsapp.com/GROUPE_CLASSE_14'),
((SELECT id FROM formation), 'Élémentaire 1+ – Samedi A-M',     'presentiel', true, 'Samedi',   'après-midi',  'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 15, 'https://chat.whatsapp.com/GROUPE_CLASSE_15'),
((SELECT id FROM formation), 'Élémentaire 1+ – Dimanche Matin', 'presentiel', true, 'Dimanche', 'matin',       'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 16, 'https://chat.whatsapp.com/GROUPE_CLASSE_16'),
((SELECT id FROM formation), 'Élémentaire 1+ – Dimanche A-M',   'presentiel', true, 'Dimanche', 'après-midi',  'Élémentaire 1+', 'NON débutant', 'enfant', 'mixte', 'elementaire_1_plus', 23, 17, 'https://chat.whatsapp.com/GROUPE_CLASSE_17'),

-- BLOC 5 – ÉLÉMENTAIRE 2 et 2+ (7-14 ans)
((SELECT id FROM formation), 'Élémentaire 2 et 2+ – Mercredi',    'presentiel', true, 'Mercredi', 'après-midi', 'Élémentaire 2 et 2+', '7-14 ans', 'enfant', 'mixte', 'elementaire_2', 23, 18, 'https://chat.whatsapp.com/GROUPE_CLASSE_18'),
((SELECT id FROM formation), 'Élémentaire 2 – Dimanche Matin',    'presentiel', true, 'Dimanche', 'matin',       'Élémentaire 2',       '7-14 ans', 'enfant', 'mixte', 'elementaire_2', 23, 19, 'https://chat.whatsapp.com/GROUPE_CLASSE_19'),
((SELECT id FROM formation), 'Élémentaire 2 – Dimanche A-M',      'presentiel', true, 'Dimanche', 'après-midi',  'Élémentaire 2',       '7-14 ans', 'enfant', 'mixte', 'elementaire_2', 23, 20, 'https://chat.whatsapp.com/GROUPE_CLASSE_20'),

-- BLOC 6 – ÉLÉMENTAIRE 2+ (7-14 ans)
((SELECT id FROM formation), 'Élémentaire 2+ – Dimanche A-M', 'presentiel', true, 'Dimanche', 'après-midi', 'Élémentaire 2+', '7-14 ans', 'enfant', 'mixte', 'elementaire_2_plus', 23, 21, 'https://chat.whatsapp.com/GROUPE_CLASSE_21'),

-- BLOC 7 – ÉLÉMENTAIRE 3 (7-14 ans)
((SELECT id FROM formation), 'Élémentaire 3 – Dimanche A-M',   'presentiel', true, 'Dimanche', 'après-midi', 'Élémentaire 3',       '7-14 ans', 'enfant', 'mixte', 'elementaire_3', 23, 22, 'https://chat.whatsapp.com/GROUPE_CLASSE_22'),
((SELECT id FROM formation), 'Élémentaire 3 et 3+ – Mercredi', 'presentiel', true, 'Mercredi', 'après-midi', 'Élémentaire 3 et 3+', '7-12 ans', 'enfant', 'mixte', 'elementaire_3', 23, 23, 'https://chat.whatsapp.com/GROUPE_CLASSE_23'),

-- BLOC 8 – ÉLÉMENTAIRE 4 & 5 (7-15 ans)
((SELECT id FROM formation), 'Élémentaire 4 – Dimanche A-M', 'presentiel', true, 'Dimanche', 'après-midi', 'Élémentaire 4', '7-14 ans', 'enfant', 'mixte', 'elementaire_4', 23, 24, 'https://chat.whatsapp.com/GROUPE_CLASSE_24'),
((SELECT id FROM formation), 'Élémentaire 5 – Dimanche A-M', 'presentiel', true, 'Dimanche', 'après-midi', 'Élémentaire 5', '7-15 ans', 'enfant', 'mixte', 'elementaire_5', 23, 25, 'https://chat.whatsapp.com/GROUPE_CLASSE_25'),

-- BLOC 9 – FEMMES
((SELECT id FROM formation), 'Femme Débutante – Arabe + Tajwid',   'presentiel', true, 'Dimanche', 'matin',       'Femme débutante ARABE + TAJWID', 'Femme', 'adulte', 'femme', 'femme_debutante',     23, 26, 'https://chat.whatsapp.com/GROUPE_CLASSE_26'),
((SELECT id FROM formation), 'Femme Débutante – Tajwid Seul',      'presentiel', true, 'Dimanche', 'matin',       'Femme débutante TAJWID SEUL',    'Femme', 'adulte', 'femme', 'femme_debutante',     23, 27, 'https://chat.whatsapp.com/GROUPE_CLASSE_27'),
((SELECT id FROM formation), 'Femme Débutante – Arabe Seul',       'presentiel', true, 'Dimanche', 'matin',       'Femme débutante ARABE SEUL',     'Femme', 'adulte', 'femme', 'femme_debutante',     23, 28, 'https://chat.whatsapp.com/GROUPE_CLASSE_28'),
((SELECT id FROM formation), 'Femme Intermédiaire – Arabe',        'presentiel', true, 'Samedi',   'matin',       'Femme intermédiaire ARABE',      'Femme', 'adulte', 'femme', 'femme_intermediaire', 23, 29, 'https://chat.whatsapp.com/GROUPE_CLASSE_29'),
((SELECT id FROM formation), 'Femme Intermédiaire – Tajwid',       'presentiel', true, 'Samedi',   'matin',       'Femme intermédiaire TAJWID',     'Femme', 'adulte', 'femme', 'femme_intermediaire', 23, 30, 'https://chat.whatsapp.com/GROUPE_CLASSE_30'),
((SELECT id FROM formation), 'Femme Intermédiaire – Arabe + Taj.', 'presentiel', true, 'Samedi',   'après-midi',  'Femme intermédiaire ARABE + TAJ','Femme', 'adulte', 'femme', 'femme_intermediaire', 23, 31, 'https://chat.whatsapp.com/GROUPE_CLASSE_31')
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
    whatsapp_link = EXCLUDED.whatsapp_link,
    is_active     = EXCLUDED.is_active;
