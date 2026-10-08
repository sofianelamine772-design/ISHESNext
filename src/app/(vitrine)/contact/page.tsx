import { buildPageMetadata, faqJsonLd, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactContent } from "@/components/vitrine/ContactContent";
import { ContactGratuitCta } from "@/components/vitrine/ContactGratuitCta";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { INSTITUT_CONTACT_FAQS } from "@/lib/institut-contact";

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
    "whatsapp ishes",
    "institut islamique toulouse",
  ],
});

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact gratuit — Institut ISHES",
  url: absoluteUrl("/contact"),
  description:
    "Entretien d'orientation gratuit pour discuter de l'Institut ISHES, des formations et de l'inscription d'un adulte ou d'un enfant.",
  isAccessibleForFree: true,
  about: { "@id": `${absoluteUrl("/")}#organization` },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-blue selection:text-white overflow-x-hidden w-full max-w-[100vw]">
      <JsonLd data={contactPageJsonLd} />
      <JsonLd data={faqJsonLd(INSTITUT_CONTACT_FAQS)} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-ishes-blue/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <ContactContent />
      <VitrineFaq
        eyebrow="Questions sur l'institut"
        title="Tout ce que les familles nous demandent avant de s'inscrire"
        items={INSTITUT_CONTACT_FAQS}
      />
      <ContactGratuitCta />
    </div>
  );
}
