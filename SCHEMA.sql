-- SCHEMA DATABASE ISHEECOLE PRO
-- Copiez-collez ce contenu dans l'éditeur SQL de Supabase

-- 1. EXTENSIONS (Optionnel mais recommandé)
create extension if not exists "uuid-ossp";

-- 2. TABLE DES ÉTUDIANTS (Synchronisée avec Clerk)
create table public.etudiants (
    id text primary key, -- Utilise l'ID Clerk
    email text unique not null,
    first_name text,
    last_name text,
    phone text,
    photo_url text,
    role text default 'eleve' check (role in ('admin', 'eleve', 'prof')),
    status text default 'actif' check (status in ('actif', 'suspendu', 'en_attente')),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- 3. TABLE DES FORMATIONS (Le catalogue)
create table public.formations (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    slug text unique not null,
    description text,
    price numeric(10, 2) not null,
    duration text, -- e.g. '3 mois', 'Annuel'
    type text check (type in ('presentiel', 'distanciel')),
    is_active boolean default true,
    created_at timestamp with time zone default now()
);

-- 4. TABLE DES CLASSES (Les groupes d'élèves)
create table public.classes (
    id uuid primary key default uuid_generate_v4(),
    formation_id uuid references public.formations(id) on delete cascade,
    name text not null,
    type text check (type in ('presentiel', 'distanciel')),
    is_active boolean default true,
    created_at timestamp with time zone default now()
);

-- 5. TABLE DES INSCRIPTIONS (Lien entre Étudiant et Classe)
create table public.inscriptions (
    id uuid primary key default uuid_generate_v4(),
    etudiant_id text references public.etudiants(id) on delete cascade,
    class_id uuid references public.classes(id) on delete restrict,
    status text default 'en_attente' check (status in ('en_attente', 'valide', 'annule', 'termine')),
    paid_status text default 'impaye' check (paid_status in ('impaye', 'partiel', 'paye', 'refuse')),
    created_at timestamp with time zone default now(),
    
    unique(etudiant_id, class_id)
);

-- 5. TABLE DES PAIEMENTS (Logs Stripe)
create table public.paiements (
    id uuid primary key default uuid_generate_v4(),
    inscription_id uuid references public.inscriptions(id) on delete set null,
    etudiant_id text references public.etudiants(id) on delete cascade,
    stripe_session_id text unique,
    stripe_payout_id text,
    amount numeric(10, 2) not null,
    currency text default 'EUR',
    status text not null, -- e.g. 'succeeded', 'failed', 'refunded'
    error_message text,
    created_at timestamp with time zone default now()
);

-- 6. INDEXATION POUR LES PERFORMANCES
create index idx_etudiants_email on public.etudiants(email);
create index idx_paiements_stripe_id on public.paiements(stripe_session_id);
create index idx_inscriptions_status on public.inscriptions(status);

-- 7. DONNÉES DE DÉPART (Catalogue complet)
insert into public.formations (title, slug, description, price, duration, type) values
('Cours Particuliers', 'cours_particuliers', 'Accompagnement individuel pour adultes et enfants.', 0, 'À la carte', 'distanciel'),
('Correction al Fatiha', 'correction_fatiha', 'Maîtrisez la récitation de la Fatiha et des 3 dernières sourates.', 0, 'Session', 'distanciel'),
('Spiritualité Musulmane', 'spiritualite_islam', 'Éducation de l''âme et préceptes profonds de l''Islam.', 0, 'Continu', 'distanciel'),
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
('Sciences du Coran', 'sciences_du_coran', 'Histoire, compilation et transmission du Livre Saint.', 249, '5 mois', 'distanciel'),
('Cours d''arabe enfant', 'arabe_coran_junior', 'Méthode immersive pour les 4-15 ans.', 349, 'Annuel', 'distanciel'),
('Scolarité Présentiel', 'presentiel-global', 'Accès global aux cursus de l''Institut en présentiel.', 150, 'Annuel', 'presentiel');

-- 8. POLITIQUES DE SÉCURITÉ (RLS)
alter table public.etudiants enable row level security;
alter table public.formations enable row level security;
alter table public.inscriptions enable row level security;
alter table public.paiements enable row level security;

-- Politique : Tout le monde peut voir les formations
create policy "Les formations sont visibles par tous" on public.formations for select using (true);

-- Politique : Un étudiant ne peut voir que ses propres données
create policy "Élèves : Voir son propre profil" on public.etudiants for select using (auth.uid()::text = id);
create policy "Élèves : Voir ses inscriptions" on public.inscriptions for select using (auth.uid()::text = etudiant_id);
create policy "Élèves : Voir ses paiements" on public.paiements for select using (auth.uid()::text = etudiant_id);

-- Politique : L'Admin peut TOUT faire (Via le Service Role utilisé par l'API)
-- Le Service Role bypass déjà le RLS, donc pas besoin de politique spécifique ici.
