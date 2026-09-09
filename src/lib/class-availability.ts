export type SlotStatusRow = {
  classe_numero?: number | null;
  day_of_week?: string | null;
  est_plein?: boolean | null;
};

export function getClassSlotStatus(slots: SlotStatusRow[], classId: number): SlotStatusRow | null {
  return slots.find((s) => s.classe_numero === classId) ?? null;
}

/** A whole weekday is full only if every class that day is full. */
export function isDayFullyBooked(slots: SlotStatusRow[], day: string): boolean {
  const daySlots = slots.filter(
    (s) => s.day_of_week?.toLowerCase() === day.toLowerCase()
  );
  if (daySlots.length === 0) return false;
  return daySlots.every((s) => s.est_plein === true);
}

/** Femme cards must use their class id; enfants cards use the whole weekday. */
export function isPresentielCardFull(
  slots: SlotStatusRow[],
  options: { day?: string; classId?: number }
): boolean {
  if (options.classId != null) {
    return getClassSlotStatus(slots, options.classId)?.est_plein === true;
  }
  if (!options.day) return false;
  return isDayFullyBooked(slots, options.day);
}

/** N'affiche que les classes présentiel actives du catalogue officiel. */
export function filterVisiblePresentielSlots<T extends { classe_numero?: number | null }>(
  slots: T[],
  activeExternalIds: Iterable<number | null | undefined>,
): T[] {
  const activeIds = new Set(
    Array.from(activeExternalIds).filter((id): id is number => typeof id === "number")
  );
  return slots.filter(
    (row) => row.classe_numero != null && activeIds.has(row.classe_numero)
  );
}
