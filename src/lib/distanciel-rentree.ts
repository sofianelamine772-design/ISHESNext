import fs from 'node:fs';
import path from 'node:path';

/** Courrier de rentrée distanciel — espace élève + mail auto à l’inscription. */

export const DISTANCIEL_RENTREE_EMAIL_TYPE = 'rentree_distanciel';

export const DISTANCIEL_RENTREE_PDF = {
  filename: 'Rentree_Institut_ISHES_DISTANCE_2026-2027.pdf',
  href: '/rentree/Rentree_Institut_ISHES_DISTANCE_2026-2027.pdf',
  label: 'Courrier de rentrée',
  diskNames: [
    'Rentree_Institut_ISHES_DISTANCE_2026-2027.pdf',
    'Rentrée Institut ISHES DISTANCE.pdf',
  ],
} as const;

export type DistancielRentreePublicDoc = {
  kind: 'distanciel_rentree';
  label: string;
  href: string;
};

function norm(value?: string | null): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/** True si le type / libellé indique clairement du présentiel. */
export function looksLikePresentiel(value?: string | null): boolean {
  return norm(value).includes('presentiel');
}

/**
 * Une inscription compte comme distanciel si le type classe/formation le dit,
 * ou si le libellé évoque une session distance (sans être présentiel).
 */
export function isDistancielInscriptionSignal(params: {
  classType?: string | null;
  formationType?: string | null;
  className?: string | null;
  formationTitle?: string | null;
}): boolean {
  const { classType, formationType, className, formationTitle } = params;
  if (looksLikePresentiel(classType) || looksLikePresentiel(formationType)) return false;
  if (looksLikePresentiel(className) || looksLikePresentiel(formationTitle)) return false;

  if (norm(classType) === 'distanciel' || norm(formationType) === 'distanciel') return true;
  if (norm(classType).includes('distance') || norm(formationType).includes('distance')) return true;

  const label = `${norm(className)} ${norm(formationTitle)}`;
  if (!label.trim()) return false;
  if (label.includes('session ') || label.includes('distance') || label.includes('distanciel')) return true;

  const distanceHints = [
    'fiqh',
    'tarbiya',
    'tarbya',
    'tajwid',
    'fatiha',
    'aqida',
    'sirah',
    'hadith',
    'tilawa',
    'memorisation',
    'spiritualite',
    'civilisation',
    'arabe enfant',
    'arabe litteraire',
    'sciences du coran',
    'sciences islam',
  ];
  return distanceHints.some((hint) => label.includes(hint));
}

export function shouldShowDistancielRentreeDoc(
  signals: Array<{
    classType?: string | null;
    formationType?: string | null;
    className?: string | null;
    formationTitle?: string | null;
  }>,
): boolean {
  return signals.some((s) => isDistancielInscriptionSignal(s));
}

export function getDistancielRentreePublicDocs(
  signals: Array<{
    classType?: string | null;
    formationType?: string | null;
    className?: string | null;
    formationTitle?: string | null;
  }> = [],
): DistancielRentreePublicDoc[] {
  if (!shouldShowDistancielRentreeDoc(signals)) return [];
  return [
    {
      kind: 'distanciel_rentree',
      label: DISTANCIEL_RENTREE_PDF.label,
      href: DISTANCIEL_RENTREE_PDF.href,
    },
  ];
}

/** Slugs clairement présentiel → jamais de mail distance. */
export function isPresentielOnlySlug(formationId: string): boolean {
  const id = (formationId || '').toLowerCase();
  const normalized = id.replace(/_/g, '-');
  return (
    id.includes('presentiel') ||
    normalized === 'femme-debutante' ||
    normalized === 'femme-intermediaire' ||
    normalized === 'presentiel-global'
  );
}

/**
 * Déclenche le mail rentrée distanciel si la formation est distance
 * (type DB ou slug non-présentiel).
 */
