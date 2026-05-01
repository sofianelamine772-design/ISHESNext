import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours Particuliers de Coran & Tajwid | ISHES",
  description: "L'excellence d'un accompagnement individuel pour adultes et enfants. Travaillez en tête-à-tête avec un enseignant pour une progression rapide.",
  keywords: "cours particuliers coran, prof particulier islam, tajwid solo, ishes sur mesure"
};

export default function CoursParticuliersPage() {
  const id = "cours_particuliers";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
