import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Spiritualité Musulmane | Éducation de l'Âme | ISHES",
  description: "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus offert pour nourrir votre cœur et apaiser votre esprit.",
  keywords: "spiritualité islam, éducation de l'ame, tazkiya, paix intérieure islam, cours islam gratuit"
};

export default function SpiritualiteIslamPage() {
  const id = "spiritualite_islam";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
