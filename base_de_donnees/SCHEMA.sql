-- =====================================================================================
-- FICHIER : SCHEMA.sql
-- UTILITÉ : Fichier UNIQUE et complet décrivant la structure complète de la base de données 
--           ISHEECOLE (Élèves, Formations, Classes, Inscriptions, Paiements, Web Push, 
--           Messagerie). Contient toutes les tables, contraintes ON DELETE CASCADE, 
--           index, politiques de sécurité (RLS), ainsi que les données de départ (les 
--           formations et les 31 classes en présentiel avec leurs liens WhatsApp).
-- =====================================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE DES ÉTUDIANTS (Synchronisée avec Clerk)
-- Remarque : La contrainte UNIQUE sur l'email a été supprimée pour permettre
-- aux parents d'inscrire plusieurs enfants (fratrie) sous la même adresse e-mail.
CREATE TABLE IF NOT EXISTS public.etudiants (
    id text PRIMARY KEY, -- Utilise l'ID Clerk
    email text NOT NULL,
    first_name text,
    last_name text,
    phone text,
    photo_url text,
    role text DEFAULT 'eleve' CHECK (role IN ('admin', 'eleve', 'prof')),
    status text DEFAULT 'actif' CHECK (status IN ('actif', 'suspendu', 'en_attente')),
    parent_first_name text,
    parent_last_name text,
    parent_id text REFERENCES public.etudiants(id) ON DELETE CASCADE,
    created_at timestamp WITH time zone DEFAULT now(),
    updated_at timestamp WITH time zone DEFAULT now()
);

-- Index pour accélérer les recherches sur l'e-mail des étudiants
CREATE INDEX IF NOT EXISTS idx_etudiants_email ON public.etudiants(email);

-- 3. TABLE DES FORMATIONS (Le catalogue des offres)
CREATE TABLE IF NOT EXISTS public.formations (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    price numeric(10, 2) NOT NULL,
    duration text, -- e.g. '3 mois', 'Annuel'
    type text CHECK (type IN ('presentiel', 'distanciel')),
    is_active boolean DEFAULT true,
    created_at timestamp WITH time zone DEFAULT now()
);

-- 4. TABLE DES CLASSES (Les groupes et créneaux horaires)
CREATE TABLE IF NOT EXISTS public.classes (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    formation_id uuid REFERENCES public.formations(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text CHECK (type IN ('presentiel', 'distanciel')),
    is_active boolean DEFAULT true,
    day_of_week text,
    start_time time,
    end_time time,
    capacity_limit integer DEFAULT 23,
    niveau text,
    age_condition text,
    periode text,      -- matin | après-midi | soir
    audience text,     -- enfant | adulte
    classe_type text,  -- mixte | femme
    niveau_key text,   -- clé unique de niveau (ex: maternel_1, elementaire_1)
    external_id integer UNIQUE, -- Identifiant numérique unique (ex: 1 à 31)
    whatsapp_link text,         -- Lien vers le groupe WhatsApp de la classe
    created_at timestamp WITH time zone DEFAULT now()
);

-- Index pour lier rapidement les classes à leur formation
CREATE INDEX IF NOT EXISTS idx_classes_formation ON public.classes(formation_id);

-- 5. TABLE DES INSCRIPTIONS (Pont d'inscription d'un élève à une formation / classe)
CREATE TABLE IF NOT EXISTS public.inscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    etudiant_id text REFERENCES public.etudiants(id) ON DELETE CASCADE,
    class_id uuid REFERENCES public.classes(id) ON DELETE CASCADE,
    formation_id uuid REFERENCES public.formations(id) ON DELETE CASCADE,
    status text DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'valide', 'actif', 'annule', 'termine', 'en_attente_daffectation')),
    paid_status text DEFAULT 'impaye' CHECK (paid_status IN ('impaye', 'partiel', 'paye', 'refuse')),
    created_at timestamp WITH time zone DEFAULT now()
);

