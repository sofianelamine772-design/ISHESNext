/// <reference types="jest" />
import { resolveScolariteAssignTarget } from "@/lib/scolarite-assign";

const tarbiya = { id: "ins-tarbiya", formation_id: "f-tarbiya", status: "actif", classType: "distanciel" };
const tajwid = { id: "ins-tajwid", formation_id: "f-tajwid", status: "actif", classType: "distanciel" };
const arabe = { id: "ins-arabe", formation_id: "f-arabe", status: "actif", classType: "distanciel" };

describe("resolveScolariteAssignTarget", () => {
  it("remplace la formation choisie au lieu d’en ajouter une", () => {
    expect(resolveScolariteAssignTarget({
      inscriptionId: tarbiya.id,
      yearInscriptions: [tarbiya, tajwid, arabe],
      targetFormationId: "f-tarbiya-autre",
      targetClassType: "distanciel",
    })).toEqual({ mode: "update", inscriptionId: tarbiya.id });
  });

  it("met à jour la même formation si on ne précise pas l’inscription", () => {
    expect(resolveScolariteAssignTarget({
      yearInscriptions: [tarbiya, tajwid, arabe],
      targetFormationId: "f-tajwid",
      targetClassType: "distanciel",
    })).toEqual({ mode: "update", inscriptionId: tajwid.id });
  });

  it("n’ajoute une classe que si c’est une nouvelle formation distanciel", () => {
    expect(resolveScolariteAssignTarget({
      yearInscriptions: [tarbiya, tajwid, arabe],
      targetFormationId: "f-nouvelle",
      targetClassType: "distanciel",
    })).toEqual({ mode: "insert" });
  });
});
