# Archive Resend (non utilisé)

**Statut :** abandonné. L’envoi des e-mails ISHES se fait **uniquement en SMTP Gmail** (`ishesmaill@gmail.com` via `SMTP_USER` / `SMTP_PASS` / `smtp.gmail.com`).

Ce fichier archive les infos Resend collectées le 31/10/2026, au cas où on voudrait y revenir plus tard. **Rien dans le code applicatif n’utilise Resend.**

---

## Pourquoi ce n’est pas utilisé

- Choix produit : rester sur SMTP.
- Une clé `RESEND_API_KEY` existait en local, mais le code n’envoyait pas via Resend (ou a été retiré).
- Le domaine `ishes.fr` a été **créé** sur Resend (`not_started`) mais **jamais vérifié** (DNS non validés).

---

## Compte / domaine Resend (snapshot)

| Champ | Valeur |
|--------|--------|
| Domaine | `ishes.fr` |
| Domain ID Resend | `6d3af3e8-5468-43dd-b8d5-f7c3ad30fe62` |
| Région | `us-east-1` |
| Status au 31/10/2026 | `not_started` (DNS non validés) |
| From envisagé | `ISHES <noreply@ishes.fr>` |
| Reply-To envisagé | `ishes.contact@gmail.com` |
| Dashboard | https://resend.com/domains |

La clé API était dans `.env.local` sous `RESEND_API_KEY` — **retirée du projet**. Si besoin, la régénérer dans le dashboard Resend (ne pas la committer).

---

## Enregistrements DNS proposés par Resend (à ajouter chez le registrar **seulement** si on réactive Resend)

| Type | Nom (hôte) | Valeur | Priorité |
|------|------------|--------|----------|
| **TXT** | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGx1DVQavCxV4kQJE9N5e6S+1j1SHjDBaSBj1tzOMvb9AF1SFlf3DWPxuYo5IgO9aVmcYRePB6onOKI9FISKhoBlBFys5WXo4ZwtaRbZ6C312kaAEsHSsiQtMAdeS6Y2saH/JBZo9W1WhpkzEx/FSP7lPTbzalA79S6cUF3RHZrQIDAQAB` | — |
| **MX** | `send` | `feedback-smtp.us-east-1.amazonses.com` | `10` |
| **TXT** | `send` | `v=spf1 include:amazonses.com ~all` | — |
| **CNAME** | `rsend` | `send.forge.rmta.net.` | — |

DMARC recommandé (indépendant / bon pour la délivrabilité du domaine en général) :

| Type | Nom | Valeur |
|------|-----|--------|
| **TXT** | `_dmarc` | `v=DMARC1; p=none; rua=mailto:ishes.contact@gmail.com` |

Après ajout DNS → bouton **Verify** sur https://resend.com/domains pour `ishes.fr`.

---

## Config SMTP actuelle (source de vérité)

```env
SMTP_USER=ishesmaill@gmail.com
SMTP_PASS=…          # mot de passe d’application Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_REPLY_TO=ishes.contact@gmail.com   # optionnel
# From = "ISHES" <SMTP_USER> (ou SMTP_FROM / EMAIL_FROM si définis, adresse Gmail autorisée)
```

Code : `src/lib/mail.ts` → Nodemailer uniquement.

---

## Fichiers / artefacts retirés du code

- `src/lib/mail-transport.ts` (supprimé)
- `__tests__/lib/mail-transport.test.ts` (supprimé)
- dépendance npm `resend` (désinstallée)
- `RESEND_API_KEY` retiré des checks diagnostic admin
- Message UI admin « domaine Resend » remplacé par un message SMTP
- `RESEND_API_KEY` retiré de `.env.local`

**Note :** dans `src/lib/clerk-fr.ts`, la clé `resendButton` = libellé Clerk « Renvoyer le code », **pas** le service Resend — à ne pas supprimer.

---

## Si on réactive Resend un jour

1. Régénérer une clé API Resend.
2. Vérifier le domaine `ishes.fr` (DNS ci-dessus).
3. Ajouter `RESEND_API_KEY` + `EMAIL_FROM=ISHES <noreply@ishes.fr>` (Vercel + local).
4. Réintroduire un transport Resend **en plus** ou à la place du SMTP, uniquement après validation DNS.
