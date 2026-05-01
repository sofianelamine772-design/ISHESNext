import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours d'Arabe Littéraire (Adulte) | ISHES",
  description: "Maîtrisez la langue arabe moderne. De l'alphabet à la conversation courante avec une méthode immersive et des professeurs qualifiés.",
  keywords: "cours arabe adulte, apprendre arabe toulouse, arabe littéraire, al arabiya bayna yadayk, ishes"
};

export default function CoursArabeAdultePage() {
  const id = "arabe_adulte";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
