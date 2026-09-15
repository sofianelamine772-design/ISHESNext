import { PROGRAMS_DATA } from '@/lib/programs-data';
import { DISTANCE_CLASSES, DISTANCE_CLASS_ID_TO_UUID } from '@/lib/distance-data';

describe('Catalogue Distanciel (Adulte & Enfant)', () => {
  it('toutes les classes enfant distanciel ont un UUID valide', () => {
    DISTANCE_CLASSES.forEach((classe) => {
      const uuid = DISTANCE_CLASS_ID_TO_UUID[classe.id];
      expect(uuid).toBeDefined();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });
  });

  it('les programmes adultes distanciel ont les champs requis', () => {
    // Les clés de PROGRAMS_DATA correspondent aux formationId/slugs utilisés
    const keys = Object.keys(PROGRAMS_DATA);
    expect(keys.length).toBeGreaterThan(0);

    keys.forEach((key) => {
      const prog = PROGRAMS_DATA[key];
      expect(prog.title).toBeDefined();
      expect(prog.price).toBeDefined();
      // On s'assure que le titre est une chaîne de caractères
      expect(typeof prog.title).toBe('string');
    });
  });

  it('les classes distanciel enfant couvrent Arabe, Tajwid et Tarbiya', () => {
    const plans = new Set(DISTANCE_CLASSES.map((c) => c.planId));
    expect(plans.has('arabe_enfant_distance')).toBe(true);
    expect(plans.has('tajwid_enfant_distance')).toBe(true);
    expect(plans.has('tarbiya_islamiya')).toBe(true);
  });
});
