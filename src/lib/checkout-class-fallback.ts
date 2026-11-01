export type FallbackClass = {
  id: string;
  name?: string | null;
  externalId?: number | null;
};

function isSessionName(name?: string | null): boolean {
  return /^\s*session\b/i.test(String(name || ""));
}

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

  const official = classes.filter((classe) => isOfficial(classe.externalId));
  if (official.length === 1) return official[0];
  if (official.length > 1) return null;

  // Aucun niveau officiel : une seule classe non-Session éventuelle, sinon rien.
  const nonSession = classes.filter((classe) => !isSessionName(classe.name));
  if (nonSession.length === 1) return nonSession[0];
  if (classes.length === 1 && !isSessionName(classes[0].name)) return classes[0];
  // Une seule Session (ex. Pack) : OK. Plusieurs Session / mixte sans official → null.
  if (classes.length === 1) return classes[0];
  return null;
}
