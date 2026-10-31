export type FallbackClass = {
  id: string;
  name?: string | null;
  externalId?: number | null;
};

/**
 * Cours principal : la classe choisie est déjà connue.
 * Cours ajouté : pas de niveau choisi. On ne prend une classe toute seule
 * que s'il n'y en a qu'une vraie. Jamais la plus récente « Session … ».
 */
export function pickCheckoutFallbackClass(
  classes: FallbackClass[],
  isOfficial: (externalId?: number | null) => boolean,
): FallbackClass | null {
  if (classes.length === 0) return null;
  if (classes.length === 1) return classes[0];
  const official = classes.filter((classe) => isOfficial(classe.externalId));
  if (official.length === 1) return official[0];
  return null;
}
