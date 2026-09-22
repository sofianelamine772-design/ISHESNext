import fs from 'node:fs';
import path from 'node:path';
import {
  DISTANCIEL_RENTREE_PDF,
  getDistancielRentreePublicDocs,
  isDistancielInscriptionSignal,
  shouldShowDistancielRentreeDoc,
} from '@/lib/distanciel-rentree';

describe('Courrier de rentrée distanciel (espace élève)', () => {
  it('détecte une inscription distanciel par type formation', () => {
    expect(
      isDistancielInscriptionSignal({
        formationType: 'distanciel',
        formationTitle: 'Fiqh Mâlikite',
      }),
    ).toBe(true);
  });

  it('détecte une session distance par nom de classe', () => {
    expect(
      isDistancielInscriptionSignal({
        className: 'Session Fiqh Mâlikite (2026-2027)',
        formationTitle: 'Fiqh Mâlikite',
      }),
    ).toBe(true);
  });

  it('n’affiche rien pour le présentiel', () => {
    expect(
      shouldShowDistancielRentreeDoc([
        {
          classType: 'presentiel',
          formationType: 'presentiel',
          className: 'Élémentaire Débutant 1 — Samedi',
          formationTitle: 'Scolarité Présentiel',
        },
      ]),
    ).toBe(false);
    expect(
      getDistancielRentreePublicDocs([
        {
          classType: 'presentiel',
          formationTitle: 'Arabe & Coran Enfant (Samedi)',
        },
      ]),
    ).toEqual([]);
  });

  it('expose le PDF public dès qu’il y a une inscription distance', () => {
    expect(
      getDistancielRentreePublicDocs([
        {
          formationType: 'distanciel',
          formationTitle: 'Tarbiya Islamiya',
          className: 'Tarbya Islamya - 2ème année',
        },
      ]),
    ).toEqual([
      {
        kind: 'distanciel_rentree',
        label: DISTANCIEL_RENTREE_PDF.label,
        href: DISTANCIEL_RENTREE_PDF.href,
      },
    ]);
  });

  it('trouve le PDF sur disque dans public/rentree', () => {
    const diskPath = path.join(
      process.cwd(),
      'public',
      'rentree',
      DISTANCIEL_RENTREE_PDF.filename,
    );
    expect(fs.existsSync(diskPath)).toBe(true);
  });
});
