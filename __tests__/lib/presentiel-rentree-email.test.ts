import { isPresentielFormationSlug } from '@/lib/mail';

describe('isPresentielFormationSlug', () => {
  test.each([
    'presentiel-global',
    'arabe-presentiel',
    'femme_debutante',
    'femme-intermediaire',
    'femme_intermediaire',
  ])('détecte le présentiel pour %s', (slug) => {
    expect(isPresentielFormationSlug(slug)).toBe(true);
  });

  test.each([
    'tajwid_intensif',
    'arabe_adulte',
    'sciences_islamiques',
    '',
  ])('ignore le distanciel pour %s', (slug) => {
    expect(isPresentielFormationSlug(slug)).toBe(false);
  });
});
