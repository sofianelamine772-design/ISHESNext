import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* 
        Le main content est enveloppé pour s'assurer que Navbar s'affiche proprement par dessus.
      */}
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
}
