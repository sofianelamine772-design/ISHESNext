# Audit — Double Stripe (Distanciel + Présentiel)

**Statut :** implémentation code **faite en local** (sept. 2026) — activer en collant `STRIPE_PRESENTIEL_SECRET_KEY` (+ pk) dans `.env.local` / Vercel, et exécuter `scripts/add_paiements_stripe_account.sql` sur Supabase.  
**Date :** 26 septembre 2026  
**Contexte métier :** aujourd’hui **toutes** les formations (présentiel + distanciel) encaissent sur **un seul** compte Stripe (= compte **distance**). Objectif : encaisser sur **2 comptes Stripe distincts**, sans casser une fonctionnalité existante.

---

## 1. Objectif métier (non négociable)

| Flux | Compte Stripe cible |
|---|---|
| Formations **distanciel** | Stripe **Distance** (compte actuel) |
| Formations **présentiel** (dont femme débutante / intermédiaire, scolarité enfants, etc.) | Stripe **Présentiel** (nouveau compte) |

### Contraintes absolues

1. **Rien ne doit casser** : inscriptions, webhooks, mails rentrée/fournitures, espace élève, facturation admin, saisie manuelle, relances, factures/reçus, abonnements Nx, backup, vue d’ensemble.
2. **Pas de changement métier** hors le routage d’encaissement : prix = toujours Supabase `formations` (règle AGENTS.md).
3. **Les paiements déjà encaissés** sur le Stripe distance restent valides et consultables (reçus, historique).
4. **Les abonnements présentiel déjà ouverts** sur le Stripe distance continuent d’être gérés par **ce** compte (sinon Stripe ne retrouve pas `sub_` / `in_`).
5. Seuls les **nouveaux** checkouts présentiel partent sur le Stripe présentiel.

---

## 2. État actuel (source de vérité code)

### 2.1 Un seul client Stripe partout

| Fichier | Usage |
|---|---|
| `src/lib/stripe.ts` | Client singleton `STRIPE_SECRET_KEY` |
| `src/app/api/checkout/route.ts` | Création Checkout Session (1× / 3× / 5× / 10×) |
| `src/app/api/checkout/local-success/route.ts` | Fallback local post-paiement |
| `src/app/api/webhooks/stripe/route.ts` | Webhooks + arrêt abo Nx (`cancel_at_period_end`) |
| `src/app/actions/students.ts` | Relances Checkout, reçus facture élève/admin |
| `src/app/api/backup/route.ts` | List sessions Stripe (backup encaissement) |
| `src/app/app/admin/administratif/vue-ensemble/page.tsx` | Revenus mois/année via `paymentIntents.list` |
| `src/app/api/admin/diagnostic/route.ts` | Santé clés / webhooks |

### 2.2 Variables d’environnement actuelles

| Variable | Rôle actuel |
|---|---|
| `STRIPE_SECRET_KEY` | Secret **unique** (= Distance aujourd’hui) |
| `STRIPE_WEBHOOK_SECRET` | Signature webhook **unique** |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Présent surtout en diagnostic (Checkout ISHES = hosted, peu utilisé côté front) |

### 2.3 Comment le type formation est déjà connu

Le checkout sait déjà distinguer le présentiel :

- slug `presentiel-global`, `femme_debutante`, `femme_intermediaire`, ou slug contenant `presentiel`
- en DB : `formations.type` = `'presentiel'` | `'distanciel'`

→ **Le critère de routage existe déjà** ; il manque seulement le **choix du client Stripe**.

### 2.4 Identifiants stockés en DB

Table `paiements.stripe_session_id` :

- `cs_live_…` / `cs_test_…` → Checkout Session  
- `in_…` → Facture d’abonnement  
- `manual_…` → Saisie admin (hors Stripe)

**Problème critique :** on **ne peut pas** déduire le compte Stripe (distance vs présentiel) depuis le préfixe `cs_` seul.  
Sans métadonnée / colonne dédiée, les reçus et relances risquent d’appeler **le mauvais** compte → `No such checkout.session`.

---

## 3. Architecture cible (recommandée)

### 3.1 Principe

```
Inscription / Relance
        │
        ▼
  resolveStripeAccount(formation)
        │
        ├── distanciel → Stripe Distance (clés actuelles)
        └── presentiel → Stripe Présentiel (nouvelles clés)
        │
        ▼
  Checkout Session + metadata.stripe_account = "distanciel"|"presentiel"
        │
        ▼
  Webhook (même URL ou 2 endpoints) → vérif signature du bon whsec
        │
        ▼
  DB paiements + colonne/meta stripe_account
```

