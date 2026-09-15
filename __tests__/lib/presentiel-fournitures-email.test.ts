import { CLASS_ID_TO_UUID } from '@/lib/presentiel-data';
import {
  buildPresentielFournituresEmail,
  collectCheckoutClassRefs,
  getFournituresKindsToSend,
  resolveFournituresPdfPath,
  resolvePresentielExternalId,
} from '@/lib/presentiel-fournitures-email';

describe('Mail automatique des fournitures présentiel enfants', () => {
  it('prend les classes enfant et adulte du checkout', () => {
    expect(collectCheckoutClassRefs({
      classId: 'uuid-adulte',
      childrenCount: '2',
      child_0_classId: CLASS_ID_TO_UUID[5],
      child_1_classId: CLASS_ID_TO_UUID[12],
    })).toEqual(['uuid-adulte', CLASS_ID_TO_UUID[5], CLASS_ID_TO_UUID[12]]);
  });

  it('envoie le PDF prépa pour les classes 1–7', () => {
    expect(getFournituresKindsToSend(['7'])).toEqual(['prepa']);
    expect(getFournituresKindsToSend([CLASS_ID_TO_UUID[1]])).toEqual(['prepa']);
  });

  it('envoie le PDF élémentaire pour les classes 8–23', () => {
    expect(getFournituresKindsToSend(['23'])).toEqual(['elem']);
    expect(getFournituresKindsToSend([CLASS_ID_TO_UUID[8]])).toEqual(['elem']);
  });

  it('envoie les deux PDF si la famille a prépa et élémentaire', () => {
    expect(getFournituresKindsToSend(['3', '22'])).toEqual(['prepa', 'elem']);
  });

  it('n’envoie rien pour les classes femmes ni le distanciel', () => {
    expect(getFournituresKindsToSend(['24', '25'])).toEqual([]);
    expect(getFournituresKindsToSend([CLASS_ID_TO_UUID[24]])).toEqual([]);
    expect(getFournituresKindsToSend([])).toEqual([]);
    expect(resolvePresentielExternalId('uuid-inconnu')).toBeNull();
  });

  it('contient le niveau et trouve les PDF sur disque', () => {
    const prepa = buildPresentielFournituresEmail({
      kind: 'prepa',
      recipientName: 'Karima',
      logoUrl: 'https://www.ishes.fr/logo.png',
    });
    expect(prepa.subject).toBe('Fournitures scolaires 2026/2027');
    expect(prepa.text).toContain('Préparatoire 1re et 2e année');
    expect(prepa.html).toContain('Karima');

    const elem = buildPresentielFournituresEmail({
      kind: 'elem',
      logoUrl: 'https://www.ishes.fr/logo.png',
    });
    expect(elem.text).toContain('Élémentaire');
    expect(resolveFournituresPdfPath('prepa')).toBeTruthy();
    expect(resolveFournituresPdfPath('elem')).toBeTruthy();
  });
});
