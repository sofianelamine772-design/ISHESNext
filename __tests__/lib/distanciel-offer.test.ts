import {
  DISTANCIEL_OFFER,
  addedFormationOfferPrice,
  applyDistancielOffer,
  isDistancielOfferActive,
  isDistancielOfferEligible,
  isPackOfferedWith,
  parsePriceEuros,
} from '@/lib/distanciel-offer';

const DURING = new Date('2026-11-25T12:00:00Z');
const BEFORE = new Date('2026-11-01T00:00:00Z');

describe('distanciel-offer', () => {
  it('offre réelle : −49 € et pack offert, à partir du 23 novembre 2026 (Paris)', () => {
    expect(DISTANCIEL_OFFER.discountEuros).toBe(49);
    expect(DISTANCIEL_OFFER.packOffered).toBe(true);
    expect(isDistancielOfferActive(new Date('2026-11-22T22:59:59Z'))).toBe(false);
    expect(isDistancielOfferActive(new Date('2026-11-22T23:00:00Z'))).toBe(true);
    expect(isDistancielOfferActive(DURING)).toBe(true);
  });

  it('399 € → 350 €, 649 € → 600 €, 349 € → 300 € pour une formation à distance', () => {
    expect(applyDistancielOffer(399, { slug: 'fiqh_malikite', type: 'distanciel' }, DURING)).toEqual({ original: 399, current: 350, discount: 49 });
    expect(applyDistancielOffer(649, { slug: 'arabe_adulte', type: 'distanciel' }, DURING)).toEqual({ original: 649, current: 600, discount: 49 });
    expect(applyDistancielOffer(349, { slug: 'sciences-islamiques' }, DURING)).toEqual({ original: 349, current: 300, discount: 49 });
    // Slugs avec tirets (URL) : même formation
    expect(applyDistancielOffer(399, { slug: 'tajwid-enfant-distance' }, DURING).current).toBe(350);
  });

  it('jamais sur le présentiel, quel que soit le prix', () => {
    expect(applyDistancielOffer(480, { slug: 'enfant-mercredi-presentiel', type: 'presentiel' }, DURING)).toEqual({ original: 480, current: 480, discount: 0 });
    expect(applyDistancielOffer(649, { slug: 'femme-debutante-presentiel' }, DURING).discount).toBe(0);
    expect(applyDistancielOffer(480, { slug: 'presentiel-global' }, DURING).discount).toBe(0);
    // Le type en base prime sur le slug
    expect(applyDistancielOffer(399, { slug: 'fiqh_malikite', type: 'presentiel' }, DURING).discount).toBe(0);
    expect(isDistancielOfferEligible({ slug: 'tajwid_standard', type: 'presentiel' })).toBe(false);
  });

  it('pas de remise sur le pack, les cours offerts, les devis ni les prix ≤ 49 €', () => {
    expect(applyDistancielOffer(49, { slug: 'pack_accompagnement', type: 'distanciel' }, DURING).discount).toBe(0);
    expect(applyDistancielOffer(0, { slug: 'correction_fatiha', type: 'distanciel' }, DURING)).toEqual({ original: 0, current: 0, discount: 0 });
    expect(applyDistancielOffer(null, { slug: 'cours_particuliers' }, DURING)).toEqual({ original: 0, current: 0, discount: 0 });
    expect(applyDistancielOffer(49, { slug: 'fiqh_malikite', type: 'distanciel' }, DURING).discount).toBe(0);
    expect(applyDistancielOffer(NaN, { slug: 'fiqh_malikite' }, DURING)).toEqual({ original: 0, current: 0, discount: 0 });
  });

  it('hors période : prix inchangé', () => {
    expect(applyDistancielOffer(399, { slug: 'fiqh_malikite', type: 'distanciel' }, BEFORE)).toEqual({ original: 399, current: 399, discount: 0 });
  });

  it('le Pack Accompagnement est offert avec une formation à distance, pas avec le présentiel', () => {
    expect(isPackOfferedWith({ slug: 'fiqh_malikite', type: 'distanciel' }, DURING)).toBe(true);
    expect(isPackOfferedWith({ slug: 'arabe-enfant-distance' }, DURING)).toBe(true);
    expect(isPackOfferedWith({ slug: 'femme-debutante-presentiel', type: 'presentiel' }, DURING)).toBe(false);
    expect(isPackOfferedWith({ slug: 'correction_fatiha', type: 'distanciel' }, DURING)).toBe(false);
    expect(isPackOfferedWith({ slug: 'fiqh_malikite', type: 'distanciel' }, BEFORE)).toBe(false);

    const pack = { slug: 'pack_accompagnement', type: 'distanciel' };
    expect(addedFormationOfferPrice(49, pack, { slug: 'fiqh_malikite', type: 'distanciel' }, DURING)).toEqual({ original: 49, current: 0, discount: 49, offered: true });
    expect(addedFormationOfferPrice(49, pack, { slug: 'femme-debutante-presentiel' }, DURING)).toEqual({ original: 49, current: 49, discount: 0, offered: false });
    expect(addedFormationOfferPrice(49, pack, { slug: 'fiqh_malikite' }, BEFORE).current).toBe(49);
    // Une autre formation ajoutée garde la remise −49 €
    expect(addedFormationOfferPrice(399, { slug: 'al_aqida', type: 'distanciel' }, { slug: 'fiqh_malikite' }, DURING)).toEqual({ original: 399, current: 350, discount: 49, offered: false });
  });

  it('parsePriceEuros lit les libellés du catalogue', () => {
    expect(parsePriceEuros('399 €')).toBe(399);
    expect(parsePriceEuros('649€')).toBe(649);
    expect(parsePriceEuros('Sur Devis')).toBeNull();
    expect(parsePriceEuros('0 €')).toBeNull();
    expect(parsePriceEuros(null)).toBeNull();
  });
});