### 3.2 Variables d’environnement proposées

**Stratégie zéro-casse :** on **garde** les noms actuels = Distance, et on **ajoute** le présentiel.

| Variable | Compte | Obligatoire |
|---|---|---|
| `STRIPE_SECRET_KEY` | Distance (existant, ne pas renommer en prod) | Oui |
| `STRIPE_WEBHOOK_SECRET` | Distance | Oui |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Distance (optionnel si Checkout hosted) | Recommandé |
| `STRIPE_PRESENTIEL_SECRET_KEY` | Présentiel (nouveau) | Oui pour activer le split |
| `STRIPE_PRESENTIEL_WEBHOOK_SECRET` | Présentiel | Oui |
| `NEXT_PUBLIC_STRIPE_PRESENTIEL_PUBLISHABLE_KEY` | Présentiel | Recommandé |

Alias optionnels (lisibilité, sans casser l’existant) :

- `STRIPE_DISTANCIEL_SECRET_KEY` → fallback = `STRIPE_SECRET_KEY`
- `STRIPE_DISTANCIEL_WEBHOOK_SECRET` → fallback = `STRIPE_WEBHOOK_SECRET`

**Règle de bascule :**

- Si `STRIPE_PRESENTIEL_SECRET_KEY` **absent** → comportement actuel (tout sur Distance).  
- Si présent → routage dual activé.

### 3.3 Couche code centrale (à créer)

Fichier dédié recommandé : `src/lib/stripe-accounts.ts`

Responsabilités :

1. `StripeAccountId = 'distanciel' | 'presentiel'`
2. `resolveStripeAccountFromFormation({ slug, type })`
3. `getStripeClient(account)` → instance Stripe du bon secret
4. `getStripeWebhookSecret(account)`
5. `isPresentielFormation(slug, type)` — réutiliser la logique déjà dans checkout / rentree mails

**Toute** création / lecture Stripe doit passer par `getStripeClient(account)` — plus de `new Stripe(STRIPE_SECRET_KEY)` dispersé.

### 3.4 Webhooks — 2 options (recommandation)

#### Option A (recommandée) — même URL, double signature

Endpoint unique : `/api/webhooks/stripe`

1. Lire le body brut  
2. Essayer `constructEvent` avec `STRIPE_WEBHOOK_SECRET` (distance)  
3. Sinon essayer `STRIPE_PRESENTIEL_WEBHOOK_SECRET`  
4. Taguer `account` selon le secret qui a validé  
5. Traiter l’événement avec `getStripeClient(account)`

Dans le Dashboard :

- Webhook Distance → `https://domaine/api/webhooks/stripe`  
- Webhook Présentiel → **même URL**

#### Option B — 2 URLs

- `/api/webhooks/stripe` → distance  
- `/api/webhooks/stripe/presentiel` → présentiel  

Plus clair opérationnellement, un peu plus de code dupliqué / factorisé.

### 3.5 Persistance `stripe_account` (obligatoire)

Ajouter sur `paiements` (migration Supabase) :

```sql
alter table public.paiements
  add column if not exists stripe_account text
  check (stripe_account is null or stripe_account in ('distanciel', 'presentiel'));
```

- Nouveaux inserts webhook / local-success / relances → remplir `stripe_account`
- Anciennes lignes `NULL` → traiter comme **`distanciel`** (historique actuel)

Aussi écrire dans metadata Checkout / Subscription :

```text
stripe_account: "presentiel" | "distanciel"
```

---

## 4. Inventaire des impacts fichier par fichier

### 4.1 Checkout — `src/app/api/checkout/route.ts` ⚠️ critique

| Action | Détail |
|---|---|
| Déterminer account | via slug / type formation (déjà partiellement présent) |
| Créer session | `getStripeClient(account).checkout.sessions.create(...)` |
| Metadata | ajouter `stripe_account` |
| Prix | **inchangé** — toujours DB `formations.price` |
| 10× présentiel | abo créé sur **Stripe Présentiel** (nouveaux uniquement) |

**Ne pas toucher :** logique fratrie, capacité classes, blocage calendaire présentiel, `expected_amount`.

### 4.2 Webhook — `src/app/api/webhooks/stripe/route.ts` ⚠️ critique

| Action | Détail |
|---|---|
| Vérif signature | dual secret (A) ou route dédiée (B) |
| Inserts `paiements` | + `stripe_account` |
| `subscriptions.retrieve` / `update` / `invoices.list` | **même account** que l’événement |
| Mails rentrée / fournitures | **inchangés** (indépendants de Stripe) |
| Clerk invite | inchangé |

