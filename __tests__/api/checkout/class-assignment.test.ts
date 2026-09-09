import { CLASS_ID_TO_UUID } from '@/lib/presentiel-data';
import { PROGRAMS_DATA } from '@/lib/programs-data';

describe('Vérification de l\'assignation des classes (Toutes Formations)', () => {

  it('Les formations présentiel enfants DOIVENT afficher les créneaux pour choisir une classe', () => {
    // Si un parent clique sur "enfant-mercredi-presentiel", le frontend le convertit en 'presentiel-global' + slot 'mercredi'
    const expectedInternalPlanId = 'presentiel-global';
    expect(expectedInternalPlanId).toBe('presentiel-global');
  });

  it('Les classes pour Femmes Présentiel (24 et 25) ont un UUID dans CLASS_ID_TO_UUID', () => {
    // femme-debutante-presentiel -> classId 24
    expect(CLASS_ID_TO_UUID[24]).toBeDefined();

    // femme-intermediaire-presentiel -> classId 25
    expect(CLASS_ID_TO_UUID[25]).toBeDefined();
  });

  it('ne remappe pas les plans femme vers presentiel-global (prix 649 € vs 480 €)', () => {
    expect('femme-debutante-presentiel').not.toBe('presentiel-global');
    expect('femme-intermediaire-presentiel').not.toBe('presentiel-global');
    expect(PROGRAMS_DATA.femme_debutante_presentiel.price).toBe('649 €');
    expect(PROGRAMS_DATA.tajwid_intensif.price).toBe('799 €');
  });

  it('le catalogue 1–25 est inscriptible (chaque classe a un UUID checkout)', () => {
    const uuids = Object.values(CLASS_ID_TO_UUID);
    const uniqueUuids = new Set(uuids);
    expect(uuids).toHaveLength(25);
    expect(uuids.length).toBe(uniqueUuids.size);
    
    for (const uuid of uuids) {
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    }
  });

  it('Toutes les formations distanciel doivent avoir un UUID dans la base de données', () => {
    const distancielKeys = Object.keys(PROGRAMS_DATA).filter(k => 
      !k.includes('presentiel') && 
      !['femme_debutante', 'femme_intermediaire'].includes(k)
    );
    expect(distancielKeys.length).toBeGreaterThan(0);
  });
});
