/**
 * Une même formation peut porter plusieurs noms (ex. « Tilawa » = « Mémorisation du Coran »).
 * Source unique : inscription, checkout et webhook passent tous par ici,
 * pour ne jamais facturer ni inscrire deux fois la même formation.
 */

/** ancien / autre nom → slug officiel (celui de `public.formations`). */
export const FORMATION_SLUG_ALIASES: Record<string, string> = {
  tilawa: 'memoriser_coran',
  hifz: 'memoriser_coran',
  hifdh: 'memoriser_coran',
  arabe_coran_junior: 'arabe_enfant_distance',
  'arabe-coran-junior': 'arabe_enfant_distance',
  'sciences-islamiques': 'sciences_islamiques',
};

/** Mots-clés de recherche (inscription) par formation officielle. */
export const FORMATION_SEARCH_KEYWORDS: Record<string, string[]> = {
  memoriser_coran: [
    'tilawa', 'hifz', 'hifdh', 'hifd', 'mémorisation', 'memorisation', 'mémoriser',
    'récitation', 'recitation', 'lecture fluide', 'lecture', 'coran',
  ],
};

export function canonicalFormationSlug(slug: string | null | undefined): string {
  const raw = String(slug ?? '').trim();
  return FORMATION_SLUG_ALIASES[raw.toLowerCase()] ?? raw;
}

const normalize = (slug: string) => slug.replace(/-/g, '_');

/**
 * Formations ajoutées : alias résolus, doublons supprimés,
 * et la formation principale retirée (déjà dans le panier).
 */
export function canonicalBumpSlugs(
  bumps: ReadonlyArray<string | null | undefined>,
  mainSlug: string,
): string[] {
  const main = normalize(canonicalFormationSlug(mainSlug));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of bumps) {
    const slug = canonicalFormationSlug(String(raw ?? '').trim());
    if (!slug) continue;
    const key = normalize(slug);
    if (key === main || seen.has(key)) continue;
    seen.add(key);
    out.push(slug);
  }
  return out;
}

/** Texte de recherche d'une formation (titre + mots-clés d'alias). */
export function formationSearchText(slug: string, ...parts: string[]): string {
  const kw = FORMATION_SEARCH_KEYWORDS[canonicalFormationSlug(slug)] ?? [];
  return [...parts, ...kw].join(' ').toLowerCase();
}
