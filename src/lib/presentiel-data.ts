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
  // --- ENFANTS (1 à 23) ---
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
    ageCondition: "7-15 ans",
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
    id: 9,
    niveau: "Élémentaire Débutant 1",
    ageCondition: "7-15 ans",
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
    id: 10,
    niveau: "Élémentaire Débutant 1",
    ageCondition: "7-15 ans",
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
    id: 11,
    niveau: "Élémentaire Débutant 1",
    ageCondition: "7-15 ans",
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
    niveau: "Élémentaire 2",
    ageCondition: "7-15 ans",
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
    id: 18,
    niveau: "Élémentaire 2+",
    ageCondition: "7-15 ans",
    horaire: "MERCREDI",
    audience: "enfant",
    type: "mixte",
    jour: "mercredi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "mercredi",
    niveauKey: "elementaire_2_plus"
  },
  {
    id: 19,
    niveau: "Élémentaire 2",
    ageCondition: "7-15 ans",
    horaire: "SAMEDI MATIN",
    audience: "enfant",
    type: "mixte",
    jour: "samedi",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "elementaire_2"
  },
  {
    id: 20,
    niveau: "Élémentaire 2",
    ageCondition: "7-15 ans",
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
    ageCondition: "7-15 ans",
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
    niveau: "Élémentaire 3 et 3+",
    ageCondition: "7-15 ans",
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
    niveau: "Élémentaire 4",
    ageCondition: "7-15 ans",
    horaire: "MERCREDI",
    audience: "enfant",
    type: "mixte",
    jour: "mercredi",
    periode: "après-midi",
    planId: "presentiel-global",
    slotKey: "mercredi",
    niveauKey: "elementaire_4"
  },

  // --- FEMMES (24 et 25) ---
  {
    id: 24,
    niveau: "Femme débutante ARABE + TAJWID",
    ageCondition: "Femme",
    horaire: "Dimanche matin (09h00 - 12h00)",
    audience: "adulte",
    type: "femme",
    jour: "dimanche",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "dimanche",
    niveauKey: "femme_debutante"
  },
  {
    id: 25,
    niveau: "Femme intermédiaire ARABE + TAJWID",
    ageCondition: "Femme",
    horaire: "Samedi matin (09h00 - 12h00)",
    audience: "adulte",
    type: "femme",
    jour: "samedi",
    periode: "matin",
    planId: "presentiel-global",
    slotKey: "samedi",
    niveauKey: "femme_intermediaire"
  }
];

// Standardize children class times to match the user's requirements:
// - Mercredi après-midi: 13h30-16h30
// - Samedi matin: 9h-12h
// - Samedi après-midi: 13h30-16h30
// - Dimanche matin: 9h-12h
// - Dimanche après-midi: 13h30-16h30
PRESENTIEL_CLASSES.forEach(c => {
  if (c.audience === 'enfant') {
    if (c.jour === 'mercredi') {
      c.horaire = "Mercredi après-midi (13h30 - 16h30)";
    } else if (c.jour === 'samedi') {
      if (c.periode === 'matin') {
        c.horaire = "Samedi matin (09h00 - 12h00)";
      } else {
        c.horaire = "Samedi après-midi (13h30 - 16h30)";
      }
    } else if (c.jour === 'dimanche') {
      if (c.periode === 'matin') {
        c.horaire = "Dimanche matin (09h00 - 12h00)";
      } else {
        c.horaire = "Dimanche après-midi (13h30 - 16h30)";
      }
    }
  }
});

const DAY_LABEL: Record<string, string> = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  samedi: "Samedi",
  dimanche: "Dimanche",
};

export function formatPresentielSlotLabel(jour: string, periode?: string | null): string {
  const day = DAY_LABEL[(jour || "").toLowerCase()] || jour;
  const period = (periode || "").toLowerCase();
  if (day === "Mercredi") return "Mercredi après-midi";
  if (period === "matin") return `${day} matin`;
  if (period.includes("après") || period.includes("apres") || period.includes("a-m")) {
    return `${day} après-midi`;
  }
  return day;
}

export function formatPresentielClassDisplayName(
  c: Pick<PresentielClass, "niveau" | "ageCondition" | "jour" | "periode" | "audience">
): string {
  const slot = formatPresentielSlotLabel(c.jour, c.periode);
  if (c.audience === "adulte") return `${c.niveau} — ${slot}`;
  return `${c.niveau} (${c.ageCondition}) — ${slot}`;
}

export function resolvePresentielClassName(input: {
  external_id?: number | null;
  name?: string | null;
  type?: string | null;
  niveau?: string | null;
  age_condition?: string | null;
  day_of_week?: string | null;
  periode?: string | null;
  audience?: string | null;
}): string {
  const catalog = PRESENTIEL_CLASSES.find((c) => c.id === input.external_id);
  if (catalog) return formatPresentielClassDisplayName(catalog);
  if (input.type === "presentiel" && input.niveau && input.day_of_week) {
    return formatPresentielClassDisplayName({
      niveau: input.niveau,
      ageCondition: input.age_condition || "",
      jour: input.day_of_week.toLowerCase() as PresentielClass["jour"],
      periode: ((input.periode || "après-midi").toLowerCase() as PresentielClass["periode"]),
      audience: input.audience === "adulte" ? "adulte" : "enfant",
    });
  }
  return input.name || "Classe";
}

