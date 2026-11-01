/// <reference types="jest" />
import { pickCheckoutFallbackClass } from "@/lib/checkout-class-fallback";

const isOfficial = (id?: number | null) => typeof id === "number" && id >= 101 && id <= 108;

describe("pickCheckoutFallbackClass", () => {
  it("ne met pas un cours ajouté sur la classe Session la plus récente", () => {
    expect(pickCheckoutFallbackClass([
      { id: "n1", name: "Arabe Enfant - Niveau 1", externalId: 101 },
      { id: "n2", name: "Arabe Enfant - Niveau 2", externalId: 102 },
      { id: "session", name: "Session Arabe Enfant (Distance)", externalId: null },
    ], isOfficial)).toBeNull();
  });

  it("prend l’unique vraie classe s’il n’y a qu’un niveau", () => {
    expect(pickCheckoutFallbackClass([
      { id: "session", name: "Session Tajwid", externalId: null },
      { id: "n1", name: "Tajwid Enfant - Niveau 1", externalId: 104 },
    ], isOfficial)?.id).toBe("n1");
  });

  it("garde l’unique classe existante, même nommée Session", () => {
    expect(pickCheckoutFallbackClass([
      { id: "only", name: "Session Pack Accompagnement", externalId: null },
    ], isOfficial)?.id).toBe("only");
  });

  it("ignore les Session s’il existe une seule classe non-Session sans external_id", () => {
    expect(pickCheckoutFallbackClass([
      { id: "session", name: "Session Arabe Enfant (Distance)", externalId: null },
      { id: "other", name: "Classe unique", externalId: null },
    ], isOfficial)?.id).toBe("other");
  });

  it("ne choisit rien s’il n’y a que plusieurs Session", () => {
    expect(pickCheckoutFallbackClass([
      { id: "a", name: "Session A", externalId: null },
      { id: "b", name: "Session B", externalId: null },
    ], isOfficial)).toBeNull();
  });
});
