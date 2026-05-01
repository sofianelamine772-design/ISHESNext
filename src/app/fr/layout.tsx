import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";

export default function FrLayout({
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
      <WhatsappButton />
    </>
  );
}
