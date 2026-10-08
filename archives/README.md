# Archives (hors runtime)

Fichiers déplacés depuis la racine pour alléger le projet.
**Ils ne sont pas utilisés par Next.js en production.**

| Dossier | Contenu |
|---|---|
| `exports/` | CSV, Excel, PDF, backup JSON (`db_backup.json`) |
| `legacy-scripts/` | Scripts one-shot (check/fix/restore) |

Les PDF utiles au site restent dans `public/fournitures/` et `public/rentree/`.

Pour relancer un script legacy depuis la racine du repo :

```bash
node archives/legacy-scripts/check_original_inscriptions.mjs
```