export function presentielHoursLabel(jour: string, periode?: string | null): string {
  const day = (jour || "").toLowerCase();
  const period = (periode || "").toLowerCase();
  if (day === "mercredi") return "13h30 - 16h30";
  if (day === "samedi" || day === "dimanche") {
    return period === "matin" ? "09h00 - 12h00" : "13h30 - 16h30";
  }
  return "";
}

export function isOfficialPresentielClass(externalId?: number | null): boolean {
  return typeof externalId === "number" && externalId >= 1 && externalId <= 25;
}

export const FEMME_DEBUTANTE_CLASS_ID = 24;
export const FEMME_INTERMEDIAIRE_CLASS_ID = 25;

export const FEMME_PRESENTIEL_CLASS_BY_PLAN: Record<string, number> = {
  "femme-debutante-presentiel": FEMME_DEBUTANTE_CLASS_ID,
  "femme_debutante_presentiel": FEMME_DEBUTANTE_CLASS_ID,
  "femme-intermediaire-presentiel": FEMME_INTERMEDIAIRE_CLASS_ID,
  "femme_intermediaire_presentiel": FEMME_INTERMEDIAIRE_CLASS_ID,
};

/** Si le front envoie presentiel-global avec une classe femme, facturer 649 € (pas 480 €). */
export function resolvePresentielCheckoutSlug(formationId: string, classIds: number[]): string {
  const slug = formationId || "";
  const isChildGlobal =
    slug === "presentiel-global" ||
    slug === "presentiel_global" ||
    slug === "arabe_coran_junior";
  if (!isChildGlobal) return formationId;

  const hasDebutante = classIds.includes(FEMME_DEBUTANTE_CLASS_ID);
  const hasIntermediaire = classIds.includes(FEMME_INTERMEDIAIRE_CLASS_ID);
  if (hasDebutante && !hasIntermediaire) return "femme-debutante-presentiel";
  if (hasIntermediaire && !hasDebutante) return "femme-intermediaire-presentiel";
  return formationId;
}

export const CLASS_ID_TO_UUID: Record<number, string> = {
  1: 'a7712363-8f5a-475e-848e-d27acff577f7', // Prépa 1 – Mercredi
  2: 'f2b240c6-6c34-4222-8437-7f838ace875e', // Prépa 1 – Samedi Matin
  3: '6bdd0cf4-efc8-48ca-a99b-af869d7d4be2', // Prépa 1 – Samedi A-M
  4: '8b09c982-d20d-4ef6-94ff-d56162c190a4', // Prépa 1 – Dimanche Matin
  5: 'c144f609-eb53-4260-aaaf-cbb44008dc3d', // Prépa 2 – Mercredi
  6: '01ecb91a-0d82-4e09-b1b3-50dce11801cd', // Prépa 2 – Samedi Matin
  7: 'b48dbc97-15c6-4b4c-b8ef-ee7b6800ef20', // Prépa 2 – Dimanche Matin
  8: '6e2e4c21-b48d-4e38-b4f5-18ebba3d4f46', // Élémentaire Déb.1 – Samedi Matin
  9: 'd118ce75-5aa6-4ce7-bbf8-00a3f4b00bd8', // Élémentaire Déb.1 – Samedi A-M
  10: 'd7871208-488b-48c2-bf7a-d38077d7e7e9', // Élémentaire Déb.1 – Dimanche Matin
  11: '097b750f-c2df-4b4e-93b2-5d0db1c1d001', // Élémentaire Déb.1 – Dimanche A-M
  12: '65c44bde-7ee0-49c0-ada9-4ac86ab6e770', // Élémentaire 1+ – Mercredi
  13: 'ff5a3df2-4c08-4b3f-9ab9-81458f9ff68e', // Élémentaire 1+ – Samedi Matin
  14: 'c8c0285b-d660-45db-80c9-24cc7884d9e6', // Élémentaire 1+ – Samedi A-M
  15: 'e2e7bf78-4756-4bea-8642-0157a5e918c4', // Élémentaire 1+ – Dimanche Matin
  16: '033d3fee-a88d-477c-8155-b183134b29b5', // Élémentaire 1+ – Dimanche A-M
  17: 'c6abb5d1-352b-46af-9d5d-4505520d6dac', // Élémentaire 2 – Mercredi
  18: '049c6f2d-b1f5-4d00-9e59-3ccf952082a1', // Élémentaire 2+ – Mercredi
  19: '077fc61d-d8bc-4edd-ab6d-505f7806f497', // Élémentaire 2 – Samedi Matin
  20: '0339dcff-a372-4479-991f-5b33c0742c01', // Élémentaire 2 – Dimanche A-M
  21: '475e3799-4393-4a6f-9a76-305a59039bce', // Élémentaire 2+ – Dimanche A-M
  22: 'fc020c9d-c1f7-40b2-8e9e-9011c9be6a98', // Élémentaire 3 et 3+ – Dimanche A-M
  23: '10804885-481b-4544-8c62-c6c0f1828c43', // Élémentaire 4 – Mercredi
  24: 'c68f1ae9-e7b0-4876-a99c-283152aaf382', // Femme Débutante – Arabe + Tajwid
  25: '4c1b3968-21ff-414c-b709-249ec1e4c087', // Femme Intermédiaire – Arabe + Tajwid
};