Risque majeur si oubli : abo présentiel traité avec client distance → erreurs / double logique d’arrêt.

### 4.3 Local success — `src/app/api/checkout/local-success/route.ts`

- Récupérer session avec le bon client (metadata `stripe_account` ou essai distance puis présentiel).
- Insert paiement + `stripe_account`.

### 4.4 Relances — `sendPaymentReminderWithLinkAction`

Aujourd’hui : toujours `stripe` unique.

Cible :

1. Résoudre account via `paiement.stripe_account` **ou** formation de l’élève  
2. Créer le Checkout de régularisation sur **le même** compte  
3. Metadata `stripe_account` + `type: regularisation`

Sinon : parent présentiel paie sur le mauvais Stripe.

### 4.5 Factures / reçus — `getStudentStripeReceiptUrlAction` / `getAdminStripeReceiptUrlAction`

- Choisir client via `paiement.stripe_account` (fallback distanciel si null)
- Ne **jamais** appeler le mauvais compte (erreur `No such checkout.session`)

### 4.6 Vue d’ensemble — `administratif/vue-ensemble/page.tsx`

Aujourd’hui : `paymentIntents.list` sur **1** compte → sous-estime les revenus si split.

Cible :

- Somme Distance + Présentiel (mois / année)  
- Ou s’appuyer uniquement sur Supabase `paiements` (déjà partiellement fait pour le détail mensuel) pour une source unique — **recommandé à moyen terme** pour éviter les écarts Stripe API vs DB.

### 4.7 Backup — `src/app/api/backup/route.ts`

- Lister sessions **des deux** comptes  
- Ou basculer 100 % sur DB `paiements` (plus fiable pour ISHES)

### 4.8 Diagnostic — `src/app/api/admin/diagnostic/route.ts`

- Vérifier présence / format des **2** secrets + **2** webhooks  
- Afficher clairement Distance vs Présentiel

### 4.9 Client singleton — `src/lib/stripe.ts`

- Soit déprécié au profit de `getStripeClient('distanciel')`  
- Soit réexport distance pour compatibilité temporaire

### 4.10 Hors scope (ne pas modifier)

| Domaine | Pourquoi |
|---|---|
| Prix catalogue / `pricing.ts` | Source de vérité = Supabase |
| Saisie manuelle admin | Pas Stripe |
| Mails rentrée / fournitures | Déjà branchés formation, pas compte Stripe |
| Clerk / inscriptions DB | Inchangés |
| UI inscription (choix 1×/10×) | Inchangée ; seul le backend route le compte |
| Espace élève totaux facturation | Totaux = DB, pas Stripe API |

---

## 5. Matrice de non-régression (checklist QA)

Après implémentation, valider **chaque** ligne :

| # | Scénario | Compte attendu | OK ? |
|---|---|---|---|
| 1 | Checkout distanciel 1× (test) | Distance | ☐ |
| 2 | Checkout présentiel 1× (test) | Présentiel | ☐ |
| 3 | Checkout présentiel 10× (test) | Présentiel + abo | ☐ |
| 4 | Webhook `checkout.session.completed` distance | Inscription créée | ☐ |
| 5 | Webhook présentiel idem | Inscription créée | ☐ |
| 6 | Mail rentrée présentiel | Envoyé | ☐ |
| 7 | Mail rentrée distanciel + PDF | Envoyé | ☐ |
| 8 | Mail fournitures (enfants) | Envoyé | ☐ |
| 9 | Espace élève — totaux = admin | Identiques | ☐ |
| 10 | Bouton Facture élève (paiement distance historique) | Reçu OK | ☐ |
| 11 | Bouton Facture élève (nouveau présentiel) | Reçu OK | ☐ |
| 12 | Bouton Facture admin | Idem | ☐ |
| 13 | Relance paiement présentiel | Lien sur Stripe Présentiel | ☐ |
| 14 | Relance paiement distanciel | Lien sur Stripe Distance | ☐ |
| 15 | Saisie manuelle fiche élève | Toujours OK (hors Stripe) | ☐ |
| 16 | Arrêt abo après N échéances (présentiel nouveau) | Sur compte Présentiel | ☐ |
| 17 | Abo présentiel **déjà** ouvert sur Distance | Continue sur Distance | ☐ |
| 18 | Vue d’ensemble revenus | Distance + Présentiel | ☐ |
| 19 | Backup encaissement | Pas de sous-comptage | ☐ |
| 20 | Diagnostic admin | 2 comptes verts | ☐ |

