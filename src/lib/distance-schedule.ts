export type DistanceScheduleTone =
  | "enfant"
  | "femme"
  | "homme"
  | "intensif"
  | "formation"
  | "histoire"
  | "general";

export type DistanceScheduleSlot = {
  id: string;
  time: string;
  title: string;
  teacher?: string;
  tone: DistanceScheduleTone;
  /** external_id officiels distanciel (101–108) */
  externalIds?: number[];
  /** slugs formations pour effectifs live */
  formationSlugs?: string[];
};

export type DistanceScheduleDay = {
  id: string;
  label: string;
  slots: DistanceScheduleSlot[];
};

/** Planning hebdomadaire distanciel (créneau mercredi 18h30 barré volontairement omis). */
export const DISTANCE_WEEKLY_SCHEDULE: DistanceScheduleDay[] = [
  {
    id: "lundi",
    label: "Lundi",
    slots: [
      {
        id: "lun-tarbiya-1",
        time: "18h30 – 19h30",
        title: "Éducation islamique, 1re année",
        teacher: "Zahra ou Inès",
        tone: "enfant",
        externalIds: [107],
      },
      {
        id: "lun-tarbiya-2",
        time: "18h30 – 19h30",
        title: "Éducation islamique, 2e année",
        teacher: "Rachida",
        tone: "enfant",
        externalIds: [108],
      },
      {
        id: "lun-formation",
        time: "19h30 – 20h30",
        title: "Formation enseignants",
        teacher: "Riad",
        tone: "formation",
        formationSlugs: ["formation_enseignante_tajwid"],
      },
    ],
  },
  {
    id: "mardi",
    label: "Mardi",
    slots: [
      {
        id: "mar-arabe-1",
        time: "18h30 – 19h30",
        title: "Arabe enfants, niveau 1",
        tone: "enfant",
        externalIds: [101],
      },
      {
        id: "mar-tajwid-23",
        time: "18h30 – 19h30",
        title: "Tajwid enfants, niveaux 2/3",
        teacher: "Hamida",
        tone: "enfant",
        externalIds: [105, 106],
      },
      {
        id: "mar-tajwid-intensif",
        time: "19h30 – 20h30",
        title: "Tajwid intensif",
        teacher: "Riad",
        tone: "intensif",
        formationSlugs: ["tajwid_intensif"],
      },
      {
        id: "mar-formation",
        time: "19h30 – 20h30",
        title: "Formation enseignante",
        teacher: "Rachida",
        tone: "general",
        formationSlugs: ["formation_enseignante_tarbya"],
      },
    ],
  },
  {
    id: "mercredi",
    label: "Mercredi",
    slots: [
      {
        id: "mer-histoire",
        time: "20h – 21h",
        title: "Histoire arabo-musulmane",
        tone: "histoire",
        formationSlugs: ["civilisation_arabo_musulmane"],
      },
    ],
  },
  {
    id: "jeudi",
    label: "Jeudi",
    slots: [
      {
        id: "jeu-tajwid-1",
        time: "18h30 – 19h30",
        title: "Tajwid enfants, niveau 1",
        teacher: "Hamida",
        tone: "enfant",
        externalIds: [104],
      },
      {
        id: "jeu-arabe-23",
        time: "18h30 – 19h30",
        title: "Arabe enfants, niveaux 2/3",
        teacher: "Moufida",
        tone: "enfant",
        externalIds: [102, 103],
      },
      {
        id: "jeu-arabe-femmes",
        time: "19h30 – 20h30",
        title: "Arabe femmes, niveau 1, 1re année",
        teacher: "Hamida",
        tone: "femme",
      },
      {
        id: "jeu-formation",
        time: "19h30 – 20h30",
        title: "Formation enseignants",
        teacher: "Riad",
        tone: "formation",
        formationSlugs: ["formation_enseignante_tajwid"],
      },
    ],
  },
  {
    id: "vendredi",
    label: "Vendredi",
    slots: [
      {
        id: "ven-tajwid-femmes",
        time: "18h30 – 20h",
        title: "Tajwid femmes, niveau 1",
        teacher: "Moufida",
        tone: "femme",
      },
      {
        id: "ven-tajwid-hommes",
        time: "18h30 – 19h30",
        title: "Tajwid hommes, débutants, 1re année",
        tone: "homme",
      },
      {
        id: "ven-arabe-hommes",
        time: "19h – 20h",
        title: "Arabe hommes, débutants, 1re année",
        teacher: "Mari Hamida",
        tone: "homme",
      },
      {
        id: "ven-tajwid-intensif",
        time: "19h30 – 20h30",
        title: "Tajwid intensif",
        teacher: "Riad",
        tone: "intensif",
        formationSlugs: ["tajwid_intensif"],
      },
      {
        id: "ven-formation",
        time: "19h – 20h",
        title: "Formation enseignante",
        teacher: "Rachida",
        tone: "general",
        formationSlugs: ["formation_enseignante_tarbya"],
      },
    ],
  },
  {
    id: "samedi",
    label: "Samedi",
    slots: [
      {
        id: "sam-spiritualite",
        time: "Horaire à confirmer",
        title: "Spiritualité femmes",
        teacher: "Rachida",
        tone: "femme",
        formationSlugs: ["spiritualite_islam"],
      },
      {
        id: "sam-sira",
        time: "10h30 – 11h30",
        title: "Sīra, 1re année",
        teacher: "Riad",
        tone: "femme",
        formationSlugs: ["as_sirah"],
      },
      {
        id: "sam-fiqh",
        time: "11h – 12h",
        title: "Fiqh malikite",
        tone: "general",
        formationSlugs: ["fiqh_malikite"],
      },
    ],
  },
  {
    id: "dimanche",
    label: "Dimanche",
    slots: [
      {
        id: "dim-sciences-coran",
        time: "Horaire à confirmer",
        title: "Sciences du Coran",
        teacher: "Rachida",
        tone: "intensif",
        formationSlugs: ["sciences_du_coran"],
      },
      {
        id: "dim-hifz-tilawa",
        time: "Horaire à confirmer",
        title: "Hifz Coran / Tilawa hommes et femmes",
        teacher: "Riad et Raoud",
        tone: "enfant",
        formationSlugs: ["memoriser_coran", "tilawa"],
      },
    ],
  },
];

export function distanceScheduleToneClass(tone: DistanceScheduleTone): string {
  switch (tone) {
    case "enfant":
      return "bg-[#FFD6E7] text-[#7A134F] border-[#F5A8C8]";
    case "femme":
      return "bg-[#C8F5C0] text-[#1E5C15] border-[#8EDB82]";
    case "homme":
      return "bg-[#BFD9FF] text-[#15467A] border-[#7EB0F0]";
    case "intensif":
      return "bg-[#FFE9A8] text-[#7A5A10] border-[#E8C75A]";
    case "formation":
      return "bg-[#E8E8E8] text-[#333] border-[#C8C8C8]";
    case "histoire":
      return "bg-[#E8D5C4] text-[#5C3A1E] border-[#C9A888]";
    case "general":
    default:
      return "bg-[#FFD4A8] text-[#7A3F10] border-[#E8A85A]";
  }
}
