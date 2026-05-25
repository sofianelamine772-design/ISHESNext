-- =====================================================================================
-- FICHIER : ADD_WHATSAPP_CLASS.sql
-- UTILITÉ : Ajoute le lien WhatsApp de groupe à chaque classe présentielle
-- À EXÉCUTER : Dans Supabase → SQL Editor (après SETUP_CLASSES_PRESENTIEL.sql)
-- =====================================================================================

-- Ajouter la colonne whatsapp_link si elle n'existe pas
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS whatsapp_link text;

-- ─────────────────────────────────────────────────────────────────────────────
-- Mettre à jour les liens WhatsApp pour chaque classe (external_id)
-- Remplace les liens ci-dessous par tes vrais liens de groupe WhatsApp
-- Format : https://chat.whatsapp.com/XXXXXXXXXXXXXXXXXXXXX
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_01' WHERE external_id = 1;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_02' WHERE external_id = 2;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_03' WHERE external_id = 3;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_04' WHERE external_id = 4;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_05' WHERE external_id = 5;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_06' WHERE external_id = 6;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_07' WHERE external_id = 7;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_08' WHERE external_id = 8;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_09' WHERE external_id = 9;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_10' WHERE external_id = 10;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_11' WHERE external_id = 11;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_12' WHERE external_id = 12;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_13' WHERE external_id = 13;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_14' WHERE external_id = 14;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_15' WHERE external_id = 15;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_16' WHERE external_id = 16;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_17' WHERE external_id = 17;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_18' WHERE external_id = 18;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_19' WHERE external_id = 19;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_20' WHERE external_id = 20;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_21' WHERE external_id = 21;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_22' WHERE external_id = 22;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_23' WHERE external_id = 23;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_24' WHERE external_id = 24;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_25' WHERE external_id = 25;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_26' WHERE external_id = 26;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_27' WHERE external_id = 27;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_28' WHERE external_id = 28;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_29' WHERE external_id = 29;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_30' WHERE external_id = 30;
UPDATE public.classes SET whatsapp_link = 'https://chat.whatsapp.com/GROUPE_CLASSE_31' WHERE external_id = 31;

-- Vérification
SELECT external_id, name, day_of_week, periode, whatsapp_link
FROM public.classes
WHERE type = 'presentiel'
ORDER BY external_id;
