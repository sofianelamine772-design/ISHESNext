import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Tajwid pour Enfants | Récitation Junior | ISHES",
  description: "Apprenez à votre enfant à lire le Coran avec excellence. Une pédagogie douce et adaptée pour maîtriser les règles de Tajwid dès le plus jeune âge.",
  keywords: "tajwid enfant, cours coran junior, lecture coran enfant, ishes toulouse"
};

export default function CoursTajwidEnfantPage() {
  const id = "tajwid_standard";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
