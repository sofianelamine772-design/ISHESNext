import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactGratuitCtaGate } from "@/components/vitrine/ContactGratuitCtaGate";
import { DynamicWhatsappButton } from "@/components/DynamicWhatsappButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Navbar />
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
      <ContactGratuitCtaGate />
      <Footer />
      <DynamicWhatsappButton />
    </>
  );
}
