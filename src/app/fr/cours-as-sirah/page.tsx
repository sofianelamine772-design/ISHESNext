import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Sîrah An-Nabawiyya | Vie du Prophète ﷺ | ISHES",
  description: "Découvrez la vie du Prophète Mohamed ﷺ. Un cursus annuel complet pour comprendre son héritage, ses vertus et tirer des enseignements pour notre quotidien.",
  keywords: "sira, vie du prophete, biographie prophétique, cours islam toulouse, ishes, apprentissage islam"
};

export default function CoursAsSirahPage() {
  const id = "as_sirah";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
