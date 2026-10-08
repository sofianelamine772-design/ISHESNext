import ContactPage from "@/app/(vitrine)/contact/page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact gratuit Institut ISHES — Toulouse & distance",
  description:
    "Demandez un entretien gratuit avec l'Institut ISHES. Questions sur les cours d'arabe, le Tajwid, les groupes enfants à Toulouse ou à distance : l'équipe vous oriente sans engagement.",
  path: "/contact",
  keywords: [
    "contact institut ishes",
    "entretien gratuit ishes",
    "cours arabe toulouse contact",
    "inscription cours coran toulouse",
  ],
});

export default function FrContactPage() {
  return <ContactPage />;
}