---

## 6. Plan d’implémentation (ordre strict)

### Phase 0 — Prérequis ops (toi / Dashboard Stripe)

1. Compte Stripe Présentiel créé (live + test).  
2. Fournir les clés (voir §8).  
3. Créer endpoint webhook Présentiel pointant vers la même URL prod (ou URL dédiée).  
4. Events minimum à cocher (comme Distance) :
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded` / `failed` (si utilisés)
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - (évent. `customer.subscription.updated/deleted` si besoin suivi)

### Phase 1 — Fondations code (sans activer le split)

1. `src/lib/stripe-accounts.ts` + tests unitaires de routage.  
2. Migration colonne `paiements.stripe_account`.  
3. Dual webhook signature **avec fallback** : si clé présentiel absente → comportement actuel.  
4. Remplir `stripe_account = 'distanciel'` sur **nouveaux** inserts même avant bascule (prépare l’historique).

### Phase 2 — Routage checkout + relances + reçus

1. Checkout choisit le client.  
2. Relances / reçus lisent `stripe_account`.  
3. Local-success compatible.

### Phase 3 — Agrégats admin

1. Vue d’ensemble + backup + diagnostic dual.

### Phase 4 — Mise en prod

1. Ajouter env Vercel (présentiel).  
2. Déployer.  
3. Test **mode test** des 2 comptes.  
4. 1 paiement réel présentiel 1 € / petit montant si besoin, puis scénario réel.  
5. Surveiller logs webhook 24–48 h.

---

## 7. Risques & pièges

| Risque | Impact | Mitigation |
|---|---|---|
| Oublier `stripe_account` en DB | Reçus / relances cassés | Colonne + fallback distanciel + tests |
| Webhook présentiel non configuré | Paiement Stripe OK mais **pas d’inscription** | Checklist Dashboard + diagnostic |
| Traiter un abo Distance avec client Présentiel | Erreurs API / arrêt abo raté | Client = account de l’événement |
| Mélanger clés test/live | Échecs totaux | Diagnostic + convention naming |
| Renommer `STRIPE_SECRET_KEY` trop tôt | Prod distance down | **Ne pas renommer** ; ajouter seulement le présentiel |
| Famille mixte (rare) | Un checkout = une formation | 1 session = 1 account ; pas de panier mixte aujourd’hui |
| Connect / plateforme | Hors sujet | 2 comptes séparés, **pas** Stripe Connect |

---

## 8. Ce dont j’ai besoin de ta part (présentiel)

Envoie **exactement** (live et/ou test selon ce qu’on active d’abord) :

```env
# Stripe PRÉSENTIEL
STRIPE_PRESENTIEL_SECRET_KEY=sk_live_...   # ou sk_test_...
STRIPE_PRESENTIEL_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRESENTIEL_PUBLISHABLE_KEY=pk_live_...  # ou pk_test_...
```

Confirme aussi :

1. Le compte actuel (`STRIPE_SECRET_KEY`) reste bien **100 % Distance**.  
2. On active d’abord en **test** puis **live**, ou live direct.  
3. Option webhook : **même URL** (A) ou **2 URLs** (B) — défaut recommandé = **A**.

**Ne colle jamais les secrets dans un ticket public / commit Git** — Vercel env + message privé.

---

## 9. Ce qui ne sera PAS fait dans cette mise à jour

- Changer les prix / promotions / logique fratrie  
- Migrer les abonnements présentiel **existants** vers le nouveau compte (impossible sans reprise manuelle Stripe)  
- Stripe Connect  
- Refonte UI inscription  
- Modifier le correctif « arrêt 10× » au-delà du routage de compte (voir `stripe-securite-paiement.md` si chantier séparé)

---

## 10. Critère de succès

> Un parent qui paie une formation **distance** est débité sur le **Stripe Distance**.  
> Un parent qui paie une formation **présentiel** est débité sur le **Stripe Présentiel**.  
> Admin, élève, mails, webhooks, factures, relances, manuels : **comportement identique** à aujourd’hui, sans régression.

---

## 11. Prochaine étape

1. Tu valides cet audit.  
2. Tu fournis les variables présentiel.  
3. J’implémente **Phase 1 → 4** dans cet ordre, avec tests de non-régression ciblés (checkout + webhook + reçus + routage account).

**Aucune ligne de code de split n’a encore été écrite** — document d’audit seulement.
