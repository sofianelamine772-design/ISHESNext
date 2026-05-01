import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cursus Sciences Islamiques | Fondations Solides | ISHES",
  description: "Un socle de connaissances solide et authentique pour tout musulman. Fiqh, Aqida, Sîrah et Arabe regroupés dans un programme cohérent.",
  keywords: "sciences islamiques, socle islam, cours religion toulouse, ishes, formation islamique"
};

export default function SciencesIslamiquesPage() {
  const id = "sciences_islamiques";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
