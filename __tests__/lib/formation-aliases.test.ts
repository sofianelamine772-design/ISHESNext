import {
  canonicalBumpSlugs,
  canonicalFormationSlug,
  formationSearchText,
} from '@/lib/formation-aliases';

describe('formation-aliases', () => {
  it('Tilawa, Hifz et Hifdh sont la formation « memoriser_coran »', () => {
    expect(canonicalFormationSlug('tilawa')).toBe('memoriser_coran');
    expect(canonicalFormationSlug('Tilawa')).toBe('memoriser_coran');
    expect(canonicalFormationSlug('hifz')).toBe('memoriser_coran');
    expect(canonicalFormationSlug('hifdh')).toBe('memoriser_coran');
    expect(canonicalFormationSlug('memoriser_coran')).toBe('memoriser_coran');
  });

  it('conserve les anciens alias et ne touche pas aux autres slugs', () => {
    expect(canonicalFormationSlug('arabe_coran_junior')).toBe('arabe_enfant_distance');
    expect(canonicalFormationSlug('arabe-coran-junior')).toBe('arabe_enfant_distance');
    expect(canonicalFormationSlug('sciences-islamiques')).toBe('sciences_islamiques');
    expect(canonicalFormationSlug('femme-debutante-presentiel')).toBe('femme-debutante-presentiel');
    expect(canonicalFormationSlug('tajwid_intensif')).toBe('tajwid_intensif');
    expect(canonicalFormationSlug(null)).toBe('');
  });

  describe('canonicalBumpSlugs', () => {
    it('Tilawa ajoutée à Mémorisation = déjà dans le panier (aucun doublon)', () => {
      expect(canonicalBumpSlugs(['tilawa'], 'memoriser_coran')).toEqual([]);
      expect(canonicalBumpSlugs(['memoriser_coran'], 'tilawa')).toEqual([]);
    });

    it('Tilawa + Mémorisation ajoutées ensemble ne comptent qu’une fois', () => {
      expect(canonicalBumpSlugs(['tilawa', 'memoriser_coran'], 'tajwid_standard')).toEqual(['memoriser_coran']);
    });

    it('garde les autres formations, sans doublon ni valeur vide', () => {
      expect(
        canonicalBumpSlugs(['fiqh_malikite', ' al_aqida ', '', 'fiqh_malikite', undefined], 'tajwid_standard'),
      ).toEqual(['fiqh_malikite', 'al_aqida']);
    });

    it('ne confond pas tiret et underscore pour la formation principale', () => {
      expect(canonicalBumpSlugs(['sciences-islamiques'], 'sciences_islamiques')).toEqual([]);
    });
  });

  it('la recherche « tilawa », « hifz » ou « récitation » retrouve la formation', () => {
    const text = formationSearchText('memoriser_coran', 'Mémorisation du Coran', 'Adulte', 'À distance');
    for (const q of ['tilawa', 'hifz', 'hifdh', 'récitation', 'lecture fluide', 'mémorisation']) {
      expect(text).toContain(q);
    }
  });
});
