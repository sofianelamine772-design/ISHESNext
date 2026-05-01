import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Fiqh Mâlikite | Droit Musulman | ISHES",
  description: "Maîtrisez les actes d'adoration selon l'école de l'Imam Mâlik. Étude approfondie du Matn Ibn Achir pour une pratique éclairée et authentique.",
  keywords: "fiqh malikite, droit musulman, ibn achir, cours malikite toulouse, ishes"
};

export default function CoursFiqhMalikitePage() {
  const id = "fiqh_malikite";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
