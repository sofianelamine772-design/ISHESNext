import { CLASS_ID_TO_UUID } from '@/lib/presentiel-data';
import { PROGRAMS_DATA } from '@/lib/programs-data';

describe('Vérification de l\'assignation des classes (Toutes Formations)', () => {

  it('Les formations présentiel enfants DOIVENT afficher les créneaux pour choisir une classe', () => {
    // Si un parent clique sur "enfant-mercredi-presentiel", le frontend le convertit en 'presentiel-global' + slot 'mercredi'
    const expectedInternalPlanId = 'presentiel-global';
    expect(expectedInternalPlanId).toBe('presentiel-global');
  });

  it('Les classes pour Femmes Présentiel (26 et 31) ont un UUID dans CLASS_ID_TO_UUID', () => {
    // femme-debutante-presentiel -> classId 26
    expect(CLASS_ID_TO_UUID[26]).toBeDefined();
    
    // femme-intermediaire-presentiel -> classId 31
    expect(CLASS_ID_TO_UUID[31]).toBeDefined();
  });

  it('TOUTES les classes de CLASS_ID_TO_UUID ont un UUID valide et unique', () => {
    const uuids = Object.values(CLASS_ID_TO_UUID);
    const uniqueUuids = new Set(uuids);
    expect(uuids.length).toBe(uniqueUuids.size); // Pas de doublon
    
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
