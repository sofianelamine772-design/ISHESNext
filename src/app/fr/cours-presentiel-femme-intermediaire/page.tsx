import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours Présentiel Femme Intermédiaire | Arabe & Tajwid | ISHES",
  description: "Formation en présentiel pour femmes de niveau intermédiaire combinant l'arabe littéraire et le Tajwid à Toulouse. Cursus académique et spirituel 100% femme.",
  keywords: "cours arabe femme intermediaire, cours tajwid femme toulouse, perfectionnement arabe femme, ishes"
};

export default function CoursPresentielFemmeIntermediairePage() {
  const id = "femme_intermediaire_presentiel";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
