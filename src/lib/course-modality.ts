export type CourseModality = "presentiel" | "distanciel";
export type CourseModalityFilter = "tous" | CourseModality;

function normalize(value?: string | null): string {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function resolveCourseModality(input: {
  classType?: string | null;
  formationType?: string | null;
  formationTitle?: string | null;
  className?: string | null;
}): CourseModality | null {
  const typed = [input.classType, input.formationType].map(normalize);
  if (typed.some((value) => value.includes("presentiel"))) return "presentiel";
  if (typed.some((value) => value.includes("distanciel"))) return "distanciel";

  const text = normalize(`${input.formationTitle || ""} ${input.className || ""}`);
  if (text.includes("presentiel")) return "presentiel";
  if (text.includes("distanciel")) return "distanciel";
  return null;
}

export function matchesCourseModalityFilter(
  modalities: Array<CourseModality | null | undefined>,
  filter: CourseModalityFilter,
): boolean {
  if (filter === "tous") return true;
  return modalities.some((modality) => modality === filter);
}
