This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🛠 Dépannage & Stabilité

### Problèmes de Cache (Turbopack)
Si vous rencontrez des erreurs de type `MODULE_NOT_FOUND`, `corrupted database` ou `SST file missing`, c'est que le cache de Turbopack est corrompu.

**Solutions :**
1. **Le Reset Ultime** : Lancez `npm run clean`. Cela supprimera le dossier `.next` et relancera le serveur proprement.
2. **Mode Ultra-Stable** : Si les erreurs persistent, utilisez `npm run dev` (qui est maintenant configuré avec `--webpack` pour éviter ces bugs) ou forcez le mode stable avec `npm run dev:stable`.

### Icônes & PWA
Les icônes Apple et le favicon sont générés et stockés dans `/public`. Si le navigateur affiche des erreurs 404 sur `apple-touch-icon.png`, vérifiez que les fichiers sont bien présents dans le dossier `public`.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# ISHES - Institut Supérieur des Humanités et de l'Excellence Spirituelle

## 🛠 Gestion des Créneaux Présentiels (Nouveau)

Le système de gestion des inscriptions en présentiel repose sur une limite stricte de **20 élèves par créneau**.

### 1. Logique Technique
- **Formation** : Représente le cursus global (ex: "Scolarité Enfants").
- **Classe/Créneau** : Chaque formation présentielle est divisée en "Classes" qui correspondent à des créneaux horaires spécifiques.
- **Capacité** : Chaque classe possède une colonne `capacity_limit` (défaut à 20).
- **Affichage** : Si le nombre d'inscriptions validées pour une classe atteint la limite, le créneau est marqué comme **PLEIN** sur le site et les inscriptions sont bloquées.

### 2. Mise à jour de la Base de Données
Pour appliquer ces changements, exécutez le script suivant dans votre console SQL Supabase :
- `base_de_donnees/UPDATE_PRESENTIEL_CRENEAUX.sql`

### 3. Requête pour vérifier l'état des créneaux
Vous pouvez utiliser la vue SQL créée pour voir les places restantes en temps réel :
```sql
SELECT * FROM vue_etat_creneaux;
```

---

## Getting Started
First, run the development server:
...