-- Indexation et contraintes d'unicité pour éviter les doubles inscriptions
CREATE INDEX IF NOT EXISTS idx_inscriptions_class ON public.inscriptions(class_id);
CREATE INDEX IF NOT EXISTS idx_inscriptions_status ON public.inscriptions(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_inscription_formation ON public.inscriptions (etudiant_id, formation_id) WHERE class_id IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_inscription_class ON public.inscriptions (etudiant_id, class_id) WHERE class_id IS NOT NULL;

-- 6. TABLE DES PAIEMENTS (Historique des transactions Stripe)
CREATE TABLE IF NOT EXISTS public.paiements (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    inscription_id uuid REFERENCES public.inscriptions(id) ON DELETE CASCADE,
    etudiant_id text REFERENCES public.etudiants(id) ON DELETE CASCADE,
    stripe_session_id text UNIQUE,
    stripe_payout_id text,
    amount numeric(10, 2) NOT NULL,
    currency text DEFAULT 'EUR',
    status text NOT NULL, -- e.g. 'succeeded', 'failed', 'refunded'
    error_message text,
    created_at timestamp WITH time zone DEFAULT now()
);

-- Indexation des paiements
CREATE INDEX IF NOT EXISTS idx_paiements_stripe_id ON public.paiements(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_paiements_etudiant ON public.paiements(etudiant_id);

-- 7. TABLE DES MESSAGES (Messagerie interne d'administration)
CREATE TABLE IF NOT EXISTS public.messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id text NOT NULL REFERENCES public.etudiants(id) ON DELETE CASCADE,
    receiver_id text REFERENCES public.etudiants(id) ON DELETE CASCADE, -- Optionnel pour broadcast global/classe
    type text DEFAULT 'private' CHECK (type IN ('private', 'class', 'global')),
    title text, -- Titre ou Sujet de l'annonce générale
    content text NOT NULL,
    target_class_id uuid REFERENCES public.classes(id) ON DELETE CASCADE,
    is_read boolean DEFAULT false,
    created_at timestamp WITH time zone DEFAULT now()
);

-- Indexation pour la fluidité des messages
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_type ON public.messages(type);
CREATE INDEX IF NOT EXISTS idx_messages_class ON public.messages(target_class_id);

-- 8. TABLE DES ABONNEMENTS PUSH (Web Push Notifications)
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    etudiant_id text NOT NULL REFERENCES public.etudiants(id) ON DELETE CASCADE,
    endpoint text NOT NULL,
    p256dh text NOT NULL,
    auth text NOT NULL,
    created_at timestamp WITH time zone DEFAULT now(),
    UNIQUE(endpoint)
);

-- =====================================================================================
-- 9. POLITIQUES DE SECURITE (Row Level Security - RLS)
-- =====================================================================================
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

-- =====================================================================================
-- 10. VUES DE MONITORING ET DE STATISTIQUES
-- =====================================================================================
-- Vue pour voir l'état d'occupation en temps réel des 31 classes présentielles
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

-- =====================================================================================
-- 11. CATALOGUE INITIAL DES FORMATIONS
-- =====================================================================================
INSERT INTO public.formations (title, slug, description, price, duration, type) VALUES
('Cours Particuliers', 'cours_particuliers', 'Accompagnement individuel pour adultes et enfants.', 0, 'À la carte', 'distanciel'),
('Correction al Fatiha', 'correction_fatiha', 'Maîtrisez la récitation de la Fatiha et des 3 dernières sourates.', 0, 'Session', 'distanciel'),
('Spiritualité Musulmane', 'spiritualite_islam', 'Éducation de l''âme et préceptes profonds de l''Islam.', 399, '4 mois', 'distanciel'),
('Sîrah An-Nabawiyya', 'as_sirah', 'La vie de la meilleure des créatures.', 250, 'Annuel', 'distanciel'),
('Al-Aqîda', 'al_aqida', 'Étude de la foi sunnite à travers la Tahawiya.', 250, '9 mois', 'distanciel'),
('Mémorisation du Coran', 'memoriser_coran', 'Accompagnement personnalisé pour le Hifz.', 349, 'Annuel', 'distanciel'),
('Sciences du Hadith', 'sciences_hadith', 'Étude de l''authenticité et de la transmission prophétique.', 349, '10 mois', 'distanciel'),
('Tarbiya Islamiya', 'tarbiya_islamiya', 'Éducation spirituelle pour les enfants (6-15 ans).', 249, 'Annuel', 'distanciel'),
('Arabe Littéraire (Adulte)', 'arabe_adulte', 'Maîtrisez la langue arabe moderne et littéraire.', 349, '9 mois', 'distanciel'),
('Tajwid (Standard)', 'tajwid_standard', 'Apprendre à lire le Coran avec les règles de Tajwid.', 349, '8 mois', 'distanciel'),
('Tajwid Intensif', 'tajwid_intensif', '3 mois pour transformer votre lecture du Coran.', 649, '3 mois', 'distanciel'),
('Fiqh Mâlikite', 'fiqh_malikite', 'Étude approfondie du rite malikite (Matn Ibn Achir).', 349, '9 mois', 'distanciel'),
('Sciences Islamiques', 'sciences_islamiques', 'Socle de connaissances solide (Fiqh, Sîrah, Coran).', 349, '8 mois', 'distanciel'),
('Sciences du Coran', 'sciences_du_coran', 'Histoire, compilation et transmission du Livre Saint.', 399, '5 mois', 'distanciel'),
('Cours d''arabe enfant', 'arabe_coran_junior', 'Méthode immersive pour les 4-15 ans.', 480, 'Annuel', 'distanciel'),
('Scolarité Présentiel', 'presentiel-global', 'Accès global aux cursus de l''Institut en présentiel.', 150, 'Annuel', 'presentiel'),
('Présentiel Enfant', 'presentiel-enfant', 'Cursus présentiel pour enfants.', 480, 'Annuel', 'presentiel'),
('Arabe Coran Junior (Présentiel)', 'arabe-coran-junior', 'Méthode immersive présentiel pour les 4-15 ans.', 480, 'Annuel', 'presentiel')
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    duration = EXCLUDED.duration,
    type = EXCLUDED.type;

-- =====================================================================================
-- 12. CATALOGUE INITIAL DES 31 CLASSES PRÉSENTIELLES AVEC LIENS WHATSAPP
-- =====================================================================================
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
