import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours d'Éducation Islamique | Tarbiya Islamiya | ISHES",
  description: "Accompagnez l'éveil spirituel de votre enfant avec nos cours de Tarbiya Islamiya. Une pédagogie ludique pour ancrer les valeurs et l'amour d'Allah.",
  keywords: "éducation islamique enfant, tarbiya islamiya, cours islam junior, adab enfant, ishes toulouse"
};

export default function CoursEducationIslamiquePage() {
  const id = "tarbiya_islamiya";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
