import {
  buildPresentielRentreeEmail,
  isPresentielFormationSlug,
  shouldSendPresentielRentreeEmail,
} from '@/lib/presentiel-rentree-email';

describe('Mail automatique de rentrée présentiel', () => {
  test.each([
    'presentiel-global',
    'arabe-presentiel',
    'femme_debutante',
    'femme-intermediaire',
    'femme_intermediaire',
    'femme-debutante-presentiel',
    'femme-intermediaire-presentiel',
  ])('détecte le présentiel pour %s', (slug) => {
    expect(isPresentielFormationSlug(slug)).toBe(true);
    expect(shouldSendPresentielRentreeEmail(slug)).toBe(true);
  });

  test.each([
    'tajwid_intensif',
    'arabe_adulte',
    'sciences_islamiques',
    'tajwid_standard',
    '',
  ])('n’envoie pas le mail distanciel pour %s', (slug) => {
    expect(isPresentielFormationSlug(slug)).toBe(false);
    expect(shouldSendPresentielRentreeEmail(slug, 'presentiel')).toBe(slug === '');
  });

  it('n’envoie jamais si un slug distanciel est fourni, même si le type DB est présentiel', () => {
    expect(shouldSendPresentielRentreeEmail('tajwid_intensif', 'presentiel')).toBe(false);
  });

  it('envoie si le slug est vide mais que la formation DB est présentiel', () => {
    expect(shouldSendPresentielRentreeEmail('', 'presentiel')).toBe(true);
    expect(shouldSendPresentielRentreeEmail('', 'distanciel')).toBe(false);
  });

  it('contient le texte officiel et les 3 dates de rentrée', () => {
    const { subject, html, text } = buildPresentielRentreeEmail('https://www.ishes.fr/logo.png');
    expect(subject).toBe('ISHES — Rentrée présentiel 2026/2027');
    expect(text).toContain('Assalam alaykoum chers parents, chers étudiantes');
    expect(text).toContain('le 3 octobre de 9h00 à 12h00 / ou 13h30 à 16h30');
    expect(text).toContain('le 4 octobre de 9h00 à 12h00 / ou 13h30 à 16h30');
    expect(text).toContain('le 7 octobre de 13h30 à 16h30');
    expect(text).toContain('fournitures scolaires');
    expect(html).toContain('Rentrée 2026 / 2027');
    expect(html).toContain('03');
    expect(html).toContain('04');
    expect(html).toContain('07');
    expect(html).toContain('⚠ Important');
    expect(html).toContain('https://www.ishes.fr/logo.png');
  });
});
