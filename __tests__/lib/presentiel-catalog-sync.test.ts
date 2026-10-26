/// <reference types="jest" />
import fs from 'fs';
import path from 'path';
import {
  PRESENTIEL_CLASSES,
  CLASS_ID_TO_UUID,
  formatPresentielClassDisplayName,
  isOfficialPresentielClass,
  getPresentielCapacityLimit,
  resolvePresentielCheckoutSlug,
  resolvePresentielClassName,
  presentielHoursLabel,
  FEMME_DEBUTANTE_CLASS_ID,
  FEMME_INTERMEDIAIRE_CLASS_ID,
  isPresentielFemmeClass,
} from '@/lib/presentiel-data';
import { PROGRAMS_DATA } from '@/lib/programs-data';
import { DISTANCE_CLASSES, DISTANCE_CLASS_ID_TO_UUID } from '@/lib/distance-data';
import { filterVisiblePresentielSlots, isDayFullyBooked, getClassSlotStatus, isPresentielCardFull, isClassFull, areClassesAllFull } from '@/lib/class-availability';

function loadOfficialCsvClasses() {
  const csv = fs.readFileSync(
    path.join(process.cwd(), 'archives/exports/classes_presentiel_final_corrige.csv'),
    'utf8',
  );
  return csv
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => {
      const [numero, intitule] = line.split(';');
      return { id: parseInt(numero, 10), intitule };
    });
}

describe('Catalogue présentiel (site = admin = CSV)', () => {
  const csvClasses = loadOfficialCsvClasses();

  test.each(PRESENTIEL_CLASSES)(
    'classe présentiel $id — $niveau / $horaire a un UUID checkout',
    (classe) => {
      const uuid = CLASS_ID_TO_UUID[classe.id];
      expect(uuid).toBeDefined();
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
    },
  );

  it('expose les classes officielles du CSV, numérotées 1 à 26', () => {
    const catalogIds = PRESENTIEL_CLASSES.map((c) => c.id).sort((a, b) => a - b);
    const csvIds = csvClasses.map((c) => c.id).sort((a, b) => a - b);
    expect(csvClasses).toHaveLength(26);
    expect(PRESENTIEL_CLASSES).toHaveLength(26);
    expect(catalogIds).toEqual(csvIds);
    expect(catalogIds).toEqual(Array.from({ length: 26 }, (_, i) => i + 1));
  });

  it('chaque classe a un nom complet unique (niveau + créneau)', () => {
    const names = PRESENTIEL_CLASSES.map((c) => formatPresentielClassDisplayName(c));
    expect(names).toHaveLength(26);
    expect(new Set(names).size).toBe(26);
    expect(formatPresentielClassDisplayName(PRESENTIEL_CLASSES.find((c) => c.id === 19)!)).toBe(
      'Élémentaire 2 (7-15 ans) — Samedi matin',
    );
    expect(formatPresentielClassDisplayName(PRESENTIEL_CLASSES.find((c) => c.id === 24)!)).toContain(
      'Dimanche matin',
    );
    expect(formatPresentielClassDisplayName(PRESENTIEL_CLASSES.find((c) => c.id === 25)!)).toContain(
      'Samedi matin',
    );
    expect(formatPresentielClassDisplayName(PRESENTIEL_CLASSES.find((c) => c.id === 26)!)).toBe(
      'Élémentaire Débutant 1 (7-15 ans) — Mercredi après-midi',
    );
  });

  it('chaque classe du site a un UUID de checkout unique', () => {
    const uuids = PRESENTIEL_CLASSES.map((c) => CLASS_ID_TO_UUID[c.id]);
    expect(uuids.every(Boolean)).toBe(true);
    expect(new Set(uuids).size).toBe(26);
  });

  it('ignore les classes hors catalogue (doublons 1024+)', () => {
    expect(isOfficialPresentielClass(1)).toBe(true);
    expect(isOfficialPresentielClass(25)).toBe(true);
    expect(isOfficialPresentielClass(26)).toBe(true);
    expect(isOfficialPresentielClass(1024)).toBe(false);
    expect(isOfficialPresentielClass(1025)).toBe(false);
    expect(isOfficialPresentielClass(null)).toBe(false);

    const visible = filterVisiblePresentielSlots(
      [
        { classe_numero: 1 },
        { classe_numero: 25 },
        { classe_numero: 1024 },
        { classe_numero: 1029 },
        { classe_numero: null },
      ],
      PRESENTIEL_CLASSES.map((c) => c.id),
    );
    expect(visible.map((r) => r.classe_numero)).toEqual([1, 25]);
  });

  it('applique les plafonds prépa 13, élémentaire 18, femmes 20', () => {
    expect(getPresentielCapacityLimit(1)).toBe(13);
    expect(getPresentielCapacityLimit(7)).toBe(13);
    expect(getPresentielCapacityLimit(8)).toBe(18);
    expect(getPresentielCapacityLimit(23)).toBe(18);
    expect(getPresentielCapacityLimit(26)).toBe(18);
    expect(getPresentielCapacityLimit(24)).toBe(20);
    expect(getPresentielCapacityLimit(25)).toBe(20);
    expect(getPresentielCapacityLimit(1024)).toBeNull();
  });

  it('identifie clairement une classe ou un niveau plein', () => {
    const slots = [
      { classe_numero: 4, est_plein: true },
      { classe_numero: 2, est_plein: false },
      { classe_numero: 3, est_plein: true },
    ];
    expect(isClassFull(slots, 4)).toBe(true);
    expect(isClassFull(slots, 2)).toBe(false);
    expect(areClassesAllFull(slots, [4])).toBe(true);
    expect(areClassesAllFull(slots, [2, 3])).toBe(false);
    expect(areClassesAllFull(slots, [3, 4])).toBe(true);
    expect(areClassesAllFull(slots, [])).toBe(false);
  });

  it('ne considère un jour complet que si toutes ses classes le sont', () => {
    const slots = [
      { classe_numero: 1, day_of_week: 'Mercredi', est_plein: true },
      { classe_numero: 5, day_of_week: 'Mercredi', est_plein: false },
    ];
    expect(isDayFullyBooked(slots, 'Mercredi')).toBe(false);
    expect(getClassSlotStatus(slots, 1)?.est_plein).toBe(true);
    expect(getClassSlotStatus(slots, 5)?.est_plein).toBe(false);
  });

  it('ne marque pas une carte femme complète d après les classes enfants du même jour', () => {
    const slots = [
      { classe_numero: 4, day_of_week: 'Dimanche', est_plein: true },
      { classe_numero: FEMME_DEBUTANTE_CLASS_ID, day_of_week: 'Dimanche', est_plein: false },
      { classe_numero: FEMME_INTERMEDIAIRE_CLASS_ID, day_of_week: 'Samedi', est_plein: true },
      { classe_numero: 2, day_of_week: 'Samedi', est_plein: false },
    ];
    expect(isDayFullyBooked(slots, 'Dimanche')).toBe(false);
    expect(isPresentielCardFull(slots, { classId: FEMME_DEBUTANTE_CLASS_ID })).toBe(false);
    expect(isPresentielCardFull(slots, { classId: FEMME_INTERMEDIAIRE_CLASS_ID })).toBe(true);
    expect(isPresentielCardFull(slots, { day: 'Samedi' })).toBe(false);
  });
});

