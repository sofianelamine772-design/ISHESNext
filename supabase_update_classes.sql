
-- ==========================================
-- ISHEECOLE - MISE À JOUR SYSTÈME DES CLASSES
-- Date : 19/04/2024
-- Objectif : Introduire la gestion des classes et automatiser l'affectation des élèves.
-- ==========================================

-- 1. NETTOYAGE (Pour éviter les conflits lors de la mise à jour)
-- On utilise CASCADE car 'paiements' dépend de 'inscriptions'
DROP TABLE IF EXISTS public.paiements CASCADE;
DROP TABLE IF EXISTS public.inscriptions CASCADE;
DROP TABLE IF EXISTS public.classes CASCADE;

-- 2. CRÉATION DE LA TABLE DES CLASSES
-- Permet de créer des sessions (ex: Session 2024, Groupe A, etc.) rattachées à une formation.
CREATE TABLE public.classes (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    formation_id uuid REFERENCES public.formations(id) ON DELETE CASCADE,
    name text NOT NULL, -- ex: "Session 2024"
    type text CHECK (type IN ('presentiel', 'distanciel')),
    is_active boolean DEFAULT true,
    created_at timestamp WITH time zone DEFAULT now()
);

-- 3. CRÉATION DE LA TABLE DES INSCRIPTIONS (Mise à jour)
-- Elle fait maintenant le pont entre un ÉTUDIANT et une CLASSE spécifique.
CREATE TABLE public.inscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    etudiant_id text REFERENCES public.etudiants(id) ON DELETE CASCADE,
    class_id uuid REFERENCES public.classes(id) ON DELETE RESTRICT,
    status text DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'valide', 'annule', 'termine')),
    paid_status text DEFAULT 'impaye' CHECK (paid_status IN ('impaye', 'partiel', 'paye', 'refuse')),
    created_at timestamp WITH time zone DEFAULT now(),
    
    UNIQUE(etudiant_id, class_id) -- Interdit la double inscription à la même classe
);

-- 4. RÉ-INSTALLATION DE LA TABLE DES PAIEMENTS
-- Log des transactions Stripe relié à l'inscription.
CREATE TABLE public.paiements (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    inscription_id uuid REFERENCES public.inscriptions(id) ON DELETE SET NULL,
    etudiant_id text REFERENCES public.etudiants(id) ON DELETE CASCADE,
    stripe_session_id text UNIQUE,
    stripe_payout_id text,
    amount numeric(10, 2) NOT NULL,
    currency text DEFAULT 'EUR',
    status text NOT NULL, -- e.g. 'succeeded', 'failed', 'refunded'
    error_message text,
    created_at timestamp WITH time zone DEFAULT now()
);

-- 5. OPTIMISATION (Indexation)
-- Pour garantir que le logiciel reste fluide même avec des milliers d'élèves.
CREATE INDEX idx_inscriptions_class ON public.inscriptions(class_id);
CREATE INDEX idx_paiements_etudiant ON public.paiements(etudiant_id);
CREATE INDEX idx_classes_formation ON public.classes(formation_id);

-- 6. PERMISSIONS (Optionnel - S'assurer que RLS est actif)
ALTER TABLE public.etudiants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paiements ENABLE ROW LEVEL SECURITY;

-- Note : L'Admin (via Service Role) a accès à tout par défaut.
-- Création manuelle de quelques classes pour tester l'interface
-- (On suppose que vos formations existent déjà)

INSERT INTO public.classes (formation_id, name, type)
SELECT id, 'Session Automne 2024', type 
FROM public.formations 
LIMIT 3;
