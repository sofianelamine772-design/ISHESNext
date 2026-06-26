import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Spiritualité Musulmane | Éducation de l'Âme & Purification | ISHES",
  description: "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
  keywords: "spiritualité islam, éducation de l'ame, purification du coeur, tazkiya, paix intérieure islam, cours islam, ishes",
  openGraph: {
    title: "Spiritualité Musulmane | Éducation de l'Âme & Purification | ISHES",
    description: "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
    url: "https://ishes.org/fr/spiritualite-islam",
    type: "website",
    images: [
      {
        url: "/images/spiritualite-musulmane-flyer.jpeg",
        width: 1200,
        height: 630,
        alt: "Spiritualité Musulmane - Institut ISHES"
      }
    ]
  }
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Spiritualité Musulmane",
  "description": "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
  "provider": {
    "@type": "Organization",
    "name": "Institut ISHES",
    "sameAs": "https://ishes.org"
  },
  "offers": {
    "@type": "Offer",
    "price": "399",
    "priceCurrency": "EUR",
    "category": "Paid"
  }
};

export default function SpiritualiteIslamPage() {
  const id = "spiritualite_islam";
  const course = PROGRAMS_DATA[id];
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <CourseDetailView course={course} id={id} />
    </>
  );
}
