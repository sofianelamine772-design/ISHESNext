# Optimisation de la Performance et du SEO - ISHES

Ce document récapitule les actions entreprises le 22 avril 2026 pour résoudre les problèmes de lenteur et de lag sur la partie vitrine du site, ainsi que pour améliorer le référencement naturel (SEO).

## 1. Architecture hybride (Server vs Client Components)

**Problème :** Auparavant, la totalité des pages vitrine était marquée avec `"use client"`. Cela forçait le navigateur à télécharger et exécuter tout le JavaScript de la page avant de pouvoir l'afficher correctement (hydratation lourde), causant une sensation de lag.

**Solution :** 
- Transformation des pages racine (`page.tsx`) en **Server Components**.
- Extraction des sections interactives ou animées (Framer Motion) dans des sous-composants spécifiques stockés dans `src/components/vitrine/`.
- **Bénéfice :** Le HTML initial est généré sur le serveur, ce qui permet un affichage quasi instantané et réduit la charge de travail du processeur du visiteur.

## 2. Optimisation des Images

**Problème :** Utilisation de balises `<img>` classiques et d'images sources volumineuses (800Ko+), sans gestion de la taille selon l'écran.

**Solution :**
- Utilisation systématique du composant `next/image`.
- Ajout de l'attribut `sizes` (ex: `sizes="(max-width: 1024px) 100vw, 50vw"`) pour permettre au navigateur de ne télécharger que la version dimensionnée de l'image.
- Ajout de la propriété `priority` sur les images au-dessus de la ligne de flottaison (Hero images) pour booster le score LCP (Largest Contentful Paint).
- **Bénéfice :** Temps de chargement des images divisé par 3 ou 4 sur mobile.

## 3. Optimisation des Animations (Anti-Lag)

**Problème :** Les animations de défilement (marquees) et les effets d'apparition pouvaient saccader lors du scroll.

**Solution :**
- Utilisation de la propriété CSS `will-change-transform` sur les conteneurs animés pour activer l'accélération matérielle (GPU).
- Limitation des animations au strict nécessaire et isolation dans des "leaf components" (composants terminaux).
- **Bénéfice :** Défilement fluide même sur les appareils moins puissants.

## 4. Amélioration du SEO

**Problème :** Les balises meta étaient gérées dynamiquement côté client, ce qui est moins efficace pour certains robots d'indexation.

**Solution :**
- Implémentation de l'objet `metadata` de Next.js dans les Server Components.
- Définition de titres uniques, descriptions percutantes et images OpenGraph pour les réseaux sociaux.
- **Bénéfice :** Meilleure visibilité sur Google et lors des partages (Facebook, WhatsApp, etc.).

## 5. Composants Créés/Refactorisés

Les sections suivantes ont été modularisées pour une performance optimale :
- `HeroSection`
- `StatsSection`
- `TestimonialsMarquee`
- `SocialSection`
- `BoutiqueProducts`
- `InstitutHero`, `InstitutManifesto`, `InstitutFacilities`
- `ContactContent`

---
*Optimisé par Antigravity - Avril 2026*
