import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Sciences du Coran | Histoire & Révélation | ISHES",
  description: "Découvrez l'histoire de la révélation, de la compilation et de la transmission du Livre Saint. Une formation diplômante de l'Institut ISHES.",
  keywords: "sciences du coran, histoire coran, révélation, compilation coran, ishes toulouse"
};

export default function CoursSciencesCoranPage() {
  const id = "sciences_du_coran";
  const course = PROGRAMS_DATA[id];
  
  return <CourseDetailView course={course} id={id} />;
}
