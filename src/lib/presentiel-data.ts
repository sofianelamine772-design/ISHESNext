export interface PresentielClass {
  id: number;
  niveau: string;
  ageCondition: string;
  horaire: string;
  audience: "enfant" | "adulte";
  type: "mixte" | "femme";
  jour: "lundi" | "mardi" | "mercredi" | "samedi" | "dimanche";
  periode: "matin" | "après-midi" | "soir";
  planId: string;
  slotKey: string;
  niveauKey: string;
}

export const PRESENTIEL_CLASSES: PresentielClass[] = [
  // --- ENFANTS (1 à 25) ---
  {
    id: 1,
    niveau: "Préparatoire 1ère année",
    ageCondition: "4-6 ans",
    horaire: "MERCREDI",
    audience: "enfant",
    type: "mixte",
    jour: "mercredi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "mercredi",
    niveauKey: "maternel_1"
  },
  {
    id: 2,
    niveau: "Préparatoire 1ère année",
    ageCondition: "4-6 ans",
    horaire: "SAMEDI MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "samedi",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "maternel_1"
  },
  {
    id: 3,
    niveau: "Préparatoire 1ère année",
    ageCondition: "4-6 ans",
    horaire: "SAMEDI A-M",
    audience: "enfant",
    type: "mixte",
    jour: "samedi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "maternel_1"
  },
  {
    id: 4,
    niveau: "Préparatoire 1ère année",
    ageCondition: "4-6 ans",
    horaire: "DIMANCHE MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "maternel_1"
  },
  {
    id: 5,
    niveau: "Préparatoire 2ème année",
    ageCondition: "5-6 ans",
    horaire: "MERCREDI",
    audience: "enfant",
    type: "mixte",
    jour: "mercredi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "mercredi",
    niveauKey: "maternel_2"
  },
  {
    id: 6,
    niveau: "Préparatoire 2ème année",
    ageCondition: "5-6 ans",
    horaire: "SAMEDI MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "samedi",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "maternel_2"
  },
  {
    id: 7,
    niveau: "Préparatoire 2ème année",
    ageCondition: "5-6 ans",
    horaire: "DIMANCHE MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "maternel_2"
  },
  {
    id: 8,
    niveau: "Élémentaire Débutant 1",
    ageCondition: "7-14 ans",
    horaire: "MERCREDI",
    audience: "enfant",
    type: "mixte",
    jour: "mercredi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "mercredi",
    niveauKey: "elementaire_1"
  },
  {
    id: 9,
    niveau: "Élémentaire Débutant 1",
    ageCondition: "7-14 ans",
    horaire: "SAMEDI MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "samedi",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "elementaire_1"
  },
  {
    id: 10,
    niveau: "Élémentaire Débutant 1",
    ageCondition: "7-14 ans",
    horaire: "SAMEDI A-M",
    audience: "enfant",
    type: "mixte",
    jour: "samedi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "elementaire_1"
  },
  {
    id: 11,
    niveau: "Élémentaire Débutant 1",
    ageCondition: "7-14 ans",
    horaire: "DIMANCHE MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_1"
  },
  {
    id: 12,
    niveau: "Élémentaire Débutant 1",
    ageCondition: "7-14 ans",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_1"
  },
  {
    id: 13,
    niveau: "Élémentaire 1+",
    ageCondition: "NON débutant",
    horaire: "MERCREDI",
    audience: "enfant",
    type: "mixte",
    jour: "mercredi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "mercredi",
    niveauKey: "elementaire_1_plus"
  },
  {
    id: 14,
    niveau: "Élémentaire 1+",
    ageCondition: "NON débutant",
    horaire: "SAMEDI MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "samedi",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "elementaire_1_plus"
  },
  {
    id: 15,
    niveau: "Élémentaire 1+",
    ageCondition: "NON débutant",
    horaire: "SAMEDI A-M",
    audience: "enfant",
    type: "mixte",
    jour: "samedi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "elementaire_1_plus"
  },
  {
    id: 16,
    niveau: "Élémentaire 1+",
    ageCondition: "NON débutant",
    horaire: "DIMANCHE MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_1_plus"
  },
  {
    id: 17,
    niveau: "Élémentaire 1+",
    ageCondition: "NON débutant",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_1_plus"
  },
  {
    id: 18,
    niveau: "Élémentaire 2 et 2+",
    ageCondition: "7-14 ans",
    horaire: "MERCREDI",
    audience: "enfant",
    type: "mixte",
    jour: "mercredi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "mercredi",
    niveauKey: "elementaire_2"
  },
  {
    id: 19,
    niveau: "Élémentaire 2",
    ageCondition: "7-14 ans",
    horaire: "DIMANCHE MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_2"
  },
  {
    id: 20,
    niveau: "Élémentaire 2",
    ageCondition: "7-14 ans",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_2"
  },
  {
    id: 21,
    niveau: "Élémentaire 2+",
    ageCondition: "7-14 ans",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_2_plus"
  },
  {
    id: 22,
    niveau: "Élémentaire 3",
    ageCondition: "7-14 ans",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_3"
  },
  {
    id: 23,
    niveau: "Élémentaire 3 et 3+",
    ageCondition: "7-12 ans",
    horaire: "MERCREDI",
    audience: "enfant",
    type: "mixte",
    jour: "mercredi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "mercredi",
    niveauKey: "elementaire_3"
  },
  {
    id: 24,
    niveau: "Élémentaire 4",
    ageCondition: "7-14 ans",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_4"
  },
  {
    id: 25,
    niveau: "Élémentaire 5",
    ageCondition: "7-15 ans",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_5"
  },
  {
    id: 32,
    niveau: "Élémentaire 6",
    ageCondition: "7-15 ans",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_6"
  },
  {
    id: 33,
    niveau: "Élémentaire 7",
    ageCondition: "7-15 ans",
    horaire: "DIMANCHE A-M",
    audience: "enfant",
    type: "mixte",
    jour: "dimanche",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "elementaire_7"
  },

  // --- FEMMES (26 à 31) ---
  {
    id: 26,
    niveau: "Femme débutante ARABE + TAJWID",
    ageCondition: "Femme",
    horaire: "Dimanche matin",
    audience: "adulte",
    type: "femme",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "femme_debutante"
  },
  {
    id: 27,
    niveau: "Femme débutante TAJWID SEUL",
    ageCondition: "Femme",
    horaire: "Dimanche matin",
    audience: "adulte",
    type: "femme",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "femme_debutante"
  },
  {
    id: 28,
    niveau: "Femme débutante ARABE SEUL",
    ageCondition: "Femme",
    horaire: "Dimanche matin",
    audience: "adulte",
    type: "femme",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "femme_debutante"
  },
  {
    id: 29,
    niveau: "Femme intermédiaire ARABE",
    ageCondition: "Femme",
    horaire: "Samedi matin",
    audience: "adulte",
    type: "femme",
    jour: "samedi",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "femme_intermediaire"
  },
  {
    id: 30,
    niveau: "Femme intermédiaire TAJWID",
    ageCondition: "Femme",
    horaire: "Samedi matin",
    audience: "adulte",
    type: "femme",
    jour: "samedi",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "femme_intermediaire"
  },
  {
    id: 31,
    niveau: "Femme intermédiaire ARABE + TAJ",
    ageCondition: "Femme",
    horaire: "Samedi après-midi",
    audience: "adulte",
    type: "femme",
    jour: "samedi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "femme_intermediaire"
  }
];

