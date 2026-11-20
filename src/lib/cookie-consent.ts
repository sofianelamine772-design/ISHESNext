/**
 * Consentement cookies (RGPD / recommandations CNIL).
 *
 * - Les traceurs non essentiels (Google Analytics, Google Ads) ne sont chargés
 *   qu'après un consentement explicite (voir ConsentScripts).
 * - Refuser est aussi simple qu'accepter (deux boutons de même niveau).
 * - Le choix est conservé 6 mois, puis redemandé (la CNIL recommande ≤ 6 mois,
 *   maximum 13 mois).
 * - Le visiteur peut changer d'avis à tout moment via « Gérer mes cookies »
 *   (pied de page et politique de confidentialité).
 */

export const COOKIE_CONSENT_KEY = 'ishes_cookie_consent';
/** À incrémenter si les finalités changent : le consentement est redemandé. */
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_MAX_AGE_DAYS = 180;

/** Événement émis sur `window` après chaque enregistrement du choix. */
export const CONSENT_CHANGED_EVENT = 'ishes:cookie-consent-changed';
/** Événement à émettre sur `window` pour rouvrir le panneau de réglages. */
export const OPEN_COOKIE_SETTINGS_EVENT = 'ishes:cookie-settings-open';

export type CookieConsent = {
  version: number;
  /** Date ISO du choix. */
  date: string;
  /** Mesure d'audience (Google Analytics). */
  analytics: boolean;
  /** Publicité et mesure des conversions (Google Ads). */
  ads: boolean;
};

export type CookieCategoryId = 'necessary' | 'analytics' | 'ads';

export const COOKIE_CATEGORIES: Array<{
  id: CookieCategoryId;
  label: string;
  description: string;
  locked?: boolean;
}> = [
  {
    id: 'necessary',
    label: 'Nécessaires',
    description:
      'Indispensables au fonctionnement du site : connexion à l’espace élève (Clerk), paiement sécurisé (Stripe), mémorisation de vos choix. Ils ne peuvent pas être désactivés.',
    locked: true,
  },
  {
    id: 'analytics',
    label: 'Mesure d’audience',
    description:
      'Google Analytics nous aide à comprendre quelles pages sont consultées pour améliorer le site. Données agrégées, jamais revendues.',
  },
  {
    id: 'ads',
    label: 'Publicité',
    description:
      'Google Ads mesure l’efficacité de nos campagnes (conversions) et peut personnaliser les annonces que vous voyez.',
  },
];

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * Valide un consentement stocké. Renvoie `null` s'il est absent, corrompu,
 * d'une version antérieure ou expiré (le bandeau sera alors réaffiché).
 */
export function parseStoredConsent(raw: string | null | undefined, now: Date = new Date()): CookieConsent | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isPlainObject(data)) return null;
  if (data.version !== COOKIE_CONSENT_VERSION) return null;
  if (typeof data.date !== 'string') return null;
  const date = new Date(data.date).getTime();
  if (!Number.isFinite(date)) return null;
  const ageDays = (now.getTime() - date) / 86_400_000;
  if (ageDays < 0 || ageDays > COOKIE_CONSENT_MAX_AGE_DAYS) return null;
  return {
    version: COOKIE_CONSENT_VERSION,
    date: data.date,
    analytics: data.analytics === true,
    ads: data.ads === true,
  };
}

export function buildConsent(choice: { analytics: boolean; ads: boolean }, now: Date = new Date()): CookieConsent {
  return {
    version: COOKIE_CONSENT_VERSION,
    date: now.toISOString(),
    analytics: Boolean(choice.analytics),
    ads: Boolean(choice.ads),
  };
}

/** Lit le consentement courant (navigateur uniquement). */
export function readConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    return parseStoredConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY));
  } catch {
    return null;
  }
}

/** Enregistre le choix et prévient les composants qui en dépendent. */
export function saveConsent(choice: { analytics: boolean; ads: boolean }): CookieConsent {
  const consent = buildConsent(choice);
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  } catch {
    /* stockage indisponible : le choix vaut pour la page en cours */
  }
  if (!consent.analytics || !consent.ads) clearTrackingCookies(consent);
  window.dispatchEvent(new CustomEvent<CookieConsent>(CONSENT_CHANGED_EVENT, { detail: consent }));
  return consent;
}

/** Noms (ou préfixes) des cookies déposés par Google Analytics / Google Ads. */
export const GOOGLE_COOKIE_PREFIXES = ['_ga', '_gid', '_gat', '_gcl_', '_gac_'];

/** Supprime (au mieux) les cookies des catégories refusées. */
export function clearTrackingCookies(consent: Pick<CookieConsent, 'analytics' | 'ads'>) {
  if (typeof document === 'undefined') return;
  const names = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter(Boolean);
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const name of names) {
    const isGa = name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat');
    const isAds = name.startsWith('_gcl_') || name.startsWith('_gac_');
    if ((isGa && !consent.analytics) || (isAds && !consent.ads)) {
      for (const d of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

/** Demande l'ouverture du panneau « Gérer mes cookies ». */
export function openCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
