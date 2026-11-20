import {
  COOKIE_CONSENT_MAX_AGE_DAYS,
  COOKIE_CONSENT_VERSION,
  buildConsent,
  parseStoredConsent,
} from '@/lib/cookie-consent';

describe('cookie-consent', () => {
  const now = new Date('2026-11-20T10:00:00Z');

  it('accepte un consentement valide et normalise les booléens', () => {
    const raw = JSON.stringify({ version: COOKIE_CONSENT_VERSION, date: '2026-11-19T10:00:00Z', analytics: true, ads: 'oui' });
    expect(parseStoredConsent(raw, now)).toEqual({
      version: COOKIE_CONSENT_VERSION,
      date: '2026-11-19T10:00:00Z',
      analytics: true,
      ads: false,
    });
  });

  it('redemande le consentement après 6 mois (180 jours)', () => {
    const old = new Date(now.getTime() - (COOKIE_CONSENT_MAX_AGE_DAYS + 1) * 86_400_000).toISOString();
    const fresh = new Date(now.getTime() - (COOKIE_CONSENT_MAX_AGE_DAYS - 1) * 86_400_000).toISOString();
    expect(parseStoredConsent(JSON.stringify(buildConsent({ analytics: true, ads: true }, new Date(old))), now)).toBeNull();
    expect(parseStoredConsent(JSON.stringify(buildConsent({ analytics: true, ads: true }, new Date(fresh))), now)).not.toBeNull();
  });

  it('ignore une version antérieure, une date invalide, du JSON corrompu ou une date future', () => {
    expect(parseStoredConsent(JSON.stringify({ version: COOKIE_CONSENT_VERSION - 1, date: '2026-11-19T10:00:00Z' }), now)).toBeNull();
    expect(parseStoredConsent(JSON.stringify({ version: COOKIE_CONSENT_VERSION, date: 'hier' }), now)).toBeNull();
    expect(parseStoredConsent('{pas du json', now)).toBeNull();
    expect(parseStoredConsent('[]', now)).toBeNull();
    expect(parseStoredConsent(null, now)).toBeNull();
    expect(parseStoredConsent(JSON.stringify({ version: COOKIE_CONSENT_VERSION, date: '2027-01-01T00:00:00Z' }), now)).toBeNull();
  });

  it('un refus total est un choix valide (le bandeau ne doit pas revenir)', () => {
    const refused = buildConsent({ analytics: false, ads: false }, now);
    expect(parseStoredConsent(JSON.stringify(refused), now)).toEqual(refused);
  });
});
