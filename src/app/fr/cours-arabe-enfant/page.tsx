import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours d'Arabe Enfant | Arabe & Coran Junior | ISHES",
  description: "Faites aimer la langue arabe à vos enfants avec une méthode immersive et ludique. Apprentissage de l'alphabet, lecture et mémorisation du Coran.",
  keywords: "cours arabe enfant, arabe junior, coran enfant, pédagogie islamique junior, ishes"
};

export default function CoursArabeEnfantPage() {
  const id = "arabe_coran_junior";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
