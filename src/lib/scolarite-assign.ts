export type ScolariteInscription = {
  id: string;
  formation_id?: string | null;
  status?: string | null;
  classType?: string | null;
};

const ACTIVE_STATUSES = ["valide", "actif", "en_attente", "en_attente_daffectation"];

/** Modifier = remplacer une inscription. Ajouter = nouvelle ligne. */
export function resolveScolariteAssignTarget(input: {
  inscriptionId?: string | null;
  yearInscriptions: ScolariteInscription[];
  targetFormationId: string;
  targetClassType?: string | null;
}): { mode: "update"; inscriptionId: string } | { mode: "insert" } {
  if (input.inscriptionId) {
    const owned = input.yearInscriptions.find((row) => row.id === input.inscriptionId);
    if (owned) return { mode: "update", inscriptionId: owned.id };
    return { mode: "update", inscriptionId: input.inscriptionId };
  }

  const sameFormation = input.yearInscriptions.find(
    (row) => row.formation_id === input.targetFormationId,
  );
  if (sameFormation) return { mode: "update", inscriptionId: sameFormation.id };

  if (input.targetClassType === "presentiel") {
    const transferable = input.yearInscriptions.find((row) => {
      if (row.formation_id === input.targetFormationId) return false;
      if (!ACTIVE_STATUSES.includes(row.status || "")) return false;
      return row.classType === "presentiel";
    });
    if (transferable) return { mode: "update", inscriptionId: transferable.id };
  }

  return { mode: "insert" };
}
