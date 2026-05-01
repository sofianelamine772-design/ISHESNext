import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Mémorisation du Coran | Hifz & Révision | ISHES",
  description: "Mémorisez le Livre d'Allah à votre rythme avec un suivi personnalisé. Correction rigoureuse et programme de révision (Mouraja'a) structuré.",
  keywords: "mémorisation coran, hifz coran, apprendre coran, révision coran, ishes toulouse"
};

export default function CoursMemoriserCoranPage() {
  const id = "memoriser_coran";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
