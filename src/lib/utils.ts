import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0 is January, 3 is April
  const date = now.getDate();

  // Le basculement se fait à partir du 30 Avril.
  if (month > 3 || (month === 3 && date >= 30)) {
    return `${year}-${year + 1}`;
  }
  return `${year - 1}-${year}`;
}

export function getNextAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  if (month > 3 || (month === 3 && date >= 30)) {
    return `${year + 1}-${year + 2}`;
  }
  return `${year}-${year + 1}`;
}
