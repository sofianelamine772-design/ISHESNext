import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours d'Al-Aqîda | Fondements de la Foi | ISHES",
  description: "Ancrez votre foi sur des bases solides avec l'étude de la célèbre Tahawiya. Un cursus de 9 mois pour comprendre les piliers de la croyance sunnite.",
  keywords: "aqida, croyance islamique, tahawiya, foi musulmane, cours islam en ligne, ishes"
};

export default function CoursAlAqidaPage() {
  const id = "al_aqida";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
