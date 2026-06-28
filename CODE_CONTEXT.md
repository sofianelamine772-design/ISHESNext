# Guide de Contexte de Code & Processus de Développement

Ce document sert de référence technique pour maintenir la solidité de l'application ISHES, exécuter les tests, et comprendre les flux clés lors des modifications de code ou de base de données.

---

## 1. Structure de la Base de Données

Toute modification de la base de données doit suivre ce processus :

1.  **Fichier de Référence** : Mettre à jour en priorité le fichier [SCHEMA_DB_V3.sql](file:///Users/elamine/Desktop/ISHES/base_de_donnees/SCHEMA_DB_V3.sql). C'est le schéma complet de référence pour toute installation neuve.
2.  **Changements en Production** : 
    *   Exécuter les requêtes SQL correspondantes dans le **SQL Editor Supabase** de votre projet live.
    *   Indiquer clairement les requêtes SQL à exécuter dans vos notes de version ou dans les canaux de communication de l'équipe.
3.  **Tarifs des Formations** : Les tarifs en BDD (`public.formations`) doivent être **strictement identiques** à ceux de la vitrine définis dans [programs-data.ts](file:///Users/elamine/Desktop/ISHES/src/lib/programs-data.ts).

### Exemple de Requête SQL d'alignement des Tarifs :
```sql
-- Exemple de mise à jour manuelle
UPDATE public.formations SET price = 399 WHERE slug = 'spiritualite_islam';
```

---

## 2. Règle d'Or : Principe DRY pour les Paiements

Pour éviter les failles de sécurité (fraude aux prix modifiables par le client) et la duplication d'information :
*   **Checkout Stripe** : L'API `/api/checkout` ([route.ts](file:///Users/elamine/Desktop/ISHES/src/app/api/checkout/route.ts)) ne fait **jamais confiance au prix envoyé par le navigateur**. Elle interroge Supabase (`public.formations`) à l'aide du `planId` pour calculer le prix réel à soumettre à Stripe.
*   Si vous changez le prix d'une formation, changez-le simplement dans la table `public.formations` et dans la vitrine. Le système Stripe s'adaptera automatiquement de manière sécurisée.

---

## 3. Exécution des Vérifications & Tests

Avant tout commit ou déploiement, il est **impératif** de lancer la suite de tests pour s'assurer qu'aucun flux critique (inscriptions, webhooks, messages) n'est cassé.

### Lancer le Typage TypeScript (Anti-bugs de compilation)
```bash
npx tsc --noEmit
```

### Lancer les Tests d'Intégration (Jest)
```bash
npm run test
```

*   **Mocking Clerk/Stripe** : Si de nouveaux e-mails ou appels d'API externes sont introduits dans les actions ou routes, s'assurer que les mocks correspondants dans `__tests__/integration/integration.test.ts` sont mis à jour (par exemple, le mock `clerkClient` ou l'envoi d'e-mails) afin de ne pas générer de fausses alertes d'erreur dans la console.

---

## 4. Diagnostics & Suivi des Erreurs

Les erreurs critiques système sont centralisées et journalisées automatiquement pour faciliter le debug de l'application :
*   **Enregistreur d'erreurs** : Utiliser [error-logger.ts](file:///Users/elamine/Desktop/ISHES/src/lib/error-logger.ts) pour remonter les anomalies et avertir l'équipe.
*   **Centre de Diagnostic** : Accessible dans le panel développeur, il liste les erreurs capturées et l'état de synchronisation des utilisateurs Clerk / BDD.
