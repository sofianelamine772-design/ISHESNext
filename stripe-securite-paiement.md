# Stripe — Sécurité paiement (échéances / abonnements)

Document de référence ISHES : audit du paiement **« Scolarité Présentiel en 10× »** et démarche recommandée pour garantir **exactement N prélèvements** puis **arrêt automatique**, sans 11ᵉ débit.

**Statut :** audit effectué — correctif **proposé, pas encore implémenté** (sauf indication contraire dans le code).

---

## 1. Objectif métier

Pour un présentiel à **480 €** en **10×** :

| Attendu | Valeur |
|---|---|
| Mensualité | **48 €** |
| Nombre d’échéances | **exactement 10** |
| Total Stripe | **480 €** |
| Après la 10ᵉ | **aucun** 11ᵉ prélèvement |
| Mode | Abonnement Stripe (`subscription`), pas un paiement one-shot |

Métadonnées typiques au checkout :

- `installments_total: "10"`
- `expected_amount: "480"` (prix catalogue / base)
- `isRenewal: "false"` (nouvelle inscription)

Ces métadonnées **aident** au suivi, mais **ne coupent pas** l’abonnement toutes seules.

---

## 2. Fichiers concernés

| Fichier | Rôle |
|---|---|
| `src/app/api/checkout/route.ts` | Création Checkout : prix mensuel, `mode: subscription`, metadata |
| `src/app/api/webhooks/stripe/route.ts` | Webhooks : inscriptions, logs paiements, tentative d’arrêt abo |
| `src/app/(vitrine)/inscription/page.tsx` | UI choix 1× / 3× / 5× / **10×** (présentiel) |
| `src/app/fr/plateforme-inscription/page.tsx` | Variante inscription (même logique installments) |
| `src/lib/pricing.ts` | Totaux famille / affichage facturation (pas l’arrêt Stripe) |

Source de vérité du **montant total** : prix formation en base Supabase (`formations.price`) via le `slug`, jamais le prix envoyé tel quel par le front (règle projet ISHES).

---

## 3. Comportement actuel (audit)

### 3.1 Création (checkout)

Quand `installments > 1` :

1. `unitAmount = total € × 100` (centimes)
2. `installmentAmount = Math.round(unitAmount / installments)`  
   → pour 480 € / 10 : **4800 centimes = 48 €**
3. Création d’un **Price** Stripe récurrent `interval: "month"`
4. Session Checkout `mode: "subscription"`
5. Metadata session + `subscription_data.metadata` avec notamment `installments_total`

**Point positif :** le découpage 48 € × 10 est correct pour 480 € pile.

**Point faible :** **aucune** fin d’abonnement n’est programmée à la création (`cancel_at` / Subscription Schedule absents).

### 3.2 Arrêt actuel (webhook uniquement)

Sur `invoice.payment_succeeded` :

1. Récupérer l’abonnement
2. Lire `metadata.installments_total`
3. Lister les factures Stripe `status: paid`
4. Si `nombre ≥ installments_total` → `cancel_at_period_end: true`

**En théorie (happy path) :** après la 10ᵉ facture payée, Stripe ne crée pas de 11ᵉ période.

**En pratique :** si ce webhook échoue, n’est pas reçu, ou est mal configuré en prod → l’abo **continue** (11ᵉ, 12ᵉ…).

### 3.3 Métadonnées

| Clé | Sert à l’arrêt Stripe ? |
|---|---|
| `installments_total` | Oui (lu dans le webhook de compteur) |
| `expected_amount` | Non (facturation / inscriptions ISHES) |
| `isRenewal` | Non (branche inscription vs réinscription) |

### 3.4 Risques identifiés

1. **Arrêt non garanti** — dépend 100 % du webhook, pas d’ancre native Stripe à la création.
2. **Compteur = nb de factures `paid`** — sensible aux cas limites (factures $0, factures manuelles, etc.).
3. **Échec puis retry** sur la **même** facture — en général OK (1 facture).
4. **Webhook rejoué** pour `cancel_at_period_end` — plutôt idempotent (OK).
5. **Logs `paiements` sur `invoice.payment_*`** — insert sans contrôle d’existence → risque de **doublons** en base (affichage « déjà payé »), sans forcément fausser le compteur Stripe.
6. **Double log possible du 1ᵉʳ mois** — `checkout.session.completed` (`cs_…`) + `invoice.payment_succeeded` (`in_…`) pour le même prélèvement réel.
7. **Arrondi** — `Math.round` : OK pour 480/10 ; moins propre si total famille non divisible en centimes.

---

## 4. Verdict audit

| Question | Réponse |
|---|---|
| 48 € × 10 = 480 € ? | **Oui** (catalogue 480 €, 1 élève) |
| Arrêt auto après 10 sans 11ᵉ ? | **Oui en théorie**, via webhook |
| Fin verrouillée côté Stripe dès le départ ? | **Non** |
| Métadonnées = logique d’arrêt ? | **Non** — utile, mais insuffisant |
| Échecs / retries / webhooks en double ? | Compteur Stripe plutôt OK ; **logs DB** vulnérables |

