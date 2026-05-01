import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Formation Tarbya Islamya | Éducation Spirituelle | ISHES",
  description: "Un programme complet d'éducation islamique pour les enfants de 6 à 15 ans. Éveil de la fitra, adab et amour d'Allah à travers une pédagogie active.",
  keywords: "tarbya islamya, éducation islamique, cours islam enfant, ishes, fitra"
};

export default function FormationTarbyaPage() {
  const id = "tarbiya_islamiya";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
