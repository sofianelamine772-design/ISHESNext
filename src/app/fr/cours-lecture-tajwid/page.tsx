import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Tajwid Standard | Maîtrise de la Lecture | ISHES",
  description: "Apprenez à lire le Coran correctement avec les règles de Tajwid. Une méthode progressive adaptée aux débutants et aux étudiants souhaitant se perfectionner.",
  keywords: "cours tajwid, lecture coran, apprendre tajwid, prononciation arabe, ishes"
};

export default function CoursLectureTajwidPage() {
  const id = "tajwid_standard";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
