<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Règles Spécifiques au Projet ISHES (Pour les Agents IA)

1. **Source de Vérité des Paiements** : Supabase (`public.formations`) est la SEULE source de vérité pour les prix. Le frontend n'envoie jamais le prix final au backend. Le backend (`/api/checkout`) utilise le `slug` pour récupérer le prix réel.
2. **Gestion des Redirections Stripe** : En environnement local, il est courant que le port change (ex: 3005 au lieu de 3000). Les URLs de redirection de paiement DOIVENT s'adapter dynamiquement en local via `req.headers.get('origin')`, mais doivent STRICTEMENT utiliser `NEXT_PUBLIC_APP_URL` en production.
3. **Architecture Next.js App Router** : 
   - Favoriser l'utilisation de Server Actions (`/app/actions`) pour les mutations de base de données.
   - Toujours typer strictement les Webhooks Stripe et gérer l'idempotence des événements.
4. **Gestion des erreurs et logs** : Utiliser impérativement la fonction `logSystemError` pour journaliser les pannes critiques, notamment celles liées aux webhooks et à Clerk.
5. **Fallbacks Sécurisés** : Toujours prévoir un fallback sécurisé lors de requêtes en base de données vitales (comme la recherche d'une formation) pour éviter de bloquer l'expérience utilisateur.
