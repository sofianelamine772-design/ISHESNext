-- Plafond préparatoire 1 et 2 : 13 élèves.
-- Ne touche PAS à l'élémentaire (8–23) ni aux femmes (24–25).
-- Les classes déjà à 14/15 gardent leurs élèves ; le site bloque les nouvelles inscriptions à 13.
-- L'admin peut toujours ajouter manuellement au-delà.

-- 1) Vérifier d'abord ce qui sera modifié :
SELECT external_id, name, niveau_key, capacity_limit
FROM public.classes
WHERE type = 'presentiel'
  AND external_id BETWEEN 1 AND 7
  AND niveau_key IN ('maternel_1', 'maternel_2')
ORDER BY external_id;

-- 2) Puis appliquer (7 lignes max : prépa 1 + prépa 2 uniquement) :
UPDATE public.classes
SET capacity_limit = 13
WHERE type = 'presentiel'
  AND external_id BETWEEN 1 AND 7
  AND niveau_key IN ('maternel_1', 'maternel_2');
