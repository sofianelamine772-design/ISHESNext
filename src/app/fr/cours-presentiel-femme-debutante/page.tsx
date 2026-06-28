import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours Présentiel Femme Débutante | Arabe & Tajwid | ISHES",
  description: "Formation en présentiel pour femmes débutantes combinant l'apprentissage de la langue arabe et les règles de Tajwid à Toulouse. Cursus structuré 100% femme.",
  keywords: "cours arabe femme toulouse, cours tajwid femme toulouse, école arabe femme toulouse, ishes"
};

export default function CoursPresentielFemmeDebutantePage() {
  const id = "femme_debutante_presentiel";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
