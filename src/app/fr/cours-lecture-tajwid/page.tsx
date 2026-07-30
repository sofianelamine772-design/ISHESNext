import { Metadata } from 'next';
import { TajwidStandardView } from "@/components/vitrine/TajwidStandardView";

export const metadata: Metadata = {
  title: "Cours de Tajwid Standard | Maîtrise de la Lecture | ISHES",
  description: "Apprenez à lire le Coran correctement avec les règles de Tajwid. Une méthode progressive adaptée aux débutants et aux étudiants souhaitant se perfectionner.",
  keywords: "cours tajwid, lecture coran, apprendre tajwid, prononciation arabe, ishes"
};

export default function CoursLectureTajwidPage() {
  return <TajwidStandardView />;
}