export const CLASS_ID_TO_UUID: Record<number, string> = {
  1: 'a7712363-8f5a-475e-848e-d27acff577f7', // Prépa 1 – Mercredi
  2: 'f2b240c6-6c34-4222-8437-7f838ace875e', // Prépa 1 – Samedi Matin
  3: '6bdd0cf4-efc8-48ca-a99b-af869d7d4be2', // Prépa 1 – Samedi A-M
  4: '8b09c982-d20d-4ef6-94ff-d56162c190a4', // Prépa 1 – Dimanche Matin
  5: 'c144f609-eb53-4260-aaaf-cbb44008dc3d', // Prépa 2 – Mercredi
  6: '01ecb91a-0d82-4e09-b1b3-50dce11801cd', // Prépa 2 – Samedi Matin
  7: 'b48dbc97-15c6-4b4c-b8ef-ee7b6800ef20', // Prépa 2 – Dimanche Matin
  8: '049c6f2d-b1f5-4d00-9e59-3ccf952082a1', // Élémentaire Déb.1 – Mercredi
  9: '6e2e4c21-b48d-4e38-b4f5-18ebba3d4f46', // Élémentaire Déb.1 – Samedi Matin
  10: 'd118ce75-5aa6-4ce7-bbf8-00a3f4b00bd8', // Élémentaire Déb.1 – Samedi A-M
  11: 'd7871208-488b-48c2-bf7a-d38077d7e7e9', // Élémentaire Déb.1 – Dimanche Matin
  12: '097b750f-c2df-4b4e-93b2-5d0db1c1d001', // Élémentaire Déb.1 – Dimanche A-M
  13: '65c44bde-7ee0-49c0-ada9-4ac86ab6e770', // Élémentaire 1+ – Mercredi
  14: 'ff5a3df2-4c08-4b3f-9ab9-81458f9ff68e', // Élémentaire 1+ – Samedi Matin
  15: 'c8c0285b-d660-45db-80c9-24cc7884d9e6', // Élémentaire 1+ – Samedi A-M
  16: 'e2e7bf78-4756-4bea-8642-0157a5e918c4', // Élémentaire 1+ – Dimanche Matin
  17: '033d3fee-a88d-477c-8155-b183134b29b5', // Élémentaire 1+ – Dimanche A-M
  18: 'c6abb5d1-352b-46af-9d5d-4505520d6dac', // Élémentaire 2 et 2+ – Mercredi
  19: '077fc61d-d8bc-4edd-ab6d-505f7806f497', // Élémentaire 2 – Dimanche Matin
  20: '0339dcff-a372-4479-991f-5b33c0742c01', // Élémentaire 2 – Dimanche A-M
  21: '475e3799-4393-4a6f-9a76-305a59039bce', // Élémentaire 2+ – Dimanche A-M
  22: 'fc020c9d-c1f7-40b2-8e9e-9011c9be6a98', // Élémentaire 3 – Dimanche A-M
  23: '10804885-481b-4544-8c62-c6c0f1828c43', // Élémentaire 3 et 3+ – Mercredi
  24: 'add66e45-2f32-451f-a46a-5317f9730b7e', // Élémentaire 4 – Dimanche A-M
  25: '34758c69-72aa-4f6b-a7b1-4d3a546077c7', // Élémentaire 5 – Dimanche A-M
  26: 'c68f1ae9-e7b0-4876-a99c-283152aaf382', // Femme Débutante – Arabe + Tajwid
  27: 'cc259450-2c28-48a7-8253-6449683bf0ea', // Femme Débutante – Tajwid Seul
  28: '9ba65015-70a8-459e-96c3-c38cb9c053cd', // Femme Débutante – Arabe Seul
  29: '009e49ed-01c6-4c76-a745-3df31fa19f3b', // Femme Intermédiaire – Arabe
  30: '104a6249-a0a7-405b-906f-2639f71a2d64', // Femme Intermédiaire – Tajwid
  31: '4c1b3968-21ff-414c-b709-249ec1e4c087', // Femme Intermédiaire – Arabe + Taj.
  32: '89a7c0c1-e657-4740-a85e-aee37c91dd4d', // Élémentaire 6 – Dimanche A-M
  33: '5444b9ce-8ca4-43c0-ad4c-d8bbf5d30c2b', // Élémentaire 7 – Dimanche A-M
};
