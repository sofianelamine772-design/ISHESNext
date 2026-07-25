import { PROGRAMS_DATA } from '../../src/lib/programs-data';
import { PRESENTIEL_CLASSES, CLASS_ID_TO_UUID } from '../../src/lib/presentiel-data';

describe('Verification de l affectation de classe pour TOUTES les formations', () => {
  it('doit s assurer que chaque formation possede une logique d affectation de classe (distanciel auto, ou presentiel gere)', () => {
    // Les plans qui ont un comportement de sélection dynamique dans la page d'inscription
    const dynamicPlans = ['presentiel-global'];
    
    // Les plans qui ont une affectation statique hardcodée dans page.tsx (initClassId)
    const staticAssignments: Record<string, number> = {
      'femme_intermediaire_presentiel': 31,
      'femme_debutante_presentiel': 26,
    };

    const allPlans = Object.entries(PROGRAMS_DATA);
    const errors: string[] = [];

    for (const [planId, plan] of allPlans) {
      const isPresentiel = plan.tag?.toLowerCase().includes('présentiel') && !plan.tag?.toLowerCase().includes('distanciel');

      if (!isPresentiel) {
        // Pour les formations en distanciel (ou mixte), l'affectation se fait automatiquement 
        // dans le webhook Stripe (recherche de la classe active pour la formation).
        // Il n'y a donc pas besoin de classId statique.
        continue;
      }

      // Si c'est du 100% présentiel, il FAUT que le classId soit fourni à Stripe
      if (dynamicPlans.includes(planId)) {
        continue; // Géré par le formulaire dynamique
      }
      
      if (staticAssignments[planId]) {
        const classIdNum = staticAssignments[planId];
        const uuid = CLASS_ID_TO_UUID[classIdNum];
        
        if (!uuid) {
          errors.push(`Erreur: Le plan "${planId}" est statiquement assigné à la classe ID ${classIdNum}, mais ce numéro n'a pas d'UUID correspondant dans CLASS_ID_TO_UUID.`);
        }
      } else {
        errors.push(`Erreur: Le plan "${planId}" est 100% Présentiel, mais n'est pas géré dynamiquement ni statiquement assigné. Les élèves se retrouveront "En attente d'affectation".`);
      }
    }

    expect(errors).toEqual([]);
  });
});