describe('Tarifs catalogue (affichage)', () => {
  it('affiche 649 € pour le Tajwid Intensif', () => {
    expect(PROGRAMS_DATA.tajwid_intensif.price).toBe('649 €');
  });

  it('ne confond pas le Tajwid Intensif avec les autres formations à 649 €', () => {
    expect(PROGRAMS_DATA.tajwid_standard.price).toBe('649 €');
    expect(PROGRAMS_DATA.femme_debutante_presentiel.price).toBe('649 €');
    expect(PROGRAMS_DATA.femme_intermediaire_presentiel.price).toBe('649 €');
  });

  it('aligne les horaires femme avec le CSV (débutante dimanche, intermédiaire samedi)', () => {
    expect(PROGRAMS_DATA.femme_debutante_presentiel.horaires[0]).toMatch(/dimanche/i);
    expect(PROGRAMS_DATA.femme_intermediaire_presentiel.horaires[0]).toMatch(/samedi/i);
    expect(PROGRAMS_DATA.femme_debutante_presentiel.description).toMatch(/dimanches matin/i);
    expect(PROGRAMS_DATA.femme_intermediaire_presentiel.description).toMatch(/samedis matin/i);
  });
});

describe('Checkout slug femme', () => {
  it('facture la classe 24/25 au tarif femme même si le front envoie presentiel-global', () => {
    expect(resolvePresentielCheckoutSlug('presentiel-global', [FEMME_DEBUTANTE_CLASS_ID]))
      .toBe('femme-debutante-presentiel');
    expect(resolvePresentielCheckoutSlug('presentiel-global', [FEMME_INTERMEDIAIRE_CLASS_ID]))
      .toBe('femme-intermediaire-presentiel');
    expect(resolvePresentielCheckoutSlug('presentiel-global', [1])).toBe('presentiel-global');
    expect(resolvePresentielCheckoutSlug('femme-debutante-presentiel', [FEMME_DEBUTANTE_CLASS_ID]))
      .toBe('femme-debutante-presentiel');
    expect(resolvePresentielCheckoutSlug('tajwid_intensif', [FEMME_DEBUTANTE_CLASS_ID]))
      .toBe('tajwid_intensif');
    expect(resolvePresentielCheckoutSlug('presentiel-global', [26])).toBe('presentiel-global');
  });
});