export function shouldSendDistancielRentreeEmail(
  formationId: string,
  formationType?: string | null,
): boolean {
  if (isPresentielOnlySlug(formationId)) return false;
  if (formationType === 'distanciel') return true;
  if (formationType === 'presentiel') return false;
  // Slug renseigné et non présentiel → on considère distance (catalogue ISHES)
  if (formationId && !isPresentielOnlySlug(formationId)) return true;
  return false;
}

export function resolveDistancielRentreePdfPath(): string | null {
  const dirs = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), 'public', 'rentree'),
    process.cwd(),
  ];
  for (const dir of dirs) {
    for (const name of DISTANCIEL_RENTREE_PDF.diskNames) {
      const candidate = path.join(/*turbopackIgnore: true*/ dir, name);
      if (fs.existsSync(/*turbopackIgnore: true*/ candidate)) return candidate;
    }
  }
  return null;
}

export function buildDistancielRentreeEmail(logoUrl: string): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = 'ISHES — Rentrée distanciel 2026/2027';
  const text = `Assalam alaykoum chers parents, chers étudiants,

En espérant que vous vous portez tous pour le mieux,

Nous vous adressons le courrier de rentrée 2026/2027 pour les formations à distance de l'Institut ISHES.

Vous trouverez toutes les informations utiles (organisation, consignes, démarrage des cours) dans le document PDF joint à cet e-mail.

Ce même document est également disponible dans votre espace élève ISHES, rubrique « Courrier de rentrée ».

⚠ Important : seuls les élèves ayant finalisé leur inscription et activé le paiement pourront suivre les cours.
Si ce n'est pas encore votre cas, nous vous invitons à régulariser votre situation dans les meilleurs délais.

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
    Rentrée distanciel 2026/2027 — courrier PDF en pièce jointe.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3eee4;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #eadfcd;box-shadow:0 12px 40px rgba(21,34,51,0.08);">
          <tr>
            <td style="height:6px;background:linear-gradient(90deg,#086b51,#0a8f6c,#086b51);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" style="padding:28px 24px 12px 24px;background-color:#ffffff;">
              <img src="${logoUrl}" alt="Institut ISHES" width="150" style="display:block;height:auto;max-height:62px;border:0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 0 32px;text-align:center;">
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#086b51;font-weight:700;">Distanciel</p>
              <h1 style="margin:10px 0 0 0;color:#152233;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;font-weight:normal;">Rentrée 2026 / 2027</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px 32px;font-family:Helvetica,Arial,sans-serif;color:#333;font-size:15px;line-height:1.7;">
              <p style="margin:0 0 16px 0;">Assalam alaykoum chers parents, chers étudiants,</p>
              <p style="margin:0 0 16px 0;">En espérant que vous vous portez tous pour le mieux,</p>
              <p style="margin:0 0 16px 0;">
                Nous vous adressons le <strong style="color:#152233;">courrier de rentrée 2026/2027</strong>
                pour les formations <strong style="color:#152233;">à distance</strong> de l'Institut ISHES.
              </p>
              <p style="margin:0 0 16px 0;">
                Vous trouverez toutes les informations utiles (organisation, consignes, démarrage des cours)
                dans le <strong style="color:#152233;">document PDF joint</strong> à cet e-mail.
              </p>
              <p style="margin:0 0 16px 0;">
                Ce même document est également disponible dans votre <strong style="color:#152233;">espace élève ISHES</strong>,
                rubrique « Courrier de rentrée ».
              </p>
              <div style="margin:24px 0;padding:16px 18px;background-color:#fff8e8;border:1px solid #f0d9a8;border-radius:12px;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#7a5a16;">
                  ⚠ <strong>Important :</strong> seuls les élèves ayant finalisé leur inscription et activé le paiement pourront suivre les cours.
                  Si ce n'est pas encore votre cas, merci de régulariser votre situation dans les meilleurs délais.
                </p>
              </div>
              <p style="margin:0 0 8px 0;">Au plaisir de vous retrouver pour cette nouvelle année, inchaALLAH.</p>
              <p style="margin:20px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#152233;">Institut ISHES</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px 32px;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#888;line-height:1.5;">
              Pièce jointe : ${DISTANCIEL_RENTREE_PDF.filename}
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
