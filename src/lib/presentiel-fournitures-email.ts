import fs from 'node:fs';
import path from 'node:path';
import { CLASS_ID_TO_UUID } from './presentiel-data';

export type FournituresKind = 'prepa' | 'elem';

export const FOURNITURES_EMAIL_SUBJECT = 'Fournitures scolaires 2026/2027';

export function fournituresEmailType(kind: FournituresKind): string {
  return `fournitures_${kind}`;
}

const UUID_TO_CLASS_ID: Record<string, number> = Object.fromEntries(
  Object.entries(CLASS_ID_TO_UUID).map(([id, uuid]) => [uuid, Number(id)]),
);

export const FOURNITURES_PDF: Record<FournituresKind, { filename: string; diskNames: string[] }> = {
  prepa: {
    filename: 'Fournitures_preparatoire_1re_et_2e_annee_2026-2027.pdf',
    diskNames: [
      'Fournitures_preparatoire_1re_et_2e_annee_2026-2027.pdf',
      'Fournitures preparatoire_1re_et_2e_annee_2026-2027.pdf',
    ],
  },
  elem: {
    filename: 'Fournitures_scolaires_elementaire_2026-2027.pdf',
    diskNames: ['Fournitures_scolaires_elementaire_2026-2027.pdf'],
  },
};

export function collectCheckoutClassRefs(
  metadata?: { [key: string]: string | undefined } | null,
): string[] {
  if (!metadata) return [];
  const refs: string[] = [];
  if (metadata.classId) refs.push(metadata.classId);
  const childrenCount = parseInt(metadata.childrenCount || '0', 10);
  for (let i = 0; i < childrenCount; i++) {
    const id = metadata[`child_${i}_classId`];
    if (id) refs.push(id);
  }
  return refs.filter(Boolean);
}

export function resolvePresentielExternalId(ref?: string | null): number | null {
  if (!ref) return null;
  const trimmed = String(ref).trim();
  if (!trimmed) return null;
  const asNum = Number(trimmed);
  if (Number.isInteger(asNum) && asNum >= 1 && asNum <= 25 && String(asNum) === trimmed) {
    return asNum;
  }
  return UUID_TO_CLASS_ID[trimmed] ?? null;
}

export function resolvePresentielExternalIds(classRefs: string[]): number[] {
  return classRefs
    .map((ref) => resolvePresentielExternalId(ref))
    .filter((id): id is number => id != null);
}

export function getFournituresKindsFromExternalIds(ids: number[]): FournituresKind[] {
  const kinds = new Set<FournituresKind>();
  for (const id of ids) {
    if (id >= 1 && id <= 7) kinds.add('prepa');
    else if (id >= 8 && id <= 23) kinds.add('elem');
  }
  return Array.from(kinds);
}

/** Présentiel enfants seulement (classes 1–23). Femmes 24–25 et distanciel : rien. */
export function getFournituresKindsToSend(classRefs: string[] = []): FournituresKind[] {
  return getFournituresKindsFromExternalIds(resolvePresentielExternalIds(classRefs));
}

export type FournituresPublicDoc = {
  kind: FournituresKind;
  label: string;
  href: string;
};

export function getFournituresPublicDocs(
  classRefs: Array<string | number | null | undefined> = [],
): FournituresPublicDoc[] {
  const kinds = getFournituresKindsToSend(
    classRefs
      .filter((ref): ref is string | number => ref != null && String(ref).trim() !== "")
      .map(String),
  );
  return kinds.map((kind) => ({
    kind,
    label: kind === "prepa" ? "Préparatoire 1re et 2e année" : "Élémentaire",
    href: `/fournitures/${FOURNITURES_PDF[kind].filename}`,
  }));
}

export function resolveFournituresPdfPath(kind: FournituresKind): string | null {
  const dirs = [
    path.join(process.cwd(), 'public', 'fournitures'),
    process.cwd(),
  ];
  for (const dir of dirs) {
    for (const name of FOURNITURES_PDF[kind].diskNames) {
      const candidate = path.join(dir, name);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return null;
}

export function buildPresentielFournituresEmail(params: {
  kind: FournituresKind;
  recipientName?: string | null;
  logoUrl: string;
}): { subject: string; html: string; text: string } {
  const niveau = params.kind === 'prepa' ? 'Préparatoire 1re et 2e année' : 'Élémentaire';
  const safe = (params.recipientName || 'chers parents').replace(/[<>]/g, '');
  const subject = FOURNITURES_EMAIL_SUBJECT;
  const text = `Assalam alaykoum ${safe},

En espérant que vous vous portez tous pour le mieux,

Vous trouverez ci-joint la liste des fournitures scolaires 2026/2027 pour le niveau ${niveau}.

Merci de prévoir ces fournitures pour la rentrée (première semaine d'octobre).
Cette liste concerne uniquement les élèves dont l'inscription est finalisée.

Au plaisir de vous retrouver, inchaALLAH.

Institut ISHES`;

  const html = `
  <div style="max-width:600px;margin:0 auto;font-family:Helvetica,Arial,sans-serif;background:#fff;border:1px solid #eaeaea;border-radius:16px;overflow:hidden;">
    <div style="background:#ffffff;padding:28px;text-align:center;border-bottom:3px solid #C69C6D;">
      <img src="${params.logoUrl}" alt="ISHES" style="height:56px;object-fit:contain;" />
    </div>
    <div style="padding:36px 30px;color:#152233;">
      <p style="margin:0 0 16px;font-size:18px;font-weight:bold;">Assalam alaykoum ${safe},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
        En espérant que vous vous portez tous pour le mieux,
      </p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
        Vous trouverez <strong>ci-joint la liste des fournitures scolaires 2026/2027</strong>
        pour le niveau <strong>${niveau}</strong>.
      </p>
      <div style="background:#fdfaf5;border-left:4px solid #C69C6D;padding:16px 18px;border-radius:8px;margin:22px 0;">
        <p style="margin:0;font-size:14px;line-height:1.7;color:#333;">
          Merci de prévoir ces fournitures pour la rentrée (première semaine d'octobre).
          Cette liste concerne uniquement les élèves dont l'inscription est finalisée.
        </p>
      </div>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#4b5563;">
        Au plaisir de vous retrouver, inchaALLAH.
      </p>
      <p style="margin:18px 0 0;font-size:16px;font-weight:bold;">Institut ISHES</p>
    </div>
    <div style="background:#152233;padding:18px 24px;text-align:center;">
      <p style="margin:0;color:#ead9be;font-size:12px;">© ${new Date().getFullYear()} ISHES · Tous droits réservés</p>
    </div>
  </div>`;

  return { subject, html, text };
}
