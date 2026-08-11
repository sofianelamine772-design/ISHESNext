import { getCurrentAcademicYear, getNextAcademicYear } from '@/lib/utils';

describe('Academic Year Logic', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('devrait retourner l\'année en cours si la date est avant le 30 Avril', () => {
    // Février 2026
    jest.useFakeTimers().setSystemTime(new Date('2026-02-15T12:00:00Z'));
    expect(getCurrentAcademicYear()).toBe('2025-2026');
    expect(getNextAcademicYear()).toBe('2026-2027');
  });

  it('devrait basculer automatiquement sur l\'année d\'après (Next Year) à partir du 30 Avril', () => {
    // 30 Avril 2026
    jest.useFakeTimers().setSystemTime(new Date('2026-04-30T10:00:00Z'));
    expect(getCurrentAcademicYear()).toBe('2026-2027'); // L'étudiant qui s'inscrit le 30 avril est dans l'année prochaine
    expect(getNextAcademicYear()).toBe('2027-2028');
  });

  it('devrait rester sur la nouvelle année en Mai', () => {
    // 5 Mai 2026
    jest.useFakeTimers().setSystemTime(new Date('2026-05-05T10:00:00Z'));
    expect(getCurrentAcademicYear()).toBe('2026-2027'); 
  });
});