**Conclusion :** le 10× n’est **pas** considéré comme garanti à 100 % tant qu’il n’y a pas une **fin d’abonnement fixée nativement chez Stripe**.

---

## 5. Démarche recommandée (à implémenter)

Principe : **Stripe coupe tout seul** ; le webhook n’est plus la seule ligne de défense.

### Étape A — Ancrer la fin à la confirmation d’abonnement (priorité)

**Quand :** dès que l’abonnement existe vraiment  
→ événement `checkout.session.completed` (mode subscription) **ou** `customer.subscription.created`

**Si** `subscription.metadata.installments_total = N` (ex. 10) :

1. `stripe.subscriptions.retrieve(subscriptionId)`
2. Calculer `cancel_at` = **fin de la Nᵉ période**  
   Exemple pour un abo mensuel déjà en période 1 :  
   `cancel_at ≈ current_period_end + (N - 1) mois`  
   (la 1ʳᵉ période est déjà en cours au moment du 1ᵉʳ paiement)
3. `stripe.subscriptions.update(id, { cancel_at })`

**Effet :** 10 prélèvements, puis arrêt net chez Stripe, **même si** un webhook ultérieur rate.

**Important :** ne **pas** fixer `cancel_at` uniquement à la **création de la session Checkout** (l’élève peut payer jours plus tard → date fausse). Le fixer **après** souscription réelle.

### Étape B — Garder le checkout tel quel (montant)

Conserver :

- Prix mensuel = `total / N`
- Metadata `installments_total`, `expected_amount`, `isRenewal`
- Source prix = Supabase `formations`

Pas besoin de Subscription Schedule pour ce correctif (plus de surface de bug).

### Étape C — Webhook compteur actuel

Deux options propres :

1. **Filet de secours** : garder `cancel_at_period_end` si `paid >= N` (défense en profondeur), **ou**
2. **Simplifier** : une fois `cancel_at` validé en prod, retirer / réduire ce compteur pour éviter deux logiques concurrentes.

Recommandation initiale : **A obligatoire + C en filet temporaire**, puis simplifier.

### Étape D — Bonus faible risque (séparé)

Sur `invoice.payment_succeeded` / `invoice.payment_failed` :

- **Upsert** (ou skip) par `invoice.id` avant insert dans `paiements`
- Objectif : pas de doublons d’affichage « déjà payé »
- Ne touche **pas** à l’arrêt Stripe

Éventuellement : ne pas re-logger le 1ᵉʳ mois si déjà couvert par `cs_…` + même montant / même période (à traiter avec prudence).

---

## 6. Ce qu’on évite volontairement

- Compteur de factures `paid` comme **seule** règle d’arrêt  
- Subscription Schedules pour ce patch (trop de complexité)  
- Refonte large du checkout / de la facturation interne  
- Calcul de `cancel_at` figé au moment du `sessions.create` (avant paiement)

---

## 7. Critères de validation (après implémentation)

Sans déclencher de vrais paiements live inutiles : privilégier **mode test** Stripe.

Checklist :

- [ ] Checkout 10× présentiel 480 € → Price **48,00 € / mois**
- [ ] Metadata abo : `installments_total=10`
- [ ] Après souscription : abo a un **`cancel_at`** cohérent (fin 10ᵉ période)
- [ ] En test : simuler / avancer le temps (test clock) → **10** invoices paid, **pas** de 11ᵉ
- [ ] Couper volontairement le webhook d’arrêt « compteur » → l’abo s’arrête quand même grâce à `cancel_at`
- [ ] Retry d’une facture échouée → pas de décalage du nombre d’échéances dues
- [ ] Rejeu webhook invoice → pas de doublon bloquant / pas de comportement étrange
- [ ] Affichage admin / élève : total attendu 480 €, déjà payé cohérent avec les vrais débits live

---

## 8. Ordre d’implémentation suggéré

1. Helper pur : `computeSubscriptionCancelAt(currentPeriodEnd, installmentsTotal)` + **tests unitaires**
2. Appel dans le webhook au moment où l’abo est connu (idempotent : ne pas écraser un `cancel_at` déjà correct)
3. Garder le filet `cancel_at_period_end` temporairement
4. Upsert paiements `invoice.id` (PR séparée si besoin)
5. Validation Stripe **test clock**
6. Déploiement + surveillance logs `[WEBHOOK]`

---

## 9. Synthèse en une phrase

**Aujourd’hui :** 48 € × 10 est bien calculé, mais l’arrêt dépend d’un webhook compteur.  
**Cible :** poser un `cancel_at` Stripe dès la souscription réelle → **10 échéances max, zéro 11ᵉ débit**, même en cas de panne webhook.
