/// <reference types="jest" />
import {
  matchesCourseModalityFilter,
  resolveCourseModality,
} from "@/lib/course-modality";

describe("resolveCourseModality", () => {
  it("privilégie le type de classe, même si le titre ne dit pas présentiel", () => {
    expect(resolveCourseModality({
      classType: "presentiel",
      formationTitle: "Arabe & Coran enfant (Samedi)",
      className: "Élémentaire Débutant 1 (7-15 ans) — Samedi après-midi",
    })).toBe("presentiel");
  });

  it("ne range pas une classe enfant n°26 avec les femmes", () => {
    expect(resolveCourseModality({
      classType: "presentiel",
      formationTitle: "Arabe et Coran · enfant",
      className: "Élémentaire Débutant 1 (7-15 ans) — Mercredi après-midi",
    })).toBe("presentiel");
  });

  it("reconnaît le distanciel et le présentiel femme", () => {
    expect(resolveCourseModality({ classType: "distanciel", formationTitle: "Tajwid" })).toBe("distanciel");
    expect(resolveCourseModality({
      formationType: "presentiel",
      formationTitle: "Arabe & Tajwid Femme Débutante (Présentiel)",
    })).toBe("presentiel");
    expect(resolveCourseModality({
      formationTitle: "Arabe & Tajwid Femme Débutante (Présentiel)",
    })).toBe("presentiel");
  });

  it("ne devine pas si le type est inconnu", () => {
    expect(resolveCourseModality({ formationTitle: "Formation" })).toBeNull();
  });
});

describe("matchesCourseModalityFilter", () => {
  it("laisse tout passer sur Tous, et isole présentiel / distanciel", () => {
    expect(matchesCourseModalityFilter(["presentiel"], "tous")).toBe(true);
    expect(matchesCourseModalityFilter(["presentiel", "distanciel"], "presentiel")).toBe(true);
    expect(matchesCourseModalityFilter(["presentiel"], "distanciel")).toBe(false);
    expect(matchesCourseModalityFilter([null], "presentiel")).toBe(false);
  });
});
