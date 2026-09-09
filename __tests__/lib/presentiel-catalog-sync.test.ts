/// <reference types="jest" />
import fs from 'fs';
import path from 'path';
import {
  PRESENTIEL_CLASSES,
  CLASS_ID_TO_UUID,
  formatPresentielClassDisplayName,
  isOfficialPresentielClass,
  resolvePresentielCheckoutSlug,
  FEMME_DEBUTANTE_CLASS_ID,
  FEMME_INTERMEDIAIRE_CLASS_ID,
} from '@/lib/presentiel-data';
import { PROGRAMS_DATA } from '@/lib/programs-data';
import { filterVisiblePresentielSlots, isDayFullyBooked, getClassSlotStatus, isPresentielCardFull } from '@/lib/class-availability';

function loadOfficialCsvClasses() {
  const csv = fs.readFileSync(
    path.join(process.cwd(), 'classes_presentiel_final_corrige.csv'),
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

  it('expose exactement les 25 classes du CSV, numérotées 1 à 25', () => {
    expect(csvClasses).toHaveLength(25);
    expect(PRESENTIEL_CLASSES).toHaveLength(25);
    expect(PRESENTIEL_CLASSES.map((c) => c.id)).toEqual(csvClasses.map((c) => c.id));
    expect(PRESENTIEL_CLASSES.map((c) => c.id)).toEqual(
      Array.from({ length: 25 }, (_, i) => i + 1)
    );
  });

  it('chaque classe a un nom complet unique (niveau + créneau)', () => {
    const names = PRESENTIEL_CLASSES.map((c) => formatPresentielClassDisplayName(c));
    expect(names).toHaveLength(25);
    expect(new Set(names).size).toBe(25);
    expect(names[18]).toBe('Élémentaire 2 (7-15 ans) — Samedi matin');
    expect(names[23]).toContain('Dimanche matin');
    expect(names[24]).toContain('Samedi matin');
  });

  it('chaque classe du site a un UUID de checkout unique', () => {
    const uuids = PRESENTIEL_CLASSES.map((c) => CLASS_ID_TO_UUID[c.id]);
    expect(uuids.every(Boolean)).toBe(true);
    expect(new Set(uuids).size).toBe(25);
  });

  it('ignore les classes hors catalogue (doublons 1024+)', () => {
    expect(isOfficialPresentielClass(1)).toBe(true);
    expect(isOfficialPresentielClass(25)).toBe(true);
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
  it('affiche 799 € pour le Tajwid Intensif', () => {
    expect(PROGRAMS_DATA.tajwid_intensif.price).toBe('799 €');
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
  });
});
