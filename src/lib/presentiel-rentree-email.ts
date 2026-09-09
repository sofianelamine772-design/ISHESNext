export const PRESENTIEL_RENTREE_EMAIL_TYPE = 'rentree';

export function isPresentielFormationSlug(formationId: string): boolean {
  const id = (formationId || '').toLowerCase();
  const normalized = id.replace(/_/g, '-');
  return id.includes('presentiel')
    || normalized === 'femme-debutante'
    || normalized === 'femme-intermediaire';
}

/**
 * Un slug distanciel connu ne doit jamais déclencher le mail,
 * même si le checkout a retombé par erreur sur presentiel-global.
 */
export function shouldSendPresentielRentreeEmail(
  formationId: string,
  formationType?: string | null,
): boolean {
  if (isPresentielFormationSlug(formationId)) return true;
  if (formationId) return false;
  return formationType === 'presentiel';
}

export function buildPresentielRentreeEmail(logoUrl: string): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = 'ISHES — Rentrée présentiel 2026/2027';
  const text = `Assalam alaykoum chers parents, chers étudiantes

En espérant que vous vous portez tous pour le mieux,

Nous vous informons que la rentrée 2026/ 2027 pour les cours d'ARABE et de TAJWID en présentiel aura lieu la première semaine d’octobre.

Dates de rentrée par créneau (Adultes et Enfants):

Pour les élèves inscrits le samedi (matin ou après-midi):
• le 3 octobre de 9h00 à 12h00 / ou 13h30 à 16h30

Pour les élèves inscrits le dimanche (matin ou après-midi):
• le 4 octobre de 9h00 à 12h00 / ou 13h30 à 16h30

Pour les élèves inscrits le mercredi:
• le 7 octobre de 13h30 à 16h30

La liste des fournitures scolaires vous sera envoyée dans un prochain e-mail.
Elle sera transmise uniquement aux élèves dont l’inscription est finalisée.

⚠ Important : seuls les élèves ayant finalisé leur inscription et activé le paiement de la scolarité seront admis en cours.
Si ce n’est pas encore votre cas, nous vous invitons à effectuer les démarches nécessaires dans les meilleurs délais.

Au plaisir de vous retrouver pour cette nouvelle année, inchaALLAH.

Institut ISHES`;

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f3eee4;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Rentrée présentiel 2026/2027 — samedi 3, dimanche 4 et mercredi 7 octobre.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3eee4;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #eadfcd;box-shadow:0 12px 40px rgba(21,34,51,0.08);">
          <tr>
            <td style="height:6px;background:linear-gradient(90deg,#C69C6D,#e4c9a0,#C69C6D);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" style="padding:28px 24px 12px 24px;background-color:#ffffff;">
              <img src="${logoUrl}" alt="Institut ISHES" width="150" style="display:block;height:auto;max-height:62px;border:0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 28px 24px;background-color:#152233;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:28px 16px 8px 16px;">
                    <p style="margin:0 0 10px 0;color:#C69C6D;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;">Présentiel · Toulouse</p>
                    <h1 style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;font-weight:normal;">Rentrée 2026 / 2027</h1>
                    <p style="margin:12px 0 0 0;color:#ead9be;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;">Cours d'arabe et de Tajwid · première semaine d'octobre</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 8px 32px;font-family:Helvetica,Arial,sans-serif;color:#152233;">
              <p style="margin:0 0 18px 0;font-size:18px;line-height:1.45;font-weight:bold;color:#152233;">
                Assalam alaykoum chers parents, chers étudiantes
              </p>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#4b5563;">
                En espérant que vous vous portez tous pour le mieux,
              </p>
              <p style="margin:0 0 28px 0;font-size:15px;line-height:1.75;color:#4b5563;">
                Nous vous informons que la rentrée <strong style="color:#152233;">2026 / 2027</strong> pour les cours d'<strong style="color:#152233;">ARABE</strong> et de <strong style="color:#152233;">TAJWID</strong> en présentiel aura lieu la <strong style="color:#152233;">première semaine d'octobre</strong>.
              </p>
              <p style="margin:0 0 16px 0;color:#C69C6D;font-size:11px;font-weight:bold;letter-spacing:0.18em;text-transform:uppercase;">
                Dates de rentrée par créneau — Adultes et Enfants
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 8px 32px;">
              ${scheduleCard('Samedi', '03', 'octobre', 'Pour les élèves inscrits le samedi (matin ou après-midi)', '9h00 – 12h00', '13h30 – 16h30')}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 8px 32px;">
              ${scheduleCard('Dimanche', '04', 'octobre', 'Pour les élèves inscrits le dimanche (matin ou après-midi)', '9h00 – 12h00', '13h30 – 16h30')}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px 32px;">
              ${scheduleCard('Mercredi', '07', 'octobre', 'Pour les élèves inscrits le mercredi', '13h30 – 16h30')}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px 32px;font-family:Helvetica,Arial,sans-serif;">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#4b5563;">
                La liste des fournitures scolaires vous sera envoyée dans un prochain e-mail.<br />
                Elle sera transmise uniquement aux élèves dont l'inscription est finalisée.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff8ea;border:1px solid #ead6ad;border-radius:14px;">
                <tr>
                  <td style="width:6px;background-color:#C69C6D;border-radius:14px 0 0 14px;font-size:0;">&nbsp;</td>
                  <td style="padding:18px 18px 18px 16px;font-family:Helvetica,Arial,sans-serif;">
                    <p style="margin:0 0 8px 0;color:#152233;font-size:13px;font-weight:bold;letter-spacing:0.04em;text-transform:uppercase;">⚠ Important</p>
                    <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.7;">
                      Seuls les élèves ayant finalisé leur inscription et activé le paiement de la scolarité seront admis en cours.<br />
                      Si ce n'est pas encore votre cas, nous vous invitons à effectuer les démarches nécessaires dans les meilleurs délais.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 36px 32px;font-family:Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.75;color:#4b5563;">
                Au plaisir de vous retrouver pour cette nouvelle année, inchaALLAH.
              </p>
              <p style="margin:0;font-size:16px;font-weight:bold;color:#152233;font-family:Georgia,'Times New Roman',serif;">Institut ISHES</p>
              <p style="margin:4px 0 0 0;font-size:12px;color:#C69C6D;letter-spacing:0.12em;text-transform:uppercase;">Excellence · Arabe · Tajwid</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#152233;padding:22px 24px;text-align:center;font-family:Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 4px 0;color:#ead9be;font-size:12px;">Institut des Sciences Humaines et Spirituelles</p>
              <p style="margin:0;color:#8d7a5f;font-size:11px;">© ${new Date().getFullYear()} ISHES · Tous droits réservés</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

function scheduleCard(
  day: string,
  date: string,
  month: string,
  caption: string,
  firstHours: string,
  secondHours?: string,
) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf6ef;border:1px solid #eadfcd;border-radius:16px;">
      <tr>
        <td width="92" valign="middle" align="center" style="background-color:#152233;border-radius:16px 0 0 16px;padding:16px 10px;">
          <p style="margin:0;color:#C69C6D;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;">${day}</p>
          <p style="margin:4px 0 0 0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1;">${date}</p>
          <p style="margin:4px 0 0 0;color:#ead9be;font-family:Helvetica,Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">${month}</p>
        </td>
        <td style="padding:16px 18px;font-family:Helvetica,Arial,sans-serif;">
          <p style="margin:0 0 8px 0;color:#152233;font-size:14px;line-height:1.5;font-weight:bold;">${caption}</p>
          <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6;">
            <strong style="color:#152233;">${firstHours}</strong>
            ${secondHours ? `&nbsp;&nbsp;/&nbsp;&nbsp;<strong style="color:#152233;">${secondHours}</strong>` : ''}
          </p>
        </td>
      </tr>
    </table>`;
}
