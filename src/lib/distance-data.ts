export interface DistanceClass {
  id: number;
  niveau: string;
  ageCondition: string;
  horaire: string;
  audience: "enfant" | "adulte";
  type: "mixte" | "femme";
  jour: string;
  periode: string;
  planId: string;
  slotKey: string;
  niveauKey: string;
}

export const DISTANCE_CLASSES: DistanceClass[] = [
  // ARABE ENFANT
  {
    id: 101,
    niveau: "Niveau 1",
    ageCondition: "Enfant",
    horaire: "À définir",
    audience: "enfant",
    type: "mixte",
    jour: "à définir",
    periode: "à définir",
    planId: "arabe_enfant_distance",
    slotKey: "a_definir",
    niveauKey: "arabe_enfant_1"
  },
  {
    id: 102,
    niveau: "Niveau 2",
    ageCondition: "Enfant",
    horaire: "À définir",
    audience: "enfant",
    type: "mixte",
    jour: "à définir",
    periode: "à définir",
    planId: "arabe_enfant_distance",
    slotKey: "a_definir",
    niveauKey: "arabe_enfant_2"
  },
  {
    id: 103,
    niveau: "Niveau 3",
    ageCondition: "Enfant",
    horaire: "À définir",
    audience: "enfant",
    type: "mixte",
    jour: "à définir",
    periode: "à définir",
    planId: "arabe_enfant_distance",
    slotKey: "a_definir",
    niveauKey: "arabe_enfant_3"
  },
  // TAJWID ENFANT
  {
    id: 104,
    niveau: "Niveau 1",
    ageCondition: "Enfant",
    horaire: "À définir",
    audience: "enfant",
    type: "mixte",
    jour: "à définir",
    periode: "à définir",
    planId: "tajwid_enfant_distance",
    slotKey: "a_definir",
    niveauKey: "tajwid_enfant_1"
  },
  {
    id: 105,
    niveau: "Niveau 2",
    ageCondition: "Enfant",
    horaire: "À définir",
    audience: "enfant",
    type: "mixte",
    jour: "à définir",
    periode: "à définir",
    planId: "tajwid_enfant_distance",
    slotKey: "a_definir",
    niveauKey: "tajwid_enfant_2"
  },
  {
    id: 106,
    niveau: "Niveau 3",
    ageCondition: "Enfant",
    horaire: "À définir",
    audience: "enfant",
    type: "mixte",
    jour: "à définir",
    periode: "à définir",
    planId: "tajwid_enfant_distance",
    slotKey: "a_definir",
    niveauKey: "tajwid_enfant_3"
  },
  // TARBYA ISLAMYA
  {
    id: 107,
    niveau: "1ère année",
    ageCondition: "Enfant",
    horaire: "À définir",
    audience: "enfant",
    type: "mixte",
    jour: "à définir",
    periode: "à définir",
    planId: "tarbiya_islamiya",
    slotKey: "a_definir",
    niveauKey: "tarbiya_1"
  },
  {
    id: 108,
    niveau: "2ème année",
    ageCondition: "Enfant",
    horaire: "À définir",
    audience: "enfant",
    type: "mixte",
    jour: "à définir",
    periode: "à définir",
    planId: "tarbiya_islamiya",
    slotKey: "a_definir",
    niveauKey: "tarbiya_2"
  }
];

export const DISTANCE_CLASS_ID_TO_UUID: Record<number, string> = {
  101: 'e0a12345-0001-4000-8000-111111111111',
  102: 'e0a12345-0002-4000-8000-222222222222',
  103: 'e0a12345-0003-4000-8000-333333333333',
  104: 'e0a12345-0004-4000-8000-444444444444',
  105: 'e0a12345-0005-4000-8000-555555555555',
  106: 'e0a12345-0006-4000-8000-666666666666',
  107: 'e0a12345-0007-4000-8000-777777777777',
  108: 'e0a12345-0008-4000-8000-888888888888',
};

export function isOfficialDistanceClassId(id?: number | null): boolean {
  return typeof id === 'number' && Number.isInteger(id) && DISTANCE_CLASS_ID_TO_UUID[id] != null;
}
