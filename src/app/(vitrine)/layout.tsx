import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DynamicWhatsappButton } from "@/components/DynamicWhatsappButton";

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
      <Footer />
      <DynamicWhatsappButton />
    </>
  );
}
