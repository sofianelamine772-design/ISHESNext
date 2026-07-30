import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Cours de Sciences du Coran | Histoire & Révélation | ISHES",
  description: "Découvrez l'histoire de la révélation, de la compilation et de la transmission du Livre Saint. Une formation diplômante de l'Institut ISHES.",
  keywords: "sciences du coran, histoire coran, révélation, compilation coran, ishes toulouse, sciences islamiques, cours coran",
  openGraph: {
    title: "Cours de Sciences du Coran | Histoire & Révélation | ISHES",
    description: "Découvrez l'histoire de la révélation, de la compilation et de la transmission du Livre Saint. Une formation diplômante de l'Institut ISHES.",
    url: "https://ishes.org/fr/cours-sciences-coran",
    type: "website",
    images: [
      {
        url: "/images/flyer-sciences-du-coran.jpeg",
        width: 1200,
        height: 630,
        alt: "Flyer Sciences du Coran - ISHES"
      }
    ]
  }
};

export default function CoursSciencesCoranPage() {
  const id = "sciences_du_coran";
  const course = PROGRAMS_DATA[id];
  
  return (
    <div className="bg-white">
      {/* Navbar provided by layout */}
      <CourseDetailView course={course} id={id} />
      {/* Footer provided by layout */}
    </div>
  );
}