describe('Élémentaire Débutant 1 mercredi (classe 26)', () => {
  const mercrediElem1 = PRESENTIEL_CLASSES.find((c) => c.id === 26);

  it('existe une seule fois, le mercredi après-midi, sans toucher aux classes 1–25', () => {
    expect(mercrediElem1).toMatchObject({
      id: 26,
      niveau: 'Élémentaire Débutant 1',
      ageCondition: '7-15 ans',
      audience: 'enfant',
      type: 'mixte',
      jour: 'mercredi',
      periode: 'après-midi',
      planId: 'presentiel-global',
      slotKey: 'mercredi',
      niveauKey: 'elementaire_1',
    });
    expect(PRESENTIEL_CLASSES.filter((c) => c.id === 26)).toHaveLength(1);
    expect(PRESENTIEL_CLASSES.filter((c) => c.id >= 1 && c.id <= 25)).toHaveLength(25);
    expect(CLASS_ID_TO_UUID[1]).toBe('a7712363-8f5a-475e-848e-d27acff577f7');
    expect(CLASS_ID_TO_UUID[8]).toBe('6e2e4c21-b48d-4e38-b4f5-18ebba3d4f46');
    expect(CLASS_ID_TO_UUID[12]).toBe('65c44bde-7ee0-49c0-ada9-4ac86ab6e770');
    expect(CLASS_ID_TO_UUID[23]).toBe('10804885-481b-4544-8c62-c6c0f1828c43');
    expect(CLASS_ID_TO_UUID[24]).toBe('c68f1ae9-e7b0-4876-a99c-283152aaf382');
    expect(CLASS_ID_TO_UUID[25]).toBe('4c1b3968-21ff-414c-b709-249ec1e4c087');
  });

  it('s’inscrit comme les autres niveaux mercredi enfants, à 13h30–16h30', () => {
    const mercrediEnfants = PRESENTIEL_CLASSES
      .filter((c) => c.slotKey === 'mercredi' && c.audience === 'enfant')
      .map((c) => c.id)
      .sort((a, b) => a - b);
    expect(mercrediEnfants).toEqual([1, 5, 12, 17, 18, 23, 26]);
    expect(mercrediElem1?.horaire).toBe('Mercredi après-midi (13h30 - 16h30)');
    expect(presentielHoursLabel('mercredi', 'après-midi')).toBe('13h30 - 16h30');
    expect(resolvePresentielClassName({ external_id: 26 })).toBe(
      'Élémentaire Débutant 1 (7-15 ans) — Mercredi après-midi',
    );
  });

  it('n’écrase pas le niveau 1 samedi/dimanche ni le 1+ mercredi', () => {
    const elem1 = PRESENTIEL_CLASSES.filter((c) => c.niveauKey === 'elementaire_1');
    expect(elem1.map((c) => c.id).sort((a, b) => a - b)).toEqual([8, 9, 10, 11, 26]);
    expect(PRESENTIEL_CLASSES.find((c) => c.id === 12)).toMatchObject({
      niveauKey: 'elementaire_1_plus',
      jour: 'mercredi',
    });
  });

  it('reste visible et facturée en scolarité enfant, pas en classe femme', () => {
    expect(isOfficialPresentielClass(26)).toBe(true);
    expect(getPresentielCapacityLimit(26)).toBe(18);
    expect(FEMME_DEBUTANTE_CLASS_ID).toBe(24);
    expect(FEMME_INTERMEDIAIRE_CLASS_ID).toBe(25);
    expect(isPresentielFemmeClass(24)).toBe(true);
    expect(isPresentielFemmeClass(25)).toBe(true);
    expect(isPresentielFemmeClass(26)).toBe(false);
    expect(isPresentielFemmeClass(26, 'Élémentaire Débutant 1 (7-15 ans) — Mercredi après-midi')).toBe(false);
    expect(isPresentielFemmeClass(8)).toBe(false);
    expect(resolvePresentielCheckoutSlug('presentiel-global', [26])).toBe('presentiel-global');
    expect(CLASS_ID_TO_UUID[26]).toBe('1805c4dc-6071-4de1-abfd-3c3641a6e57e');
    expect(filterVisiblePresentielSlots(
      [{ classe_numero: 26 }, { classe_numero: 1024 }],
      PRESENTIEL_CLASSES.map((c) => c.id),
    ).map((r) => r.classe_numero)).toEqual([26]);
  });

  it('ne marque pas le mercredi complet si seule une autre classe est pleine', () => {
    const slots = [
      { classe_numero: 1, day_of_week: 'Mercredi', est_plein: true },
      { classe_numero: 26, day_of_week: 'Mercredi', est_plein: false },
    ];
    expect(isDayFullyBooked(slots, 'Mercredi')).toBe(false);
    expect(isClassFull(slots, 26)).toBe(false);
    expect(areClassesAllFull(slots, [1, 26])).toBe(false);
  });
});

describe('Catalogue distanciel enfant (101–108)', () => {
  test.each(DISTANCE_CLASSES)(
    'classe distanciel $id — $planId / $niveau a un UUID checkout',
    (classe) => {
      const uuid = DISTANCE_CLASS_ID_TO_UUID[classe.id];
      expect(uuid).toBeDefined();
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
    },
  );

  it('couvre Arabe, Tajwid enfant et Tarbiya (8 classes)', () => {
    expect(DISTANCE_CLASSES).toHaveLength(8);
    expect(DISTANCE_CLASSES.map((c) => c.id)).toEqual([101, 102, 103, 104, 105, 106, 107, 108]);
    expect(DISTANCE_CLASSES.filter((c) => c.planId === 'tarbiya_islamiya').map((c) => c.id)).toEqual([107, 108]);
  });
});
