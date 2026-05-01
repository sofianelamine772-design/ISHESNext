import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Tajwid Intensif | 3 Mois pour Transformer sa Lecture | ISHES",
  description: "Passez d'une lecture hésitante à une récitation fluide en seulement 12 semaines. Une méthode intensive avec coaching quotidien.",
  keywords: "tajwid intensif, apprendre coran rapidement, cours accéléré islam, ishes intensif"
};

export default function CoursTajwidIntensifPage() {
  const id = "tajwid_intensif";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
