import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/sciences-islamiques") },
  openGraph: {
    url: absoluteUrl("/fr/sciences-islamiques"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Cursus Sciences Islamiques | Fondations Solides | ISHES",
  description: "Un socle de connaissances solide et authentique pour tout musulman. Fiqh, Aqida, Sîrah et Arabe regroupés dans un programme cohérent.",
  keywords: "sciences islamiques, socle islam, cours religion toulouse, ishes, formation islamique"
};

export default function SciencesIslamiquesPage() {
  const id = "sciences_islamiques";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
