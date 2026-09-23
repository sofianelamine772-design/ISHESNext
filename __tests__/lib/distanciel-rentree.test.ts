import fs from 'node:fs';
import path from 'node:path';
import {
  DISTANCIEL_RENTREE_EMAIL_TYPE,
  DISTANCIEL_RENTREE_PDF,
  buildDistancielRentreeEmail,
  getDistancielRentreePublicDocs,
  isDistancielInscriptionSignal,
  resolveDistancielRentreePdfPath,
  shouldSendDistancielRentreeEmail,
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
    expect(resolveDistancielRentreePdfPath()).toBe(diskPath);
  });
});

describe('Mail automatique rentrée distanciel', () => {
  it('envoie pour un slug distanciel / type distanciel', () => {
    expect(shouldSendDistancielRentreeEmail('fiqh_malikite', 'distanciel')).toBe(true);
    expect(shouldSendDistancielRentreeEmail('tajwid_intensif', null)).toBe(true);
    expect(DISTANCIEL_RENTREE_EMAIL_TYPE).toBe('rentree_distanciel');
  });

  it('n’envoie jamais pour le présentiel', () => {
    expect(shouldSendDistancielRentreeEmail('presentiel-global', 'presentiel')).toBe(false);
    expect(shouldSendDistancielRentreeEmail('presentiel-global', null)).toBe(false);
    expect(shouldSendDistancielRentreeEmail('femme-debutante', null)).toBe(false);
    expect(shouldSendDistancielRentreeEmail('fiqh_malikite', 'presentiel')).toBe(false);
  });

  it('construit un mail qui mentionne le PDF joint', () => {
    const { subject, html, text } = buildDistancielRentreeEmail('https://www.ishes.fr/logo.png');
    expect(subject.toLowerCase()).toContain('distanciel');
    expect(text).toContain('document PDF joint');
    expect(html).toContain(DISTANCIEL_RENTREE_PDF.filename);
    expect(html).toContain('espace élève');
  });
});
