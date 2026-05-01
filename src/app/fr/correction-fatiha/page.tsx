import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Correction de la Fatiha | Module Offert | ISHES",
  description: "Apprenez à réciter correctement la Fatiha et les 3 dernières sourates. Un module entièrement gratuit offert par l'Institut ISHES pour la communauté.",
  keywords: "correction fatiha, cours coran gratuit, apprendre priere, tajwid fatiha, ishes gratuit"
};

export default function CorrectionFatihaPage() {
  const id = "correction_fatiha";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
