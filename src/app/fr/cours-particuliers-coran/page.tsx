import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/cours-particuliers-coran") },
  openGraph: {
    url: absoluteUrl("/fr/cours-particuliers-coran"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Cours Particuliers de Coran & Tajwid | ISHES",
  description: "L'excellence d'un accompagnement individuel pour adultes et enfants. Travaillez en tête-à-tête avec un enseignant pour une progression rapide.",
  keywords: "cours particuliers coran, prof particulier islam, tajwid solo, ishes sur mesure"
};

export default function CoursParticuliersPage() {
  const id = "cours_particuliers";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
