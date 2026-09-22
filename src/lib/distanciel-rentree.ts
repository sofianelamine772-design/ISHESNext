/** Courrier de rentrée distanciel — affiché dans l’espace élève dès qu’il y a une inscription distance. */

export const DISTANCIEL_RENTREE_PDF = {
  filename: 'Rentree_Institut_ISHES_DISTANCE_2026-2027.pdf',
  href: '/rentree/Rentree_Institut_ISHES_DISTANCE_2026-2027.pdf',
  label: 'Courrier de rentrée',
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

  // Formations distance connues sans le mot « distanciel » dans le titre
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
